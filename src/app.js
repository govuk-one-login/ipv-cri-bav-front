require("express");
require("express-async-errors");

const path = require("path");
const session = require("express-session");
const AWS = require("aws-sdk");
const DynamoDBStore = require("connect-dynamodb")(session);
const wizard = require("hmpo-form-wizard");
const logger = require("hmpo-logger");

const commonExpress = require("@govuk-one-login/di-ipv-cri-common-express");
const setHeaders = commonExpress.lib.headers;
const setScenarioHeaders = commonExpress.lib.scenarioHeaders;
const setAxiosDefaults = commonExpress.lib.axios;

const { setAPIConfig, setOAuthPaths } = require("./lib/settings");
const { setGTM, setLanguageToggle } = commonExpress.lib.settings; //require("@govuk-one-login/di-ipv-cri-common-express/lib/settings");
const { getGTM, getLanguageToggle } = commonExpress.lib.locals; //require("@govuk-one-login/di-ipv-cri-common-express/lib/locals");

const addLanguageParam = require("@govuk-one-login/frontend-language-toggle/build/cjs/language-param-setter.cjs");

const {
  setI18n,
} = require("@govuk-one-login/di-ipv-cri-common-express/src/lib/i18next");
const steps = require("./app/bav/steps");
const fields = require("./app/bav/fields");

const {
  API,
  APP,
  PORT,
  SESSION_SECRET,
  SESSION_TABLE_NAME,
  SESSION_TTL,
} = require("./lib/config");

const { setup } =
  require("@govuk-one-login/di-ipv-cri-common-express").bootstrap;

const loggerConfig = {
  console: true,
  consoleLevel: process.env.LOG_LEVEL || "warn",
  consoleJSON: true,
  app: false,
};

AWS.config.update({
  region: "eu-west-2",
});
const dynamodb = new AWS.DynamoDB();

const dynamoDBSessionStore = new DynamoDBStore({
  client: dynamodb,
  table: SESSION_TABLE_NAME,
});

const sessionConfig = {
  cookieName: "service_session",
  secret: SESSION_SECRET,
  cookieOptions: { maxAge: SESSION_TTL },
  ...(SESSION_TABLE_NAME && { sessionStore: dynamoDBSessionStore }),
};

const helmetConfig = require("@govuk-one-login/di-ipv-cri-common-express/src/lib/helmet");

const { app, router } = setup({
  config: { APP_ROOT: __dirname },
  port: PORT,
  logs: loggerConfig,
  session: sessionConfig,
  helmet: helmetConfig,
  redis: SESSION_TABLE_NAME ? false : commonExpress.lib.redis(),
  urls: {
    public: "/public",
  },
  publicDirs: ["../dist/public"],
  views: [
    path.resolve(
      path.dirname(
        require.resolve("@govuk-one-login/di-ipv-cri-common-express"),
      ),
      "components",
    ),
    path.resolve("node_modules/@govuk-one-login/"),
    "views",
  ],
  translation: {
    allowedLangs: ["en", "cy"],
    fallbackLang: ["en"],
    cookie: { name: "lng" },
  },
  middlewareSetupFn: (app) => {
    app.use(setHeaders);
  },
  dev: true,
});

setI18n({
  router,
  config: {
    secure: true,
    cookieDomain: APP.GTM.ANALYTICS_COOKIE_DOMAIN,
  },
});

app.get("nunjucks").addGlobal("getContext", function () {
  return {
    keys: Object.keys(this.ctx),
    ctx: this.ctx.ctx,
  };
});

setAPIConfig({
  app,
  baseUrl: API.BASE_URL,
  sessionPath: API.PATHS.SESSION,
  authorizationPath: API.PATHS.AUTHORIZATION,
});

setOAuthPaths({ app, entryPointPath: APP.PATHS.BAV });

setGTM({
  app,
  ga4ContainerId: APP.GTM.GA4_ID,
  uaContainerId: APP.GTM.UA_ID,
  analyticsCookieDomain: APP.GTM.ANALYTICS_COOKIE_DOMAIN,
  ga4Enabled: APP.GTM.GA4_ENABLED,
  uaEnabled: APP.GTM.UA_ENABLED,
  ga4PageViewEnabled: APP.GTM.GA4_PAGE_VIEW_ENABLED,
  ga4FormResponseEnabled: APP.GTM.GA4_FORM_RESPONSE_ENABLED,
  ga4FormErrorEnabled: APP.GTM.GA4_FORM_ERROR_ENABLED,
  ga4FormChangeEnabled: APP.GTM.GA4_FORM_CHANGE_ENABLED,
  ga4NavigationEnabled: APP.GTM.GA4_NAVIGATION_ENABLED,
  ga4SelectContentEnabled: APP.GTM.GA4_SELECT_CONTENT_ENABLED,
  analyticsDataSensitive: APP.GTM.ANALYTICS_DATA_SENSITIVE
});

// Common express relies on 0/1 strings
const showLanguageToggle = APP.LANGUAGE_TOGGLE_DISABLED == "true" ? "0" : "1";
setLanguageToggle({ app, showLanguageToggle: showLanguageToggle });

app.get("nunjucks").addGlobal("addLanguageParam", addLanguageParam);

router.use(getGTM);

router.use(getLanguageToggle);

router.use(setScenarioHeaders);
router.use(setAxiosDefaults);
router.use("/oauth2", commonExpress.routes.oauth2);

const wizardOptions = {
  name: "cri-bav-front",
  journeyName: "bav",
  templatePath: "bav",
};

router.use(wizard(steps, fields, wizardOptions));

router.use((err, req, res, next) => {
  logger
    .get()
    .error(
      "Error caught by Express handler - redirecting to Callback with server_error",
      { err },
    );
  const REDIRECT_URI = req.session?.authParams?.redirect_uri;
  if (REDIRECT_URI) {
    next(err);
    router.use(commonExpress.lib.errorHandling.redirectAsErrorToCallback);
  } else {
    res.redirect(APP.PATHS.ERROR);
  }
});
