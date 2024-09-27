import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid2 as Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { Clear, ExpandMore } from '@mui/icons-material';
import React, { useState } from 'react';

import { products } from '../../data/products';
import { useDebounce } from '../../hooks/useDebounce';

interface Product {
  plu: string;
  fullname: string;
  category: string;
}

interface PLUSelectorProps {
  selectedPLUs: string[];
  onSelectionChange: (selectedPLUs: string[]) => void;
}

const capitalizeText = (text: string) =>
  text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

const PLUSelector: React.FC<PLUSelectorProps> = ({
  selectedPLUs,
  onSelectionChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCheckedOnly, setShowCheckedOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState('plu');
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

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortOrder(event.target.value as string);
  };

  const normalizeProduct = (product: Product) => ({
    ...product,
    fullname: capitalizeText(product.fullname),
    category: capitalizeText(product.category),
  });

  const filteredProducts = products
    .map(normalizeProduct)
    .filter(
      (product) =>
        (product.fullname
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()) ||
          product.plu.includes(debouncedSearchTerm)) &&
        (!showCheckedOnly || selectedPLUs.includes(product.plu))
    );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'plu') {
      return a.plu.localeCompare(b.plu);
    } else if (sortOrder === 'fullname') {
      return a.fullname.localeCompare(b.fullname);
    } else if (sortOrder === 'category') {
      return a.category.localeCompare(b.category);
    } else {
      return 0;
    }
  });

  const productsByCategory = sortedProducts.reduce(
    (acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    },
    {} as { [category: string]: Product[] }
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
          <FormControl
            variant="outlined"
            size="small"
            style={{ marginLeft: '16px' }}
          >
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortOrder}
              onChange={handleSortChange}
              label="Sort By"
            >
              <MenuItem value="plu">PLU</MenuItem>
              <MenuItem value="fullname">Name</MenuItem>
              <MenuItem value="category">Category</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="body2" style={{ marginLeft: '16px' }}>
            {selectedPLUs.length} selected items
          </Typography>
        </Box>
        <Tooltip title="Reset Selections">
          <Button
            onClick={handleResetSelections}
            color="warning"
            startIcon={<Clear />}
          >
            Reset Form
          </Button>
        </Tooltip>
      </Toolbar>
      <Box>
        {Object.keys(productsByCategory).map((category) => (
          <Grid key={category} container>
            <Accordion key={category} defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">{category}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {productsByCategory[category].map((product) => (
                    <Grid
                      key={product.plu}
                      size={{ xs: 12, sm: 6, md: 4, lg: 2 }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedPLUs.includes(product.plu)}
                            onChange={() => handlePLUToggle(product.plu)}
                          />
                        }
                        label={
                          <Typography variant="body2">
                            {product.plu} - {product.fullname}
                          </Typography>
                        }
                      />
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Box>
    </div>
  );
};

export default PLUSelector;
