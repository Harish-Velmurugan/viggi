import React from "react";
import Navbar from "../Navbar/nav";
import { Link } from "react-router-dom";
import "./Wiki.css";
import axios from 'axios';
import { Modal } from "react-bootstrap";
import { Redirect } from "react-router";


class Wiki extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      value:'',
      redirect:false,
      draft:[],
      published:[],
      allWiki:[],
      random:['Why still waiting? Improve your knowledge in','Learn some new concepts and get thorough in','Spend your time here in learning about the domain'],
      };
 
    this.handleClose = this.handleClose.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.createWiki = this.createWiki.bind(this);
    this.setDetail=this.setDetail.bind(this);
  }

  setDetail(){
    // document.getElementBy('allW').innerHTML="hey";
    console.log("----")
  }
  handleClose() {
    this.setState({ show: !this.state.show });
  }
  handleModal() {
    this.setState({ show: !this.state.show });
  }
  handleModal1() {
    this.setState({ show1: !this.state.show1 });
  }

 createWiki(){
   axios.post("/wiki/createWiki/"+localStorage.getItem("username")+"/")
   .then((res=>{
     if(res.status==200){
       this.setState({'value':res.data.value})
       this.setState({'redirect':true})

    }
     console.log(res.data.value);
   })
   );
 }
 componentDidMount(){
   axios.get("/wiki/draft/"+localStorage.getItem('username')+"/")
   .then((res=>{
    this.setState({'draft':res.data})
  })
  );

  axios.get("/wiki/published/"+localStorage.getItem('username')+"/")
  .then((res=>{
   this.setState({'published':res.data})
 })
 );
  axios.get("/wiki/allWiki/")
  .then((res1=>{
    this.setState({allWiki:res1.data})
    console.log(res1.data)
  }))
 }
    render() {  
      console.log(this.state.allWiki)
      if(this.state.redirect){
        this.setState({'redirect':false})
        return  <Redirect to={{pathname:"/createWiki", state:{query:this.state.value}}} ></Redirect>;

      } 
        return (
          <div>
              <Navbar/><br/><br/><br/><br/>
              <Modal show={this.state.show}>
         <Modal.Header>
         <Modal.Title>Share Your Knowledge here...</Modal.Title>
         </Modal.Header>
         <Modal.Body>
         <strong class="mx-auto">You can create a wiki page and share your knowledge on any domain that your are expert in.</strong>
         <strong class="mx-auto">You can edit save and publish that.</strong>
         {/* <strong class="mx-auto">You can create a wiki page and share your knowledge on any domain that your are expert in.</strong> */}
 


         </Modal.Body>
         <Modal.Footer>
          {/* <Link  to={{pathname: "/createWiki",state:{query:this.state.value}}}> */}
          <button class="btn btn-primary ml-3" onClick={()=>{this.createWiki()}}>Agree</button>
          {/* </Link> */}
           <button class="btn btn-primary" onClick={()=>{this.handleModal()}}>Cancel</button>
          
         </Modal.Footer>
       </Modal>



              

        <div className="row">
         <div className="col-5 col-md-3 siebar" style={{ marginTop: "0rem", marginLeft: "3rem",minWidth:'20rem' }}>
            <div className="card" style={{ marginLeft: "" }}>
              <div className="card-header text-white " style={{ backgroundColor: "#323754" }}>
                WIKI
              </div>
              <div className="card-body" style={{ paddingLeft: "14pt", alignItems: "centre" }}>
                <center>
                <button type="button" class="btn btn-primary btn-rounded"  onClick={()=>{this.handleModal()}}>Create Wiki <i class="fa fa-pencil-square ml-1"></i></button>
                 </center>
              </div>
            </div><br/>
            <div id="accordion">
            <div className="card" style={{ marginLeft: "" }}>
            <div class="card-heade r" id="headingOne">
              <div className="card-header text-white " style={{ backgroundColor: "#323754" }}>
                Continue your work
                <i class="fa fa-plus float-right" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" aria-hidden="true"></i>

              </div>
            
              <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
      <div class="card-body">
      {Object.keys(this.state.draft).length==0?<strong>You have no work to continue with</strong>:
     <div>
     {this.state.draft.map((draft, index) => (
      <div> 
     <span class="dot"></span>
    {draft.title==null?
    <span> 
    &nbsp;<Link  to={{ pathname: "/editWiki", state: { query: draft.id } }}>
    Untitled Wiki
     </Link>
     </span>:
       <span>
       &nbsp;<Link  to={{ pathname: "/editWiki", state: { query: draft.id } }}>
            {draft.title}</Link>
        </span>
     }

    </div>
      ))}
      </div>
    }
      </div>
    </div>
  
              <div className="card-header text-white " style={{ backgroundColor: "#323754" }}>
                Published
                <i class="fa fa-plus float-right" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo" aria-hidden="true"></i>
             </div>
             
             <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
      <div class="card-body">
      {Object.keys(this.state.published).length==0?<strong>You have not yet published anything.</strong>:
     <div>
     {this.state.published.map((published, index) => (
      <div> 
     <span class="dot"></span>
    {published.title==null?
    <span> 
    &nbsp;<Link  to={{ pathname: "/editWiki", state: { query: published.id } }}>
    Untitled Wiki
     </Link>
     </span>:
       <span>
       &nbsp;<Link  to={{ pathname: "/editWiki", state: { query: published.id } }}>
            {published.title}</Link>
        </span>
     }

    </div>
      ))}
      </div>
    }



     </div>
      </div>
              </div>

              </div>

            </div><br/>
          </div>
        
  <div class="col-12 col-md-8" >

    
  <div class="row">
      {this.state.allWiki.map((allWiki, index) => (
  <Link style={{textDecoration:'none'}} to={{pathname:"/viewWiki",state:{query:allWiki.id}}}>
  <div class="col-sm-6 mb-3">
    <div class="card box2" style={{transition: "1s"}}>

      <div class="card-body">
      
          {/* {allWiki.title.length>75?   */}
          {/* <strong><h5 class="card-title" style={{color:'blue'}}>{allWiki.title.split("",65)}.....</h5></strong> */}
          <strong><h5 class="card-title" style={{color:'blue'}}>{allWiki.title}</h5></strong>
         {/* }  */}
         
         {/* {Math.floor((Math.random() * 5) + 1)}          */}
       <p style={{color:'black'}}>{this.state.random[Math.floor((Math.random() * this.state.random.length))]} {allWiki.domain}</p>

         <Link class="tag" style={{textDecoration:'none',color:'white',bottom:'5px',position:'absolute'}}>{allWiki.domain}</Link>

      <div class="float-right" style={{textDecoration:'none',fontSize:'12px',color:'#aaa'}}>Last edit by {allWiki.lastEdit}</div>  
          
        
      </div>
   
    </div>
 
  
  </div>
  
</Link>

      ))}
</div>
 
{/* ))} */}
 
    
    </div>
   
</div>

</div>


        );
        }


}
export default Wiki;
