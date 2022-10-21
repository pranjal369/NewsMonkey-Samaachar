import React, { Component } from 'react'

export default class NewsItem extends Component {
   
    render() {
        let { title, description, imageurl, newsUrl,author,date } = this.props;
        return (
            <div  className="p-3 mb-2 bg-dark text-white">
                <div className="my-2 p-3 mb-2 bg-dark text-white">
                <div className="card" style={{color:'rgb(33 37 41)'}}>
                    <img src={!imageurl?"https://img.etimg.com/thumb/msid-94919516,width-1070,height-580,imgsize-88010,overlay-economictimes/photo.jpg":imageurl} className="card-img-top" alt="..." />
                    <div className="card-body my-2 p-3 mb-2 bg-dark text-white">
                        <h4 className="card-title my-2 p-3 mb-2 bg-dark text-white">{title}...</h4>
                        <p className="card-text ">{description}...</p>
                        <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
                        <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
