import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import { withTrans } from "../i18n/withTrans"
import { useTranslation } from "react-i18next"

import SEO from "../components/seo"
import "../styles/App.css"
import Register from "../components/register"
import Coverflow from "react-coverflow"
import carouselImg1 from "../images/girl/jernej-graj-8y6L01KFagQ-unsplash.jpg"
import carouselImg2 from "../images/boy/bianca-berg-zhsjOtsBFts-unsplash.jpg"
import carouselImg3 from "../images/boy/briona-baker-t-3jCN4rxhE-unsplash.jpg"
import carouselImg4 from "../images/boy/heleno-kaizer-g5esYpKf6Qw-unsplash.jpg"
import carouselImg5 from "../images/boy/james-barr-hoxXBSlYzeg-unsplash.jpg"
import carouselImg6 from "../images/girl/atikh-bana-2c0midsQKe0-unsplash.jpg"
import carouselImg7 from "../images/girl/caique-silva-Ij24Uq1sMwM-unsplash.jpg"

const Index = ({ data }) => {
  const [locale, setLocale] = useState("de")

  const { t, i18n } = useTranslation()

  const changeLocale = language => {
    i18n.changeLanguage(language)
    setLocale(language)
  }

  console.log("title: ", data.title)

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
        <img src={carouselImg1} alt="" />
        <img src={carouselImg2} alt="" />
        <img src={carouselImg6} alt="" />
        <img src={carouselImg3} alt="" />
        <img src={carouselImg4} alt="" />
        <img src={carouselImg5} alt="" />
        <img src={carouselImg7} alt="" />
      </Coverflow>
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
