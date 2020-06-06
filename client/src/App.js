import React, { Component } from "react";
import getWeb3 from "./getWeb3";
import { ethers } from 'ethers';
import {BrowserRouter, Route, Switch} from "react-router-dom"


import "./App.css";
import Navbar from "./components/Navbar/Navbar.js"
import CreateBounty from "./pages/CreateBounty/CreateBounty.js"
import FindBounty from "./pages/FindBounty/FindBounty.js"
import Dashboard from "./pages/Dashboard/Dashboard.js"
import Analytics from "./pages/Analytics/Analytics.js"
import History from "./pages/History/History.js"

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ff9c23',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#ffffff'
      // dark: will be calculated from palette.secondary.main,
      //contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});







class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storageValue: 0,
      web3: null,
      accounts: null,
      contract: null,
      account: null,
      signer: null
    }
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // const networkId = await web3.eth.net.getId();
      const account = accounts[0];
      const signer = (new ethers.providers.Web3Provider(window.ethereum)).getSigner()
        
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, account, signer });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  render() {
    if (!this.state.account) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <ThemeProvider theme={theme}>

          <BrowserRouter>
            <Navbar/>
            <Switch>
              <Route path="/dashboard">
                <Dashboard/>
              </Route>
              <Route path="/analytics">
                <Analytics/>
              </Route>
              <Route path="/create-bounty">
                <CreateBounty/>
              </Route>
              <Route path="/find-bounty">
                <FindBounty/>
              </Route>
              <Route path="/history">
                <History/>
              </Route>
            </Switch>
          </BrowserRouter>
        </ThemeProvider>

      </div>
    );
  }
}

export default App;
