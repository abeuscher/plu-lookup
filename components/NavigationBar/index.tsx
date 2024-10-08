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

import Link from 'next/link';
import { Menu as MenuIcon } from '@mui/icons-material';
import React from 'react';
import { ShoppingCart } from '@mui/icons-material';
import { menuItems } from '@/data/nav';
import { usePathname } from 'next/navigation';

function isActiveLink(currentPath, itemHref) {
  // Ensure both paths start with a slash
  const normalizedCurrentPath = currentPath.startsWith('/')
    ? currentPath
    : `/${currentPath}`;
  const normalizedItemHref = itemHref.startsWith('/')
    ? itemHref
    : `/${itemHref}`;

  // Remove trailing slashes, if any
  const trimmedCurrentPath = normalizedCurrentPath.replace(/\/$/, '');
  const trimmedItemHref = normalizedItemHref.replace(/\/$/, '');

  // Compare the trimmed paths
  return trimmedCurrentPath === trimmedItemHref;
}
function NavigationBar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [currentPath, setCurrentPath] = React.useState('');
  const pathname = usePathname();
  React.useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(pathname);
    };

    // Set initial path
    handleRouteChange();
  }, [pathname]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              href={item.href}
              aria-label={item.text}
              selected={isActiveLink(currentPath, item.href)}
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
              aria-label="open menu" // Add aria-label for accessibility
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Link
            href="/"
            aria-label="home"
            style={{
              display: 'flex',
              textDecoration: 'none',
              alignItems: 'center',
              flexGrow: 1,
            }}
          >
            <Icon color="inherit" style={{ width: '2em', height: '2em' }}>
              {<ShoppingCart style={{ width: '2em', height: '2em' }} />}
            </Icon>
            {/* Site Title */}
            <Typography variant="h5" color="white">
              PLU Madness
            </Typography>
          </Link>

          {/* Desktop Navigation */}
          <Hidden mdDown>
            {menuItems.map((item) => (
              <Link
                key={item.text}
                href={item.href}
                aria-label={item.text}
                style={{ textDecoration: 'none' }} // Remove default link styles
                passHref
              >
                <Typography
                  component="span"
                  className={
                    isActiveLink(currentPath, item.href) ? 'active-link' : ''
                  }
                  sx={{
                    display: 'inline-block',
                    padding: '6px 16px',
                    backgroundColor: 'transparent',
                    color: 'inherit',
                    border: '1px solid transparent', // Add a border to mimic button if needed
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
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
