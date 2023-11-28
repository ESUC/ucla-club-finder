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

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <>
        <Container className="paper">
        <Typography variant="h5" align="center">Login</Typography>
        <StyledForm className="text">
            <TextField label="Username" variant="outlined" value={username}/>
            <TextField label="Password" type="password" variant="outlined" value={password}/>
            <Button variant="contained" color="primary"> Login</Button>
        </StyledForm>
        </Container>
        
        </>
    );
}