import { Component } from 'react';
import './App.scss';
import reactLogo from './assets/react.svg';
import SearchInfo from './components/search-input/search-input';
import Results from './components/result-component/result-component';
import { ResponseResult, InfoData } from './types/response-interface';

interface AppComponentState {
  data: ResponseResult[];
  info: InfoData | null;
  loading: boolean;
}

class App extends Component {
  state: AppComponentState = {
    data: [],
    info: null,
    loading: false,
  };

  handleResponse = (results: ResponseResult[], info: InfoData | null) => {
    this.setState({
      data: results,
      info: info,
    });
  };

  handleLoading = (loading: boolean) => {
    this.setState({
      loading: loading,
    });
  };

  render() {
    return (
      <>
        <div>
          <SearchInfo
            onResponse={this.handleResponse}
            data={this.state.data}
            info={this.state.info}
            onLoading={this.handleLoading}
          />
        </div>
        <div className="result">
          {this.state.loading ? (
            <div className="result__loading">
              <p>...Loading</p>
              <img src={reactLogo} className="logo" alt="React logo" />
            </div>
          ) : (
            <Results data={this.state.data} info={this.state.info} />
          )}
        </div>
      </>
    );
  }
}

export default App;
