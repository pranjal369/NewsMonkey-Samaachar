import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
// import propTypes from '';
// import NewsItem from './Components/NewsItem'
// Navbar
export default class App extends Component {

  pageSize = 5;

  state={
    progress:0
  }

  setProgress=(progress)=>{
    this.setState({progress:progress})
  }

  // render() is for convert jsx to html compile, then it renders it
  render() {
    return (
      <div>
        {/* Hello motherfuckrrs!! */}

        <BrowserRouter>
        <Navbar />
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />
          <Routes>
            <Route exact path="/business" element={<News setProgress={this.setProgress}key="business" category="business" pageSize={this.pageSize} />} />
            <Route exact path="/" element={<News setProgress={this.setProgress}key="general" category="general" pageSize={this.pageSize} />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress}key="entertainment" pageSize={this.pageSize} category="entertainment" />} />
            <Route exact path="/general" element={<News setProgress={this.setProgress}key="general" pageSize={this.pageSize} category="general" />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress}key="health" pageSize={this.pageSize} category="health" />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress}key="science" pageSize={this.pageSize} category="science" />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress}key="sports" pageSize={this.pageSize} category="sports" />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress}key="technology" pageSize={this.pageSize} category="technology" />} />
            {/* <Route path="/"  pageSize={5} country="in" category="general"  element={<News setProgress={this.setProgress}/>} /> */}
            {/* <Route path="users/*" element={<Users />} /> */}
          </Routes>
          {/* <News setProgress={this.setProgress}pageSize={5} country="in" category="science" /> */}
          {/* <NewsItem/> */}
        </BrowserRouter>
      </div>
    )
  }
}
