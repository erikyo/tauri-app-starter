import * as reactRouterDom from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

/* supertokens imports */
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { PreBuiltUIList, SuperTokensConfig } from "./config.tsx";

/* react-intl imports */
import { IntlProvider } from "react-intl";
import { i18nConfig } from "./i18n.ts";

/* Main App */
import Tasks from "./components/Tasks.tsx";
import { Header } from "./components/Header.tsx";

SuperTokens.init(SuperTokensConfig);

function App(): JSX.Element {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="mx-auto w-full">
        <SuperTokensWrapper>
          <IntlProvider
            locale={navigator.language}
            defaultLocale={i18nConfig.defaultLocale}
            messages={i18nConfig.messages}
          >
            <Router>
              <Routes>
                {getSuperTokensRoutesForReactRouterDom(
                  reactRouterDom,
                  PreBuiltUIList,
                )}
                <Route
                  path="/"
                  element={
                    <SessionAuth>
                      <>
                        <Header />
                        <Tasks />
                      </>
                    </SessionAuth>
                  }
                />
              </Routes>
            </Router>
          </IntlProvider>
        </SuperTokensWrapper>
      </div>
    </div>
  );
}

export default App;
