'use client';

import {
  AppBar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  Hidden,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  Clear,
  DeleteForever,
  Description,
  ShoppingCart,
} from '@mui/icons-material';
import { PlayArrow, Save } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { defaultGroups, products } from '../data/products'; // Import defaultGroups

import Fuse from 'fuse.js';

// Icon for resetting selections

// Helper function to convert strings to sentence case
const toSentenceCase = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

function FlashcardGame() {
  const [playerName, setPlayerName] = useState('Human'); // Added state for player name
  const [selectedPLUs, setSelectedPLUs] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameItems, setGameItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [userInputs, setUserInputs] = useState({});
  const [query, setQuery] = useState('');
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false); // For the confirmation dialog
  const [openItemsDialog, setOpenItemsDialog] = useState(false); // For the selected items dialog
  const [selectedGroup, setSelectedGroup] = useState(''); // For the dropdown selection
  const [showCheckedOnly, setShowCheckedOnly] = useState(false);

  // Initialize Fuse.js with the same options as in ProductSearch.js
  const fuseOptions = {
    includeScore: true,
    shouldSort: true,
    threshold: 0.4, // Slightly higher to be more inclusive
    keys: [
      { name: 'fullname', weight: 0.5 },
      { name: 'spoken_variety', weight: 0.4 },
      { name: 'commodity', weight: 0.3 },
      { name: 'variety', weight: 0.2 },
      { name: 'category', weight: 0.1 },
      { name: 'plu', weight: 0.1 },
    ],
  };

  const fuse = new Fuse(products, fuseOptions);

  // Initialize displayedProducts with all products on component mount
  useEffect(() => {
    setDisplayedProducts(products);
    // Load saved selections from local storage
    const savedPLUs = localStorage.getItem('savedPLUs');
    if (savedPLUs) {
      setSelectedPLUs(JSON.parse(savedPLUs));
    }
  }, []);
  // Handler for toggling between showing all items or checked items
  const handleToggleChecked = () => {
    setShowCheckedOnly(!showCheckedOnly);
  };

  // Handler for resetting all selections
  const handleResetSelections = () => {
    setSelectedPLUs([]);
    setSelectedGroup(''); // Reset the group dropdown
  };
  // Handle search query changes
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length > 0) {
      let filteredResults = [];

      if (/^\d+$/.test(value.trim())) {
        // If the query is all digits, search by PLU directly
        filteredResults = products.filter((product) =>
          product.plu.includes(value.trim())
        );
      } else {
        const fuseResults = fuse.search(value);

        const maxScore = 0.3; // Adjust as needed
        filteredResults = fuseResults
          .filter((result) => result.score <= maxScore)
          .map((result) => result.item);
      }

      setDisplayedProducts(filteredResults);
    } else {
      setDisplayedProducts(products);
    }
  };

  // Handle PLU selection
  const handlePLUSelection = (plu) => {
    setSelectedPLUs((prev) =>
      prev.includes(plu) ? prev.filter((item) => item !== plu) : [...prev, plu]
    );
  };

  // Handler for group selection
  const handleGroupSelection = (event) => {
    const groupName = event.target.value;
    setSelectedGroup(groupName);

    if (groupName === 'None') {
      // Clear all selected PLUs if "None" is selected
      setSelectedPLUs([]);
      return;
    }

    const group = defaultGroups.find((g) => g.groupName === groupName);
    if (group) {
      const pluStrings = group.values.map((plu) => plu.toString());
      setSelectedPLUs(pluStrings);
    }
  };

  // Start the game
  const startGame = () => {
    const selectedItems = products.filter((product) =>
      selectedPLUs.includes(product.plu)
    );
    setGameItems(shuffleArray(selectedItems));
    setGameStarted(true);
    setCurrentIndex(0);
    setScore(0);
    setCurrentRound(1);
  };

  // Shuffle array helper function
  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  // Handle PLU card click during the first round
  const handlePLUClickRound1 = (plu) => {
    const currentItem = gameItems[currentIndex];
    if (plu === currentItem.plu) {
      setScore((prevScore) => prevScore + 1);
    } else {
      setScore((prevScore) => prevScore - 1);
      // Optionally, highlight the correct PLU here
    }
    // Remove the selected PLU card
    setGameItems((prev) => prev.filter((item) => item.plu !== plu));
    // Move to the next item
    setCurrentIndex(currentIndex + 1);
  };

  // Handle name card click during the second round
  const handleNameClickRound2 = (fullname) => {
    const currentItem = gameItems[currentIndex];
    if (fullname === currentItem.fullname) {
      setScore((prevScore) => prevScore + 1);
    } else {
      setScore((prevScore) => prevScore - 1);
      // Optionally, highlight the correct name here
    }
    // Remove the selected name card
    setGameItems((prev) => prev.filter((item) => item.fullname !== fullname));
    // Move to the next item
    setCurrentIndex(currentIndex + 1);
  };

  // Handle input change in the final round
  const handleInputChange = (id, value) => {
    setUserInputs((prevInputs) => ({
      ...prevInputs,
      [id]: value,
    }));
  };

  // Calculate final score for the last round
  const calculateFinalScore = () => {
    let finalScore = score;
    gameItems.forEach((item) => {
      if (userInputs[item.id] === item.plu) {
        finalScore += 1;
      } else {
        finalScore -= 1;
      }
    });
    setScore(finalScore);
    setCurrentRound(4); // Indicate that the game is over
  };

  // Save selected PLUs to local storage
  const saveSelections = () => {
    localStorage.setItem('savedPLUs', JSON.stringify(selectedPLUs));
  };

  // Function to save selected PLUs to a text file
  const saveToFile = () => {
    // Save only the selected PLUs as comma-separated values
    const content = selectedPLUs.join(',');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'selected_plu.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Function to clear local storage
  const clearMemory = () => {
    localStorage.removeItem('savedPLUs');
    setSelectedPLUs([]);
    setSelectedGroup('');
    setOpenDialog(false);
  };

  // Function to handle "Clear Memory" button click
  const handleClearMemory = () => {
    setOpenDialog(true);
  };

  // Function to handle dialog close without clearing
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  // Function to render the game info block
  const renderGameInfoBlock = () => {
    const selectedItemsList = products.filter((product) =>
      selectedPLUs.includes(product.plu)
    );
    return (
      <div style={{ marginBottom: '20px' }}>
        <Typography variant="h6">Player: {playerName}</Typography>
        <Typography variant="h6">Score: {score}</Typography>
        <Typography variant="h6">Round: {currentRound}</Typography>
        <Typography variant="h6">
          Items to be quizzed on: {selectedPLUs.length}
        </Typography>
        <Button variant="outlined" onClick={() => setOpenItemsDialog(true)}>
          Show Selected Items
        </Button>

        {/* Dialog for showing selected items */}
        <Dialog
          open={openItemsDialog}
          onClose={() => setOpenItemsDialog(false)}
          aria-labelledby="selected-items-dialog-title"
        >
          <DialogTitle id="selected-items-dialog-title">
            Selected Items
          </DialogTitle>
          <DialogContent dividers>
            {selectedItemsList.map((item) => (
              <Typography key={item.plu}>
                {item.plu} - {toSentenceCase(item.fullname)}
              </Typography>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenItemsDialog(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  if (!gameStarted) {
    // Selection screen with search functionality
    return (
      <div>
        {/* AppBar for Navigation */}
        <AppBar position="static" color="secondary">
          <Toolbar variant="dense">
            <Typography variant="body2" style={{ flexGrow: 1 }}>
              Flashcard Game
            </Typography>
            <Button
              color="inherit"
              onClick={saveToFile}
              startIcon={<Description />}
              title="Save to Text File"
            >
              <Hidden mdDown>Save to Text File</Hidden>
            </Button>
            <Button
              color="inherit"
              onClick={handleClearMemory}
              startIcon={<DeleteForever />}
              title="Clear Memory"
            >
              <Hidden mdDown>Clear Memory</Hidden>
            </Button>
            <Button
              color="inherit"
              onClick={saveSelections}
              startIcon={<Save />}
              title="Save Selections"
            >
              <Hidden mdDown>Save Selections</Hidden>
            </Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" style={{ marginTop: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Select PLUs to be quizzed on
          </Typography>

          {/* Input for Player Name */}
          <TextField
            fullWidth
            variant="outlined"
            label="Player Name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            margin="normal"
          />

          {/* Dropdown for default groups */}
          <FormControl fullWidth variant="outlined" margin="normal">
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

          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search..."
            value={query}
            onChange={handleSearch}
            margin="normal"
          />

          <div>
            {/* Toolbar for controlling the list display and reset */}
            <Toolbar
              variant="dense"
              style={{ justifyContent: 'space-between' }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={showCheckedOnly}
                    onChange={handleToggleChecked}
                    color="primary"
                  />
                }
                label="Show Checked Only"
              />
              <Tooltip title="Reset Selections">
                <IconButton onClick={handleResetSelections} color="primary">
                  <Clear />
                </IconButton>
              </Tooltip>
            </Toolbar>

            {/* Grid container for the list of products */}
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <Grid container spacing={2}>
                {displayedProducts
                  .filter((product) =>
                    showCheckedOnly ? selectedPLUs.includes(product.plu) : true
                  )
                  .map((product) => (
                    <Grid item xs={12} md={4} key={product.plu}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedPLUs.includes(product.plu)}
                            onChange={() => handlePLUSelection(product.plu)}
                          />
                        }
                        label={`${product.plu} - ${toSentenceCase(product.fullname)}`}
                      />
                    </Grid>
                  ))}
              </Grid>
            </div>
          </div>

          <Button
            variant="contained"
            color="primary"
            onClick={startGame}
            disabled={selectedPLUs.length === 0 || !playerName}
            startIcon={<PlayArrow />}
            style={{ marginTop: '20px' }}
          >
            Start Game
          </Button>
        </Container>

        {/* Confirmation Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Clear Local Memory'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This will clear all your selected PLUs from local memory. You may
              want to save them to a local file first. Do you still want to
              proceed?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={clearMemory} color="primary" autoFocus>
              Clear Memory
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  } else if (currentRound === 1) {
    // First Round
    const currentItem = gameItems[currentIndex];

    // If all items have been quizzed
    if (!currentItem) {
      // Proceed to the second round
      setGameItems(
        shuffleArray(
          products.filter((product) => selectedPLUs.includes(product.plu))
        )
      );
      setCurrentIndex(0);
      setCurrentRound(2);
      return null;
    }

    return (
      <div>
        {/* AppBar */}
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Round {currentRound}
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" style={{ marginTop: '20px' }}>
          {renderGameInfoBlock()}

          <Typography variant="h5" gutterBottom>
            {currentItem.fullname}
          </Typography>
          <Grid container spacing={2}>
            {gameItems.map((item) => (
              <Grid item xs={3} key={item.plu}>
                <Card>
                  <CardActionArea
                    onClick={() => handlePLUClickRound1(item.plu)}
                  >
                    <CardContent>
                      <Typography variant="h6" align="center">
                        {item.plu}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    );
  } else if (currentRound === 2) {
    // Second Round
    const currentItem = gameItems[currentIndex];

    // If all items have been quizzed
    if (!currentItem) {
      // Proceed to the final round
      setGameItems(
        products.filter((product) => selectedPLUs.includes(product.plu))
      );
      setCurrentRound(3);
      return null;
    }

    return (
      <div>
        {/* AppBar */}
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Round {currentRound}
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" style={{ marginTop: '20px' }}>
          {renderGameInfoBlock()}

          <Typography variant="h5" gutterBottom>
            {currentItem.plu}
          </Typography>
          <Grid container spacing={2}>
            {gameItems.map((item) => (
              <Grid item xs={3} key={item.fullname}>
                <Card>
                  <CardActionArea
                    onClick={() => handleNameClickRound2(item.fullname)}
                  >
                    <CardContent>
                      <Typography variant="body1" align="center">
                        {item.fullname}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    );
  } else if (currentRound === 3) {
    // Final Round
    return (
      <div>
        {/* AppBar */}
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Round {currentRound}
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" style={{ marginTop: '20px' }}>
          {renderGameInfoBlock()}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              calculateFinalScore();
            }}
          >
            {gameItems.map((item) => (
              <div key={item.id} style={{ marginBottom: '10px' }}>
                <TextField
                  fullWidth
                  label={item.fullname}
                  value={userInputs[item.id] || ''}
                  onChange={(e) => handleInputChange(item.id, e.target.value)}
                  variant="outlined"
                  margin="normal"
                />
              </div>
            ))}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: '20px' }}
            >
              Submit Answers
            </Button>
          </form>
        </Container>
      </div>
    );
  } else {
    // Game Over Screen
    return (
      <div>
        {/* AppBar */}
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Game Over
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" style={{ marginTop: '20px' }}>
          {renderGameInfoBlock()}

          <Typography variant="h4" gutterBottom>
            Your final score is: {score}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setGameStarted(false);
              setSelectedPLUs([]);
              setUserInputs({});
              setScore(0);
              setCurrentRound(1);
              setQuery('');
              setDisplayedProducts(products);
              setPlayerName('');
            }}
          >
            Play Again
          </Button>
        </Container>
      </div>
    );
  }
}

export default FlashcardGame;
