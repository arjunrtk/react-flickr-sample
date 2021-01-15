import React from "react";
import { Router, Route } from "react-router-dom";
import GroupsPage from "./GroupsPage";
import { createBrowserHistory as createHistory } from "history";
import GalleryPage from "./GalleryPage";
import "./App.css";
require("dotenv").config();
const history = createHistory();
function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Route path="/" exact component={GroupsPage} />
        <Route path="/groups" exact component={GroupsPage} />
        <Route path="/gallery/:id" exact component={GalleryPage} />
      </Router>
    </div>
  );
}
export default App;
