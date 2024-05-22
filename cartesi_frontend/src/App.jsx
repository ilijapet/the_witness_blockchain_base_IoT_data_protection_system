import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import SignInSide from "./components/signInSide";
import SignUp from "./components/signUp";
import Logout from "./components/logout";
import UserProfile from "./components/userProfile";
import ForgetPassword from "./components/forgetPassword";
import ResetConfirmationMail from "./components/resetConfirmationMail";
import ResetConfirmation from "./components/resetConfirmation";
import ResetPassword from "./components/resetPassword";
import Organisations from "./components/dashboard/organizations";
import Donations from "./components/dashboard/donations";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
import { mainnet, polygonMumbai } from "viem/chains";

// // import this from .env file
const projectId = import.meta.env.VITE_REACT_APP_WALLETCONNECT_PROJECT_ID;

// // 2. Create wagmiConfig
const metadata = {
  name: "Digital Rarities Lab",
  description: "Cartesi powered data protection system",
  url: "https://cartesi.io/",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet, polygonMumbai];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// // 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Router>
        <React.StrictMode>
          <Switch>
            <Route exact path="/" component={SignInSide} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/profile" component={UserProfile} />
            <Route exact path="/forgetpassword" component={ForgetPassword} />
            <Route
              exact
              path="/resetconfirmationmail"
              component={ResetConfirmationMail}
            />
            <Route
              exact
              path="/resetpassword/:param1/:param2"
              component={ResetPassword}
            />
            <Route
              exact
              path="/resetconfirmation"
              component={ResetConfirmation}
            />
          </Switch>
        </React.StrictMode>
      </Router>
    </WagmiConfig>
  );
}

export default App;
