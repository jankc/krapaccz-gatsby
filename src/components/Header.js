import React from 'react';

import Footer from './Footer';
import avatar from '../assets/images/avatar.jpg';
import { Link } from 'gatsby';

export default () => (
  <header id="header">
    <div className="inner">
      <Link to="/">
        {/* <a href="#" className="image avatar">
          <img src={avatar} alt="" />
        </a> */}
        <h1>
          <strong>Jan Krapáč</strong>
        </h1>
      </Link>
    </div>
    <Footer />
  </header>
);
