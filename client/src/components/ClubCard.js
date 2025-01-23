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
            <Image src={img} href="#popup-box" onClick={onToggleModal}></Image>
            <Title>"Insert Title Here"</Title>
            <StyledLink>{title}</StyledLink>
                <Box isOpen={isBoxOpen}>
                    <Content style={{ width: '500px', height: 'auto', padding: '2em' }}>
                        <h1 style={{ color: '#007BFF', textAlign: 'center', marginBottom: '1em' }}>Upsilon Pi Epsilon (UPE)</h1>
                        <p style={{ paddingBottom: '0.5em' }}>
                            <strong style={{ color: '#333' }}>Acronym:</strong> 
                            <span style={{ color: '#555' }}> UPE</span>
                        </p>
                        <p style={{ paddingBottom: '0.5em' }}>
                            <strong style={{ color: '#333' }}>Social Links: </strong>
                            <a
                                href="https://upe.seas.ucla.edu/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: '#007BFF', textDecoration: 'underline' }}
                            >
                                Website
                            </a>
                        </p>
                        <p>
                            <strong style={{ color: '#333' }}>Description:  </strong>
                            <span style={{ color: '#555' }}>
                            Upsilon Pi Epsilon is the computer science honors society at UCLA. Through mentorship, corporate events, tutoring, and outreach, we support students' growth in technology and computer science. Some of our past events include the CS Career Fair, Hot Ones panel featuring professors with startup experience and serial entrepreneurs, and a finance talk with Professor Carey Nachenberg!
                            </span>
                        </p>
                        <div style={{ marginTop: '1em', padding: '10px', backgroundColor: '#f8f8f8', borderRadius: '5px' }}>
                            <h3 style={{ color: '#007BFF' }}><center>Upcoming Events</center></h3>
                            <h4 style={{ marginBottom: '5px' }}><strong style={{ color: '#333' }}>Intro Meeting</strong></h4>
                            <p style={{ marginTop: '0' }}>
                                <span style={{ color: '#555' }}>
                                    <strong style={{ color: '#333' }}>Date:</strong> Thursday, 9/29 <br />
                                    <strong style={{ color: '#333' }}>Time:</strong> 6 PM <br />
                                    <strong style={{ color: '#333' }}>Location:</strong> Young Hall CS 50
                                </span>
                            </p>
                        </div>
                        <BoxClose href="#" onClick={onToggleModal} style={{ fontSize: '30px' }}> ×</BoxClose>
                    </Content>
                </Box>
        </Card>
        </>
    );
}

export default ClubCard;

