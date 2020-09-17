import React from "react"
import { Link } from "gatsby"

const Footer = () => {
  return (
    <footer>
      <div className="footer-nav-container">
        <Link className="footer-nav-item" to="/terms-and-conditions">
          Terms and conditions
        </Link>
        <Link className="footer-nav-item" to="/faq">
          Frequently Asked Questions
        </Link>
        <Link className="footer-nav-item" to="/privacy-policy">
          Privacy Policy
        </Link>
      </div>
    </footer>
  )
}

export default Footer
