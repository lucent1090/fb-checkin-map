import React from 'react';
import ReactDOM from 'react-dom';
import FBLogin from './fbLogin.js';
import GoogleMap from './googleMap.js'

class Main extends React.Component{
	constructor(props){
		super(props);
		this.getTaggedPlaces = this.getTaggedPlaces.bind(this);
		this.parseTaggedPlaces = this.parseTaggedPlaces.bind(this);
		this.state = {
			gotTaggedPlaces: false,
			places: []
		};
	}
	parseTaggedPlaces(responseData){
		var places = [];
		responseData.forEach(function(element){
				places.push({
					lat: element.place.location.latitude,
					lng: element.place.location.longitude,
					title: element.place.name
				});
		});
		this.setState({
			gotTaggedPlaces: true,
			places: places.slice()
		});	
	}
	getTaggedPlaces(){
		FB.api('/me/tagged_places', function(response){
			if(!response || response.error){
				console.log(response.error);
			}else{
				if(response.data.length == 0){
					return ;
				}
				this.parseTaggedPlaces(response.data);
			}
		}.bind(this));
	}
	render(){
		return(
			<div id="container">
				<FBLogin callback={this.getTaggedPlaces}/>
				<GoogleMap tagged={this.state.places} />
			</div>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('main'));
