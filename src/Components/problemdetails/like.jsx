import React, { useState } from 'react'

 class LikeButton extends React.Component {
    constructor(props){
        super(props);
        this.state={
            like:'like.svg',
        }
        this.setLike = this.setLike.bind(this);
    }
    setLike(){
        this.setState({like:'liked.svg'});
    }
      render() { 
          return ( <button style={{fontSize: '13px'}} className="float-right btn" onClick={()=>{this.setLike()}}><img src={this.state.like}/> Upvote</button> );
      }
  }
   
  export default LikeButton;