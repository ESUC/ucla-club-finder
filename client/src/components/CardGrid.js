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

    const image = ["https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/upe.png","https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/bsg.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/asme.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/aiaa.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/dbf.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/ieee.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/qwerhacks.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/mrs.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/aiche.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/ite.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/3d4e.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/mentorseas.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/uas.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/bmes.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/rocketproject.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/swe.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/acm.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/soles.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/ewb.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/ieee-wie.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/swug.png"]; 
    const title = ["UPE", "BSG", "ASME", "AIAA", "DBF", "IEEE", "MRS", "QWER Hacks", "AIChe", "ITE", "3D4E", "MentorSEAS", "UAS@UCLA", "BMES", "Rocket Project", "SWE", "ACM@UCLA", "SOLES|SHPE@UCLA", "EWB", "IEEE-WIE", "SWUG"]

    return(
        <>
            <Grid xs={1}>
                {Array.from({ length: 21 }).map((_, index) => (
                    <ClubCard img= {image[index]} title={title[index]}isBoxOpen={isBoxOpen} onToggleModal={handleToggleModal} key={index}>Card {index + 1}</ClubCard>
                ))}
            </Grid>
        </>
    )
}

export default CardGrid;