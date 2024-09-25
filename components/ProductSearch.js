// components/ProductSearch.js

'use client';

import {
  Container,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import { Mic, MicOff } from '@mui/icons-material';
import React, { useEffect, useRef, useState } from 'react';

import Fuse from 'fuse.js';
import { products } from '../data/products';

const ProductSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSpeechRecognitionSupported, setIsSpeechRecognitionSupported] = useState(false);
  const recognitionRef = useRef(null);

  const commands = ['clear', 'reset']; // Define command keywords

  // Initialize Fuse.js
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

  // Initialize Speech Recognition
  useEffect(() => {
    const isSpeechRecognitionAvailable = () => {
      const SpeechRecognition =
        typeof window !== 'undefined' &&
        (window.SpeechRecognition || window.webkitSpeechRecognition);

      // Create a dummy instance to test for support
      try {
        if (SpeechRecognition) {
          const recognitionTest = new SpeechRecognition();
          return true;
        }
      } catch (e) {
        return false;
      }
      return false;
    };

    const support = isSpeechRecognitionAvailable();
    setIsSpeechRecognitionSupported(support);

    if (support) {
      // Initialize Speech Recognition
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true; // Keep listening continuously
      recognitionRef.current.interimResults = false; // Get final results only
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        if (isSpeaking) {
          // Ignore results if the app is speaking
          return;
        }

        const speechResult = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
        console.log('Speech recognition result:', speechResult);

        if (commands.includes(speechResult)) {
          handleVoiceCommand(speechResult);
        } else {
          setQuery(speechResult);
          handleSearch({ target: { value: speechResult } });
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        if (isListening && !isSpeaking) {
          recognitionRef.current.start();
        }
      };
    } else {
      console.warn('Speech Recognition not supported in this browser.');
    }

    // Cleanup on component unmount
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening, isSpeaking]);

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

    setResults(filteredResults);

    if (filteredResults.length === 1) {
      const product = filteredResults[0];
      const formattedPLU = formatPLUForSpeech(product.plu);
      //speakText(`${formattedPLU}`);
    }
    // Do not speak if multiple or no matches
  } else {
    setResults([]);
  }
};

  const handleMicClick = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Function to handle voice commands
  const handleVoiceCommand = (command) => {
    switch (command) {
      case 'clear':
      case 'reset':
        setQuery('');
        setResults([]);
        break;
      default:
        break;
    }
  };

  // Function to format PLU codes for speech
  const formatPLUForSpeech = (plu) => {
    // Split on '/' to handle multiple PLUs
    const pluCodes = plu.split('/');
    // For each code, insert spaces between digits
    const formattedCodes = pluCodes.map((code) => code.split('').join(' '));
    // Join codes with ' and '
    return formattedCodes.join(' and ');
  };

  // Function to speak text using Speech Synthesis
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';

      // Set isSpeaking to true
      setIsSpeaking(true);

      // Stop recognition while speaking
      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop();
      }

      utterance.onend = () => {
        // Set isSpeaking to false
        setIsSpeaking(false);

        // Restart recognition if still listening
        if (recognitionRef.current && isListening) {
          recognitionRef.current.start();
        }
      };

      synth.speak(utterance);
    } else {
      console.warn('Speech Synthesis not supported in this browser.');
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Product PLU Lookup
      </Typography>
      <TextField
        fullWidth
        label="Search for a product..."
        variant="outlined"
        value={query}
        onChange={handleSearch}
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {isSpeechRecognitionSupported ? (
                <IconButton onClick={handleMicClick} aria-label="voice search">
                  {isListening ? <MicOff color="primary" /> : <Mic />}
                </IconButton>
              ) : null}
            </InputAdornment>
          ),
        }}
      />
      {!isSpeechRecognitionSupported && (
        <Typography variant="body2" color="error">
          Voice input is not supported on this device.
        </Typography>
      )}
      {results.length > 0 && (
        <List>
          {results.map((product, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={product.fullname.toLowerCase()}
                secondary={`PLU: ${product.plu}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default ProductSearch;
