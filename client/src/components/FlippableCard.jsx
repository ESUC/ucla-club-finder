import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';

const FlippableCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Card
      onClick={handleClick}
      style={{
        width: '320px',
        height: '370px',
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        transition: 'transform 0.6s',
        background: '#fff',
        borderRadius: '20px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      <CardContent
        style={{
          backfaceVisibility: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image="https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/upe.png"
          alt="UPE Logo"
          style={{
            width: '110px',
            height: '110px',
            objectFit: 'contain',
            borderRadius: '12px',
            background: '#fff',
            marginBottom: '18px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
          }}
        />
        <Typography variant="h6" component="div" style={{ fontWeight: 700, color: '#003b71', fontFamily: 'Inter, Roboto, Arial, sans-serif', marginBottom: 4 }}>
          {isFlipped ? 'Back Content' : 'Front Content'}
        </Typography>
      </CardContent>
      <CardContent
        style={{
          backfaceVisibility: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          transform: 'rotateY(180deg)',
        }}
      >
        <Typography variant="body1" style={{ color: '#0077c2', fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
          This is the back of the card.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FlippableCard;


