import React, { useState, useEffect } from "react"
import { useStatefulFields } from "../hooks/useStatefulFields"
import ReCAPTCHA from "react-google-recaptcha"
import firebase from "gatsby-plugin-firebase"

export default function Register({ t }) {
  const [inputValues, handleChange] = useStatefulFields()
  const [termsAccepted, setTermsAccepted] = useState(false)
  // const [humanVerified, setHumanVerified] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [step, setStep] = useState("first")
  const [db, setDb] = useState()
  const [auth, setAuth] = useState()

  useEffect(() => {
    let database = firebase.firestore()
    setDb(database)
    let auth = firebase.auth()
    setAuth(auth)
  }, [])

  // const actionCodeSettings = {
  //   url: process.env.GATSBY_CONFIRMATION_EMAIL_REDIRECT,
  //   handleCodeInApp: true,
  // }

  const submitForm = e => {
    e.preventDefault()
    const passwordsMatch = inputValues.password === inputValues.confirmPassword
    if (termsAccepted && passwordsMatch) {
      auth
        .createUserWithEmailAndPassword(inputValues.email, inputValues.password)
        .then(({ user }) => {
          console.log("User successfully created: ", user)
          // have to add a sign in component, no other option. Verification email
          // can only be sent to a signed in user.
          // Can automatically sign in user after user is created, but it's possible
          // user will leave before finishing the email verification process.
          // In this case, user needs to be able to sign in to complete the process.

          setStep("second")
          // add user to database
        })
        .catch(err => {
          setError(true)
          if (err.code === "auth/email-already-in-use") {
            setErrorMessage("already-registered")
          } else {
            setErrorMessage("general")
          }
        })
    } else if (!termsAccepted) {
      setError(true)
      setErrorMessage("terms-not-accepted")
    } else if (!passwordsMatch) {
      setError(true)
      setErrorMessage("passwords-not-match")
    }
  }

  const getCurrentDisplay = () => {
    if (step === "first") {
      return (
        <>
          <h3>
            {t("register.hook.exclusive")}
            <br />
            <br /> {t("register.hook.offer")}
          </h3>
          <form
            className="flex-container form-container"
            onSubmit={e => submitForm(e)}
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
              <select
                name="bundesland"
                id="bundesland"
                required
                onChange={handleChange}
              >
                <option className="placeholder" value="">
                  {t("register.form.bundesland-select")}
                </option>
                <option value="Baden-Württemberg">Baden-Württemberg</option>
                <option value="Bayern">Bayern</option>
                <option value="Berlin">Berlin</option>
                <option value="Brandenburg">Brandenburg</option>
                <option value="Bremen">Bremen</option>
                <option value="Hamburg">Hamburg</option>
                <option value="Hessen">Hessen</option>
                <option value="Mecklenburg-Vorpommern">
                  Mecklenburg-Vorpommern
                </option>
                <option value="Niedersachsen">Niedersachsen</option>
                <option value="Nordrhein-Westfalen">Nordrhein-Westfalen</option>
                <option value="Rheinland-Pfalz">Rheinland-Pfalz</option>
                <option value="Saarland">Saarland</option>
                <option value="Sachsen">Sachsen</option>
                <option value="Sachsen-Anhalt">Sachsen-Anhalt</option>
                <option value="Schleswig-Holstein">Schleswig-Holstein</option>
                <option value="Thüringen">Thüringen</option>
              </select>
              <input
                required
                name="password"
                id="password"
                type="password"
                placeholder={t("register.form.password-placeholder")}
                onChange={handleChange}
              />
              <input
                required
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                placeholder={t("register.form.password-confirm-placeholder")}
                onChange={handleChange}
              />
            </div>
            <label htmlFor="termsAccepted" className="form-field">
              <input
                name="termsAccepted"
                id="termsAccepted"
                type="checkbox"
                onClick={() => setTermsAccepted(!termsAccepted)}
              />
              {t("register.form.accept-terms")}
            </label>
            {/* {termsAccepted && (
              <ReCAPTCHA
                sitekey="6LflAcMZAAAAAFaAhmhtDEegdLUb7g4S7wOqgWbp"
                onChange={verifyHuman}
              />
            )} */}
            <button className="submit-button">
              {t("register.form.submit")}
            </button>
          </form>
        </>
      )
    } else if (step === "second") {
      return <h3>{t("register.link-sent")}</h3>
    } else if (step === "third") {
      return <h1 className="subtitle">{t("register.success")}</h1>
    }
  }

  return (
    <div
      className={`${
        step === "second" || step === "third"
          ? "flex-container small-container"
          : "flex-container main-container"
      }`}
    >
      <h1 className="subtitle">{t("register.hook.title")}</h1>
      <div>{getCurrentDisplay()}</div>
      {error && (
        <div className="error">
          {t(`register.error.${errorMessage}`) || t("register.error.general")}
        </div>
      )}
    </div>
  )
}
