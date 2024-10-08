'use client';

import { AppBar, Container, Toolbar } from '@mui/material';

import Link from 'next/link';
import React from 'react';
import { menuItems } from '@/data/nav';
import styles from './Footer.module.scss';

const footerData = {
  title: 'PLU Madness',
  copyrightYear: new Date().getFullYear(),
  contactEmail: 'info@example.com',
  mailingAddress: '123 Widget St, Widget City, WD 45678',
  phoneNumbers: [
    { label: 'Main Office', number: '+1234567890' },
    { label: 'Support', number: '+0987654321' },
  ],
  menuItems: menuItems,
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

        <div className={styles.copyright}>
          <Link href="https://github.com/abeuscher/plu-lookup" target="_blank">
            github
          </Link>
        </div>
      </Container>
    </AppBar>
  );
}

export default FooterBar;
