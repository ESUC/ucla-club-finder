import { useState } from 'react';
import styled from 'styled-components';

import ClubCard from './ClubCard';

const Grid = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 20px;
    justify-items: center;
    padding: 8px 0 16px 0;
    box-sizing: border-box;
`;

const NoResults = styled.div`
    text-align: center;
    padding: 40px 20px;
    color: #64748b;
    font-size: 1.1rem;
    font-weight: 500;
`;

const CardGrid = ({ searchQuery = "" }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleOpenModal = (index) => {
        setOpenIndex(index);
    };

    const handleCloseModal = () => {
        setOpenIndex(null);
    };

    const image = [
        "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/upe.png","https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/bsg.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/asme.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/aiaa.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/dbf.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/ieee.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/qwerhacks.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/mrs.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/aiche.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/ite.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/3d4e.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/mentorseas.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/uas.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/bmes.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/rocketproject.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/swe.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/acm.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/soles.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/ewb.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/ieee-wie.png", "https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/swug.png"
    ]; 
    const title = ["UPE", "BSG", "ASME", "AIAA", "DBF", "IEEE", "MRS", "QWER Hacks", "AIChe", "ITE", "3D4E", "MentorSEAS", "UAS@UCLA", "BMES", "Rocket Project", "SWE", "ACM@UCLA", "SOLES|SHPE@UCLA", "EWB", "IEEE-WIE", "SWUG"];

    const descriptions = [
        "Upsilon Pi Epsilon - Computer Science Honors Society",
        "Bruin Space - Aerospace engineering and space exploration",
        "American Society of Mechanical Engineers at UCLA",
        "American Institute of Aeronautics and Astronautics",
        "Design Build Fly - Aerospace design competition team",
        "Institute of Electrical and Electronics Engineers",
        "QWER Hacks - LGBTQ+ hackathon organization",
        "Materials Research Society - Materials science and engineering",
        "American Institute of Chemical Engineers",
        "Institute of Transportation Engineers",
        "3D4E - 3D printing and additive manufacturing",
        "MentorSEAS - Engineering mentorship program",
        "UAS@UCLA - Unmanned Aerial Systems team",
        "Biomedical Engineering Society",
        "Rocket Project - Rocket design and launch team",
        "Society of Women Engineers",
        "Association for Computing Machinery at UCLA",
        "SOLES and SHPE - Society of Latino Engineers and Scientists",
        "Engineers Without Borders - International development projects",
        "IEEE Women in Engineering",
        "Software Undergraduate Group"
    ];

    const filteredClubs = Array.from({ length: 21 }).filter((_, index) => {
        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase();
        const clubName = title[index].toLowerCase();
        const description = descriptions[index].toLowerCase();
        return clubName.includes(query) || description.includes(query);
    });

    if (filteredClubs.length === 0 && searchQuery.trim()) {
        return (
            <NoResults>
                <div>No clubs found matching "{searchQuery}"</div>
                <div style={{ fontSize: '0.9rem', marginTop: '8px', color: '#94a3b8' }}>
                    Try searching for different keywords or browse all clubs
                </div>
            </NoResults>
        );
    }

    return(
        <Grid>
            {filteredClubs.map((_, index) => {
                const originalIndex = Array.from({ length: 21 }).findIndex((_, i) => {
                    if (!searchQuery.trim()) return i === index;
                    const query = searchQuery.toLowerCase();
                    const clubName = title[i].toLowerCase();
                    const description = descriptions[i].toLowerCase();
                    return clubName.includes(query) || description.includes(query);
                });
                return (
                    <ClubCard 
                        img={image[originalIndex]} 
                        title={title[originalIndex]} 
                        isBoxOpen={openIndex === originalIndex}
                        onOpen={() => handleOpenModal(originalIndex)}
                        onClose={handleCloseModal}
                        key={title[originalIndex]}
                    >
                        Card {originalIndex + 1}
                    </ClubCard>
                );
            })}
        </Grid>
    );
}

export default CardGrid;


