import React from "react";

import axios from "axios";

import { Redirect,Link } from "react-router-dom";

import { Card, Button, CardDeck, Modal } from "react-bootstrap";
import { registerPlugin } from "react-filepond";
import { Multiselect } from "multiselect-react-dropdown";


class ProblemRefining extends React.Component {
 
    constructor(props) {
        super(props);
        this.state = {
            show:false,
            options: [
              { name: "Algorithms", id: 1 },
              { name: "Cryptography", id: 2 },
              { name: "Distributed Computing", id: 3 },
              { name: "Cloud Computing", id: 4 },
              { name: "Computational Learning ", id: 5 },
              { name: "Computer Vision", id: 6 },
              { name: "Big Data ", id: 7 },
              { name: "Medicine ", id: 8 },
            ],
            selectedValue: [],
            buckets:'',
            profile:[],
            domains:[],
            posts:[],
            problem:false,
            solution:false
        };
        this.onSelect = this.onSelect.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
      }
    
      componentDidMount(){
    
        axios.get('/api/expertCheck/'+ localStorage.getItem('username') +'/')
        .then((res) =>{
          this.setState({
            profile:res.data.values,
            buckets:res.data.values[0]
          })
         
        }
          ).catch((err) => {
    
          })

          axios.get('/forum/gettingPost/'+ localStorage.getItem('username') +'/')
          .then((res) =>{
            this.setState({
              posts:res.data,
            })
           
          }
            ).catch((err) => {
      
            })
    
      }
    
    
      handleSubmit(e) {
        e.preventDefault();
        console.log(this.state)
    
        if((this.state.solution== 'true' || this.state.problem=='true' ) && this.state.domains.length > 0){
    
        
    
            let domain = []
    
            for (let i = 0; i < this.state.domains.length; i++) {
              domain.push(this.state.domains[i]["name"]);
            }
    
            console.log(domain,typeof(domain))
          
            let username = localStorage.getItem("username");
            let form_data = new FormData();
            form_data.append("bucket", this.state.buckets);
            form_data.append("problem", this.state.problem);
            form_data.append("solution", this.state.solution);
            form_data.append("domains", domain);
            form_data.append("username", Number(username));
    
    
            axios.post('/api/expertApply/', form_data)
              .then((response1) => {
                  console.log(response1)
              })
              .catch((err)=>{
                console.log(err)
              });
              this.setState({show:!this.state.show})
        }
      }
    
     
      handleChange(e) {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        console.log(value,name)
        this.setState({
          [name]: value,
        });
      }
    
      handleCheck(e) {
        let target = e.target;
        let name = target.name;
        let value = target.value;
    
        console.log(value,name)
        this.setState({
          [name]: (value == 'false') ? 'true':'false',
        });
      }
    
      onSelect(selectedList, selectedItem) {
        this.setState({ domains: selectedList });
      }
    
      onRemove(selectedList, removedItem) {}
      
    
      handleModal()
      {
        this.setState({show:!this.state.show})
      }
    
      render() {
       
        return (
            <div className="main_content">
    
              <div 
              style={{
                display: "flex",
                justifyContent: "center",
       
                marginLeft:'5%',
                marginRight:'7%',
                backgroundColor: "#323754",
              }}
            >

            </div>
    
            <CardDeck className="card-display m-5" style={{ width: "90%", minWidth:'200px'}}>
    
            <Card>
                    <Card.Header as='h4'>Problem Refinement</Card.Header>
                    <Card.Body>
                    
                    <Card.Text className="text-secondary">
                              Let experts handle your trouble of decomposing and posting a complicated problem 
                              <br></br> in a refined way
                              
                              
                    </Card.Text>
    
                    <div>
                      <Link to={{pathname:"problemRefiningPost"}}  >
                      <Button style={{float:"right"}}>Post</Button>
                      </Link>
                  

                    </div>
    
                    </Card.Body>
                    
                </Card>
                </CardDeck>
                <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
            backgroundColor: "midnightblue",
          }}
        >
          <h3 style={{ paddingTop: "4px", color: "snow" }}>Problems Posted</h3>
        </div><br />

              <div className="row">
              {this.state.posts.map((post, index) => (
                <div className="col-md-3" key={index}>
                  <div
                    className="card shadow-lg mb-4 bg-white"
                    style={{ height: "90%" }}
                  >
                    <div className="card-body p-0">
                      <div className="img1">
                        <img
                          alt="asd"
                          src={post.img}
                          width="100%"
                          height="100px;"
                        />
                      </div>
                      <div
                        className="detailsbody pt-3 pl-3 pr-3"
                        style={{ textAlign: "center" }}
                      >
                        <h5>
                          <Link
                           to={{
                             pathname:"/postdetail",
                           state: { pid: post.postId },
                             }}
                          >
                            {post.title}
                          </Link>
                        </h5>
                        <p>{post.desc}</p>
                        <p></p>
                      </div>
                    </div>
                    <div className="card-footer">
                      <div className="d-flex justify-content-around">
                        <div> &nbsp; &nbsp; 
                          <div
                            className={
                              post.ans_count > 0
                                ? "badge badge-pill badge-info"
                                : "badge badge-pill badge-dark"
                            }
                          >
                           {post.ans_count} Submited
                          </div>
                        </div>
                        <div>
                          {/* <button type="button" className="btn btn-success btn-sm" style={{float: 'right'}} onClick={()=>history.push('/abstract')}>View Solutions</button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        );
      }
    }
    
    export default ProblemRefining;
          