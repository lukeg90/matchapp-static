const functions = require("firebase-functions")
const axios = require("axios")

exports.sendRecaptcha = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", functions.config().prod.url)

  const secret = functions.config().recaptcha.secret
  const token = req.query.token

  const { data } = await axios.get(
    `https://recaptcha.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`
  )

  if (data.success) {
    return res.status(200).send({ score: data.score })
  } else {
    return res.status(500)
  }
})
