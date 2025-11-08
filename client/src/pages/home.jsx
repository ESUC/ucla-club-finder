import { useState } from "react";
import {
  TextField,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "styled-components";

import CardGrid from "../components/CardGrid";
import NavigationBar from "../components/NavigationBar";
import "../css/Home.css";

const searchSuggestions = [
  "Computer Science",
  "Engineering",
  "Aerospace",
  "Mechanical",
  "Electrical",
  "Biomedical",
  "Chemical",
  "Civil",
  "Materials",
  "Robotics",
  "AI/ML",
  "Software",
  "Hardware",
  "Research",
  "Competition",
  "Outreach",
  "Women in Engineering",
  "Diversity",
  "Professional Development",
  "Networking",
  "Mentorship",
  "Innovation",
  "Sustainability",
  "Space",
  "Automotive",
  "Biotechnology",
  "Renewable Energy",
  "Data Science",
  "Cybersecurity",
  "Internet of Things"
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
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event, newValue) => {
    setSearchQuery(newValue || "");
  };

  return (
    <div className="home-bg">
      <NavigationBar />
      <div className="home-header">
        <Typography variant="h3" align="center" className="home-title">
          Organizations
        </Typography>
        <Typography variant="subtitle1" align="center" className="home-subtitle">
          Discover and explore UCLA engineering organizations. Use the search bar to find specific clubs or browse by category using the filters. Click on any organization card to learn more about their activities, meeting times, and opportunities.
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
                <FormControlLabel control={<Checkbox />} label="Project-based" />
                <FormControlLabel control={<Checkbox />} label="Greek" />
                <FormControlLabel control={<Checkbox />} label="Education & Outreach" />
                <FormControlLabel control={<Checkbox />} label="Equity, Diversity, & Inclusion" />
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
                <FormControlLabel control={<Checkbox />} label="Computer Science" />
                <FormControlLabel control={<Checkbox />} label="Electrical Engineering" />
                <FormControlLabel control={<Checkbox />} label="Mechanical/Aerospace Engineering" />
                <FormControlLabel control={<Checkbox />} label="Civil/Environmental Engineering" />
                <FormControlLabel control={<Checkbox />} label="Bioengineering" />
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
                <FormControlLabel control={<Checkbox />} label="Sun" />
                <FormControlLabel control={<Checkbox />} label="Mon" />
                <FormControlLabel control={<Checkbox />} label="Tues" />
                <FormControlLabel control={<Checkbox />} label="Wed" />
                <FormControlLabel control={<Checkbox />} label="Thurs" />
                <FormControlLabel control={<Checkbox />} label="Fri" />
                <FormControlLabel control={<Checkbox />} label="Sat" />
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
                <FormControlLabel control={<Checkbox />} label="< 25 Members" />
                <FormControlLabel control={<Checkbox />} label="< 50 Members" />
                <FormControlLabel control={<Checkbox />} label="< 75 Members" />
                <FormControlLabel control={<Checkbox />} label="100+ Members" />
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
          <CardGrid searchQuery={searchQuery} />
        </section>
      </div>
    </div>
  );
};


