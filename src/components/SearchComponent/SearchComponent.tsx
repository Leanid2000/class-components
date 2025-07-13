import { Component, type ChangeEvent } from 'react';

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
      <>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button onClick={this.handleClick}>click</button>
      </>
    );
  }
}
