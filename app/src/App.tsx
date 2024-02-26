import Tasks from "./components/Tasks.tsx";
import { Header } from "./components/Header.tsx";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import * as reactRouterDom from "react-router-dom";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { PreBuiltUIList, SuperTokensConfig } from "./config.tsx";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";

SuperTokens.init(SuperTokensConfig);

function App() {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="mx-auto w-full">
        <SuperTokensWrapper>
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
        </SuperTokensWrapper>
      </div>
    </div>
  );
}

export default App;
