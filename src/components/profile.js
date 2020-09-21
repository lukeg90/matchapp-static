import React from "react"

export default function Profile({ auth, db, t }) {
  // remove all user data from auth and from database
  const deleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? You will lose access to all pre-registration benefits."
      )
    ) {
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
  return (
    <>
      <h3>{t("register.success")}</h3>
      <br />
      <br />
      <br />
      <p>
        <button className="link-button" onClick={() => deleteAccount()}>
          Delete account
        </button>
        to opt out of pre-registration benefits
      </p>
    </>
  )
}
