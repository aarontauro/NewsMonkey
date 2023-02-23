import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import Newsitem from './Newsitem'
import Spinner from './Spinner';

export class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)}- NewsMonkey`;
  }

  capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  updateNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${this.props.apiKey}&category=${this.props.category}&page=${this.state.page}`;
    this.props.progress(10);
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.progress(30);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
    this.props.progress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  fetchData = async () => {
    this.setState({
      loading: true
    })
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${this.props.apiKey}&category=${this.props.category}&page=${this.state.page + 1}`;
    this.setState({
      page: this.state.page + 1
    })
    let data = await fetch(url);
    let parsedData = await data.json(); 
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      loading: false
    }); 
  }

  render() {
    return (
      <>
        <h2 className='text-center' style={{marginTop: '80px'}}>NewsMonkey- Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={this.state.loading && <Spinner />}>
          <div className='container my-3'>
            <div className="row">
              {this.state.articles.map((element, id) => {
                return <div className='col-md-4 my-3' key={id}>
                  <Newsitem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} time={element.publishedAt} source={element.source.name} mode={this.props.mode}/>
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    )
  }
}

export default News
