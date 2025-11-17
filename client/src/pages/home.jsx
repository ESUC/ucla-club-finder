import { useState } from 'react';
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
import NavigationBar from '../components/NavigationBar';
import '../css/Home.css';

const searchSuggestions = [
  'Computer Science',
  'Engineering',
  'Aerospace',
  'Mechanical',
  'Electrical',
  'Biomedical',
  'Chemical',
  'Civil',
  'Materials',
  'Robotics',
  'AI/ML',
  'Software',
  'Hardware',
  'Research',
  'Competition',
  'Outreach',
  'Women in Engineering',
  'Diversity',
  'Professional Development',
  'Networking',
  'Mentorship',
  'Innovation',
  'Sustainability',
  'Space',
  'Automotive',
  'Biotechnology',
  'Renewable Energy',
  'Data Science',
  'Cybersecurity',
  'Internet of Things',
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

  // Filter state
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedMajors, setSelectedMajors] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const toggleValue = (value, list, setter) => {
    setter((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };

  // TEMPORARY WILL CHANGE LATER
  const userId = '6627638285b11e9ed9d11fc9'; // john bruin
  const clubId = '6909d80faf668433ff54eced'; // UPE

  const handleSearchChange = (event, newValue) => {
    setSearchQuery(newValue || '');
  };

  const filters = {
    types: selectedTypes,
    majors: selectedMajors,
    days: selectedDays,
    sizes: selectedSizes,
  };

  return (
    <div className="home-bg">
      <NavigationBar />
      <div className="home-header">
        <Typography variant="h3" align="center" className="home-title">
          Organizations
        </Typography>
        <Typography variant="subtitle1" align="center" className="home-subtitle">
          Discover and explore UCLA engineering organizations. Use the search bar to find specific
          clubs or browse by category using the filters. Click on any organization card to learn
          more about their activities, meeting times, and opportunities.
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
                      checked={selectedTypes.includes('Project-based')}
                      onChange={() => toggleValue('Project-based', selectedTypes, setSelectedTypes)}
                    />
                  }
                  label="Project-based"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedTypes.includes('Greek')}
                      onChange={() => toggleValue('Greek', selectedTypes, setSelectedTypes)}
                    />
                  }
                  label="Greek"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedTypes.includes('Education & Outreach')}
                      onChange={() =>
                        toggleValue('Education & Outreach', selectedTypes, setSelectedTypes)
                      }
                    />
                  }
                  label="Education & Outreach"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedTypes.includes('Equity, Diversity, & Inclusion')}
                      onChange={() =>
                        toggleValue(
                          'Equity, Diversity, & Inclusion',
                          selectedTypes,
                          setSelectedTypes
                        )
                      }
                    />
                  }
                  label="Equity, Diversity, & Inclusion"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedTypes.includes('Professional')}
                      onChange={() => toggleValue('Professional', selectedTypes, setSelectedTypes)}
                    />
                  }
                  label="Professional"
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
                      checked={selectedMajors.includes('Computer Science')}
                      onChange={() => toggleValue('Computer Science', selectedMajors, setSelectedMajors)}
                    />
                  }
                  label="Computer Science"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedMajors.includes('Electrical Engineering')}
                      onChange={() =>
                        toggleValue('Electrical Engineering', selectedMajors, setSelectedMajors)
                      }
                    />
                  }
                  label="Electrical Engineering"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedMajors.includes('Mechanical/Aerospace Engineering')}
                      onChange={() =>
                        toggleValue(
                          'Mechanical/Aerospace Engineering',
                          selectedMajors,
                          setSelectedMajors
                        )
                      }
                    />
                  }
                  label="Mechanical/Aerospace Engineering"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedMajors.includes('Civil/Environmental Engineering')}
                      onChange={() =>
                        toggleValue(
                          'Civil/Environmental Engineering',
                          selectedMajors,
                          setSelectedMajors
                        )
                      }
                    />
                  }
                  label="Civil/Environmental Engineering"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedMajors.includes('Bioengineering')}
                      onChange={() => toggleValue('Bioengineering', selectedMajors, setSelectedMajors)}
                    />
                  }
                  label="Bioengineering"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedMajors.includes('Materials')}
                      onChange={() => toggleValue('Materials', selectedMajors, setSelectedMajors)}
                    />
                  }
                  label="Materials"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedMajors.includes('Chemical')}
                      onChange={() => toggleValue('Chemical', selectedMajors, setSelectedMajors)}
                    />
                  }
                  label="Chemical"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedMajors.includes('Engineering')}
                      onChange={() => toggleValue('Engineering', selectedMajors, setSelectedMajors)}
                    />
                  }
                  label="Engineering"
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
              Meeting Days
            </AccordionSummary>
            <AccordionDetails>
              <FormControl>
                {['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'].map((d) => (
                  <FormControlLabel
                    key={d}
                    control={
                      <Checkbox
                        checked={selectedDays.includes(d)}
                        onChange={() => toggleValue(d, selectedDays, setSelectedDays)}
                      />
                    }
                    label={d}
                  />
                ))}
              </FormControl>
            </AccordionDetails>
          </Accordion>
          <Accordion className="filter-accordion">
            <AccordionSummary
              id="panel-header"
              aria-controls="panel-content"
              expandIcon={<ExpandMoreIcon />}
            >
              Size
            </AccordionSummary>
            <AccordionDetails>
              <FormControl>
                {['< 25 Members', '< 50 Members', '< 75 Members', '100+ Members'].map((s) => (
                  <FormControlLabel
                    key={s}
                    control={
                      <Checkbox
                        checked={selectedSizes.includes(s)}
                        onChange={() => toggleValue(s, selectedSizes, setSelectedSizes)}
                      />
                    }
                    label={s}
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
                  placeholder="Search clubs by name, description, or keywords..."
                  InputProps={{
                    ...params.InputProps,
                    style: { paddingLeft: '48px' },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',
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
                      padding: '12px 16px',
                      fontSize: '0.95rem',
                      '&:hover': {
                        backgroundColor: '#f8fafc',
                      },
                      '&[aria-selected="true"]': {
                        backgroundColor: 'transparent',
                        color: '#0f172a',
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
          <CardGrid searchQuery={searchQuery} userId={userId} clubId={clubId} filters={filters} />
        </section>
      </div>
    </div>
  );
};
