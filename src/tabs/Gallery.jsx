import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';
import { IoImage } from 'react-icons/io5';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    isLoading: false,
    isEmpty: false,
    images: [],
    isVisible: false,
    error: null,
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
      const {
        photos,
        total_results,
        per_page,
        page: currentPage,
      } = await ImageService.getImages(query, page);

      if (photos.length === 0) {
        this.setState({ isEmpty: true });
      }

      this.setState((prevState) => ({
        images: [...prevState.images, ...photos],
        isVisible: currentPage < Math.ceil(total_results / per_page),
      }));
      console.log(total_results / per_page);
      console.log(total_results);
      console.log(per_page);
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onHandleSubmit = (value) => {
    this.setState({ query: value });
  };

  render() {
    const { images } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.onHandleSubmit} />
        <Grid>
          {images.length > 0 &&
            images.map(({ id, avg_color, alt, src }) => (
              <GridItem key={id}>
                <CardItem color={avg_color}>
                  <img src={src.large} alt={alt} />
                </CardItem>
              </GridItem>
            ))}
        </Grid>
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
