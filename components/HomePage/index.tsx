'use client';

import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import PLUSelector from '../shared/PLUSelector';
import { defaultGroups } from '@/data/products';
import { usePlayerState } from '@/hooks/usePlayerState';

const HomePage: React.FC = () => {
  const { playerName, setPlayerName, selectedPLUs, setSelectedPLUs } =
    usePlayerState();
  const [isClient, setIsClient] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (playerName && selectedPLUs.length > 0) {
      setIsSetupComplete(true);
    }
  };

  const handleGroupSelection = (event: SelectChangeEvent<string>) => {
    const groupName = event.target.value as string;
    setSelectedGroup(groupName);

    if (groupName === 'None') {
      setSelectedPLUs([]);
      return;
    }

    const group = defaultGroups.find((g) => g.groupName === groupName);
    if (group) {
      const pluStrings = group.values.map((plu) => plu.toString());
      setSelectedPLUs(pluStrings);
    }
  };

  const handlePLUSelectionChange = (newSelectedPLUs: string[]) => {
    setSelectedPLUs(newSelectedPLUs);
    if (newSelectedPLUs.length === 0) {
      setSelectedGroup('None');
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <Container>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        {/* Headline */}
        <Typography variant="h3" component="h1" gutterBottom>
          PLU Configurator
        </Typography>
        {/* Blurb */}
        <Typography variant="h6">
          Select the set of PLUs you'd like to work with, memorize, or export.
          The dropdown has a list of presets which we are working to grow.
        </Typography>
      </Box>

      {!isSetupComplete ? (
        <Paper elevation={3} sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Your Name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="group-select-label">
                Select Default Group
              </InputLabel>
              <Select
                labelId="group-select-label"
                value={selectedGroup}
                onChange={handleGroupSelection}
                label="Select Default Group"
              >
                <MenuItem value="None">None</MenuItem>
                {defaultGroups.map((group) => (
                  <MenuItem key={group.groupName} value={group.groupName}>
                    {group.groupName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box my={2}>
              <Typography variant="h6" gutterBottom>
                Select PLUs for your games and lookups:
              </Typography>
              <PLUSelector
                selectedPLUs={selectedPLUs}
                onSelectionChange={handlePLUSelectionChange}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!playerName || selectedPLUs.length === 0}
            >
              Start
            </Button>
          </form>
        </Paper>
      ) : (
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Setup Complete!
          </Typography>
          <Typography variant="body1" paragraph>
            You're all set! You can now use the navigation menu to access the
            Flashcard Game and other features.
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default HomePage;
