import React from 'react';
import '../assets/scss/main.scss';

import Header from './Header';

export default ({ children }) => (
  <div>
    <Header />
    {children}
  </div>
);
