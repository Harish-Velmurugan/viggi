import React, { Component } from 'react';
import './css/Chat.scss';
import InitializeChatComponent from './InitializeChatComponent';
import ChatComponent from './ChatComponent';
import WebSocketInstance from './WebSocket';
import Navbar from '../Navbar/nav';

class InitialComp extends Component{
	constructor(props) {
		super(props)
		
		this.state = {
			username : '',
			loggedIn : false
		};
	}
	
	handleLogin = (username) => {

		//e.preventDefault();
		this.setState({loggedIn : true, username : username});
		// WebSocketInstance.connect(this.props.location.state.id);
		WebSocketInstance.connect();
	}

	render(){
		


		const { username,loggedIn } = this.state;
		return (
			<div className="App">
				<Navbar/>
				{
					loggedIn ?
					<div>
					<ChatComponent currentUser={username} title={this.props.location.state.title} img={this.props.location.state.img}></ChatComponent>
				{/* <ChatComponent/> */}
					 {/* currentUser={username} title={this.props.location.state.title} img={this.props.location.state.img}  */}
					
					</div>
					:
					<InitializeChatComponent 
					handleLogin = {this.handleLogin}
					/>
										
				}
			</div>
		);
	}
	
}

export default InitialComp;