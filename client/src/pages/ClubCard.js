
import styled from 'styled-components'

const Container = styled.div`
    width: 20em;
    height: 20em;
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
    width: 15em;
    height: 15em;
    position: relative;
    margin-top: 1em;
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
    position: absolute;
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
    width: 400px;
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

const ClubCard = ({ isBoxOpen, onToggleModal }) => {

    return (
        <>
            <Container>
                <Image src="https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/upe.png" href="#popup-box" onClick={onToggleModal} ></Image>
                <Title>Upsilon Pi Epsilon(UPE)</Title>
                <StyledLink>UPE</StyledLink>
                <Box isOpen={isBoxOpen}>
                    <Content>
                        <h1 style={{ color: 'blue' }}>UPE</h1>
                        <b>
                            <p>Acronym: UPE
                            Social Links:
                            Website: https://upe.seas.ucla.edu/
                            Instagram: @upeucla
                            Facebook: https://www.facebook.com/upeucla
                            Discord: https://discord.gg/4WTPEgb2x6
                            Linktree: https://linktr.ee/upeucla
                            Newsletter sign-up: http://eepurl.com/c-ajCL
                            LinkedIn: https://www.linkedin.com/company/73796748
                            Description:
                            Upsilon Pi Epsilon is the computer science honors society at UCLA. Through mentorship, corporate events, tutoring, and outreach, we support students' growth in technology and computer science. Some of our past events include the CS Career Fair, Hot Ones panel featuring professors with startup experience and serial entrepreneurs, and a finance talk with Professor Carey Nachenberg! Come out to our UPE Intro Event on Thursday, 9/29, 6 pm at Young Hall CS 50 to learn more about induction requirements, free UPE resources, and exciting upcoming events!
                        </p>
                        </b>
                        <BoxClose href="#" onClick={onToggleModal}> ×</BoxClose>
                    </Content>
                </Box>
            </Container>
        </>
    );
}

export default ClubCard;