import styled from 'styled-components'
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const Container = styled.div`
    width: 20em;
    height: 21em;
    border-radius: 10px;
    background-color: #ADD8E6;
    margin-bottom: 2em;
`


const Title = styled.div`
    margin-top: 1em;
    font-family: Lobster Two;
    text-align: left;
    padding-left: 10%;
    font-size; 40px;
    color: black;
    &:hover {
        color: yellow;
    }
`

const Image = styled.img`
    width: 13em;
    height: 13em;
    position: relative;
    margin-left: 2.5em;
    border-radius: 10px;
    background-color: white;
    transition: transform 0.3s ease; 
    &:hover {
        transform: scale(1.1);
    }
`

const StyledLink = styled.a`
    font-family: Lobster Two;
    text-align: left;
    font-size: 20px;
    padding-left :10%;
    color: blue;
`;

const Box = styled.div`
    align-items: center;
    display: flex;
    justify-content: center; 
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(169, 169, 169, 0.2);
    transition: all 0.4s;
    visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
    opacity: ${(props) => (props.isOpen ? 1 : 0)};
`;

const Content = styled.div`
    position: absolute;
    background: white;
    width: 300px;
    padding: 1em 2em;
    border-radius: 4px;
`;

const BoxClose = styled.a`
    position: absolute;
    top: 0;
    right: 15px;
    color: blue;
    text-decoration: none;
    font-size: 30px;
`;

const ClubCard = ({ isBoxOpen, onToggleModal, img, title }) => {
    const [isFavorited, setIsFavorited] = useState(false);

    const handleToggleFavorite = () => {
        setIsFavorited((prev) => !prev);
    };

    return (
        <>
        <Card
        style={{
            width: '20em',
            height: '21em',
            margin: '1em',
            backgroundColor: '#ADD8E6',
        }}
        >
            <IconButton onClick={handleToggleFavorite} color={isFavorited ? 'primary' : 'blue'}>
                    {isFavorited ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
            <p></p>
            <Image src={img} href="#popup-box" onClick={onToggleModal} ></Image>
            <Title>"Insert Title Here"</Title>
            <StyledLink>{title}</StyledLink>
                <Box isOpen={isBoxOpen}>
                    <Content>
                        <h1 style={{ color: 'blue' }}>UPE</h1>
                        <b>
                            <p>Acronym: UPE
                            Social Links:
                            Website: https://upe.seas.ucla.edu/
                            Description:
                            Upsilon Pi Epsilon is the computer science honors society at UCLA. Through mentorship, corporate events, tutoring, and outreach, we support students' growth in technology and computer science. Some of our past events include the CS Career Fair, Hot Ones panel featuring professors with startup experience and serial entrepreneurs, and a finance talk with Professor Carey Nachenberg! Come out to our UPE Intro Event on Thursday, 9/29, 6 pm at Young Hall CS 50 to learn more about induction requirements, free UPE resources, and exciting upcoming events!
                        </p>
                        </b>
                        <BoxClose href="#" onClick={onToggleModal}> ×</BoxClose>
                    </Content>
                </Box>
        </Card>
      </>
    );
}

export default ClubCard;