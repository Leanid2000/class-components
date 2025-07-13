import { Component, type ChangeEvent } from 'react';
import './searchComponent.css';

interface SearchProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  getResults: () => void;
}

export default class SearchComponent extends Component<SearchProps> {
  state = {
    value: localStorage.getItem('inputValue') || '',
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.setInputValue(event.target.value);
    this.setState({ value: event.target.value });
  };

  handleClick = () => {
    this.props.getResults();
  };
  render() {
    return (
      <div className="searchBlock">
        <input
          type="text"
          className="searchInput"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button className="button" onClick={this.handleClick}>
          Search
        </button>
      </div>
    );
  }
}
