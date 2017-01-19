import React from 'react';
import ReactDOM from 'react-dom';

class FBLogin extends React.Component {
	constructor(props){
		super(props);
		this.handleLoginButton = this.handleLoginButton.bind(this);
		this.statusChangeCallback = this.statusChangeCallback.bind(this);

		this.state = {
			isLogin: false
		}
	}
	statusChangeCallback(response){
		if(response.status === 'connected'){
			this.setState({isLogin: true});
			FB.api('/me', (me) => {
				Object.assign(me, response.authResponse);
				this.props.callback();
			});
		}
	}
	handleLoginButton(){
		FB.login(function(response){
			this.statusChangeCallback(response);
		}.bind(this), {scope: 'public_profile, email, user_tagged_places'});
	
		console.log(this.state.isLogin);
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
		let loginButton = this.state.isLogin ? 
						  'Already Login' : 
						  (<button onClick={this.handleLoginButton}>
						  		Connect with Facebook
						  </button>);
		let classname4CSS = this.state.isLogin ? 'fb_Login' : 'fb_notLogin';
		return(
			<div className="fb_notLogin">
				{loginButton}
			</div>
		);
	}
}

export default FBLogin;

