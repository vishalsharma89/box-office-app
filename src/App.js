import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Starred from './pages/Starred';
function App() {
  return (

    <div>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/starred">
          <Starred />
        </Route>

        {/* for other routes than defined */}
        <Route>
          This is 404 page
        </Route>
      </Switch>
    </div>
  );
}

export default App;
