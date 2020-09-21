import React, { useState } from "react"
import { useStatefulFields } from "../hooks/useStatefulFields"

import AwaitingVerification from "./awaiting-verification"
import Profile from "./profile"

export default function Login({
  notRegistered,
  auth,
  db,
  t,
  step,
  forgotPassword,
  verifyEmail,
}) {
  const [inputValues, handleChange] = useStatefulFields()
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [resetEmailSent, setResetEmailSent] = useState(false)

  const submitLogin = e => {
    setError(false)
    e.preventDefault()
    auth
      .signInWithEmailAndPassword(inputValues.email, inputValues.password)
      .then(() => {
        console.log("User logged in successfully")
      })
      .catch(err => {
        setError(true)
        console.log("Error logging in: ", err)
        if (
          err.code === "auth/wrong-password" ||
          err.code === "auth/user-not-found"
        ) {
          setErrorMessage("user-not-found")
        }
      })
  }

  const passwordReset = e => {
    setError(false)
    e.preventDefault()
    const actionCodeSettings = {
      url: process.env.GATSBY_SITE_URL,
      handleCodeInApp: false,
    }
    auth
      .sendPasswordResetEmail(inputValues.passwordReset, actionCodeSettings)
      .then(() => {
        console.log("Password reset email sent")
        setResetEmailSent(true)
      })
      .catch(err => {
        setError(true)
        console.log("Error sending password reset email: ", err)
        if (err.code === "auth/user-not-found") {
          setErrorMessage("user-not-exist")
        } else {
          setErrorMessage("general")
        }
      })
  }

  const getCurrentDisplay = () => {
    if (step === "first") {
      return (
        <>
          <form
            className="flex-container login-form-container"
            onSubmit={e => submitLogin(e)}
          >
            <div className="form-fields">
              <input
                required
                name="email"
                id="email"
                type="email"
                placeholder={t("login.form.email-placeholder")}
                onChange={handleChange}
              />
              <input
                required
                name="password"
                id="password"
                type="password"
                placeholder={t("login.form.password-placeholder")}
                onChange={handleChange}
              />
            </div>
            <button className="submit-button">{t("login.form.submit")}</button>
          </form>
          <p>
            {t("login.toggle-register.first")}
            <button className="link-button" onClick={notRegistered}>
              {t("login.toggle-register.second")}
            </button>
            {t("login.toggle-register.third")}
          </p>
          <button className="link-button" onClick={() => forgotPassword()}>
            {t("login.reset.forgot-password")}
          </button>
        </>
      )
    } else if (step === "second") {
      return <AwaitingVerification t={t} verifyEmail={verifyEmail} />
    } else if (step === "third") {
      return <Profile auth={auth} db={db} t={t} />
    } else if (step === "forgot-password") {
      return (
        <>
          {resetEmailSent ? (
            <h4>{t("login.reset.sent")}</h4>
          ) : (
            // TODO: add button to resend
            <form
              className="flex-container login-form-container"
              onSubmit={e => passwordReset(e)}
            >
              <p>{t("login.reset.reset-password")}</p>
              <div className="form-fields">
                <input
                  required
                  type="email"
                  name="passwordReset"
                  id="passwordReset"
                  placeholder={t("login.form.email-placeholder")}
                  onChange={handleChange}
                />
                <button className="submit-button">
                  {t("login.reset.send")}
                </button>
              </div>
            </form>
          )}
        </>
      )
    }
  }

  return (
    <>
      <div
        className={`${
          step === "second" || step === "third"
            ? "flex-container small-container"
            : "flex-container login-container"
        }`}
      >
        <div>{getCurrentDisplay()}</div>
      </div>
      {error && (
        <div className="error">
          {t(`login.error.${errorMessage}`) || t("register.error.general")}
        </div>
      )}
    </>
  )
}
