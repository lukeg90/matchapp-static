import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <Layout title={data.site.siteMetadata.title}>
      <SEO title="Home" />
      <p>Testing static website with Gatsby and Netlify CMS</p>
      <Link to="/terms-and-conditions">Terms and conditions</Link>
    </Layout>
  )
}

export default IndexPage
