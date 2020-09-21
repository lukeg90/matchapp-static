import React, { useState, useEffect, Suspense } from "react"
import { useTranslation } from "react-i18next"
import firebase from "gatsby-plugin-firebase"
import ClipLoader from "react-spinners/ClipLoader"

import Register from "../components/register"
import Login from "../components/login"

const Index = () => {
  const [alreadyRegistered, setAlreadyRegistered] = useState(false)
  const [db, setDb] = useState()
  const [auth, setAuth] = useState()
  const [step, setStep] = useState("")

  useEffect(() => {
    let database = firebase.firestore()
    setDb(database)
    let auth = firebase.auth()
    auth.useDeviceLanguage()
    setAuth(auth)
  }, [])

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

  const LazyCoverflow = () => {
    if (typeof window === "undefined")
      return (
        <div className="coverflow-container">
          <ClipLoader />
        </div>
      )
    const Component = React.lazy(() => import("../components/coverflow"))
    return (
      <div>
        <Suspense
          fallback={
            <div className="coverflow-container">
              <ClipLoader />
            </div>
          }
        >
          <Component />
        </Suspense>
      </div>
    )
  }

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

  const { t } = useTranslation()

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

export default Index
