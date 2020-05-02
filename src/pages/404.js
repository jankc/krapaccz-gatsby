import React from 'react';
import Layout from '../components/Layout';

const NotFoundPage = () => (
  <Layout>
    <div id="main">
      <section id="one">
        <h1>
          <span role="img" aria-label="Not Found">
            😢
          </span>
        </h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </section>
    </div>
  </Layout>
);

export default NotFoundPage;
