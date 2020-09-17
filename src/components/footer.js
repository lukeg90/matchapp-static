import React from "react"
import { Link } from "gatsby"
import { useTranslation } from "react-i18next"

const Footer = () => {
  const { t, i18n } = useTranslation()

  return (
    <footer>
      <div className="footer-nav-container">
        <Link className="footer-nav-item" to="/terms-and-conditions">
          {t("footer.terms-and-conditions")}
        </Link>
        <Link className="footer-nav-item" to="/faq">
          {t("footer.faq")}
        </Link>
        <Link className="footer-nav-item" to="/privacy-policy">
          {t("footer.privacy-policy")}
        </Link>
      </div>
    </footer>
  )
}

export default Footer
