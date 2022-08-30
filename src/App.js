import { Outlet } from "react-router-dom";

import Header from "./components/Header/Header";

import "./App.scss";

const App = () => {
  return (
    <div className="app-container">
      {/* Header */}

      <div className="header-container">
        <Header />
      </div>

      {/* main container */}

      <div className="main-container">
        {/* Side navigation */}

        <div className="sidenav-container"></div>

        {/* App content */}

        <div className="app-content">
          {/* render other component here */}
          <Outlet />
        </div>
      </div>

      {/* Footer */}
    </div>
  );
};

export default App;
