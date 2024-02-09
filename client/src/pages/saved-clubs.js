import React, { useState } from 'react';
import styled from 'styled-components'
import ClubCard from '../components/ClubCard.js';
import Carousel from 'react-material-ui-carousel';

export const SavedClubs = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const Container = styled.div`
        width: 20em;
        margin: 0 auto;
    `

    return (
        <>
            <h1>Saved Clubs</h1>
            <Container>
                <Carousel index={currentIndex} autoPlay={false} navButtonsAlwaysVisible={true}>
                    {
                        Array.from({ length: 9 }).map((_, index) => (
                        <ClubCard key={index}>Card {index + 1}</ClubCard>
                        ))
                    }
                </Carousel>
            </Container>
        </>
    );
}