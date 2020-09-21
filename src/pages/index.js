import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import firebase from "gatsby-plugin-firebase"

import Register from "../components/register"
import Login from "../components/login"
import LazyCoverflow from "../components/lazy-coverflow"

export default function Index() {
  const [alreadyRegistered, setAlreadyRegistered] = useState(false)
  const [db, setDb] = useState()
  const [auth, setAuth] = useState()
  const [step, setStep] = useState("")

  const { t } = useTranslation()

  // Initialize firebase auth and database
  useEffect(() => {
    let database = firebase.firestore()
    setDb(database)
    let auth = firebase.auth()
    auth.useDeviceLanguage()
    setAuth(auth)
  }, [])

  // Watch for changes in auth. If user not logged in, render login/registration form.
  // If user is logged in but email not verified, render second option. If user logged in and
  // email verified, render third option (profile)
  useEffect(() => {
    if (auth) {
      auth.onAuthStateChanged(user => {
        if (user) {
          if (user.emailVerified) {
            db.collection("users")
              .doc(user.email)
              .update({
                emailVerified: true,
              })
              .then(() => {
                console.log("Document updated successfully")
              })
              .catch(err => {
                console.log("Error updating document: ", err)
              })
            setStep("third")
          } else {
            setStep("second")
          }
        } else {
          setStep("first")
        }
      })
    }
  }, [auth, db])

  const verifyEmail = () => {
    auth.currentUser
      .sendEmailVerification({
        url: process.env.GATSBY_SITE_URL,
      })
      .then(() => {
        console.log("Verification email sent")
      })
      .catch(err => {
        console.log("Error sending verification email: ", err)
      })
  }

  return (
    // <SEO title="Home" />
    <div className="App">
      <LazyCoverflow />
      <h1 className="subtitle hook">{t("register.hook.title")}</h1>
      {alreadyRegistered ? (
        <Login
          t={t}
          auth={auth}
          db={db}
          step={step}
          forgotPassword={() => setStep("forgot-password")}
          notRegistered={() => setAlreadyRegistered(false)}
          verifyEmail={() => verifyEmail()}
        />
      ) : (
        <Register
          t={t}
          auth={auth}
          db={db}
          step={step}
          alreadyRegistered={() => setAlreadyRegistered(true)}
          verifyEmail={() => verifyEmail()}
        />
      )}
    </div>
  )
}
