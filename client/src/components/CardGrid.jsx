import { useState, useMemo } from 'react';
import styled from 'styled-components';

import ClubCard from './ClubCard';

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;
  justify-items: center;
  padding: 8px 0 16px 0;
  box-sizing: border-box;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #64748b;
  font-size: 1.1rem;
  font-weight: 500;
`;

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

const majorLabelToDbValues = {
  'Aerospace Engineering': ['Mechanical and Aerospace Engineering'],
  'Bioengineering': ['Bioengineering'],
  'Biomolecular Engineering': ['Chemical and Biomolecular Engineering'],
  'Chemical Engineering': ['Chemical and Biomolecular Engineering'],
  'Civil Engineering': ['Civil and Environmental Engineering'],
  'Computer Engineering': ['Electrical and Computer Engineering'],
  'Computer Science': ['Computer Science'],
  'Computer Science and Engineering': ['Computer Science', 'Electrical and Computer Engineering'],
  'Electrical Engineering': ['Electrical and Computer Engineering'],
  'Environmental Engineering': ['Civil and Environmental Engineering'],
  'Materials Science and Engineering': ['Materials Science and Engineering'],
  'Mechanical Engineering': ['Mechanical and Aerospace Engineering'],
  'General': ['General'],
};

const sizePredicates = {
  '< 25 Members': (n) => n < 25,
  '< 50 Members': (n) => n < 50,
  '< 75 Members': (n) => n < 75,
  '100+ Members': (n) => n >= 100,
};

const CardGrid = ({ searchQuery = '', userId, clubs, filters = {}, savedClubIds = [], onSaveSuccess }) => {
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
        const matchesSearch = !q
          ? true
          : [c.abbreviation, c.clubName]
              .filter(Boolean)
              .some((t) => t.toLowerCase().includes(q));

        if (!matchesSearch) return false;

        // Type filter
        const matchesType = types.length === 0 ? true : types.includes(c.clubType);
        if (!matchesType) return false;

        const resolvedMajors = majors.flatMap((label) => majorLabelToDbValues[label] || [label]);
        const matchesMajor = resolvedMajors.length === 0 ? true : resolvedMajors.includes(c.major);
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
      .sort((a, b) => {
        const aIsSaved = savedClubIds.some((id) => String(id) === String(a._id));
        const bIsSaved = savedClubIds.some((id) => String(id) === String(b._id));
        if (aIsSaved !== bIsSaved) return aIsSaved ? -1 : 1;
        return a.abbreviation.localeCompare(b.abbreviation);
      });
  }, [clubs, searchQuery, types, majors, days, sizes, savedClubIds]);

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
          url={c.url}
          isBoxOpen={openIndex === c.__index}
          onOpen={() => handleOpenModal(c.__index)}
          onClose={handleCloseModal}
          key={c._id || `${c.abbreviation}-${idx}`}
          userId={userId}
          clubId={c._id}
          savedClubIds={savedClubIds}
          onSaveSuccess={onSaveSuccess}
        />
      ))}
    </Grid>
  );
};

export default CardGrid;
