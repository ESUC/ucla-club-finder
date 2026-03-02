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
    border-radius: 16px !important;
    background: #ffffff;
    border: 2px solid #e2e8f0;
    font-size: 1.1rem;
    font-family: 'Inter', 'Roboto', Arial, sans-serif;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    

    &:hover {
      border-color: #0f172a;
      box-shadow: 0 4px 16px rgba(15, 23, 42, 0.12);
      transform: translateY(-1px);
    }

    &.Mui-focused {
      border-color: #f59e0b;
      box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.15);
      transform: translateY(-2px);
    }
  }

  .MuiInputLabel-root {
    color: #64748b;
    font-weight: 500;
    font-size: 1rem;
  }

  .MuiInputLabel-root.Mui-focused {
    color: #f59e0b;
    font-weight: 600;
  }

  .MuiOutlinedInput-notchedOutline {
    border: none !important;
  }

  .MuiAutocomplete-endAdornment {
    color: #64748b;
  }

  .MuiAutocomplete-endAdornment .MuiSvgIcon-root {
    font-size: 1.2rem;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 40px;

  .search-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #64748b;
    z-index: 2;
    font-size: 1.3rem;
    transition: all 0.3s ease;
  }

  &:focus-within .search-icon {
    color: #f59e0b;
    transform: translateY(-50%) scale(1.1);
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

  // TEMPORARY: Get userId from localStorage if logged in, otherwise null (clubs still display)
  // const userId = localStorage.getItem('token') ? '6627638285b11e9ed9d11fc9' : null;
  // Fetch user's saved club IDs when logged in (so star state is correct)
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
    // TEMPORARY FIX: Add timeout and error handling
    const timeoutId = setTimeout(() => {
      console.log('⏱️ Loading timeout - showing page anyway');
      setLoading(false);
    }, 3000); // Stop loading after 3 seconds even if API fails

    console.log('🔍 Fetching clubs from API...');
    axios
        .get(`${API_BASE}/api/clubs/`)
        .then((res) => {
          console.log('✅ Clubs fetched successfully:', res.data?.length || 0, 'clubs');
          setClubs(res.data || []);
          setLoading(false);
          clearTimeout(timeoutId);
        })
        .catch((err) => {
          console.error('❌ API Error:', err.message);
          console.error('Full error:', err);
          // Set empty array on error so page still renders
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
        <div style={{ padding: '40px', textAlign: 'center' }}>
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
              id="panel-header"
              aria-controls="panel-content"
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
              id="panel-header"
              aria-controls="panel-content"
              expandIcon={<ExpandMoreIcon />}
            >
              Major
            </AccordionSummary>
            <AccordionDetails>
              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedMajors.includes('Mechanical and Aerospace Engineering')}
                      onChange={() => toggleValue('Mechanical and Aerospace Engineering', selectedMajors, setSelectedMajors)}
                    />
                  }
                  label="Aerospace Engineering"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedMajors.includes('Bioengineering')}
                      onChange={() =>
                        toggleValue('Bioengineering', selectedMajors, setSelectedMajors)
                      }
                    />
                  }
                  label="Bioengineering"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedMajors.includes('Chemical and Biomolecular Engineering')}
                      onChange={() =>
                        toggleValue(
                          'Chemical and Biomolecular Engineering',
                          selectedMajors,
                          setSelectedMajors
                        )
                      }
                    />
                  }
                  label="Biomolecular Engineering"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedMajors.includes('Chemical and Biomolecular Engineering')}
                      onChange={() =>
                        toggleValue(
                          'Chemical and Biomolecular Engineering',
                          selectedMajors,
                          setSelectedMajors
                        )
                      }
                    />
                  }
                  label="Chemical Engineering"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedMajors.includes('Civil and Environmental Engineering')}
                      onChange={() =>
                        toggleValue(
                          'Civil and Environmental Engineering',
                          selectedMajors,
                          setSelectedMajors
                        )
                      }
                    />
                  }
                  label="Civil Engineering"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedMajors.includes('Electrical and Computer Engineering')}
                      onChange={() => toggleValue('Electrical and Computer Engineering', selectedMajors, setSelectedMajors)}
                    />
                  }
                  label="Computer Engineering"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedMajors.includes('Computer Science')}
                      onChange={() => toggleValue('Computer Science', selectedMajors, setSelectedMajors)}
                    />
                  }
                  label="Computer Science"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedMajors.includes('Computer Science') && selectedMajors.includes('Electrical and Computer Engineering')}
                      onChange={() => {toggleValue('Computer Science', selectedMajors, setSelectedMajors);
                        toggleValue('Electrical and Computer Engineering', selectedMajors, setSelectedMajors)
                      }}
                    />
                  }
                  label="Computer Science and Engineering"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedMajors.includes('Electrical and Computer Engineering')}
                      onChange={() => toggleValue('Electrical and Computer Engineering', selectedMajors, setSelectedMajors)}
                    />
                  }
                  label="Electrical Engineering"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedMajors.includes('Civil and Environmental Engineering')}
                      onChange={() =>
                        toggleValue(
                          'Civil and Environmental Engineering',
                          selectedMajors,
                          setSelectedMajors
                        )
                      }
                    />
                  }
                  label="Environmental Engineering"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedMajors.includes('Materials Science and Engineering')}
                      onChange={() => toggleValue('Materials Science and Engineering', selectedMajors, setSelectedMajors)}
                    />
                  }
                  label="Materials Science and Engineering"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedMajors.includes('Mechanical and Aerospace Engineering')}
                      onChange={() => toggleValue('Mechanical and Aerospace Engineering', selectedMajors, setSelectedMajors)}
                    />
                  }
                  label="Mechanical Engineering"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedMajors.includes('General')}
                      onChange={() => toggleValue('General', selectedMajors, setSelectedMajors)}
                    />
                  }
                  label="General"
                />
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
                  placeholder="Search clubs by name, description, or keywords..."
                  InputProps={{
                    ...params.InputProps,
                    style: { paddingLeft: '48px' },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',
                        width: '75%',
                      },
                    },
                  }}
                />
              )}
              PaperComponent={(props) => (
                <Paper
                  {...props}
                  elevation={8}
                  sx={{
                    borderRadius: '12px',
                    marginTop: '8px',
                    border: '1px solid #e2e8f0',
                    '& .MuiAutocomplete-option': {
                      padding: '12px 12px',
                      width: '75%',
                      fontSize: '0.95rem',
                      '&:hover': {
                        backgroundColor: '#f8fafc',
                      },
                      '&[aria-selected="true"]': {
                        backgroundColor: 'transparent',
                        color: '#99A1AF',
                        '&:hover': {
                          backgroundColor: '#f8fafc',
                        },
                      },
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
