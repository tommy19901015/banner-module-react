import React from "react";
import logo from "./logo.svg";
import Banner from "./Banner";

function App() {
  return (
    <div className="App">
      <Banner openAtStart autoToggle={500} transition={true} />
    </div>
  );
}

export default App;
