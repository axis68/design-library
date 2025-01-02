import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

import TreeMenuList from './tree-menu-list/TreeMenuList';

// import './App.css';
import './styles/index.css';

const options = [
  { index: "1", label: "Option 1"},
  { index: "2", label: "Option 2", subOptions: [ 
    { index: "2.1", label: "Suboption 2.1"},
    { index: "2.2", label: "Suboption 2.2", subOptions: [
      { index: "2.2.1", label: "Suboption 2.2.1" },
    ]},
  ]},
  { index: "3", label: "Option 3", subOptions: [ 
    { index: "3.1", label: "Suboption 3.1"},
    { index: "3.2", label: "Suboption 3.2"},
  ]},
];
const initialOption = { index: "2.1", label: "Suboption 2.1"};

function App() {
  const [count, setCount] = useState(0)
  const [currentOption, setCurrentOption] = useState(initialOption);


  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>

        <TreeMenuList options={options} selectedOption={currentOption} 
          onChange={(option) => setCurrentOption(option)}/>

        <p class='font-mono'>This is an example with font mono</p>
      </div>



      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
