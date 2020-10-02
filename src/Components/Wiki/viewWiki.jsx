import Navbar from "../Navbar/nav";
import { Link } from "react-router-dom";
import React, {Component, PropTypes} from 'react';
import RichTextEditor from 'react-rte';
import axios from 'axios';
import help from "./helpicon.png";
import IconButton, {IconToggle} from '@material/react-icon-button';
import MaterialIcon from '@material/react-material-icon';
import "./createWiki.css"
import { Redirect } from "react-router";
import { Modal } from "react-bootstrap";
import "./createWiki.css"
import tag from "./tag.svg";

let aaa=null;
class viewWiki extends Component {

  constructor(props)
     {
      super(props);
       
        this.state = {
            wid:this.props.location.state.query,
            like:'',
            dislike:'',
            likeCount:'',
            dislikeCount:'',
            content:[],
            show:false, 
            eligible:null,
        }
        this.dislike=this.dislike.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.like=this.like.bind(this);
        aaa=this.state.wid
    }
    handleModal() {
        this.setState({ show: !this.state.show });
      }
    componentDidMount(){
        
        axios.get("/wiki/viewWiki/"+aaa+"/")
        .then((res=>{
            this.setState({content:res.data})
            this.setState({like:res.data.like})
            this.setState({dislike:res.data.dislike})
            this.setState({likeCount:res.data.likeList})
            document.getElementById('content').innerHTML=res.data.html;
            this.setState({likeCount:res.data.likeList})
            this.setState({dislikeCount:res.data.dislikeList})
            console.log(this.state.dislikeCount);
        })
        );
        var a="this.state.content.html"
        axios.get('/wiki/editCheck/'+aaa+'/'+localStorage.getItem('username')+'/')
        .then((res=>{
            this.setState({eligible:res.data.eligible})
        }))
        
    }
    like(){
                axios.post('/wiki/like/'+this.state.wid+'/'+localStorage.getItem('username')+'/')
                .then((res=>{
                    this.setState({like:res.data.value})
                    this.setState({dislike:res.data.value1})
                    console.log(res.data);
                    document.getElementById('likebtn1').style='color:blue'
                    document.getElementById('dislikebtn').style='color:#aaa'
                })
                );
    }

