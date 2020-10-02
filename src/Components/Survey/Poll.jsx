// import React, { Component } from 'react';
// import Poll from 'react-polls';

// // Declaring poll question and answers
// const pollQuestion = ''
// const pollAnswers = [
//   // { option: "a", votes: 2 },
//   // { option: 'q', votes: 2 }
// ]

// class Polls extends Component {
//   // Setting answers to state to reload the component with each vote
//   constructor(props){
//     super(props)
//     this.setState({pollAnswers : props.pollState})
//   }
//   state = {
//     //pollAnswers: [...pollAnswers]
//     pollAnswers : this.props.pollState
//   }

//   handleVote = voteAnswer => {
//     const { pollAnswers } = this.state
//     const newPollAnswers = pollAnswers.map(answer => {
//       if (answer.option === voteAnswer) {
//         answer.votes = answer.votes
//         console.log(answer.votes)
//       }

//       return answer
//     })

//   }

//   render () {
//     const { pollAnswers } = this.state
//     return (
//       <div style={{width:"60%",marginLeft:"20%"}}>
//         <Poll question={pollQuestion} answers={pollAnswers}  onVote={this.handleVote} />
//       </div>
//     );
//   }
// };

// export default Polls;

import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class Polls extends React.Component {
  constructor (props){
    super(props)

    this.state = {
      dataHorizontal: {
        labels: [''],
        datasets: [
          {
            label: "",
            data: [''],
            fill: false,
            backgroundColor: [
              "#FFFFFF",
              "#FF033E",
              "#00ff00",
              "#81007F",
              "#3FE0D0",
              "#FD6A02",
            ],
          },
        ],
      },
  }
  
  };

  componentDidMount(){
    for(let i=0 ;i < this.props.pollState.length;i++){
      this.setState(
        this.state.dataHorizontal.labels = this.state.dataHorizontal.labels.concat(this.props.pollState[i].option)
        
      )
      this.setState(

        this.state.dataHorizontal.datasets[0].data = this.state.dataHorizontal.datasets[0].data.concat(this.props.pollState[i].votes)
      )

    
    }
  }

  render() {
    return (
      <MDBContainer style={{ width: "60%", minWidth: "250px" }}>
        <HorizontalBar
          data={this.state.dataHorizontal}
          options={{ responsive: true }}
        />
      </MDBContainer>
    );
  }
}

export default Polls;
