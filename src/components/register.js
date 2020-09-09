import React, { useState, useEffect } from "react"
import { useStatefulFields } from "../hooks/useStatefulFields"
import axios from "axios"
import ReCAPTCHA from "react-google-recaptcha"

export default function Register({ language, t, i18n }) {
  const [inputValues, handleChange] = useStatefulFields()
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [step, setStep] = useState("first")
  const [humanVerified, setHumanVerified] = useState(false)

  // useEffect(() => {
  //   // when component mounts, check if there is a code in location.pathname
  //   // fetch user email using cookie
  //   if (window.location.pathname !== "/") {
  //     axios
  //       .get("/user")
  //       .then(({ data }) => {
  //         if (data.success) {
  //           console.log("Fetched user: ", data);
  //           return axios.get(`/most-recent-code/${data.email}`);
  //         }
  //       })
  //       .then(({ data }) => {
  //         console.log("Data: ", data);
  //         if (data.success) {
  //           console.log("Most recent code: ", data.code);
  //           if (`/${data.code}` === window.location.pathname) {
  //             completeRegistration();
  //           }
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("Error fetching user or getting recent code: ", err);
  //       });
  //   }
  // }, []);

  // const submitForm = (e) => {
  //   e.preventDefault();
  //   if (termsAccepted && humanVerified) {
  //     axios
  //       .post("/register", {
  //         email: inputValues.email,
  //         bundesland: inputValues.bundesland,
  //       })
  //       // if email is new, or if email is already in database but not verified, go to second step
  //       .then(({ data }) => {
  //         console.log("response data: ", data);
  //         if (data.success) {
  //           setError(false);
  //           setErrorMessage("");
  //           sendLink();
  //           setStep("second");
  //         } else {
  //           console.log("error: ", data.error);
  //           setError(true);
  //           setErrorMessage(data.error);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("Unknown registration error: ", err);
  //         setError(true);
  //         setErrorMessage("general");
  //       });
  //   }
  //   if (!humanVerified) {
  //     setError(true);
  //     setErrorMessage("not-human");
  //   }
  //   if (!termsAccepted) {
  //     setError(true);
  //     setErrorMessage("terms-not-accepted");
  //   }
  // };

  // const sendLink = () => {
  //   axios
  //     .post("/send-link", { email: inputValues.email, language })
  //     .then(({ data }) => {
  //       if (data.success) {
  //         console.log("Link sent successfully");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Error sending link: ", err);
  //     });
  // };

  // const verifyHuman = (value) => {
  //   console.log("Captcha value: ", value);
  //   axios
  //     .post("/verify-human", {
  //       captchaValue: value,
  //     })
  //     .then(({ data }) => {
  //       console.log("Verify human response data: ", data);
  //       if (data.success) {
  //         setHumanVerified(true);
  //         console.log("Human verified");
  //       } else {
  //         setError(true);
  //         setErrorMessage(data.error);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Error verifying human: ", err);
  //     });
  // };

  // const completeRegistration = () => {
  //   axios
  //     .post("/complete-registration")
  //     .then(({ data }) => {
  //       if (data.success) {
  //         setStep("third");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Error updating user after completed registration: ", err);
  //     });
  // };

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
            // onSubmit={e => submitForm(e)}
          >
            <div className="form-fields">
              <label htmlFor=""></label>
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
            {termsAccepted && (
              <ReCAPTCHA
                sitekey="6LflAcMZAAAAAFaAhmhtDEegdLUb7g4S7wOqgWbp"
                // onChange={verifyHuman}
              />
            )}
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
