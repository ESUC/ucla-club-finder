import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from 'styled-components';

import CardGrid from '../components/CardGrid';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import Footer from '../components/Footer/Footer';
import { API_BASE } from '../config';
import '../css/Home.css';

const majorOptions = [
  { label: 'Aerospace Engineering', dbValues: ['Mechanical and Aerospace Engineering'] },
  { label: 'Bioengineering', dbValues: ['Bioengineering'] },
  { label: 'Biomolecular Engineering', dbValues: ['Chemical and Biomolecular Engineering'] },
  { label: 'Chemical Engineering', dbValues: ['Chemical and Biomolecular Engineering'] },
  { label: 'Civil Engineering', dbValues: ['Civil and Environmental Engineering'] },
  { label: 'Computer Engineering', dbValues: ['Electrical and Computer Engineering'] },
  { label: 'Computer Science', dbValues: ['Computer Science'] },
  { label: 'Computer Science and Engineering', dbValues: ['Computer Science', 'Electrical and Computer Engineering'] },
  { label: 'Electrical Engineering', dbValues: ['Electrical and Computer Engineering'] },
  { label: 'Environmental Engineering', dbValues: ['Civil and Environmental Engineering'] },
  { label: 'Materials Science and Engineering', dbValues: ['Materials Science and Engineering'] },
  { label: 'Mechanical Engineering', dbValues: ['Mechanical and Aerospace Engineering'] },
  { label: 'General', dbValues: ['General'] },
];

const searchSuggestions = [
  'AI',
  'Build',
  'Women',
  'Vehicle',
  'Network',
  'Rocket',
  'Workshops',
  'Hands-On',
  'Design',
  'Honor Society'
];

