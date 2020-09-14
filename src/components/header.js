import React, { useState } from "react"
import PropTypes from "prop-types"
import { useTranslation } from "react-i18next"

const Header = ({ data, title }) => {
  const [locale, setLocale] = useState("de")
  const { t, i18n } = useTranslation()

  const changeLocale = language => {
    i18n.changeLanguage(language)
    setLocale(language)
  }

  return (
    <header>
      <span className="language-select">
        <button
          className={`locale-button ${locale === "de" ? "active" : "inactive"}`}
          onClick={() => changeLocale("de")}
        >
          DE
        </button>
        |
        <button
          className={`locale-button ${locale === "en" ? "active" : "inactive"}`}
          onClick={() => changeLocale("en")}
        >
          EN
        </button>
      </span>
      <div className="flex-container title-container">
        <h1 className="title">{title}</h1>
        <h2 className="subtitle">Swipe them into your bed!</h2>
      </div>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string,
}

Header.defaultProps = {
  title: ``,
}

export default Header
