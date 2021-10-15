import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const Home = React.lazy(() => import("./views/Home/Home"));
class App extends Component {
  render() {
    return (
      <>
        <React.Suspense fallback={loading}>
          <Home />
        </React.Suspense>
      </>
      // <HashRouter>
      //   <React.Suspense fallback={loading}>
      //     <Switch>
      //       <Route
      //         path="/"
      //         name="Home"
      //         render={(props) => <Home {...props} />}
      //       />
      //     </Switch>
      //   </React.Suspense>
      // </HashRouter>
    );
  }
}

export default App;
