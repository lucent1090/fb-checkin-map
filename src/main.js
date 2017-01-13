import React from 'react';
import ReactDOM from 'react-dom';
import FBLogin from './fbLogin.js';

class Main extends React.Component{
	getName(){
		FB.api('/me/tagged_places', function(response){
			if(!response || response.error){
				console.log(response.error);
			}else{
				console.log(response);
			}
		});
	}
	render(){
		return(
			<div>
				<FBLogin callback={this.getName}/>
			</div>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('main'));