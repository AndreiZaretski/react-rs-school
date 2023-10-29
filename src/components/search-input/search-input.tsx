import { Component } from 'react';
import axios from 'axios';
import { InfoData, ResponseResult } from '../../types/response-interface';
import { API_URL } from '../../constants/request-url';

interface SearchProps {
  data: ResponseResult[];
  info: InfoData | null;

  onResponse: (results: ResponseResult[], info: InfoData) => void;
  onLoading: (loading: boolean) => void;
}

interface MyState {
  input: string;
  loading: boolean;
}

class SearchContent extends Component<SearchProps, MyState> {
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
      throw new Error('Somethig went wrong');
    }
  };

  render() {
    return (
      <div className="input-button">
        <input
          type="text"
          value={this.state.input}
          onChange={this.handleChange}
        />
        <button type="button" onClick={this.handleClick}>
          Search
        </button>
      </div>
    );
  }
}

export default SearchContent;
