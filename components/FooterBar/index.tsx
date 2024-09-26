'use client'; // This line is a comment and will be removed by the CLI

import {
  AppBar,
  Container,
  Icon,
  List,
  Toolbar,
  Typography,
} from '@mui/material';
import { Email, LocationOn, Phone, ShoppingCart } from '@mui/icons-material';

import Link from 'next/link';
import React from 'react';
import styles from './Footer.module.scss'; // Importing styles from component stylesheet

const footerData = {
  title: 'PLU Madness',
  copyrightYear: new Date().getFullYear(),
  contactEmail: 'info@example.com',
  mailingAddress: '123 Widget St, Widget City, WD 45678',
  phoneNumbers: [
    { label: 'Main Office', number: '+1234567890' },
    { label: 'Support', number: '+0987654321' },
  ],
  menuItems: [
    { text: 'Home', href: '/' },
    { text: 'Voice Lookup', href: '/voice-lookup' },
    { text: 'Flashcard Game', href: '/flashcard' },
  ],
};

function FooterBar() {
  const [currentPath, setCurrentPath] = React.useState('');

  React.useEffect(() => {
    setCurrentPath(window.location.pathname); // Capture current path for link highlighting
  }, []);

  return (
    <AppBar
      position="static"
      component="footer"
      color="secondary"
      className={styles.footer}
    >
      <Container maxWidth="lg">
        <Toolbar className={styles.toolbar}>
          {/* Footer Navigation */}
          <div className={styles.menuList}>
            {footerData.menuItems.map((item) => (
              <Link
                href={item.href}
                key={item.text}
                className={currentPath === item.href ? styles.activeLink : ''}
              >
                {item.text}
              </Link>
            ))}
          </div>
        </Toolbar>

        <div className={styles.footerContent}>
          <div className={styles.titleBlock}>
            <div className={styles.textBlock}>
              <Icon className={styles.cartIcon}>
                <ShoppingCart />
              </Icon>
              <Typography variant="h4" color="inherit">
                {footerData.title}
              </Typography>
            </div>
            <div className={styles.textBlock}>
              <Icon className={styles.locationIcon}>
                <LocationOn />
              </Icon>
              <Typography
                variant="body1"
                color="inherit"
                className={styles.mailingAddress}
              >
                {footerData.mailingAddress}
              </Typography>
            </div>
          </div>

          <div className={styles.contactBlock}>
            <div className={styles.contactItem}>
              <Icon color="inherit" className={styles.icon}>
                <Email />
              </Icon>
              <Typography variant="body1" color="inherit">
                <Link href={`mailto:${footerData.contactEmail}`} passHref>
                  {footerData.contactEmail}
                </Link>
              </Typography>
            </div>

            {footerData.phoneNumbers.map((phone) => (
              <div className={styles.contactItem} key={phone.number}>
                <Icon color="inherit" className={styles.icon}>
                  <Phone />
                </Icon>
                <Typography variant="body1" color="inherit">
                  {phone.label}:{' '}
                  <a href={`tel:${phone.number}`}>{phone.number}</a>
                </Typography>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright Section */}
        <div className={styles.copyright}>
          <Typography variant="body1" color="inherit">
            © {footerData.copyrightYear} {footerData.title}. All Rights
            Reserved.
          </Typography>
        </div>
      </Container>
    </AppBar>
  );
}

export default FooterBar;
