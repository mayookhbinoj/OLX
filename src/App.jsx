import React from "react";
import "./App.css";
import ContextAllPost from "./contextStore/AllPostContext";
import ContextAuth from "./contextStore/AuthContext";
import ContextPost from "./contextStore/PostContext";
import MainRoutes from "./Routes/MainRoutes";
import { onAuthStateChanged } from 'firebase/auth'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {auth} from "../src/firebase/config"


function App() {
 

  return (
    <div>
      <ContextAuth>
        <ContextAllPost>
          <ContextPost>
            <Router>
            <MainRoutes />
            </Router>
          </ContextPost>
        </ContextAllPost>
      </ContextAuth>
    </div>
  );
}

export default App;