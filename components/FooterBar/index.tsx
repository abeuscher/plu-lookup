'use client';

import { AppBar, Container, Toolbar } from '@mui/material';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import { menuItems } from '@/data/nav';
import styles from './Footer.module.scss';

function FooterBar() {
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
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
            {menuItems.map((item) => (
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
