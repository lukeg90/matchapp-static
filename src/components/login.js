import React, { useState } from "react"
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
          setErrorMessage("wrong-password")
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
          {t(`login.error.${errorMessage}`) || t("register.error.general")}
        </div>
      )}
    </>
  )
}
