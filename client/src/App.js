import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import DogCreate from "./components/DogCreate/DogCreate";
import LandingPage from "./components/LandingPage/LandingPage";
import Detail from "./components/Detail/Detail";
import Error from "./components/Error/Error";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/create" component={DogCreate} />
          <Route path="/home/:name" component={Detail} />
          <Route path="*" component={Error} />
        </Switch>
        <h1>Henry Dogs</h1>
      </div>
    </BrowserRouter>
  );
}

export default App;
