import logo from './logo.svg';
import './App.css';
import { Button, Container } from 'react-bootstrap'; //as included via //as included via cli


function App() {
  return (
    // using bootstrap class directly or via react-bootstrap

    // <div className="container py-4">
    //   <h1 className="mb-3">Bootstrap in React</h1>
    //   <button className="btn btn-primary">Primary Button</button>
    // </div>

    // using bootstrap components via react-bootstrap
    <Container className="py-4">
      <h1 className="mb-3">React-Bootstrap</h1>
      <Button variant="success">Success</Button>
    </Container>


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
