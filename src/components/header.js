import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useTranslation } from "react-i18next"
import { Link } from "gatsby"
import firebase from "gatsby-plugin-firebase"
import { slide as Menu } from "react-burger-menu"

const Header = ({ title }) => {
  const [locale, setLocale] = useState("de")
  const [auth, setAuth] = useState()
  const [user, setUser] = useState(false)
  const { t, i18n } = useTranslation()

  const changeLocale = language => {
    i18n.changeLanguage(language)
    setLocale(language)
  }

  useEffect(() => {
    let auth = firebase.auth()
    setAuth(auth)
    auth.onAuthStateChanged(user => {
      if (user) {
        setUser(true)
      } else {
        setUser(false)
      }
    })
  }, [])

  const logout = () => {
    auth
      .signOut()
      .then(() => {
        // state does not reset unless window is reloaded
        window.location.reload()
        console.log("Log out successful")
        // navigate("/")
      })
      .catch(err => {
        console.log("Error logging out: ", err)
      })
  }

  return (
    <header>
      <Menu noOverlay></Menu>
      <div className="title-container">
        <Link to="/" className="header-nav-item">
          <h1 className="title">{title}</h1>
        </Link>
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
