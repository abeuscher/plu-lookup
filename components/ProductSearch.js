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
const fuse = new Fuse(products, {
  keys: ['item'],
  threshold: 0.2,
  tokenize: true,
  matchAllTokens: true,
  includeScore: true,
  shouldSort: true,
});

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      typeof window !== 'undefined' &&
      (window.SpeechRecognition || window.webkitSpeechRecognition);

    if (SpeechRecognition) {
      setIsSpeechRecognitionSupported(true);

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
      const fuseResults = fuse.search(value);
  
      const maxScore = 0.3;
      const filteredResults = fuseResults
        .filter((result) => result.score <= maxScore)
        .map((result) => result.item);
  
      setResults(filteredResults);
  
      if (filteredResults.length === 1) {
        const product = filteredResults[0];
        const formattedPLU = formatPLUForSpeech(product.plu);
        speakText(`${formattedPLU}`);
      }
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
        // Removed: speakText('Search cleared.');
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
              {isSpeechRecognitionSupported && (
                <IconButton onClick={handleMicClick} aria-label="voice search">
                  {isListening ? <MicOff color="primary" /> : <Mic />}
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />
      {results.length > 0 && (
        <List>
          {results.map((product, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={product.item}
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
