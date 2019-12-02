import React from 'react';
import Helmet from 'react-helmet';

import { graphql } from 'gatsby';

import Layout from '../components/Layout';
// import Lightbox from 'react-images'
import Galleries from '../components/Galleries';

export default ({ data }) => (
  <Layout>
    <Helmet>
      <title>{data.site.siteMetadata.title}</title>
      <meta name="description" content={data.site.siteMetadata.description} />
    </Helmet>

    <div id="main">
      {/* <section id="one">
        <header className="major">
          <h2>
            Ipsum lorem dolor aliquam ante commodo
            <br />
            magna sed accumsan arcu neque.
          </h2>
        </header>
        <p>
          Accumsan orci faucibus id eu lorem semper. Eu ac iaculis ac nunc nisi
          lorem vulputate lorem neque cubilia ac in adipiscing in curae lobortis
          tortor primis integer massa adipiscing id nisi accumsan pellentesque
          commodo blandit enim arcu non at amet id arcu magna. Accumsan orci
          faucibus id eu lorem semper nunc nisi lorem vulputate lorem neque
          cubilia.
        </p>
        <ul className="actions">
          <li>
            <a href="#" className="button">
              Learn More
            </a>
          </li>
        </ul>
      </section> */}

      <section id="one">
        <Galleries></Galleries>
      </section>
    </div>
  </Layout>
);

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
