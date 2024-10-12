import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Search } from '@mui/icons-material';
import { products } from '@/data/products';

interface Product {
  plu: string;
  fullname: string;
  category: string;
}

interface DefaultGroup {
  groupName: string;
  values: number[];
}

interface PLUSelectorProps {
  selectedPLUs: string[];
  onSelectionChange: (selectedPLUs: string[]) => void;
  defaultGroups: DefaultGroup[];
  selectedGroup: string;
  onGroupChange: (groupName: string) => void;
}

const capitalizeText = (text: string) =>
  text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

const PLUSelector: React.FC<PLUSelectorProps> = ({
  selectedPLUs,
  onSelectionChange,
  defaultGroups,
  selectedGroup,
  onGroupChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCheckedOnly, setShowCheckedOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState('plu');

  const handlePLUToggle = (plu: string) => {
    const newSelectedPLUs = selectedPLUs.includes(plu)
      ? selectedPLUs.filter((item) => item !== plu)
      : [...selectedPLUs, plu];
    onSelectionChange(newSelectedPLUs);
  };

  const handleResetSelections = () => {
    onSelectionChange([]);
    onGroupChange('None');
  };

  const handleToggleChecked = () => {
    setShowCheckedOnly(!showCheckedOnly);
  };

  const handleGroupSelection = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const groupName = event.target.value as string;

    if (groupName === 'RESET_FORM') {
      handleResetSelections();
      return;
    }

    onGroupChange(groupName);

    if (groupName === 'None') {
      onSelectionChange([]);
      return;
    }

    const group = defaultGroups.find((g) => g.groupName === groupName);
    if (group) {
      const pluStrings = group.values.map((plu) => plu.toString());
      onSelectionChange(pluStrings);
    }
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
        (product.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.plu.includes(searchTerm)) &&
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
      <AppBar position="sticky" color="default">
        <Toolbar variant="dense">
          <FormControlLabel
            control={
              <Switch
                checked={showCheckedOnly}
                onChange={handleToggleChecked}
                color="primary"
                size="small"
              />
            }
            label="Selected Only"
          />
          <Box flexGrow={1} />
          <Typography variant="body2" sx={{ mr: 2 }}>
            {selectedPLUs.length} selected
          </Typography>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="sort-select-label">Sort By</InputLabel>
            <Select
              labelId="sort-select-label"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as string)}
              label="Sort By"
            >
              <MenuItem value="plu">PLU</MenuItem>
              <MenuItem value="fullname">Name</MenuItem>
              <MenuItem value="category">Category</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
        <Toolbar>
          <TextField
            placeholder="Search PLUs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{ flexGrow: 1, mr: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel id="group-select-label">Default Group</InputLabel>
            <Select
              labelId="group-select-label"
              value={selectedGroup}
              onChange={(e) =>
                handleGroupSelection(e as React.ChangeEvent<{ value: unknown }>)
              }
              label="Default Group"
            >
              <MenuItem value="None">None</MenuItem>
              {defaultGroups.map((group) => (
                <MenuItem key={group.groupName} value={group.groupName}>
                  {group.groupName}
                </MenuItem>
              ))}
              {selectedPLUs.length > 0 && (
                <MenuItem value="RESET_FORM" sx={{ color: 'error.main' }}>
                  Reset Form
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>

      <Box mt={2}>
        {Object.keys(productsByCategory).map((category) => (
          <Accordion key={category} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{category}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {productsByCategory[category].map((product) => (
                  <Grid item key={product.plu} xs={12} sm={6} md={4} lg={3}>
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
        ))}
      </Box>
    </div>
  );
};

export default PLUSelector;
