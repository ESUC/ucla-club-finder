import React, { useState } from 'react';
import styled from 'styled-components'
import ClubCard from './ClubCard.js'

const Container = styled.div`
    border: 2px solid black;
    margin-right: auto;
    margin-left: auto;
    border-radius: 10px;
    width: 63%;
`

const Grid = styled.div`
    padding: 2%;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    @media (max-width: 768px) {
        grid-template-columns: repeat(1, 1fr);
    }
`

const CardGrid = () => {
    const [isBoxOpen, setBoxOpen] = useState(false);

    const handleToggleModal = () => {
        setBoxOpen(!isBoxOpen);
    };

    const image = ["https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/upe.png","https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/bsg.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/asme.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/aiaa.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/dbf.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/ieee.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/qwerhacks.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/mrs.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/aiche.png"]; 
    const title = ["UPE", "BSG", "ASME", "AIAA", "DBF", "IEEE", "MRS", "QWER Hacks", "AIChe"]

    return(
        <>
            <Grid xs={1}>
                {Array.from({ length: 9 }).map((_, index) => (
                    <ClubCard img= {image[index]} title={title[index]}isBoxOpen={isBoxOpen} onToggleModal={handleToggleModal} key={index}>Card {index + 1}</ClubCard>
                ))}
            </Grid>
        </>
    )
}

export default CardGrid;