import React, { useState, useEffect } from "react"
import { useStatefulFields } from "../hooks/useStatefulFields"

export default function Login({ notRegistered, auth, db, t, step }) {
  const [inputValues, handleChange] = useStatefulFields()
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

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
        if (err.code === "auth/wrong-password") {
          setErrorMessage("Password is incorrect.")
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
                placeholder={t("register.form.email-placeholder")}
                onChange={handleChange}
              />
              <input
                required
                name="password"
                id="password"
                type="password"
                placeholder={t("register.form.password-placeholder")}
                onChange={handleChange}
              />
            </div>
            <button className="submit-button">Login</button>
          </form>
          <p>
            Not yet registered? Click
            <button className="link-button" onClick={notRegistered}>
              here
            </button>
            to sign up
          </p>
        </>
      )
    } else if (step === "second") {
      return <h3>{t("register.link-sent")}</h3>
    } else if (step === "third") {
      return <h3>{t("register.success")}</h3>
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
          {t(`register.error.${errorMessage}`) || t("register.error.general")}
        </div>
      )}
    </>
  )
}
