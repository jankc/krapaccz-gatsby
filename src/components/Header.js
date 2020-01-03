import React from 'react';

import Footer from './Footer';
import { Link } from 'gatsby';

export default () => (
  <header id="header">
    <div className="inner">
      <Link to="/">
        <h1>
          <strong>Jan Krapáč</strong>
        </h1>
      </Link>
    </div>
    <Footer />
  </header>
);
