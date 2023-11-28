import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, makeStyles } from '@mui/material';
import styled from 'styled-components'


const Container = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin: auto;
  margin-top: 200px;
  max-width: 300px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Register = () => {
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <>
        <Container className="paper">
        <Typography className="title" variant="h5" align="center" style={{margin:"10px"}} >Register</Typography>
        <StyledForm className="text">
            <TextField label="First Name" variant="outlined" value={firstName}/>
            <TextField label="Last Name" type="password" variant="outlined" value={lastName}/>
            <TextField label="Email" variant="outlined" value={email}/>
            <TextField label="Username" variant="outlined" value={username}/>
            <TextField label="Password" type="password" variant="outlined" value={password}/>
            <Button variant="contained" color="primary"> Login</Button>
        </StyledForm>
        </Container>
        
        </>
    );
}