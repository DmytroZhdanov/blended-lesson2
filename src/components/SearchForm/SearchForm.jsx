import { Component } from "react";
import PropTypes from "prop-types";
import { FiSearch } from "react-icons/fi";
import { FormBtn, InputSearch, SearchFormStyled } from "./SearchForm.styled";

export class SearchForm extends Component {
  state = {
    query: "",
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  handleInput = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase().trim() });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { query } = this.state;
    const { onSubmit } = this.props;

    onSubmit(query);
    this.setState({ query: "" });
  };

  render() {
    const { query } = this.state;

    return (
      <SearchFormStyled onSubmit={this.handleSubmit}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          onChange={this.handleInput}
          placeholder="What do you want to write?"
          name="search"
          required
          autoFocus
          value={query}
        />
      </SearchFormStyled>
    );
  }
}

