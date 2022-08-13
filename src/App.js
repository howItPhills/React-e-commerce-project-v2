import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

import {
  createUserDocument,
  onAuthStateChangedListener,
} from "./utils/firebase";

import { setCurrentUser } from "./redux/user/user.actions";

import "./app.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocument(user);
      }
      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, []);

  return (
    <div className="app">
      <Header />
      <Content />
      <Footer />
    </div>
  );
};

export default App;
