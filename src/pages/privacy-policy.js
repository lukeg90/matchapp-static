import React from "react"
import { graphql } from "gatsby"

const PrivacyPolicy = ({ data }) => {
  const title = data.allMarkdownRemark.edges[0].node.frontmatter.title
  const body = data.allMarkdownRemark.edges[0].node.html
  return (
    <div className="indent-text">
      <h2 className="subtitle">{title}</h2>
      <br />
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </div>
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
