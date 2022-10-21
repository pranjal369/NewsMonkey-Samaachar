import React, { Component } from 'react'
import NewsItem from './NewsItem'
// import spinner from './spinner';
// import spinner from './spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'
import LoadingBar from 'react-top-loading-bar'
// import  from './spinner.gif'

export default class News extends Component {


    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    capitalize = (s) => {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    constructor(props) {
        super(props);
        console.log("Hello,Constructor here!!!");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,


        }
        document.title = `  ${this.capitalize(props.category)} -NewsMonkey`;
    }

    // componentdidmount is a lifecycle (for maze ke liye) method... runs after render

    async componentDidMount() {
        console.log("cdm running");
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=67f5b995c50943f6890554bb01990937&page=1&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        this.props.setProgress(30);
        
        let parsedData = await data.json();
        this.props.setProgress(70);
        console.log(parsedData);
        this.setState({ articles: parsedData.articles })
        this.props.setProgress(100);
    }

    handlePrevClick = async () => {
        console.log("Prev");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=67f5b995c50943f6890554bb01990937&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);

        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })

    }
    handleNextClick = async () => {
        console.log("Next");
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=67f5b995c50943f6890554bb01990937&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=67f5b995c50943f6890554bb01990937&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true });
            let data = await fetch(url);
            let parsedData = await data.json();
            // console.log(parsedData);

            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })
        }

    }

    fetchMoreData = async () => {
           this.setState({page:this.state.page+1})
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=67f5b995c50943f6890554bb01990937&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true });
            let data = await fetch(url);
            let parsedData = await data.json();

            this.setState({
                articles: this.state.articles.concat(parsedData.articles),
                loading: false,
                totalResults:parsedData.totalResults
            })
        
    };

    render() {
        return (
            <div >
                <div className="conatainer p-3 mb-2 bg-secondary text-white bg-opacity-30">
                    <h1 className="text-center" style={{ margin: '35px 0px' }}>TOP "{this.capitalize(this.props.category)}" SAMAACHAR</h1>
                    <spinner />
                    {/* {this.state.loading && <spinner />} */}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<h4>Loading...</h4>}
                    >
                        <div className="container">
                            <div className="row">


                                {this.state.articles.map((element) => {
                                    return <div className="col-md-4" key={element.url}>
                                        <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageurl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                                    </div>
                                })}

                            </div>
                        </div>
                    </InfiniteScroll>


                    {/* <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" class="btn btn-info" onClick={this.handlePrevClick}>&larr; Prev...</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" class="btn btn-info" onClick={this.handleNextClick}>Next...&rarr;</button>
                    </div> */}
                </div>
            </div>
        )
    }
}
