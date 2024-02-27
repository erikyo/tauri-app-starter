import ThirdPartyEmailPassword, {
  ActiveDirectory,
  Apple,
  Google,
  LinkedIn,
} from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui";
import Session from "supertokens-auth-react/recipe/session";

export function getApiDomain() {
  const apiPort = import.meta.env.API_PORT || 3001;
  const apiHost = import.meta.env.API_HOST || "127.0.0.1";
  return `https://${apiHost}:${apiPort}`;
}

export function getWebsiteDomain() {
  const websitePort = import.meta.env.APP_PORT || 3000;
  return import.meta.env.APP_DOMAIN || `http://127.0.0.1:${websitePort}`;
}

export const SuperTokensConfig = {
  appInfo: {
    appName: import.meta.env.APP_NAME,
    apiDomain: getApiDomain(),
    websiteDomain: getWebsiteDomain(),
  },
  // recipeList contains all the modules that you want to
  // use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
  recipeList: [
    ThirdPartyEmailPassword.init({
      signInAndUpFeature: {
        providers: [
          ActiveDirectory.init(),
          LinkedIn.init(),
          Google.init(),
          Apple.init(),
        ],
      },
    }),
    Session.init(),
  ],
};

export const PreBuiltUIList = [ThirdPartyEmailPasswordPreBuiltUI];
