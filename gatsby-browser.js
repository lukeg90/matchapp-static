import "firebase/auth"
import "firebase/firestore"

import React from "react"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"
export const wrapRootElement = ({ element }) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6Lec_cwZAAAAAPOAsgnS4Am-3ByyoPRbMvxueB3T">
      {element}
    </GoogleReCaptchaProvider>
  )
}
