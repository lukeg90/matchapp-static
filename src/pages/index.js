import React, { useState, Suspense } from "react"
import { Link, graphql } from "gatsby"
import { withTrans } from "../i18n/withTrans"
import { useTranslation } from "react-i18next"

import SEO from "../components/seo"
import "../styles/App.css"
import Register from "../components/register"

const Index = ({ data }) => {
  const [locale, setLocale] = useState("de")

  const { t, i18n } = useTranslation()

  const changeLocale = language => {
    i18n.changeLanguage(language)
    setLocale(language)
  }

  const LazyCoverflow = () => {
    if (typeof window === "undefined") return <span>Loading...</span>
    const Component = React.lazy(() => import("../components/coverflow"))
    return (
      <>
        <Suspense fallback={<span>Loading...</span>}>
          <Component />
        </Suspense>
      </>
    )
  }

  return (
    // <SEO title="Home" />

    <div className="App">
      <span className="language-select">
        <button
          className={`locale-button ${locale === "de" ? "active" : "inactive"}`}
          onClick={() => changeLocale("de")}
        >
          DE
        </button>{" "}
        |{" "}
        <button
          className={`locale-button ${locale === "en" ? "active" : "inactive"}`}
          onClick={() => changeLocale("en")}
        >
          EN
        </button>
      </span>
      <div className="flex-container title-container">
        <h1 className="title">{data.site.siteMetadata.title}</h1>
        <h2 className="subtitle">Swipe them into your bed!</h2>
      </div>
      <LazyCoverflow />
      <Register language={locale} t={t} />
      <Link to="/terms-and-conditions">Terms and conditions</Link>
      <br />
      <Link to="/faq">Frequently Asked Questions</Link>
      <br />
      <Link to="/privacy-policy">Privacy Policy</Link>
      <br />
    </div>
  )
}

export default withTrans(Index)

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
