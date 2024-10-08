'use client';

import {
  AppBar,
  Button,
  Container,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { Mic, MicOff, Save } from '@mui/icons-material';
import React, { useEffect, useRef, useState } from 'react';

import Fuse from 'fuse.js';
import { products } from '@/data/products';

interface Product {
  plu: string;
  fullname: string;
  spoken_variety: string;
  commodity: string;
  variety: string;
  category: string;
}

const ProductSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSpeechRecognitionSupported, setIsSpeechRecognitionSupported] =
    useState(false);
  const [isAudioResponseEnabled, setIsAudioResponseEnabled] = useState(true);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const commands = ['clear', 'reset'];

  const fuseOptions = {
    includeScore: true,
    shouldSort: true,
    threshold: 0.4,
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
  useEffect(() => {
    if (recognitionRef.current) return;

    const isSpeechRecognitionAvailable = (): boolean => {
      if (typeof window === 'undefined') return false;

      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) return false;

      try {
        new SpeechRecognition();
        return true;
      } catch (e) {
        return false;
      }
    };

    const support = isSpeechRecognitionAvailable();
    setIsSpeechRecognitionSupported(support);

    if (support) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        if (isSpeaking) return;

        const speechResult = event.results[
          event.results.length - 1
        ][0].transcript
          .toLowerCase()
          .trim();
        console.log('Speech recognition result:', speechResult);

        if (commands.includes(speechResult)) {
          handleVoiceCommand(speechResult);
        } else {
          setQuery(speechResult);
          handleSearch({
            target: { value: speechResult },
          } as React.ChangeEvent<HTMLInputElement>);
        }
      };

      recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
      };

      recognitionRef.current.onend = () => {
        console.log('Speech recognition ended');
        if (isListening && !isSpeaking) {
          recognitionRef.current?.start();
        }
      };
    } else {
      console.warn('Speech Recognition not supported in this browser.');
    }

    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length > 0) {
      let filteredResults: Product[] = [];

      if (/^\d+$/.test(value.trim())) {
        filteredResults = products.filter((product) =>
          product.plu.includes(value.trim())
        );
      } else {
        const fuseResults = fuse.search(value);

        const maxScore = 0.3;
        filteredResults = fuseResults
          .filter(
            (result) => result.score !== undefined && result.score <= maxScore
          )
          .map((result) => result.item);
      }

      setResults(filteredResults);

      if (filteredResults.length === 1) {
        const product = filteredResults[0];
        const formattedPLU = formatPLUForSpeech(product.plu);
        if (isAudioResponseEnabled && isSpeechRecognitionSupported) {
          speakText(`${formattedPLU}`);
        }
      }
    } else {
      setResults([]);
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const handleVoiceCommand = (command: string) => {
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

  const formatPLUForSpeech = (plu: string): string => {
    const pluCodes = plu.split('/');
    const formattedCodes = pluCodes.map((code) => code.split('').join(' '));
    return formattedCodes.join(' and ');
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';

      setIsSpeaking(true);

      if (recognitionRef.current && isListening) {
        recognitionRef.current.stop();
      }

      utterance.onend = () => {
        setIsSpeaking(false);

        if (recognitionRef.current && isListening) {
          recognitionRef.current.start();
        }
      };

      synth.speak(utterance);
    } else {
      console.warn('Speech Synthesis not supported in this browser.');
    }
  };

  const toggleAudioResponse = () => {
    setIsAudioResponseEnabled(!isAudioResponseEnabled);
  };

  return (
    <>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Product PLU Lookup
          </Typography>
          <Button
            color="inherit"
            onClick={toggleAudioResponse}
            startIcon={<Save />}
          >
            {isAudioResponseEnabled
              ? 'Disable Audio Response'
              : 'Enable Audio Response'}
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
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
                  <IconButton
                    onClick={handleMicClick}
                    aria-label="voice search"
                  >
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
    </>
  );
};

export default ProductSearch;
