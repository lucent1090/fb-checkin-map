import React from 'react';
import ReactDOM from 'react-dom';

class FBLogin extends React.Component {
	constructor(props){
		super(props);
		this.handleLoginButton = this.handleLoginButton.bind(this);
		this.statusChangeCallback = this.statusChangeCallback.bind(this);

		this.state = {
			isLogin: false,
			profilePic: ''
		}
	}
	statusChangeCallback(response){
		if(response.status === 'connected'){
			this.setState({isLogin: true});
			FB.api('/me', (me) => {
				Object.assign(me, response.authResponse);
				this.props.callback();
			});

			FB.api('/me/picture?type=small', function (response) {
      			if (response && !response.error) {
      				this.setState({profilePic: response.data.url});
    			}else{
      				console.log(response.error);
    			}
    		}.bind(this));
		}
	}
	handleLoginButton(){
		FB.login(function(response){
			this.statusChangeCallback(response);
		}.bind(this), {scope: 'public_profile, email, user_tagged_places'});
	}
	setFbAsyncInit(){
		window.fbAsyncInit = () => {
			FB.init({
				appId: '161152841028506',
				xfbml: true,
				version: 'v2.8',
				cookie: true
			});
			FB.getLoginStatus(this.statusChangeCallback);
		};
	}
	loadSdkAsynchronously(){
		((d, s, id) => {
      		const element = d.getElementsByTagName(s)[0];
      		const fjs = element;
      		let js = element;
      		if (d.getElementById(id)) { return; }
      		js = d.createElement(s); js.id = id;
      		js.src = '//connect.facebook.net/en_US/all.js#xfbml=1&version=v2.8';
      		fjs.parentNode.insertBefore(js, fjs);
    	})(document, 'script', 'facebook-jssdk');
	}
	componentWillMount(){
		if(document.getElementById('facebook-jssdk')){
			return;
		}
		this.setFbAsyncInit();
		this.loadSdkAsynchronously();
	}
	render(){
		let FB = this.state.isLogin ? 
						  (<div className="fb_Login">
						  		<img src={this.state.profilePic} alt=''></img>
						   </div>) : 
						  (<div className="fb_notLogin">
						   		<p>Hi, welcome to Facebook Check-in Map.</p>
						   		<p>We will show your check-in history on the map. Please login with Facebook to continue.</p>
						   		<button onClick={this.handleLoginButton}>
						  			Login with Facebook
						   		</button>
						   </div>);
		return(
			<div id="container_FB">
				{FB}
			</div>
		);
	}
}

export default FBLogin;

