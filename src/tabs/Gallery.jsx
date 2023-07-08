import { Component } from "react";

import * as ImageService from "service/image-service";
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from "components";

export class Gallery extends Component {
  state = {
    query: "",
    page: 1,
    isLoading: false,
  };

  componentDidUpdate = (_, prevState) => {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.getPhotoes(query, page);
    }
  };

  getPhotoes = async (query, page) => {
    if (!query) {
      return;
    }

    this.setState({ isLoading: true });
    try {
      const data = await ImageService.getImages(query, page);
      console.log(data)
    } catch (error) {
      
    }
  };

  onHandleSubmit = value => {
    this.setState({ query: value });
  };

  render() {
    return (
      <>
        <SearchForm onSubmit={this.onHandleSubmit} />
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
