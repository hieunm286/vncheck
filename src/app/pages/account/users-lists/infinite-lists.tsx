import React, {useEffect, useRef, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import {Button, Form, FormControl, Spinner} from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
import './infinite-list.scss';
import { API_BASE_URL } from '../../../const';

import InfiniteItem from './infinite-item';

const style = {
  height: 30,
  border: '1px solid green',
  padding: 8,
  marginBottom: 6,
};

function InfiniteLists() {
  const [state, setState] = useState({
    items: [],
    hasMore: true,
    page: 1,
    total: 1,
  });
  
  const [searchTerm, setSearhTerm] = useState('');
  const typingTimeoutRef = useRef<any>(null);
  const [loading, isLoading] = useState(false);
  
  useEffect(() => {
    isLoading(true);
    const fetchData = async () => {
      axios
        .get(`${API_BASE_URL}/user/all/search?query=${searchTerm}&page=1`)
        .then(res => {
          const data = {
            items: res.data.data,
            hasMore: true,
            page: 1,
            total: res.data.total,
          };
          setState(data);
        })
        .catch(err => {
          console.log(err);
        });
    };
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      console.log('call api for: ' + searchTerm);
      fetchData();
      isLoading(false);
    }, 500);
  }, [searchTerm]);
  
  const fetchMoreData = () => {
    if (state.items.length >= state.total) {
      setState({...state, hasMore: false});
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    //   setTimeout(() => {
    //     this.setState({
    //       items: this.state.items.concat(Array.from({ length: 5 }))
    //     });
    //   }, 500);
    isLoading(true);
    setTimeout(() => {
      axios
        .get(`${API_BASE_URL}/user/all/search?query=${searchTerm}&page=${state.page + 1}`)
        .then(res => {
          setState({
            ...state,
            page: state.page + 1,
            items: state.items.concat(res.data.data),
          });
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          isLoading(false);
        });
    }, 2200);
  };
  
  const handleChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    console.log(value);
    setSearhTerm(value);
  };
  
  return (
    <div className="infinite-scroll">
      {/* <h1>demo: react-infinite-scroll-components</h1>
          <hr /> */}
      <Form className="form-search" inline>
        <FormControl
          type="text"
          placeholder="Search"
          className="search-bar"
          value={searchTerm}
          onChange={handleChange}
        />
        <Button variant="outline-success" className="search-button">
          {loading ? <Spinner animation="border" variant="primary" size="sm"/> : <SearchIcon/>}
        </Button>
      </Form>
      <InfiniteScroll
        className="infinite"
        dataLength={state.items.length}
        next={fetchMoreData}
        hasMore={state.hasMore}
        loader={
          <h4>
            {state.items.length > 0
              ? `Loading ${
                state.total - state.items.length < 5 ? state.total - state.items.length : 5
              } of ${state.total - state.items.length} left...`
              : `Loading data...`}
          </h4>
        }
        height={350}
        // initialScrollY={5}
        endMessage={
          <p style={{textAlign: 'center'}}>
            <b>Yay! You have seen it all</b>
          </p>
        }>
        {state.items.map((item: any, index) => (
          <InfiniteItem key={index} item={item}/>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default InfiniteLists;
