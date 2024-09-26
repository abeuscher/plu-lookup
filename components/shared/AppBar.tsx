import { AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material';

import React from 'react';

interface AppBarProps {
  title: string;
}

export const AppBar: React.FC<AppBarProps> = ({ title }) => {
  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Typography variant="h6">{title}</Typography>
      </Toolbar>
    </MuiAppBar>
  );
};
