import React, { useState } from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Masonry from 'react-masonry-css';
import Carousel, { Modal, ModalGateway } from 'react-images';

import Layout from '../components/layout';
export default ({ data }) => {
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const galleryMd = data.markdownRemark;
  const images = data.images.edges;
  const carouselSrc = images.map(({ node }) => ({
    src: node.childImageSharp.fluid.src,
  }));

  const toggleLightbox = selectIndex => {
    setLightboxIsOpen(!lightboxIsOpen);
    setSelectedIndex(selectIndex);
  };

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
              {images &&
                images.map(({ node }, i) => (
                  <div key={i}>
                    <a
                      className="image fit thumb"
                      onClick={e => toggleLightbox(i)}
                    >
                      <Img fluid={node.childImageSharp.fluid} />
                    </a>
                    {/* {node.childImageSharp.fluid.src} */}
                  </div>
                ))}
            </Masonry>
          </div>
        </section>
        <ModalGateway>
          {lightboxIsOpen && (
            <Modal onClose={toggleLightbox}>
              <Carousel currentIndex={selectedIndex} views={carouselSrc} />
            </Modal>
          )}
        </ModalGateway>
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
          childImageSharp {
            fluid(maxWidth: 700) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
