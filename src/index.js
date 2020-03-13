import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configure-store";
import App from "./containers/App";
import Character from "./containers/Character";
import * as serviceWorker from "./serviceWorker";
import { readConfig } from "./services/read-config";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styles from "./index.module.css";

readConfig().then(() => {
  const store = configureStore();

  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <div className={styles.wrapper}>
          <App />
          <Switch>
            <Route exact path="/character/new">
              <Character />
            </Route>
            <Route path="/character/:charId">
              <Character />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>,
    document.getElementById("root")
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
