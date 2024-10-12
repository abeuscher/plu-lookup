'use client';

import {
  AppBar,
  Box,
  Drawer,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { Menu as MenuIcon, ShoppingCart } from '@mui/icons-material';
import React, { useState } from 'react';

import Link from 'next/link';
import { menuItems } from '@/data/nav';
import { usePathname } from 'next/navigation';

const NavigationBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActiveLink = (itemHref: string) => {
    if (itemHref === '/') {
      return pathname === '/';
    } else {
      return (
        pathname.startsWith(itemHref) &&
        (pathname.length === itemHref.length ||
          pathname[itemHref.length] === '/')
      );
    }
  };

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton
            component={Link}
            href={item.href}
            selected={isActiveLink(item.href)}
            onClick={() => setMobileOpen(false)}
          >
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            aria-label="open menu"
            sx={{
              display: { md: 'none' },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              flexGrow: 1,
              textDecoration: 'none',
            }}
          >
            <Icon color="inherit" sx={{ width: '2em', height: '2em', mr: 1 }}>
              <ShoppingCart />
            </Icon>
            <Typography variant="h5" color="white">
              PLU Madness
            </Typography>
          </Link>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {menuItems.map((item) => (
              <Link
                key={item.text}
                href={item.href}
                style={{ textDecoration: 'none' }}
                className={isActiveLink(item.href) ? 'active-link' : ''}
              >
                <Typography
                  component="span"
                  sx={{
                    px: 2,
                    py: 1,
                  }}
                >
                  {item.text}
                </Typography>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{ display: { md: 'none' } }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default NavigationBar;
