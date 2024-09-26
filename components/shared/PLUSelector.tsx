import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

import { Clear } from '@mui/icons-material';
import { products } from '../../data/products';
import { useDebounce } from '../../hooks/useDebounce';

interface PLUSelectorProps {
  selectedPLUs: string[];
  onSelectionChange: (selectedPLUs: string[]) => void;
}

const PLUSelector: React.FC<PLUSelectorProps> = ({
  selectedPLUs,
  onSelectionChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCheckedOnly, setShowCheckedOnly] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handlePLUToggle = (plu: string) => {
    const newSelectedPLUs = selectedPLUs.includes(plu)
      ? selectedPLUs.filter((item) => item !== plu)
      : [...selectedPLUs, plu];
    onSelectionChange(newSelectedPLUs);
  };

  const handleResetSelections = () => {
    onSelectionChange([]);
  };

  const handleToggleChecked = () => {
    setShowCheckedOnly(!showCheckedOnly);
  };

  const filteredProducts = products.filter(
    (product) =>
      (product.fullname
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase()) ||
        product.plu.includes(debouncedSearchTerm)) &&
      (!showCheckedOnly || selectedPLUs.includes(product.plu))
  );

  return (
    <div>
      <TextField
        fullWidth
        label="Search PLUs"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        margin="normal"
      />
      <Toolbar variant="dense" style={{ justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
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
          <Typography variant="body2" style={{ marginLeft: '16px' }}>
            {selectedPLUs
              ? `${selectedPLUs.length} selected items`
              : '0 selected items'}
          </Typography>
        </Box>
        <Tooltip title="Reset Selections">
          <Button
            onClick={handleResetSelections}
            color="primary"
            startIcon={<Clear />}
          >
            Reset Form
          </Button>
        </Tooltip>
      </Toolbar>
      <Grid container spacing={2}>
        {filteredProducts.map((product) => (
          <Grid item xs={6} sm={4} md={3} key={product.plu}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    selectedPLUs ? selectedPLUs.includes(product.plu) : false
                  }
                  onChange={() => handlePLUToggle(product.plu)}
                />
              }
              label={`${product.plu} - ${product.fullname}`}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PLUSelector;
