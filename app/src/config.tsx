import ThirdPartyEmailPassword, {
  Google,
  LinkedIn,
  Apple,
  ActiveDirectory,
} from "supertokens-auth-react/recipe/thirdpartyemailpassword";
import { ThirdPartyEmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/thirdpartyemailpassword/prebuiltui";
import Session from "supertokens-auth-react/recipe/session";

export function getApiDomain() {
  const apiPort = import.meta.env.VITE_APP_API_PORT || 3001;
  const apiUrl =
    import.meta.env.VITE_APP_API_URL || `http://localhost:${apiPort}`;
  return apiUrl;
}

export function getWebsiteDomain() {
  const websitePort = import.meta.env.VITE_APP_WEBSITE_PORT || 3000;
  const websiteUrl =
    import.meta.env.VITE_APP_WEBSITE_URL || `http://localhost:${websitePort}`;
  return websiteUrl;
}

export const SuperTokensConfig = {
  appInfo: {
    appName: import.meta.env.SUPERTOKENS_APPNAME || "Demo App", // TODO: LOAD ENV VARS
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
