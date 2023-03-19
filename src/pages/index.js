import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import { Layout, Section, WorkHistory } from '../components'

const Container = styled.div`
  width: 100%;
`;

const Index = ({data}) => (
  <Layout>
    <Container>
      {data.posts.edges.map(({ node }, i) => (
        <Section
          key={i}
          html={node.html}
          {...node.frontmatter}
        >
          {node.frontmatter.content === 'experience' && (
            <>
            <h2>Work History</h2>
            {data.experience.edges.map(({ node }, i) => (
              (<WorkHistory
                key={i}
                {...node.frontmatter}
                html={node.html}
              />)
            ))}
            </>
          )}
        </Section>
      ))}
    </Container>
  </Layout>
)

export const query = graphql`
query IndexPage {
  posts: allMarkdownRemark(filter: { frontmatter: {type: { eq: "post" } } }, sort: { fields: [frontmatter___order], order: ASC}) {
    edges {
      node {
        frontmatter {
          title
          type
          content
          color
          backcolor
        }
        html
      }
    }
  }
  experience: allMarkdownRemark(filter: { frontmatter: {type: { eq: "experience" } } }, sort: { fields: [frontmatter___timeFrom], order: DESC}) {
    edges {
      node {
        frontmatter {
          title
          company
          location
          timeFrom
          timeTo
        }
        html
      }
    }
  }
}
`;

export default Index;
