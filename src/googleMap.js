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

      this.getGeolocation();
      this.putMarkers(this.map, nextProps.tagged);
    }
  }
  putMarkers(map, taggedPlaces){
    taggedPlaces.forEach(function(element){
      var marker =  new google.maps.Marker({
        position: {lat: element.lat, lng: element.lng},
        map: map,
        title: element.title
      });
      let info =
        "<ul><li> Check-in Time: " + element.cTime + 
        "</li><li> Name: " + element.title + 
        "</li><li> Address: " + element.street +
        "</li><ul>";
      marker.addListener('click', function(){
        window.infoWindow.setContent(info);
        window.infoWindow.open(map, marker);
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
        new google.maps.Marker({
          position: pos,
          map: this.map,
          animation: google.maps.Animation.BOUNCE,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 7,
            fillColor: '#4C69BA',
            fillOpacity: 1,
            strokeColor: '#F0F0F0',
            strokeWeight: 3
          }
        });
      }.bind(this), function(error){
        console.log("getCurrentPosition doesn't work");
        console.log(error);
      }, {timeout: 5000});
    }
  }
	componentDidMount(){
		this.map = new google.maps.Map(this.refs.map, {
                    center: {lat: -34.397, lng: 150.644},
                    zoom: 14
              });
    window.infoWindow = new google.maps.InfoWindow();
	}
  render() {
    return (
    	<div ref="map" className="google_map"></div>
    );
  }
}

export default GoogleMap;