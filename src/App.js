import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
// import Header from './components/Header';
import Login from './pages/Login';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <div className="App">
      <Route exact path="/" component={ Login } />
      <Route path="/feedback" component={ Feedback } />
    </div>
  );
}
