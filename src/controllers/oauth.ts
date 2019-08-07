import express from "express"
const router = express.Router()
import axios from "axios"
import IUser from "./../interfaces/IUser"

const getStravaTokens = async (code: string): Promise<any> => {
  const url = "https://www.strava.com/oauth/token"

  const params = {
    client_id: process.env.STRAVA_CLIENT_ID,
    client_secret: process.env.STRAVA_CLIENT_SECRET,
    code,
    grant_type: "authorization_code"
  }
  const response = await axios.post(url, params)
  return response.data
}

router.get("/authCode/:userId", async (request, response) => {
  const code = request.query.code
  const devFrontServer = process.env.DEV_FRONT_SERVER_URL
  const redirectUrl = devFrontServer ? devFrontServer : "/"
  const tokens = await getStravaTokens(code)
  console.log("tokens", tokens)
  const user = getUser(tokens)
  console.log("Strava user", user)
  console.log("Redirecting")
  response.redirect(redirectUrl)
})

router.get("/redirectUrl", (request, response) => {
  console.log("Got request for redirectUrl")
  const MOCK_USER_ID = 1234567
  const url = `${process.env.SERVER_URL}:${process.env.PORT}`
    + `/api/oauth/authCode/${MOCK_USER_ID}`
  response.send(url)
})

const getUser = (stravaTokenResponse: any): IUser => {
  return {
    name: stravaTokenResponse.athlete.firstname,
    stravaAccessToken: stravaTokenResponse.access_token,
    stravaRefreshToken: stravaTokenResponse.refresh_token,
    username: stravaTokenResponse.athlete.username
  }
}
export default router