    dislike(){
        axios.post('/wiki/dislike/'+this.state.wid+'/'+localStorage.getItem('username')+'/')
        .then((res=>{
            this.setState({'dislike':res.data.value})
            this.setState({'like':res.data.value1})
            console.log(res.data);
            
        document.getElementById('dislikebtn').style='color:blue'
        document.getElementById('likebtn1').style='color:#aaa'
        })
        );
    }
    render(){
        console.log(this.state.eligible)
        const aaa=this.state.content.likeList;
        return(
            <div>
                <Modal show={this.state.show}>
         <Modal.Header>
         <Modal.Title>Would you like to edit this wiki?</Modal.Title>
         </Modal.Header>
         <Modal.Body>
         <strong class="mx-auto">1) Kindly edit this page only if you find anything wrong or wanted to add any valid detail only.</strong><br/>
         <strong class="mx-auto">2) 100 reputation points of you will be reduced for each edit by you.</strong><br/>
         <strong class="mx-auto">3) You can make your changes and submit only once.So be careful on it.</strong><br/>
         <strong class="mx-auto">4) Would you like to edit still?</strong><br/>
         {/* <strong class="mx-auto">You can create a wiki page and share your knowledge on any domain that your are expert in.</strong> */}
 


         </Modal.Body>
         <Modal.Footer>
          <Link  to={{pathname: "/reEditWiki",state:{query:this.state.wid}}}>
          <button class="btn btn-success ml-3" >&nbsp;Yes&nbsp;</button>
          </Link>
           <button class="btn btn-danger" onClick={()=>{this.handleModal()}}>&nbsp;No&nbsp;</button>
          
         </Modal.Footer>
       </Modal>

                

               {this.state.eligible=="False"?
                localStorage.getItem('username')==this.state.content.username?
                <Link style={{textDecoration:'none',color:'white'}}class="float5"  to={{state:{query:this.state.wid}}} >Yours  <img className="ml-1" alt="asd" src={tag} /></Link>:<div> </div>:
                ""
                // <Link onClick={()=>{this.handleModal()}} to={{pathname:'/viewWiki',state:{query:this.state.wid}}} style={{textDecoration:'none',color:'white'}}class="float5">Edit  <i class="fa fa-pencil-square ml-1"/></Link>
                } 

               {this.state.eligible=="True"?
                 localStorage.getItem('username')==this.state.content.username?
                 <Link style={{textDecoration:'none',color:'white'}}class="float5"  to={{state:{query:this.state.wid}}}>Yours  <img className="ml-1" alt="asd" src={tag} /></Link>:
                <Link onClick={()=>{this.handleModal()}} to={{pathname:'/viewWiki',state:{query:this.state.wid}}} style={{textDecoration:'none',color:'white'}}class="float5">Edit  <i class="fa fa-pencil-square ml-1"/></Link>
                :""
                 } 


                {/* {this.state.eligible=="True"?<Link onClick={()=>{this.handleModal()}} to={{pathname:'/viewWiki',state:{query:this.state.wid}}} style={{textDecoration:'none',color:'white'}}class="float5">Edit  <i class="fa fa-pencil-square ml-1"/></Link>
                :""
                } */}

               {(this.state.likeCount.includes(localStorage.getItem('username')))?
                <div>
                    <a><div  id="likebtn" class="float3"  onClick={()=>this.like()}>
                   <span id="likebtn" style={{color:'black',cursor:'pointer',outline:'0px'}}> <div id="likebtn" class="btn" id="green">
                    <i id='likebtn1' class="fa fa-thumbs-up fa-lg" style={{color:'blue'}} aria-hidden="true"></i></div>
                    {this.state.like}</span>
                    </div></a>
                    <br/><br/>

                </div>:<div>
                <a><div  id="likebtn" class="float3"  onClick={()=>this.like()}>
                <span id="likebtn" style={{color:'black',cursor:'pointer',outline:'0px'}}> <div id="likebtn" class="btn" id="green">
                    <i id='likebtn1' class="fa fa-thumbs-up fa-lg" style={{color:'#aaa'}} aria-hidden="true"></i></div>
                 {this.state.like}</span>
                 </div></a>
                 <br/><br/> 
         


                </div>   
            }
              
              {(this.state.dislikeCount.includes(localStorage.getItem('username')))?
              <div>
                <a id="disLikebtn" onClick={()=>this.dislike()}> 
                 <div id="disLikebtn" class="float4">
                  <span id="disLikebtn" style={{color:'black',cursor:'pointer'}}>
                       <div id="disLikebtn" class="btn" id="red">
                           <i class="fa fa-thumbs-down fa-lg" id='dislikebtn' style={{color:'blue'}} aria-hidden="true"></i>
                           </div>
                           {this.state.dislike}
                </span>
                </div></a>

              </div>:<div>

                <a id="disLikebtn" onClick={()=>this.dislike()}> 
                 <div id="disLikebtn" class="float4">
                  <span id="disLikebtn" style={{color:'black',cursor:'pointer'}}>
                       <div id="disLikebtn" class="btn" id="red">
                           <i class="fa fa-thumbs-down fa-lg" id='dislikebtn' style={{color:'#aaa'}} aria-hidden="true"></i>
                           </div>
                           {this.state.dislike}
                </span>
                </div></a></div>
                }

                <Navbar/><br/><br/><br/>
                <div class="shadow-lg bg-white rounded" style={{width:'75%',heigth:"5%",marginLeft:'10%',marginTop:"2%",marginBottom:"5%",padding:'auto',backgroundColor:"#c0c0c0"}}>
                <div  class="card" style={{width:"100%",paddingLeft:'4%',paddingRight:'4%',paddingTop:"4%",paddingBottom:'4%',border:'none'}} id="content" name="content">
                
                </div>
                 </div>

            </div>
        );
    }
}
export default viewWiki;
