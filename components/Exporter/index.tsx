import {
  Box,
  Button,
  Grid2 as Grid,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

import Papa from 'papaparse'; // For parsing CSV files
import { parse } from 'json2csv';
import { products } from '@/data/products'; // assuming the products data is imported from here
import { saveAs } from 'file-saver';
import { usePlayerState } from '@/hooks/usePlayerState'; // Manage selectedPLUs

const Exporter = () => {
  const { selectedPLUs, setSelectedPLUs } = usePlayerState(); // Manage selectedPLUs
  const [open, setOpen] = useState(false);
  const [displayMode, setDisplayMode] = useState<'all' | 'selected'>('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [importSuccess, setImportSuccess] = useState<number | null>(null); // To track import success

  // Function to handle modal open/close
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Function to export full dataset
  const exportAll = () => {
    const csv = parse(products);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'products.csv');
  };

  // Function to export selected products based on selectedPLUs (filtering by PLU)
  const exportSelected = () => {
    const selectedProducts = products.filter((product) =>
      selectedPLUs.includes(product.plu)
    );
    const csv = parse(selectedProducts);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'selected_products.csv');
  };

  // Function to handle CSV import
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          const importedData = result.data;
          const importedPLUs = importedData.map((item) => item.plu);

          // Update selectedPLUs to reflect the PLUs from the imported data
          setSelectedPLUs(importedPLUs);

          // Set the success message with the number of items imported
          setImportSuccess(importedPLUs.length);
        },
        error: (error) => {
          console.error('Error parsing CSV file:', error);
          setImportSuccess(null); // In case of error
        },
      });
    }
  };

  // Function to toggle display mode
  const handleDisplayAll = () => {
    setDisplayMode('all');
    handleOpen();
  };

  const handleDisplaySelected = () => {
    setDisplayMode('selected');
    handleOpen();
  };

  // Pagination control
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Data to be displayed in the table based on display mode
  const filteredProducts =
    displayMode === 'all'
      ? products
      : products.filter((product) => selectedPLUs.includes(product.plu));

  const displayedProducts = filteredProducts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 4, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h4" gutterBottom>
          Export Product Data
        </Typography>

        <Typography variant="body1" paragraph>
          Use the buttons below to export, display, or import your product data.
        </Typography>

        {/* Export Buttons */}
        <Grid container spacing={2} sx={{ marginBottom: 3 }}>
          <Grid>
            <Button variant="contained" color="primary" onClick={exportAll}>
              Export All
            </Button>
          </Grid>
          <Grid>
            <Button
              variant="outlined"
              color="secondary"
              onClick={exportSelected}
            >
              Export Selected
            </Button>
          </Grid>
        </Grid>
        <Typography variant="h4" gutterBottom>
          Import Product Data
        </Typography>
        {/* File Input for CSV Import */}
        <Grid container spacing={2} sx={{ marginBottom: 3 }}>
          <Grid>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              id="file-button"
              style={{ display: 'none' }}
            />
            <label htmlFor="file-button">
              <Button variant="contained" color="primary" component="span">
                Upload
              </Button>
            </label>
          </Grid>
        </Grid>
        <Typography variant="h4" gutterBottom>
          Display Product Data
        </Typography>
        {/* Display Data Buttons */}
        <Grid container spacing={2} sx={{ marginBottom: 3 }}>
          <Grid>
            <Button variant="contained" color="info" onClick={handleDisplayAll}>
              Display All
            </Button>
          </Grid>
          <Grid>
            <Button
              variant="contained"
              color="info"
              onClick={handleDisplaySelected}
            >
              Display Selected
            </Button>
          </Grid>
        </Grid>

        {/* Success Notification Modal */}
        <Modal
          open={importSuccess !== null} // Open when importSuccess is set
          onClose={() => setImportSuccess(null)} // Close when clicking outside or acknowledging
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Paper sx={{ padding: 4 }}>
            <Typography variant="h6" gutterBottom>
              Import Complete
            </Typography>
            <Typography variant="body1">
              {importSuccess !== null
                ? `${importSuccess} items were successfully imported.`
                : 'There was an error importing the file.'}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setImportSuccess(null)}
              sx={{ marginTop: 2 }}
            >
              Close
            </Button>
          </Paper>
        </Modal>

        <Modal
          open={open}
          onClose={handleClose}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Paper
            sx={{
              padding: 4,
              width: '80%',
              maxHeight: '80vh',
              overflow: 'auto',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Product Data ({displayMode === 'all' ? 'All' : 'Selected'})
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>PLU</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Variety</TableCell>
                    <TableCell>Commodity</TableCell>
                    <TableCell>Size</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>{product.plu}</TableCell>
                      <TableCell>{product.type}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.variety}</TableCell>
                      <TableCell>{product.commodity}</TableCell>
                      <TableCell>{product.size}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredProducts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Modal>
      </Paper>
    </Box>
  );
};

export default Exporter;
