import { Component } from 'react';
import './App.scss';
import SearchContent from './components/search-input/search-input';
import { ResponseResult, InfoData } from './types/response-interface';

interface MyComponentState {
  count: number;
  data: ResponseResult[];
  info: InfoData | null;
  loading: boolean;
}

class App extends Component<object, MyComponentState> {
  constructor(props: object) {
    super(props);
    this.state = {
      count: 0,
      data: [],
      info: null,
      loading: false,
    };
  }

  handleResponse = (results: ResponseResult[], info: InfoData) => {
    this.setState({
      data: results,
      info: info,
    });
    console.log(results, info);
  };

  handleLoading = (loading: boolean) => {
    this.setState({
      loading: loading,
    });
    console.log(loading);
  };

  render() {
    return (
      <>
        <div>
          <SearchContent
            onResponse={this.handleResponse}
            data={this.state.data}
            info={this.state.info}
            onLoading={this.handleLoading}
          />
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button
            onClick={() =>
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
