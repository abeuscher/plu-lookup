'use client';

import {
  AppBar,
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
      // For home page, only return true if pathname is exactly '/'
      return pathname === '/';
    } else {
      // For other pages, check if pathname starts with itemHref
      // and ensure it's an exact match or followed by a '/'
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
          <Hidden mdUp>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              aria-label="open menu"
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
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
          <Hidden mdDown>
            {menuItems.map((item) => (
              <Link
                key={item.text}
                href={item.href}
                style={{ textDecoration: 'none' }}
              >
                <Typography
                  component="span"
                  sx={{
                    px: 2,
                    py: 1,
                    color: 'white',
                    backgroundColor: isActiveLink(item.href)
                      ? 'rgba(255, 255, 255, 0.2)'
                      : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  {item.text}
                </Typography>
              </Link>
            ))}
          </Hidden>
        </Toolbar>
      </AppBar>
      <Hidden mdUp>
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </>
  );
};

export default NavigationBar;
