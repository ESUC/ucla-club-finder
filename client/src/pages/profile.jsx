import { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  InputAdornment,
  IconButton,
} from '@mui/material';
import styled from 'styled-components';
import axios from 'axios';

import NavigationBar from '../components/NavigationBar';

const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100vw;
  background: #f5f8ff;
`;

const FormContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px;
`;

const StyledContainer = styled(Container)`
  width: 100%;
  max-width: 560px;
  padding: 32px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 10px 30px rgba(4, 56, 115, 0.08);
  border: 1px solid #e6eef9;
`;

const SidePanel = styled.div`
  flex: 1;
  background: #043873;
`;

const API_BASE = 'http://localhost:4000/api/users';

export const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [major, setMajor] = useState('');
  const [year, setYear] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const logoutToLogin = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/auth/login';
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      logoutToLogin();
      return;
    }

    axios
      .get(`${API_BASE}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const u = res.data; // backend returns user directly

        setFirstName(u.firstName || '');
        setLastName(u.lastName || '');
        setUsername(u.username || '');
        setMajor(u.major || '');
        setYear(u.year || '');
        setBio(u.bio || '');
        setProfilePicture(u.profilePicture || '');

        localStorage.setItem('user', JSON.stringify(u));
        setErrors({});
      })
      .catch((err) => {
        if (err?.response?.status === 401) return logoutToLogin();
        setErrors({ general: 'Failed to load your profile.' });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    setSuccess('');
    setErrors({});

    const token = localStorage.getItem('token');
    if (!token) return logoutToLogin();

    // Basic client-side checks (keep it simple)
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required.';
    if (!username.trim()) newErrors.username = 'Username is required.';
    if (!major.trim()) newErrors.major = 'Major is required.';
    if (!year.trim()) newErrors.year = 'Year is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    axios
      .patch(
        `${API_BASE}/me`,
        {
          firstName,
          lastName,
          username,
          major,
          year,
          bio,
          profilePicture,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        const updatedUser = res.data?.user ? res.data.user : res.data;
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setSuccess('Profile updated successfully.');
        setErrors({});
        setIsEditing(false);
      })
      .catch((err) => {
        if (err?.response?.status === 401) return logoutToLogin();

        // If backend sends { errors: {...} }
        const backendErrors = err?.response?.data?.errors;
        if (backendErrors) {
          setErrors(backendErrors);
        } else {
          setErrors({ general: 'Update failed.' });
        }
      });
  };

  return (
    <>
      <NavigationBar />
      <PageContainer>
        <FormContainer>
          <StyledContainer>
            <Typography
              variant="h5"
              align="left"
              gutterBottom
              sx={{ color: '#043873', fontWeight: 700 }}
            >
              Profile
            </Typography>

            <Typography variant="body2" align="left" style={{ marginBottom: '10px' }}>
              Update your account details below.
            </Typography>

            {loading && (
              <Typography variant="body2" align="left" style={{ marginBottom: '10px' }}>
                Loading...
              </Typography>
            )}
            <Button
              variant="contained"
              onClick={() => setIsEditing(true)}
              sx={{
                background: '#043873',
                borderRadius: '14px',
                textTransform: 'none',
                fontWeight: 600,
              }}>
              Edit Profile
            </Button>

            {!!errors.general && (
              <Typography variant="body2" align="left" sx={{ color: 'red', mb: 1 }}>
                {errors.general}
              </Typography>
            )}

            {!!success && (
              <Typography variant="body2" align="left" sx={{ color: 'green', mb: 1 }}>
                {success}
              </Typography>
            )}

            <form onSubmit={handleSave}>
              <TextField
                InputProps={{ readOnly: !isEditing }}
                fullWidth
                margin="normal"
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={!!errors.firstName}
                helperText={errors.firstName || ''}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 12 },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#A7CEFC' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#4F9CF9' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4F9CF9' },
                }}
              />

              <TextField
                InputProps={{ readOnly: !isEditing }}
                fullWidth
                margin="normal"
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                error={!!errors.lastName}
                helperText={errors.lastName || ''}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 12 },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#A7CEFC' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#4F9CF9' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4F9CF9' },
                }}
              />

              <TextField
                InputProps={{ readOnly: !isEditing }}
                fullWidth
                margin="normal"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={!!errors.username}
                helperText={errors.username || ''}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 12 },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#A7CEFC' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#4F9CF9' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4F9CF9' },
                }}
              />

              <TextField
                InputProps={{ readOnly: !isEditing }}
                fullWidth
                margin="normal"
                label="Major"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                error={!!errors.major}
                helperText={errors.major || ''}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 12 },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#A7CEFC' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#4F9CF9' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4F9CF9' },
                }}
              />

              <TextField
                InputProps={{ readOnly: !isEditing }}
                fullWidth
                margin="normal"
                label="Graduation Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                error={!!errors.year}
                helperText={errors.year || ''}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 12 },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#A7CEFC' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#4F9CF9' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4F9CF9' },
                }}
              />

              <TextField
                InputProps={{ readOnly: !isEditing }}
                fullWidth
                margin="normal"
                label="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                multiline
                minRows={3}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 12 },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#A7CEFC' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#4F9CF9' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4F9CF9' },
                }}
              />

              <TextField
                InputProps={{ readOnly: !isEditing }}
                fullWidth
                margin="normal"
                label="Profile Picture URL"
                value={profilePicture}
                onChange={(e) => setProfilePicture(e.target.value)}
                error={!!errors.profilePicture}
                helperText={errors.profilePicture || ''}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: 12 },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#A7CEFC' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#4F9CF9' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4F9CF9' },
                }}
              />

              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{
                  mt: 2,
                  mb: 1,
                  height: 54,
                  background: '#043873',
                  color: '#FFFFFF',
                  borderRadius: '16px',
                  textTransform: 'none',
                  fontWeight: 600,
                  letterSpacing: '.2px',
                  boxShadow: '0 10px 20px rgba(79,156,249,0.35)',
                  '&:hover': {
                    background: '#062E63',
                    boxShadow: '0 12px 24px rgba(79,156,249,0.45)',
                  },
                }}
              >
                Save Changes
              </Button>
            </form>
          </StyledContainer>
        </FormContainer>
        <SidePanel />
      </PageContainer >
    </>
  );
};
