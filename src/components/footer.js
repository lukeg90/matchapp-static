import React from "react"
import { Link } from "gatsby"

const Footer = () => {
  return (
    <footer>
      <Link to="/terms-and-conditions">Terms and conditions</Link>
      <br />
      <Link to="/faq">Frequently Asked Questions</Link>
      <br />
      <Link to="/privacy-policy">Privacy Policy</Link>
      <br />
    </footer>
  )
}

export default Footer
