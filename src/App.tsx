import './App.scss';
import * as React from "react";
import ShopStore from "./modules/shop-store";

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
    <header className="App-header">
    <ShopStore/>
    </header>
  </div>
    
  );
};

export default App;
