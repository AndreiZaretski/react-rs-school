import { Component } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.scss';

type MyComponentState = {
  count: number;
};

class App extends Component<object, MyComponentState> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(props: MyComponentState) {
    super(props);
    // Инициализируем состояние с начальным значением count = 0
    this.state = {
      count: 0,
    };
  }
  render() {
    return (
      <>
        <div>
          <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button
            onClick={() =>
              // Используем setState для увеличения значения count на 1
              this.setState((prevState) => ({
                count: prevState.count + 1,
              }))
            }
          >
            count is {this.state.count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </>
    );
  }
}

export default App;
