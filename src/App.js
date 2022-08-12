import React from "react";

import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

import "./app.css";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Content />
      <Footer />
    </div>
  );
};

export default App;
