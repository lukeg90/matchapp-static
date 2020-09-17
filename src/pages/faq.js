import React from "react"
import { graphql } from "gatsby"

import QAndA from "../components/qanda"

// import SEO from "../components/seo"

const Faq = props => {
  const data = props.data.allFile.edges[0].node.childMarkdownRemark.frontmatter
  return (
    <div className="faq-container">
      <h2 className="subtitle" style={{ marginLeft: "20px" }}>
        {data.title}
      </h2>
      <br />
      {data.qanda.length > 0 &&
        data.qanda.map(item => (
          <QAndA question={item.question} answer={item.answer} />
        ))}
    </div>
  )
}

export default Faq

export const query = graphql`
  query {
    allFile(
      filter: {
        sourceInstanceName: { eq: "content" }
        name: { eq: "frequently-asked-questions" }
      }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              title
              qanda {
                question
                answer
              }
            }
          }
        }
      }
    }
  }
`