const StyledAutocomplete = styled(Autocomplete)`
  .MuiOutlinedInput-root {
    border-radius: 12px !important;
    background: #f9f9fb;
    border: 1.5px solid #d1d5db;
    font-size: 16px;
    font-family: 'Inter', sans-serif;
    transition: all 0.2s ease;
    padding-left: 44px !important;

    &:hover {
      border-color: #b0b5bf;
    }

    &.Mui-focused {
      background: #fff;
      border-color: #9ca3af;
    }
  }

  .MuiOutlinedInput-notchedOutline {
    border: none !important;
  }

  .MuiAutocomplete-endAdornment {
    color: #717182;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 32px;
  width: 100%;

  .search-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #717182;
    z-index: 2;
    font-size: 22px;
  }
`;

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedClubIdsRaw, setSavedClubIdsRaw] = useState([]);

  // Filter state
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedMajors, setSelectedMajors] = useState([]);

  // userId from login: stored in localStorage as 'token' (actual userId) – must be before savedClubIds
  const userId = localStorage.getItem('token') || null;
  const savedClubIds = userId ? savedClubIdsRaw : [];

  const toggleValue = (value, list, setter) => {
    setter((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };

  useEffect(() => {
    if (!userId) return;
    axios
      .get(`${API_BASE}/api/users/saved/${userId}`)
      .then((res) => {
        const list = res?.data ?? [];
        setSavedClubIdsRaw(Array.isArray(list) ? list.map((c) => (c && c._id ? c._id : c)) : []);
      })
      .catch(() => setSavedClubIdsRaw([]));
  }, [userId]);

  const handleSearchChange = (event, newValue) => {
    setSearchQuery(newValue || '');
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => setLoading(false), 3000);

    axios
        .get(`${API_BASE}/api/clubs/`)
        .then((res) => {
          setClubs(res.data || []);
          setLoading(false);
          clearTimeout(timeoutId);
        })
        .catch(() => {
          setClubs([]);
          setLoading(false);
          clearTimeout(timeoutId);
        });

    return () => clearTimeout(timeoutId);
  }, []);

  const filters = {
    types: selectedTypes,
    majors: selectedMajors,
  };

  if (loading) {
    return (
      <div className="home-bg">
        <NavigationBar />
        <div className="home-header">
          <Typography variant="h3" align="center" className="home-title">
            Student Clubs and Organizations
          </Typography>
        </div>
        <div className="loading-message">
          <Typography>Loading clubs...</Typography>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="home-bg">
      <NavigationBar />
      <div className="home-header">
        <Typography variant="h3" align="center" className="home-title">
          Student Clubs and Organizations
        </Typography>
      </div>
      <div className="main-content">
        <aside className="sidebar">
          <Accordion className="filter-accordion">
            <AccordionSummary
              id="type-panel-header"
              aria-controls="type-panel-content"
              expandIcon={<ExpandMoreIcon />}
            >
              Club Type
            </AccordionSummary>
            <AccordionDetails>
              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedTypes.includes('Professional')}
                      onChange={() => toggleValue('Professional', selectedTypes, setSelectedTypes)}
                    />
                  }
                  label="Professional"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedTypes.includes('Project-based')}
                      onChange={() => toggleValue('Project-based', selectedTypes, setSelectedTypes)}
                    />
                  }
                  label="Project-based"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedTypes.includes('Equity, Diversity, & Inclusion')}
                      onChange={() =>
                        toggleValue('Equity, Diversity, & Inclusion', selectedTypes, setSelectedTypes)
                      }
                    />
                  }
                  label="Equity, Diversity, & Inclusion"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedTypes.includes('Education & Outreach')}
                      onChange={() =>
                        toggleValue(
                          'Education & Outreach',
                          selectedTypes,
                          setSelectedTypes
                        )
                      }
                    />
                  }
                  label="Education & Outreach"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedTypes.includes('General')}
                      onChange={() => toggleValue('General', selectedTypes, setSelectedTypes)}
                    />
                  }
                  label="General"
                />
              </FormControl>
            </AccordionDetails>
          </Accordion>
          <Accordion className="filter-accordion">
            <AccordionSummary
              id="major-panel-header"
              aria-controls="major-panel-content"
              expandIcon={<ExpandMoreIcon />}
            >
              Major
            </AccordionSummary>
            <AccordionDetails>
              <FormControl>
                {majorOptions.map((opt) => (
                  <FormControlLabel
                    key={opt.label}
                    control={
                      <Checkbox
                        checked={selectedMajors.includes(opt.label)}
                        onChange={() => toggleValue(opt.label, selectedMajors, setSelectedMajors)}
                      />
                    }
                    label={opt.label}
                  />
                ))}
              </FormControl>
            </AccordionDetails>
          </Accordion>
        </aside>
        <section className="content-area">
          <SearchContainer>
            <SearchIcon className="search-icon" />
            <StyledAutocomplete
              freeSolo
              options={searchSuggestions}
              value={searchQuery}
              onChange={handleSearchChange}
              onInputChange={handleSearchChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search clubs by name or abbreviation..."
                />
              )}
              PaperComponent={(props) => (
                <Paper
                  {...props}
                  elevation={4}
                  sx={{
                    borderRadius: '10px',
                    marginTop: '6px',
                    border: '1px solid #e5e7eb',
                    '& .MuiAutocomplete-option': {
                      padding: '10px 16px',
                      fontSize: '14px',
                      '&:hover': { backgroundColor: '#f3f4f6' },
                    },
                  }}
                />
              )}
            />
          </SearchContainer>
          <CardGrid
            searchQuery={searchQuery}
            userId={userId}
            clubs={clubs}
            filters={filters}
            savedClubIds={savedClubIds}
            onSaveSuccess={() => {
              if (!userId) return;
              axios
                .get(`${API_BASE}/api/users/saved/${userId}`)
                .then((res) => {
                  const list = res?.data ?? [];
                  setSavedClubIdsRaw(Array.isArray(list) ? list.map((c) => (c && c._id ? c._id : c)) : []);
                })
                .catch(() => {});
            }}
          />
        </section>
      </div>
      <Footer />
    </div>
  );
};
