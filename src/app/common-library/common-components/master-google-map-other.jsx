import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// var google

function loadJS(src) {
  var ref = window.document.getElementsByTagName('script')[0];
  var script = window.document.createElement('script');
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
}

let map;

export default class MasterMap extends Component {
  componentDidMount() {
    window.initMap = this.initMap;

    // chèn ngay đoạn js của googleapis cho anh xài ngay.
    loadJS(
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyAo9NQidEeQkObQ6mVyp1IYBpNneVMMsB4&callback=initMap',
    );
  }

  initMap = () => {
    // eslint-disable-next-line no-undef
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: { lat: -33, lng: 151 },
    });
  };

  render() {
    return (
      <div>
        <div id="map" style={{ height: '500px', width: '500px' }}></div>
      </div>
    );
  }
}
