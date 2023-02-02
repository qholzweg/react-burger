import React from 'react';
import { Link } from 'react-router-dom';

import styles from './not-found.module.css';

// import { Breadcrumbs } from '../components/breadcrumbs';

export function NotFound404() {

  return (
    <main className='content-center text-center'>
      <div className={styles.container}>
        {/* <Breadcrumbs /> */}
        <div className={styles.content}>
          <h1>Oops! 404 Error</h1>
          <p>The page you requested does not exist</p>
          <br />
          <br />
          <p>check the address or try <Link to='/' className={styles.link}>homepage</Link></p>
        </div>
      </div>
    </main>
  );
}