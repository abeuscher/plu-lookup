'use client';

import {
  AppBar,
  Button,
  Drawer,
  Hidden,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';

import Link from 'next/link';
import { Menu as MenuIcon } from '@mui/icons-material';
import React from 'react';
import { ShoppingCart } from '@mui/icons-material';

function NavigationBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [currentPath, setCurrentPath] = React.useState('');

  React.useEffect(() => {
    // This code runs only on the client side
    setCurrentPath(window.location.pathname);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Home', href: '/' },
    { text: 'Voice Lookup', href: '/voice-lookup' },
    { text: 'Flashcard Game', href: '/flashcard' },
  ];

  const drawer = (
    <div>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              href={item.href}
              selected={currentPath === item.href}
              onClick={() => setMobileOpen(false)}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* Mobile Menu Icon */}
          <Hidden mdUp>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Icon color="inherit" style={{ width: '2em', height: '2em' }}>
            {<ShoppingCart style={{ width: '2em', height: '2em' }} />}
          </Icon>
          {/* Site Title */}
          <Typography variant="h3" color="white" style={{ flexGrow: 1 }}>
            PLU Madness
          </Typography>

          {/* Desktop Navigation */}
          <Hidden mdDown>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                component={Link}
                href={item.href}
                style={{
                  fontWeight: currentPath === item.href ? 'bold' : 'normal',
                }}
              >
                {item.text}
              </Button>
            ))}
          </Hidden>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Hidden mdUp>
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </>
  );
}

export default NavigationBar;
