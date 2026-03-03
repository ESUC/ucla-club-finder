import { useState, useMemo } from 'react';
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

// Hard-coded data to mirror MongoDB schema fields for testing
// Fields mirrored from server/models/clubModel.js: clubName, clubType, major, meetingDays, size
// Additional frontend-only fields: abbreviation, description, img
/*
const clubs = [
  {
    abbreviation: 'UPE',
    clubName: 'Upsilon Pi Epsilon',
    clubType: 'Professional', // not in filter; will still show unless filtered by other fields
    major: 'Computer Science',
    meetingDays: 'Wed',
    size: '120',
    description: 'Upsilon Pi Epsilon - Computer Science Honors Society',
    img: 'https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/upe.png',
  },
  {
    abbreviation: 'BSG',
    clubName: 'Bruin Spacecraft Group',
    clubType: 'Project-based',
    major: 'Mechanical/Aerospace Engineering',
    meetingDays: 'Mon, Thurs',
    size: '80',
    description: 'Bruin Space - Aerospace engineering and space exploration',
    img: 'https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/bsg.png',
  },
  {
    abbreviation: 'ASME',
    clubName: 'American Society of Mechanical Engineers',
    clubType: 'Professional',
    major: 'Mechanical/Aerospace Engineering',
    meetingDays: 'Tues',
    size: '150',
    description: 'American Society of Mechanical Engineers at UCLA',
    img: 'https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/asme.png',
  },
  {
    abbreviation: 'AIAA',
    clubName: 'American Institute of Aeronautics and Astronautics',
    clubType: 'Professional',
    major: 'Mechanical/Aerospace Engineering',
    meetingDays: 'Wed',
    size: '140',
    description: 'American Institute of Aeronautics and Astronautics',
    img: 'https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/aiaa.png',
  },
  {
    abbreviation: 'DBF',
    clubName: 'Design Build Fly',
    clubType: 'Project-based',
    major: 'Mechanical/Aerospace Engineering',
    meetingDays: 'Sat',
    size: '60',
    description: 'Design Build Fly - Aerospace design competition team',
    img: 'https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/dbf.png',
  },
  {
    abbreviation: 'IEEE',
    clubName: 'Institute of Electrical and Electronics Engineers',
    clubType: 'Professional',
    major: 'Electrical Engineering',
    meetingDays: 'Fri',
    size: '200',
    description: 'Institute of Electrical and Electronics Engineers',
    img: 'https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/ieee.png',
  },
  {
    abbreviation: 'QWER Hacks',
    clubName: 'QWER Hacks',
    clubType: 'Equity, Diversity, & Inclusion',
    major: 'Computer Science',
    meetingDays: 'Sun',
    size: '40',
    description: 'QWER Hacks - LGBTQ+ hackathon organization',
    img: 'https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/qwerhacks.png',
  },
  {
    abbreviation: 'MRS',
    clubName: 'Materials Research Society',
    clubType: 'Professional',
    major: 'Materials',
    meetingDays: 'Thurs',
    size: '70',
    description: 'Materials Research Society - Materials science and engineering',
    img: 'https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/mrs.png',
  },
  {
    abbreviation: 'AIChe',
    clubName: 'American Institute of Chemical Engineers',
    clubType: 'Professional',
    major: 'Chemical',
    meetingDays: 'Wed',
    size: '110',
    description: 'American Institute of Chemical Engineers',
    img: 'https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/aiche.png',
  },
  {
    abbreviation: 'ITE',
    clubName: 'Institute of Transportation Engineers',
    clubType: 'Professional',
    major: 'Civil/Environmental Engineering',
    meetingDays: 'Tues',
    size: '55',
    description: 'Institute of Transportation Engineers',
    img: 'https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/ite.png',
  },
  {
    abbreviation: '3D4E',
    clubName: '3D4E',
    clubType: 'Project-based',
    major: 'Mechanical/Aerospace Engineering',
    meetingDays: 'Mon',
    size: '45',
    description: '3D4E - 3D printing and additive manufacturing',
    img: 'https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/3d4e.png',
  },
  {
    abbreviation: 'MentorSEAS',
    clubName: 'MentorSEAS',
    clubType: 'Education & Outreach',
    major: 'Engineering',
    meetingDays: 'Wed',
    size: '30',
    description: 'MentorSEAS - Engineering mentorship program',
    img: 'https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/mentorseas.png',
  },
  {
    abbreviation: 'UAS@UCLA',
    clubName: 'UAS at UCLA',
    clubType: 'Project-based',
    major: 'Mechanical/Aerospace Engineering',
    meetingDays: 'Sun',
    size: '90',
    description: 'UAS@UCLA - Unmanned Aerial Systems team',
    img: 'https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/uas.png',
  },
  {
    abbreviation: 'BMES',
    clubName: 'Biomedical Engineering Society',
    clubType: 'Professional',
    major: 'Bioengineering',
    meetingDays: 'Thurs',
    size: '85',
    description: 'Biomedical Engineering Society',
    img: 'https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/bmes.png',
  },
  {
    abbreviation: 'Rocket Project',
    clubName: 'Rocket Project',
    clubType: 'Project-based',
    major: 'Mechanical/Aerospace Engineering',
    meetingDays: 'Sat',
    size: '75',
    description: 'Rocket Project - Rocket design and launch team',
    img: 'https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/rocketproject.png',
  },
  {
    abbreviation: 'SWE',
    clubName: 'Society of Women Engineers',
    clubType: 'Equity, Diversity, & Inclusion',
    major: 'Engineering',
    meetingDays: 'Wed',
    size: '180',
    description: 'Society of Women Engineers',
    img: 'https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/swe.png',
  },
  {
    abbreviation: 'ACM@UCLA',
    clubName: 'Association for Computing Machinery',
    clubType: 'Project-based',
    major: 'Computer Science',
    meetingDays: 'Fri',
    size: '220',
    description: 'Association for Computing Machinery at UCLA',
    img: 'https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/acm.png',
  },
  {
    abbreviation: 'SOLES|SHPE@UCLA',
    clubName: 'SOLES and SHPE at UCLA',
    clubType: 'Equity, Diversity, & Inclusion',
    major: 'Engineering',
    meetingDays: 'Tues',
    size: '130',
    description: 'SOLES and SHPE - Society of Latino Engineers and Scientists',
    img: 'https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/soles.png',
  },
  {
    abbreviation: 'EWB',
    clubName: 'Engineers Without Borders',
    clubType: 'Education & Outreach',
    major: 'Civil/Environmental Engineering',
    meetingDays: 'Mon',
    size: '65',
    description: 'Engineers Without Borders - International development projects',
    img: 'https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/ewb.png',
  },
  {
    abbreviation: 'IEEE-WIE',
    clubName: 'IEEE Women in Engineering',
    clubType: 'Equity, Diversity, & Inclusion',
    major: 'Electrical Engineering',
    meetingDays: 'Thurs',
    size: '90',
    description: 'IEEE Women in Engineering',
    img: 'https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/ieee-wie.png',
  },
  {
    abbreviation: 'SWUG',
    clubName: 'Software Undergraduate Group',
    clubType: 'Project-based',
    major: 'Computer Science',
    meetingDays: 'Wed',
    size: '35',
    description: 'Software Undergraduate Group',
    img: 'https://www.esuc.ucla.edu/winter-orgs/assets/img/orgs/swug.png',
  },
];
*/

