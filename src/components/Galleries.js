import React from 'react';
import { useStaticQuery, Link, graphql } from 'gatsby';
import Img from 'gatsby-image';

export default () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: frontmatter___order }) {
        edges {
          node {
            frontmatter {
              title
              featuredPhoto {
                childImageSharp {
                  fluid(maxWidth: 370) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              path
            }
          }
        }
      }
    }
  `);
  const gals = data.allMarkdownRemark.edges.map((edge, i) => (
    <article className="6u 12u$(xsmall) work-item" key={i}>
      <Link className="image fit thumb">
        <Img
          fluid={{
            ...edge.node.frontmatter.featuredPhoto.childImageSharp.fluid,
            aspectRatio: 1.5,
          }}
        />
      </Link>
      <h3>{edge.node.frontmatter.title}</h3>
    </article>
  ));
  return <div className="row">{gals}</div>;
};
