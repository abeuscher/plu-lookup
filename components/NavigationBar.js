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
    { text: 'Voice Lookup', href: '/' },
    { text: 'Flashcard Game', href: '/flashcard' },
  ];

  const drawer = (
    <div>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            selected={currentPath === item.href}
          >
            <ListItemText primary={item.text} />
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

          {/* Site Title */}
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <Icon color="inherit">{<ShoppingCart />}</Icon>
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
