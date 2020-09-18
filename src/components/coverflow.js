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
    <div className="coverflow-container">
      <Coverflow
        displayQuantityOfSide={3}
        navigation={false}
        enableScroll={false}
        clickable={false}
        active={0}
        infiniteScroll={true}
        currentFigureScale={1.2}
        otherFigureScale={0.9}
        media={{
          "@media (max-width: 900px)": {
            height: "auto",
          },
          "@media (min-width: 1500px)": {
            height: "400px",
          },
        }}
      >
        {data.allFile.edges.map(image => (
          <Img
            fluid={image.node.childImageSharp.fluid}
            alt=""
            key={image.node.childImageSharp.fluid}
          />
        ))}
      </Coverflow>
    </div>
  )
}
