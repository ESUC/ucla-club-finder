import { useState } from 'react';
import styled from 'styled-components';
import Carousel from 'react-material-ui-carousel';

import FlippableCard from '../components/FlippableCard';
import NavigationBar from '../components/NavigationBar/NavigationBar';

export const SavedClubs = () => {
  const [currentIndex] = useState(0);

  const Container = styled.div`
    width: 20em;
    margin: 0 auto;
  `;

  return (
    <>
      <h1>Saved Clubs</h1>
      <NavigationBar />
      <Container>
        <Carousel index={currentIndex} autoPlay={false} navButtonsAlwaysVisible={true}>
          {Array.from({ length: 9 }).map((_, index) => (
            <FlippableCard key={index}>Card {index + 1}</FlippableCard>
          ))}
        </Carousel>
      </Container>
    </>
  );
};
