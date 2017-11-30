import React from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';


import Header from './Header';
import Search from './Search';
import Article from './Article';

export default class Main extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    topic: ' ',
    start_date: ' ',
    end_date: ' ',
    articles: [],
    savedData: [],
  }
  // this.handleTopic = this.handleTopic.bind(this);
  // this.handleStartYear = this.handleStartYear.bind(this);
  // this.handleEndYear = this.handleEndYear.bind(this);
  // this.getData = this.getData.bind(this);
  // this.saveArticle = this.saveArticle.bind(this);
  // this.update = this.update.bind(this);
  // this.deleteArticle = this.update.bind(this);
}

componentWillMount() {
  axios({
    method: 'get',
    baseURL: '/api',
  }).then(response => {
    this.setState({
      savedData: response.data
    })
  })
}

handleTopic(e){
  this.setState({
    topic: e.target.value
  })
}

handleStartYear(e){
  this.setState({
    start_date: e.target.value
  })
}

handleEndYear(e){
  this.setState({
    end_date: e.target.value
  })
}

getData(e){
  e.preventDefault();
  let formValues = {
    topic: this.state.topic,
    start_date: this.state.start_date,
    end_date: this.state.end_date
  }
  let params = Object.assign(formValues, {'api-key': '7ad18052805a404cadd93f1b34f18391'});
  params.start_date = `${params.start_date}0101`;
  params.end_date = `${params.end_date}1231`;
  axios({
    method: 'get',
      baseURL: 'https://api.nytimes.com/svc/search/v2/articlesearch.json?',
      params: params,
      responseType: 'json'
  }).then(data => {
    const dataToBeRendered=[];
    const dataArr = data.data.response.docs;
    dataArr.forEach(article => {
      dataToBeRendered.push({
        web_url: article.web_url,
        snippet: article.snippet,
        pub_date: article.pub_date
      });
    });
    this.setState({
      articles: dataToBeRendered,
      topic: ' ',
      start_date: ' ',
      end_date: ' '
    })
  })
}

saveArticle(article){
  axios({
    method: 'post',
    baseURL: '/api',
    data: {
      data: article
    }
  }).then(response => {
    let newState = [];
    newState.push(response.data);
    this.setState({
      savedData: (newState).concat(this.state.savedData)
    })
  })
}

deleteArticle(id){
  axios({
    method: 'get',
    baseURL: '/api/delete/?{id}',
  }).then(response => {
    this.setState({
      savedData: this.state.savedData.filter(article => {
        return article._id !== response.data._id
      })
    })
  })
}

update(data){
  return (
    <tbody>
      {
        data.map((article, i) => {
          return (
            <Article key={i}
              article={article}
              deleteArticle={this.deleteArticle}
            />
            )
        })
      }
    </tbody>
    )
}

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route path="/"
            exact={true}
            render={() =>
              <div>
                <Search 
                  onSearch={this.getData}
                  topicChanged={this.handleTopic}
                  startYearChanged={this.handleStartYear}
                  endYearChanged={this.handleEndYear}/>
              </div>
            }/>
        </div>
      </Router>
    );
  }
}
