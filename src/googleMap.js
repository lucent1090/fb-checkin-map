import React from 'react';
import ReactDOM from 'react-dom';

class GoogleMap extends React.Component{
  constructor(props){
    super(props);

    this.getGeolocation = this.getGeolocation.bind(this);
    this.putMarkers = this.putMarkers.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if(this.props.tagged.length != nextProps.tagged.length){
      this.forceUpdate();      
      this.putMarkers(this.map, nextProps.tagged);
    }
  }
  putMarkers(map, markers){
    markers.forEach(function(element){
      let marker = new google.maps.Marker({
        position: {lat: element.lat, lng: element.lng},
        map: map,
        title: element.title
      });
    });
  }
  getGeolocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.map.setCenter(pos);

      }.bind(this), function(error){
        console.log("getCurrentPosition doesn't work");
        console.log(error);

        $.getJSON("http://ipinfo.io", function(ipinfo){
          console.log("Found location ["+ipinfo.loc+"] by ipinfo.io");
          var latLong = ipinfo.loc.split(",");
          console.log(latLong);
        }.bind(this));

      }, {timeout: 5000});
    }
  }
	componentDidMount(){
		this.map = new google.maps.Map(this.refs.map, {
                    center: {lat: -34.397, lng: 150.644},
                    zoom: 14
              });
    this.getGeolocation();
    this.putMarkers(this.map, this.props.tagged);
	}
  render() {
    return (
    	<div ref="map" className="google_map"></div>
    );
  }
}

export default GoogleMap;