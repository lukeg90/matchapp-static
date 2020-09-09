import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const TermsAndConditions = ({ data }) => {
  const title = data.allMarkdownRemark.edges[0].node.frontmatter.title
  const body = data.allMarkdownRemark.edges[0].node.html
  return (
    <Layout title={title}>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </Layout>
  )
}

export default TermsAndConditions

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/terms-and-conditions.md/" } }
    ) {
      edges {
        node {
          html
          frontmatter {
            title
          }
        }
      }
    }
  }
`
