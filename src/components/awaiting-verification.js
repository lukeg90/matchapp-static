import React, { useState } from "react"

export default function AwaitingVerification({ t, verifyEmail }) {
  const [emailResent, setEmailResent] = useState(false)

  const reVerifyEmail = () => {
    verifyEmail()
    setEmailResent(true)
  }

  return (
    <div>
      <h3>{`${t("register.link-sent")}`}</h3>
      <br />
      <br />
      <br />
      <h4>{t("register.link-expired")}</h4>
      {emailResent ? (
        <h4>{t("register.link-resent")}</h4>
      ) : (
        <button className="submit-button" onClick={() => reVerifyEmail()}>
          {t("register.resend-link")}
        </button>
      )}
    </div>
  )
}
