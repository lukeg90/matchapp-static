import React, { useState } from "react"
import { useStatefulFields } from "../hooks/useStatefulFields"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import axios from "axios"

import AwaitingVerification from "./awaiting-verification"
import Profile from "./profile"

export default function Register({
  t,
  alreadyRegistered,
  auth,
  db,
  step,
  verifyEmail,
}) {
  const [inputValues, handleChange] = useStatefulFields()
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  // const [recaptchaToken, setRecaptchaToken] = useState("")

  const { executeRecaptcha } = useGoogleReCaptcha()

  // const actionCodeSettings = {
  //   url: process.env.GATSBY_CONFIRMATION_EMAIL_REDIRECT,
  //   handleCodeInApp: true,
  // }

  const submitForm = e => {
    e.preventDefault()
    setError(false)
    if (!executeRecaptcha) {
      console.log("Recaptcha was skipped")
      return
    }
    const passwordsMatch = inputValues.password === inputValues.confirmPassword
    if (termsAccepted && passwordsMatch) {
      executeRecaptcha("registration")
        .then(token => {
          console.log("Result of executing recaptcha: ", token)
          // Need to call backend firebase function for recaptcha verification here
          // will get apiString after deploying firebase function
          const apiString =
            "https://us-central1-matchapp-web.cloudfunctions.net/sendRecaptcha"
          return axios.get(`${apiString}?token=${token}`)
        })
        .then(response => {
          const score = response.data.score
          console.log("Score: ", score)
          if (score > 0.5) {
            return auth.createUserWithEmailAndPassword(
              inputValues.email,
              inputValues.password
            )
          } else {
            setError(true)
            setErrorMessage("Recaptcha failed. Try again if you're human.")
          }
        })
        .then(({ user }) => {
          console.log("User successfully created: ", user)
          // have to add a sign in component, no other option. Verification email
          // can only be sent to a signed in user.
          // Can automatically sign in user after user is created, but it's possible
          // user will leave before finishing the email verification process.
          // In this case, user needs to be able to sign in to complete the process.
          return db.collection("users").doc(inputValues.email).set({
            email: inputValues.email,
            bundesland: inputValues.bundesland,
            emailVerified: false,
          })
        })
        .then(() => {
          console.log("User successfully written to database")
          // setStep("second")
          return verifyEmail()
        })
        .catch(err => {
          console.log("Submission error: ", err)
          setError(true)
          if (err.code === "auth/email-already-in-use") {
            setErrorMessage("already-registered")
          } else if (err.code === "auth/weak-password") {
            setErrorMessage("weak-password")
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
            className="flex-container register-form-container"
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
                onBlur={handleChange}
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
              <p className="recaptcha-branding">
                This site is protected by reCAPTCHA and the Google{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noreferrer"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="https://policies.google.com/terms"
                  target="_blank"
                  rel="noreferrer"
                >
                  Terms of Service
                </a>{" "}
                apply.
              </p>
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
            <button className="submit-button">
              {t("register.form.submit")}
            </button>
          </form>
          <p>
            {t("register.toggle-login.first")}
            <button className="link-button" onClick={alreadyRegistered}>
              {t("register.toggle-login.second")}
            </button>
            {t("register.toggle-login.third")}
          </p>
        </>
      )
    } else if (step === "second") {
      return <AwaitingVerification t={t} verifyEmail={verifyEmail} />
    } else if (step === "third") {
      return <Profile db={db} auth={auth} t={t} />
    }
  }

  return (
    <>
      <div
        className={`${
          step === "second" || step === "third"
            ? "flex-container small-container"
            : "flex-container register-container"
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
