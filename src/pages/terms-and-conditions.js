import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const TermsAndConditions = props => {
  const title =
    props.data.allFile.edges[0].node.childMarkdownRemark.frontmatter.title
  const body =
    props.data.allFile.edges[0].node.childMarkdownRemark.internal.content
  return (
    <Layout title={title}>
      <p>{body}</p>
    </Layout>
  )
}

export default TermsAndConditions

export const query = graphql`
  query {
    allFile(
      filter: {
        sourceInstanceName: { eq: "content" }
        name: { eq: "terms-and-conditions" }
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
