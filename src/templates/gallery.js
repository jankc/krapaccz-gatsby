import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Masonry from 'react-masonry-css';

import Layout from '../components/layout';
export default ({ data }) => {
  const galleryMd = data.markdownRemark;
  const galleryImages = data.images;
  return (
    <Layout>
      <div id="main">
        <section id="one">
          <div>
            <h1>{galleryMd.frontmatter.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: galleryMd.html }} />
            <Masonry
              breakpointCols={2}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {galleryImages &&
                galleryImages.edges.map(({ node }) => (
                  <div>
                    <a className="image fit thumb">
                      <Img fluid={node.childImageSharp.fluid} />
                    </a>
                    {/* {node.name} */}
                  </div>
                ))}
            </Masonry>
          </div>
        </section>
      </div>
    </Layout>
  );
};
export const query = graphql`
  query($slug: String!, $imageFolder: String!) {
    # query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
    images: allFile(
      filter: { relativeDirectory: { eq: $imageFolder } }
      sort: { fields: name, order: ASC }
    ) {
      edges {
        node {
          internal {
            type
          }
          relativeDirectory
          relativePath
          name
          childImageSharp {
            fluid(maxWidth: 370) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
