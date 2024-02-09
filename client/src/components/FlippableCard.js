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
        width: '18em',
        height: '21em',
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        transition: 'transform 0.6s',
        backgroundColor: '#ADD8E6',
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
        height="170"
        image="https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/upe.png"
        alt="UPE Logo"
      />

        <Typography variant="h5" component="div">
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
      </CardContent>
    </Card>
  );
};

export default FlippableCard;