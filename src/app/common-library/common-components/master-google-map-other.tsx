import React, { Component } from 'react'


var google: any

// function loadJS(src: any) {
//     var ref = window.document.getElementsByTagName("script")[0];
//     var script = window.document.createElement("script");
//     script.src = src;
//     script.async = true;
//     ref.parentNode.insertBefore(script, ref);
// }

export default class MasterMap extends Component {

    constructor(props: any) {
        super(props);
    }

    // const initMap = () => {
    //     map = new google.maps.Map(this.refs.map.getDOMNode(), { /* các options khác*/});
    // }

    // componentDidMount() {
    //     // trỏ global function window.initMap này vào hàm initMap của component để thằng google có thể  gọi trong hàm callback
    //     window.initMap = this.initMap;
    
    //     // chèn ngay đoạn js của googleapis cho anh xài ngay.
    //     loadJS('https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap')
    // }

    
    
    
    
    render() {
        return (
            <div>
                <div ref="map" style={{height: '500px', width: '500px'}}></div>
            </div>
        );
    }
   
}