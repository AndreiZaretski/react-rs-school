import { Component } from 'react';
import axios from 'axios';
import { ResponseResult } from '../../types/response-interface';
import { API_URL } from '../../constants/request-url';
import './search-input.scss';
import { SearchProps } from '../../types/search-props';

interface MyState {
  input: string;
  loading: boolean;
}

class SearchInfo extends Component<SearchProps, MyState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      input: localStorage.getItem('searchValue') || '',
      loading: false,
    };
    this.sendRequest(this.state.input);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      input: event.target.value,
    });
  }

  async handleClick() {
    localStorage.setItem('searchValue', this.state.input);
    this.setState({
      loading: true,
    });
    await this.sendRequest(this.state.input);
    this.setState({
      loading: false,
    });
  }

  private isResults(data: unknown): data is ResponseResult[] {
    if (!Array.isArray(data)) {
      return false;
    }
    return true;
  }

  sendRequest = async (input: string) => {
    try {
      this.props.onLoading(true);
      const response = await axios({
        url: `${API_URL.baseUrl}${API_URL.character}`,
        params: {
          [`${API_URL.name}`]: input,
          [`${API_URL.page}`]: 0,
          [`${API_URL.limit}`]: 20,
        },
      });

      if (
        response.data.results &&
        response.data.info &&
        this.isResults(response.data.results)
      ) {
        this.props.onLoading(false);
        this.props.onResponse(response.data.results, response.data.info);
      }
    } catch (error) {
      this.props.onLoading(false);
      this.props.onResponse([], null);
    }
  };

  render() {
    return (
      <div className="search-data">
        <input
          type="text"
          className="search-data__input"
          value={this.state.input}
          onChange={this.handleChange}
        />
        <button
          type="button"
          className="search-data__button"
          onClick={this.handleClick}
        >
          Search
        </button>
      </div>
    );
  }
}

export default SearchInfo;
