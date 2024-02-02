import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, makeStyles, FormControl, FormControlLabel, Checkbox } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from 'styled-components'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import CardGrid from '../components/CardGrid.js';
import ClubCard from '../components/ClubCard.js';

const accordionStyle = {
    width: '300px', // Adjust the width as needed
};

export const Home = () => {
    return (
        <div>
            <h1 style={{margin: '10px'}}>ClubFinder</h1>
            <NavigationBar></NavigationBar>
            <div style={{ margin: '10px' }}> 
                <Grid container spacing={1}>
                    <Grid xs = {3}>
                        <Accordion style={accordionStyle}>
                            <AccordionSummary id="panel-header" aria-controls="panel-content" expandIcon={<ExpandMoreIcon />}>
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
                        <Accordion style={accordionStyle}>
                            <AccordionSummary id="panel-header" aria-controls="panel-content" expandIcon={<ExpandMoreIcon />}>
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
                        <Accordion style={accordionStyle}>
                            <AccordionSummary id="panel-header" aria-controls="panel-content" expandIcon={<ExpandMoreIcon />}>
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
                        <Accordion style={accordionStyle}>
                            <AccordionSummary id="panel-header" aria-controls="panel-content" expandIcon={<ExpandMoreIcon />}>
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
                    </Grid>
                    <Grid xs = {9}>
                        <TextField fullWidth label="Search" id="Search" />
                        <CardGrid/>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}