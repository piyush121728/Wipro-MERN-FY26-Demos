import React, { useRef } from 'react';
import logo from './logo.svg';
import './App.css';

import Home from './pages/Home.js';
import About from './pages/About.js';
import Contact from './pages/Contact.js'
import User from './pages/User.js';
import NotFound from './pages/NotFound.js';
import { NavLink, Routes, Route, Link, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


function App() {

  // useLocation must be inside BrowserRouter (which we did in index.js)
  const location = useLocation();
  const nodeRef = useRef(null); // 👈 create nodeRef

  return (

    <div style={{ maxWidth: 700, margin: "30px auto", padding: "0 20px" }}>
      <h2>React Router Transition Demo</h2>

      <nav style={{ marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 10 }}>Home</Link>
        <Link to="/about" style={{ marginRight: 10 }}>About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <TransitionGroup component={null}>
        <CSSTransition
          key={location.pathname}
          classNames="page"
          timeout={300}
          unmountOnExit
          nodeRef={nodeRef} // 👈 use nodeRef here
        >
          <div ref={nodeRef} className="route-wrapper">
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>




    // <div className="app">
    //   <nav style={{ padding: 12, borderBottom: "1px solid #ddd" }}>
    //     <NavLink to="/" end style={({ isActive }) => ({ marginRight: 12, color: isActive ? 'blue' : 'black' })}>Home</NavLink>
    //     <NavLink to="/about" style={({ isActive }) => ({ marginRight: 12, color: isActive ? 'blue' : 'black' })}>About</NavLink>
    //     <NavLink to="/user/42" style={({ isActive }) => ({ color: isActive ? 'blue' : 'black' })}>User 42</NavLink>
    //   </nav>

    //   <main style={{ padding: 12 }}>
    //     <Routes>
    //       <Route path="/" element={<Home />} />
    //       <Route path="/about" element={<About />} />
    //       <Route path="/user/:id" element={<User />} />
    //       <Route path="*" element={<NotFound />} />
    //     </Routes>
    //   </main>
    // </div>



    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
