import React from 'react';
import { HashRouter } from 'react-router-dom'; // или BrowserRouter с basename
import Main from './components/Main/main';
import Sidebar from './components/Sidebar/Sidebar';
import AppRouter from './components/AppRouter';
import './App.css';
import './styles.css';

function App() {
  return (
    <HashRouter> {/* или <BrowserRouter basename="/your-repo-name"> */}
      <div className="App">
        <Sidebar />
        <AppRouter />
      </div>
    </HashRouter>
  );
}

export default App;