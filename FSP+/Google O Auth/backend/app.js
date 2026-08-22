require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");

const app = express();
app.use(cookieParser());

const REDIRECT_URI = "http://localhost:5000/api/auth/google/callback";
const STATE_COOKIE = "oauth_state_google";

app.get("/api/auth/google", (req, res) => {
  const state = crypto.randomBytes(32).toString("hex");

  res.cookie(STATE_COOKIE, state, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 10 * 60 * 1000,
    path: "/",
  });

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: "openid email profile",
    state,
  });

  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
});

app.get("/api/auth/google/callback", async (req, res) => {
  const { code, state, error } = req.query;
  const savedState = req.cookies[STATE_COOKIE];

  res.clearCookie(STATE_COOKIE, { path: "/" });

  if (error) return res.status(400).json({ error });
  if (!state || state !== savedState) {
    return res.status(403).json({ error: "state mismatch" });
  }
  if (!code) return res.status(400).json({ error: "no code" });

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok || !tokenData.id_token) {
      return res.status(400).json({
        error: tokenData.error_description || "token exchange failed",
      });
    }

    const payload = JSON.parse(
      Buffer.from(tokenData.id_token.split(".")[1], "base64url").toString(),
    );

    if (!payload.email_verified) {
      return res.status(403).json({ error: "email not verified" });
    }

    res.json({
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "google auth failed" });
  }
});

app.listen(5000, () => console.log("http://localhost:5000"));
