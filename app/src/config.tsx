import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import {
	Facebook,
	Apple,
	Google,
	LinkedIn,
} from "supertokens-auth-react/recipe/thirdparty";
import ThirdParty from "supertokens-auth-react/recipe/thirdparty";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import type { PreBuiltRecipes } from "supertokens-auth-react/lib/build/ui/types";

export function getApiDomain() {
	return import.meta.env.API_DOMAIN || "http://127.0.0.1:3001";
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
        apiBasePath: "/auth",
        websiteBasePath: "/auth",
	},
	// recipeList contains all the modules that you want to
	// use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
	recipeList: [
		ThirdParty.init({
			signInAndUpFeature: {
				providers: [
					Facebook.init(),
					LinkedIn.init(),
					Google.init(),
					Apple.init(),
				],
			},
		}),
		EmailPassword.init(),
		Session.init(),
	],
};

export const PreBuiltUIList: PreBuiltRecipes = [
    ThirdPartyPreBuiltUI,
    EmailPasswordPreBuiltUI,
];
