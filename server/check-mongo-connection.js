#!/usr/bin/env node
/**
 * Run from server folder: node check-mongo-connection.js
 * Diagnoses why MongoDB Atlas connection might fail on YOUR machine
 * when it works for others (same Atlas project, same password).
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const MONGO_URI = process.env.MONGO_URI?.trim();
const dns = require('dns').promises;
const net = require('net');

function parseHost(uri) {
  const match = uri && uri.match(/mongodb\+srv:\/\/(?:[^@]+@)?([^/?]+)/);
  return match ? match[1] : null;
}

async function main() {
  console.log('MongoDB Atlas connection check (your machine only)\n');

  if (!MONGO_URI) {
    console.log('❌ MONGO_URI is not set in server/.env');
    process.exit(1);
  }
  const host = parseHost(MONGO_URI);
  if (!host) {
    console.log('❌ Could not parse host from MONGO_URI');
    process.exit(1);
  }
  console.log('✓ MONGO_URI is set');
  console.log('✓ Atlas host:', host);

  // 1) DNS
  try {
    await dns.resolveSrv(`_mongodb._tcp.${host}`);
    console.log('✓ DNS resolve (SRV) OK');
  } catch (e) {
    console.log('❌ DNS failed for', host, '→', e.code || e.message);
    console.log('   Your network or DNS may be blocking MongoDB Atlas.');
    process.exit(1);
  }

  // 2) TCP reachability
  const srv = (await dns.resolveSrv(`_mongodb._tcp.${host}`))[0];
  const hostname = srv.name;
  const port = srv.port || 27017;
  const tcpOk = await new Promise((resolve) => {
    const socket = new net.Socket();
    const timeout = setTimeout(() => {
      socket.destroy();
      resolve(false);
    }, 8000);
    socket.on('connect', () => {
      clearTimeout(timeout);
      socket.destroy();
      resolve(true);
    });
    socket.on('error', () => {
      clearTimeout(timeout);
      resolve(false);
    });
    socket.connect(port, hostname);
  });

  if (tcpOk) {
    console.log('✓ TCP connection to Atlas OK (network allows MongoDB)');
  } else {
    console.log('❌ Cannot reach Atlas over TCP (port 27017).');
    console.log('   Likely cause: your network (Wi‑Fi, campus, VPN, or firewall) is blocking outbound MongoDB.');
    console.log('   Try: different network (e.g. phone hotspot), or turn off VPN.');
    process.exit(1);
  }

  // 3) Mongoose connect
  const mongoose = require('mongoose');
  try {
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 10000 });
    console.log('✓ Mongoose connected to MongoDB Atlas.');
    await mongoose.disconnect();
    process.exit(0);
  } catch (e) {
    console.log('❌ Mongoose connect failed:', e.message);
    if (e.message.includes('authentication')) {
      console.log('   → Wrong username or password in .env (reset password in Atlas Database Access).');
    } else {
      console.log('   → Check Atlas IP whitelist and that the cluster is not paused.');
    }
    process.exit(1);
  }
}

main();
