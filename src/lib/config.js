require("dotenv").config();

module.exports = {
  API: {
    BASE_URL: process.env.API_BASE_URL || "http://localhost:8090",
    PATHS: {
      SESSION: "/session",
      AUTHORIZATION: "/authorization",
      ABORT: "/abort",
    },
  },
  APP: {
    BASE_URL: process.env.EXTERNAL_WEBSITE_HOST || "http://localhost:8000",
    PATHS: {
      BAV: "/",
      LANDING_PAGE: "/prove-identity-bank-account",
      ACCOUNT_DETAILS: "/enter-account-details",
      CONFIRM_DETAILS: "/confirm-details",
      ABORT: "/abort",
      CANNOT_PROCEED: "/cannot-proceed",
      FAIL: "/fail",
      DONE: "/done",
    },
    ANALYTICS: {
      DOMAIN: process.env.ANALYTICS_DOMAIN || "localhost",
    },
  },
  PORT: process.env.PORT || 5040,
  SESSION_SECRET: process.env.SESSION_SECRET,
  SESSION_TABLE_NAME: process.env.SESSION_TABLE_NAME,
  SESSION_TTL: process.env.SESSION_TTL || 7200000, // two hours in ms
  REDIS: {
    SESSION_URL: process.env.REDIS_SESSION_URL,
    PORT: process.env.REDIS_PORT || 6379,
  },
};
