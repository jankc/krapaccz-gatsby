import React from 'react';
import { useStaticQuery, Link, graphql } from 'gatsby';
import Img from 'gatsby-image';

export default () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: frontmatter___order }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              featuredPhoto {
                childImageSharp {
                  fluid(maxWidth: 700) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
  const gals = data.allMarkdownRemark.edges.map(({ node }, i) => (
    <article className="6u 12u$(xsmall) work-item" key={i}>
      <Link className="image fit thumb" to={node.fields.slug}>
        <Img
          fluid={{
            ...node.frontmatter.featuredPhoto.childImageSharp.fluid,
            aspectRatio: 1.5,
          }}
        />
      </Link>
      <h3>{node.frontmatter.title}</h3>
    </article>
  ));
  return <div className="row">{gals}</div>;
};