const normalizeDay = (d) => {
  const x = d.trim().toLowerCase();
  if (x.startsWith('tue')) return 'Tues';
  if (x.startsWith('thu')) return 'Thurs';
  if (x.startsWith('wed')) return 'Wed';
  if (x.startsWith('mon')) return 'Mon';
  if (x.startsWith('fri')) return 'Fri';
  if (x.startsWith('sat')) return 'Sat';
  if (x.startsWith('sun')) return 'Sun';
  return d;
};

const sizePredicates = {
  '< 25 Members': (n) => n < 25,
  '< 50 Members': (n) => n < 50,
  '< 75 Members': (n) => n < 75,
  '100+ Members': (n) => n >= 100,
};

const CardGrid = ({ searchQuery = '', userId, clubs, filters = {}, savedClubIds = [], onSaveSuccess, joinedClubIds = [], onJoinSuccess }) => {
  const [openIndex, setOpenIndex] = useState(null);
  
  const handleOpenModal = (index) => {
    setOpenIndex(index);
  };

  const handleCloseModal = () => {
    setOpenIndex(null);
  };

  const { types = [], majors = [], days = [], sizes = [] } = filters;

  const filtered = useMemo(() => {
    const q = (searchQuery || '').trim().toLowerCase();

    return clubs
      .map((c, i) => ({ ...c, __index: i }))
      .filter((c) => {
        // searches for abbreviation, name, and description
        const matchesSearch = !q
          ? true
          : [c.abbreviation, c.clubName, c.description]
              .filter(Boolean)
              .some((t) => t.toLowerCase().includes(q));

        if (!matchesSearch) return false;

        // Type filter
        const matchesType = types.length === 0 ? true : types.includes(c.clubType);
        if (!matchesType) return false;

        // Major filter
        const matchesMajor = majors.length === 0 ? true : majors.includes(c.major);
        if (!matchesMajor) return false;

        // Meeting days filter
        const clubDays = (c.meetingDays || '')
          .split(',')
          .map((d) => normalizeDay(d))
          .filter(Boolean);
        const matchesDays = days.length === 0 ? true : days.some((d) => clubDays.includes(d));
        if (!matchesDays) return false;

        // Size filter
        const sizeNum = parseInt(String(c.size), 10);
        const matchesSize = sizes.length === 0
          ? true
          : sizes.some((label) => (sizePredicates[label] ? sizePredicates[label](sizeNum) : true));
        if (!matchesSize) return false;

        return true;
      })
      .sort((a, b) => a.abbreviation.localeCompare(b.abbreviation)); // sort clubs by abbreviation
  }, [clubs, searchQuery, types, majors, days, sizes]);

  if (filtered.length === 0) {
    return (
      <NoResults>
        <div>No clubs found{searchQuery?.trim() ? ` matching "${searchQuery}"` : ''}</div>
        <div style={{ fontSize: '0.9rem', marginTop: '8px', color: '#94a3b8' }}>
          Try adjusting your filters or search keywords
        </div>
      </NoResults>
    );
  }
  
  return (
    <Grid>
      {filtered.map((c, idx) => (
        <ClubCard
          img={c.img}
          title={c.abbreviation}
          fullName={c.clubName}
          description={c.description}
          clubType={c.clubType}
          major={c.major}
          //meetingDays={c.meetingDays}
          //size={c.size}
          url={c.url}
          isBoxOpen={openIndex === c.__index}
          onOpen={() => handleOpenModal(c.__index)}
          onClose={handleCloseModal}
          key={c.abbreviation}
          userId={userId}
          clubId={c._id}
          savedClubIds={savedClubIds}
          onSaveSuccess={onSaveSuccess}
          joinedClubIds={joinedClubIds}
          onJoinSuccess={onJoinSuccess}
        >
          Card {idx + 1};
        </ClubCard>
      ))}
    </Grid>
  );
};

export default CardGrid;
