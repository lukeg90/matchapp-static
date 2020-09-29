import React, { useState } from "react"
import { Link } from "gatsby"
import { useTranslation } from "react-i18next"

export default function Footer() {
  const [locale, setLocale] = useState("de")

  const { t, i18n } = useTranslation()

  const changeLocale = language => {
    i18n.changeLanguage(language)
    setLocale(language)
  }

  return (
    <footer>
      <div className="footer-nav-container">
        <Link to="/terms-and-conditions" className="footer-nav-item">
          {t("footer.terms-and-conditions")}
        </Link>
        {/* <Link to="/faq" className="footer-nav-item">
          {t("footer.faq")}
        </Link> */}
        <Link to="/privacy-policy" className="footer-nav-item">
          {t("footer.privacy-policy")}
        </Link>
        {/* {user && (
          <button
            className="logout menu-button link-button"
            onClick={() => logout()}
          >
            {t("header.logout")}
          </button>
        )} */}
        <Link to="/" className="footer-nav-item">
          Impressum
        </Link>

        <span className="language-select">
          <button
            className={`locale-button ${
              locale === "en" ? "active" : "inactive"
            }`}
            onClick={() => changeLocale("en")}
          >
            EN
          </button>
          |
          <button
            className={`locale-button ${
              locale === "de" ? "active" : "inactive"
            }`}
            onClick={() => changeLocale("de")}
          >
            DE
          </button>
        </span>
      </div>
    </footer>
  )
}
