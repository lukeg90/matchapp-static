import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const PrivacyPolicy = ({ data }) => {
  const title = data.allMarkdownRemark.edges[0].node.frontmatter.title
  const body = data.allMarkdownRemark.edges[0].node.html
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  )
}

export default PrivacyPolicy

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/privacy-policy.md/" } }
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
