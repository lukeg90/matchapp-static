import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const PrivacyPolicy = props => {
  const title =
    props.data.allFile.edges[0].node.childMarkdownRemark.frontmatter.title
  const body =
    props.data.allFile.edges[0].node.childMarkdownRemark.internal.content
  return <Layout title={title}>{body}</Layout>
}

export default PrivacyPolicy

export const query = graphql`
  query {
    allFile(
      filter: {
        sourceInstanceName: { eq: "content" }
        name: { eq: "privacy-policy" }
      }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              title
            }
            internal {
              content
            }
          }
        }
      }
    }
  }
`
