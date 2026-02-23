# Fixing MongoDB Atlas connection

## If your old password isn’t working

1. **Reset the password in Atlas**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com) → **Database Access**.
   - Find user **ClubFinderUser** → click **Edit** (pencil).
   - Click **Edit Password**.
   - Choose **Autogenerate Secure Password** and **copy it**, or set a new password that uses **only letters and numbers** (no `@`, `#`, `:`, `/`, etc.) so you don’t need URL encoding.
   - Click **Update User**.

2. **Update `.env`**
   - Open `server/.env`.
   -    Set `MONGO_URI` to (use your password; include `/ClubFinder` before `?` so data is in ClubFinder, not `test`):
   ```
   MONGO_URI=mongodb+srv://ClubFinderUser:YOUR_PASSWORD@clubfinder.voobmns.mongodb.net/ClubFinder?retryWrites=true&w=majority&appName=ClubFinder
   ```
   - No spaces around `=`. No quotes. One line.

3. **Restart the server**
   ```bash
   cd server && npm run dev
   ```

## If your password has special characters

Use URL encoding in the connection string only for the password part:

| Character | Use instead |
|-----------|-------------|
| `@`       | `%40`       |
| `:`       | `%3A`       |
| `/`       | `%2F`       |
| `?`       | `%3F`       |
| `#`       | `%23`       |
| `%`       | `%25`       |

Example: password `p@ss:word` → in the URI use `p%40ss%3Aword`.

## If others can connect but you can't (same Atlas, same password)

Then the issue is almost always **your network or machine**, not Atlas or the password. Your network (Wi‑Fi, campus, corporate, or ISP) may be blocking outbound connections to MongoDB; teammates on a different network can still connect.

**What to do:** Run the diagnostic from the `server` folder: `node check-mongo-connection.js`. It reports DNS, TCP reachability, and Mongoose. Try another network (e.g. phone hotspot) or turn off VPN; if it works on one network and not another, that network is blocking MongoDB. The app still runs using `server/clubs.json` when MongoDB is unavailable.

---

## If it still fails after a new password

Then the problem is likely **not** the password. Check:

- **Network Access** in Atlas: IP Access List includes your IP or `0.0.0.0/0`.
- **Cluster** not paused (Database → cluster should not show “Resume”).
- Try another network (e.g. phone hotspot) in case your current network blocks MongoDB.
- Run `node check-mongo-connection.js` for a clearer error.

The app will still run using `server/clubs.json` when MongoDB is unavailable.
