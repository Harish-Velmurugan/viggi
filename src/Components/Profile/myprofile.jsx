import React from 'react';
import Axios from 'axios'
import Name from './name.svg';
import Points from './points.svg';
import School from './school.svg';
import Skills from './skills.svg';
import Email from './email.svg';
import Navbar from '../Navbar/nav';
import { Redirect,Link } from 'react-router-dom';

class MyProfile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // profiledetails:{
            //     personal : {id:'1', name:'Naveen Rathnam S',email:'naveenrathnam99@gmail.com',skills:'JAVA,PYTHON',education:'B.E.Computer Science',points:'500pts',image:'./profilepic.jfif'},
            //     problemsinvolved : [
            //         {id:'1',title:'Diminishing the Transmission of COVID-19',review:'Winner',submittedDate:'Jun 15 2020'},
            //         {id:'2',title:'Fonterra Challenge: Sustainable Butter Mini-Dish',review:'',submittedDate:'May 5 2020'},
            //         {id:'3',title:'Diminishing the Transmission of COVID-19',review:'Winner',submittedDate:'Jun 15 2020'},
            //         {id:'4',title:'Innovative Transitional Hybrid Power Plan',review:'',submittedDate:'Nov 02 2019'},            
            //     ],
            //     problemposted : [
            //         {id:'1',title:'Reconstituted Paediatric Powders',amount:'10000 rs',postedDate:'May 5 2020'},
            //         {id:'2',title:'Early Signs of Pending Pandemic',amount:'5000 rs',postedDate:'Nov 02 2019'},
            //     ]
            // },

            //problemsinvolved:[],
            //problemsposted:[],
            personaldetails:[],
            professionaldetails:[],
            email:''
        }
    }

    componentWillMount(){

  
      Axios.get(`/users/v1/users/profile/1/`)
      .then((response) => {

        var dat = response.data
        //this.setState({problemsinvolved:dat[0]})
          this.setState({
            
            //problemsposted:dat[1],
            personaldetails:dat[2],
            professionaldetails:dat[3],
            email:dat.email,
          })
          
        }
        )
    }

    render() { 
        var personaldetails = this.state.personaldetails;
        var professionaldetails = this.state.professionaldetails;
        //var problemsinvolved = this.state.problemsinvolved;
        //var problemsposted = this.state.problemposted;

        return ( 
        <div>
          <Navbar/>
        <div className="profile m-5 pt-3">
        <div className="row mt-5 ml-5">
          <div className="col-sm-3  border-right">
            <div className="image  p-4">
              <img src={personaldetails.img} className="img-thumbnail" alt="Cinque Terre" width="130px" height="100px" />
            </div>
            <div className="details">
              <table style={{width: '100%', fontSize: '15px', fontWeight: 600}}>
                <tbody><tr>
                    <td><h4 style={{fontWeight: 700}}><img src={Name} alt="profile pic"/> {personaldetails.firstname+personaldetails.lastname}</h4></td>
                  </tr>
                  <tr>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td><p><img src={Email} /> {this.state.email}</p><p /></td>
                  </tr>
                  <tr>
                    <td><p><img src={Skills} /> {professionaldetails.specialization}</p></td>
                  </tr>
                  <tr>
                    <td><p><img src={School} /> {professionaldetails.qualification}</p></td>
                  </tr>
                  <tr>
                    <td><p><img src={Points} /> {/*personal.points*/}</p></td>
                  </tr>
                  <tr>
                    <td> <Link to={{ pathname: '/update', state: { sign: 'false'}}}>
                      <button className="btn float-right btn-sm btn-info" style={{backgroundColor: '#33adff'}}>Edit Profile
                      </button></Link></td>
                  </tr>
                </tbody></table>
            </div>
          </div>
          <div className="col-sm-9">
            <div className="problemsinvolved table-hover" style={{width: '70%'}}>
              <h5>Particpated Problems</h5>
              <ul className="list-group list-group-flush">
                {
                    problemsinvolved.map((probleminvolved,index)=>{
                        return(
                            <li key={index} className="list-group-item d-flex justify-content-between">
                                {probleminvolved.title}
                                <span className="badge badge-primary badge-pill">{/*probleminvolved.review*/}</span>
                                <span>{probleminvolved.deadline}</span>
                            </li>
                        )
                    })
                }
                
              </ul>
            </div>
            <div className="problemsposted mt-5" style={{width: '70%'}}>
              <h5>Posted Problems</h5>
              <ul className="list-group list-group-flush">
                  {
                      problemsposted.map((problemposted,index) => {
                          return(
                            <li key={index}className="list-group-item d-flex justify-content-between">
                            {problemposted.title}
                          <span >{/*problemposted.amount*/}</span>
                            <span>{problemposted.soln_date}</span>
                          </li>
                          )
                      })
                  }
              </ul>
            </div>
          </div>
        </div>
      </div> 
      </div>
      );
    }
}
 
export default MyProfile;