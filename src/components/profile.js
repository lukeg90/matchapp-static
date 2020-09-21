import React, { useState, useEffect } from "react"
import { useStatefulFields } from "../hooks/useStatefulFields"
import firebase from "gatsby-plugin-firebase"

export default function Profile({ auth, db, t }) {
  const [reauthenticationRequired, setReauthenticationRequired] = useState(
    false
  )
  const [inputValues, handleChange] = useStatefulFields()

  // remove all user data from auth and from database
  const deleteRequest = () => {
    setReauthenticationRequired(true)
  }

  const reAuthenticate = e => {
    e.preventDefault()
    const user = auth.currentUser
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      inputValues.password
    )
    user
      .reauthenticateWithCredential(credential)
      .then(() => {
        deleteAccount()
      })
      .catch(err => {
        console.log("Unable to reauthenticate user: ", err)
      })
  }

  const deleteAccount = () => {
    if (window.confirm(t("profile.delete.are-you-sure"))) {
      db.collection("users")
        .doc(auth.currentUser.email)
        .delete()
        .then(() => {
          return auth.currentUser.delete()
        })
        .then(() => {
          console.log("User deleted from auth and database")
        })
        .catch(err => {
          console.log("Error deleting user: ", err)
        })
    }
  }
  return reauthenticationRequired ? (
    <>
      <p>{t("profile.delete.confirm-password")}</p>
      <form className="flex-container" onSubmit={e => reAuthenticate(e)}>
        <div className="form-fields">
          <input
            required
            type="password"
            name="password"
            placeholder={t("login.form.password-placeholder")}
            onChange={handleChange}
          />
          <button className="submit-button">
            {t("profile.delete.button")}
          </button>
        </div>
      </form>
    </>
  ) : (
    <>
      <h3>{t("register.success")}</h3>
      <br />
      <br />
      <br />
      <p>
        <button className="link-button" onClick={() => deleteRequest()}>
          {t("profile.delete.button")}
        </button>
        {t("profile.delete.lose-everything")}
      </p>
    </>
  )
}
