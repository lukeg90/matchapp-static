import React from "react"
import Coverflow from "react-coverflow"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

export default () => {
  const data = useStaticQuery(graphql`
    query imageQuery {
      allFile(
        filter: {
          extension: { regex: "/(jpg)/" }
          relativeDirectory: { eq: "coverflow" }
        }
      ) {
        edges {
          node {
            base
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)
  return (
    typeof window !== "undefined" && (
      <Coverflow
        height="400"
        displayQuantityOfSide={3}
        navigation={false}
        enableScroll={false}
        clickable={false}
        active={0}
        infiniteScroll={true}
        media={{
          "@media (max-width: 900px)": {
            height: "10em",
          },
        }}
      >
        {data.allFile.edges.map(image => (
          <Img fluid={image.node.childImageSharp.fluid} alt="" />
        ))}
      </Coverflow>
    )
  )
}
