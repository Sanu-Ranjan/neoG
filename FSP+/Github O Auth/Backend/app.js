const express = require("express");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const { log } = require("console");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/api/auth/github", (req, res) => {
  const state = crypto.randomBytes(16).toString("hex");
  res.cookie("oauth_state", state, {
    sameSite: "lax",
    httpOnly: true,
    maxAge: 600000,
    path: "/",
  });

  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: "http://localhost:5000/api/auth/github/callback",
    scope: "user:email",
    state: state,
  });

  const redirectURL = `https://github.com/login/oauth/authorize?${params.toString()}`;

  res.redirect(redirectURL);
});

app.get("/api/auth/github/callback", async (req, res) => {
  const { code, state, error } = req.query;

  if (error) return res.redirect("http://localhost:5173");

  const savedState = req.cookies.oauth_state;
  if (!savedState || !state || state !== savedState) {
    return res.status(400).json({ message: "Invalid state" });
  }

  res.clearCookie("oauth_state", { path: "/" });

  if (!code) return res.status(400).json({ message: "No code" });

  try {
    const tokenRes = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: "http://localhost:5000/api/auth/github/callback",
        }),
      },
    );

    const data = await tokenRes.json();

    if (data.error) {
      return res
        .status(400)
        .json({ message: data.error_description || data.error });
    }

    const accessToken = data.access_token;

    const ghHeaders = {
      Authorization: `Bearer ${accessToken}`,
      "User-Agent": "taskdesk",
      Accept: "application/vnd.github+json",
    };

    const [userRes, emailRes] = await Promise.all([
      fetch("https://api.github.com/user", { headers: ghHeaders }),
      fetch("https://api.github.com/user/emails", { headers: ghHeaders }),
    ]);

    if (!userRes.ok || !emailRes.ok) {
      return res
        .status(400)
        .json({ message: "Failed to fetch GitHub profile" });
    }

    const profile = await userRes.json();
    const emails = await emailRes.json();

    const primary = emails.find((e) => e.primary && e.verified);

    if (!primary) {
      return res
        .status(400)
        .json({ message: "No verified primary email on GitHub" });
    }

    return res.json({
      githubId: profile.id,
      login: profile.login,
      name: profile.name,
      avatar: profile.avatar_url,
      email: primary.email,
    });
  } catch (err) {
    return res.status(500).json({ message: "Token exchange failed" });
  }
});

app.listen(5000, () => {
  log("listening on port: 5000");
});
