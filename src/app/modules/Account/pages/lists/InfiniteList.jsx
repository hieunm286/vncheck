import React from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios';

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};


export default class InfiniteList extends React.Component {
    state = {
      items: [],
      hasMore: true,
      page: 1,
      total: 1,
    };

    componentDidMount() {
        axios.get(`http://localhost:3333/api/user?page=${this.state.page}`).then(res => {
            this.setState({
                items: res.data.data,
                total: res.data.total
            })
        })
    }
  
    fetchMoreData = () => {
      if (this.state.items.length >= this.state.total) {
        this.setState({ hasMore: false });
        return;
      }
      // a fake async api call like which sends
      // 20 more records in .5 secs
    //   setTimeout(() => {
    //     this.setState({
    //       items: this.state.items.concat(Array.from({ length: 5 }))
    //     });
    //   }, 500);
    setTimeout(() => {
         axios.get(`http://localhost:3333/api/user?page=${this.state.page+1}`).then(res => {
            this.setState({
                page: this.state.page + 1,
                items: this.state.items.concat(res.data.data)
            })
        })
    }, 1000)
      
    };
  
    render() {
      return (
        <div>
          <h1>demo: react-infinite-scroll-component</h1>
          <hr />
          <InfiniteScroll
            dataLength={this.state.items.length}
            next={this.fetchMoreData}
            hasMore={this.state.hasMore}
            loader={<h4>{`Loading ${this.state.total - this.state.items.length < 5 ? this.state.total - this.state.items.length : 5 } of ${this.state.total - this.state.items.length} left`}</h4>}
            height={150}
            // initialScrollY={5}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {this.state.items.map((item, index) => (
              <div style={style} key={index}>
                div - #{index} - {item.email}
              </div>
            ))}
          </InfiniteScroll>
        </div>
      );
    }
  }