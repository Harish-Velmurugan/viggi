import React from "react";
import Navbar from "../Navbar/nav";
import axios from "axios";
import { Card,Button, Container } from "react-bootstrap";
import { Redirect,Link } from "react-router-dom";
import Bag from './bag.jpg'

class ExpertRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choice:props.location.state.choice,
      buckets:['Agriculture',
               'Automobiles',
               'Banking',
               'E-Commerce',
               'Education and Training',
               'Gems and Jewellery',
               'Healthcare',
               'Software and Hardware',
               'Media and Entertainment',
               'Pharmaceuticals',
               'Sports',
               'Railways',
               'Renewable Energy',
               'Science and Technology',
               'Textiles',
               'Travel and Tourism',
              ],
               
      icons:['fas fa-leaf fa-2x',
             'fas fa-car fa-2x',
             'fas fa-university fa-2x',
             "fas fa-shopping-cart fa-2x",
             "fas fa-user-graduate fa-2x",
             "fas fa-gem fa-2x",
             "fas fa-procedures fa-2x",
             "fas fa-laptop-code fa-2x",
             "fas fa-film fa-2x",
             "fas fa-prescription-bottle-alt fa-2x",
             "fas fa-volleyball-ball fa-2x",
             "fas fa-subway fa-2x",
             "fas fa-solar-panel fa-2x",
             "fas fa-microscope fa-2x",
             "fas fa-tshirt fa-2x",
             "fas fa-map-marked-alt fa-2x",
            ]
    };
   
  }

  componentDidMount(){

    console.log(this.state.choice)

    
  }


  render() {

    console.log(this.state.choice)

    return (
        <div className="main_content">


           
            
         
            {this.state.buckets.map((bucket,i) => (
              <div>

              <Link to={{pathname:"/list", state:{choice:this.state.choice, bucket:'law', problem:0}}}>
              <Container className="Answers1" style={{minWidth:'40%', backgroundColor:'#4c4c4c'}} >

            
              <table>
                    <tr>
                      <div>
                        <td >&nbsp;
                        <i class={this.state.icons[i]} aria-hidden="true"  style={{color:'#dddddd'}}></i> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                      </td>
                      </div>
                        
                      <td>
                          <Card.Text style={{color:'white',textStyle:'bold'}}>{bucket}
                            </Card.Text>
                            
                      </td>
                
                    </tr>
                  </table>

                  
              </Container>

              </Link>
              </div>
            ))}
            <div style={{margin:'40px'}}>
            <h3>          &nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                                  </h3>
            </div>
           
        </div>
    );
  }
}

export default ExpertRequest;
