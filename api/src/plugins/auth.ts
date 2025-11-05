import cors from "@fastify/cors";
import formDataPlugin from "@fastify/formbody";
import helmet from "@fastify/helmet";
import fastifyPlugin from "fastify-plugin";

import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session/index.js";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import UserMetadata from "supertokens-node/recipe/usermetadata/index.js";
import UserRoles from "supertokens-node/recipe/userroles/index.js";
import Dashboard from "supertokens-node/recipe/dashboard/index.js";

import ThirdParty from "supertokens-node/recipe/thirdparty/index.js";
import type { TypeInput } from "supertokens-node/types";

import {
	errorHandler,
	plugin,
} from "supertokens-node/framework/fastify/index.js";

async function auth(server, options) {
	const recipes = [
        EmailPassword.init(),
		ThirdParty.init({
			signInAndUpFeature: {
				// We have provided you with development keys which you can use for testing.
				// IMPORTANT: Please replace them with your own OAuth keys for production use.
				providers: [
					{
						config: {
							thirdPartyId: "google",
							clients: [
								{
									clientId:
										"1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
									clientSecret: "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",
								},
							],
						},
					},
					{
						config: {
							thirdPartyId: "facebook",
							clients: [
								{
									clientId: "TODO",
									clientSecret: "TODO",
								},
							],
						},
					},
					{
						config: {
							thirdPartyId: "apple",
							clients: [
								{
									clientId: "4398792-io.supertokens.example.service",
									additionalConfig: {
										keyId: "7M48Y4RYDL",
										privateKey:
											"-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----",
										teamId: "YWQCXGJRJL",
									},
								},
							],
						},
					},
				],
			},
		}),
		// The session module (mandatory)
		Session.init({
			exposeAccessTokenToFrontendInCookieBasedAuth: true,
		}),
		// Store data about each user
		UserMetadata.init(),
		// Enable user roles
		UserRoles.init(),
		// Enables a dashboard to manage users
		Dashboard.init(),
	];

	const config = {
		framework: "fastify",
		supertokens: {
			// These are the connection details of the app you created on supertokens.com
			connectionURI:
				["docker", "development"].includes(process.env.NODE_ENV) ||
				typeof process.env.NODE_ENV === "undefined"
					? "http://supertokens:3567"
					: server.config.SUPERTOKENS_CONNECTION_URI,
			apiKey: server.config.SUPERTOKENS_API_KEY,
		},
		appInfo: {
			// learn more about this on https://supertokens.com/docs/session/appinfo
			appName: server.config.APP_NAME,
			apiDomain: server.config.API_DOMAIN,
			websiteDomain: server.config.APP_DOMAIN,
			apiBasePath: server.config.SUPERTOKENS_API_BASE_PATH,
			websiteBasePath: "/auth",
		},
		recipeList: recipes,
	};

	server.setErrorHandler(errorHandler());

	server.register(helmet, { contentSecurityPolicy: false });

	supertokens.init(config as TypeInput);

	// we register a CORS route to allow requests from the frontend
	server.register(cors, {
		origin: server.config.APP_DOMAIN,
		allowedHeaders: ["Content-Type", ...supertokens.getAllCORSHeaders()].join(
			", ",
		),
		methods: "OPTIONS,POST,GET,PUT,DELETE",
		credentials: true,
	});

	server.register(formDataPlugin);

	server.register(plugin);
}

export default fastifyPlugin(auth);
