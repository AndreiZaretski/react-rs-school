import { Component } from 'react';

interface SearchProps {}

interface MyState {
  input: string;
}

class SearchContent extends Component<SearchProps, MyState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      input: localStorage.getItem('searchValue') || '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      input: event.target.value,
    });
  }

  handleClick() {
    localStorage.setItem('searchValue', this.state.input);
    console.log(this.state.input);
  }

  render() {
    return (
      <div className="input-button">
        <input
          type="text"
          value={this.state.input}
          onChange={this.handleChange}
        />
        <button type="button" onClick={this.handleClick}>
          Нажми меня
        </button>
      </div>
    );
  }
}

export default SearchContent;
