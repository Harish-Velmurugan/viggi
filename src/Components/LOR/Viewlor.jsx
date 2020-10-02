import React from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet ,Image} from '@react-pdf/renderer';
import n1 from "./Capture.png";
import "./lor.css";

const styles = StyleSheet.create({
    body: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingHorizontal: 20,
      },
      title: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Oswald'
      },
      author: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 40,
      },
      subtitle: {
        fontSize: 15,
        margin: 12,
        fontFamily: 'Times-Roman'
      },
      subject: {
        fontSize: 14,
        fontWeight:"bold",
        margin: 12,
        marginTop:8,
        font:'bold',
        fontFamily: 'Times-Roman'
      },

      text: {
        marginLeft: 12,
        marginRight:12,
        marginBottom:6,
        marginTop:6,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman',
      },
      text1: {
        marginLeft: 12,
        marginRight:12,
        marginBottom:2,
        marginTop:2,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman',
      },
      text3: {
        marginLeft: 17,
        marginRight:12,
        marginBottom:2,
        marginTop:0,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman',
      },
       text2: {
        color:'blue',
        marginLeft: 12,
        marginRight:12,
        marginBottom:2,
        marginTop:2,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman',
      },
    //   text1: {
    //     marginLeft: 12,
    //     marginRight: 12,
    //     marginBottom:6,
    //     fontSize: 14,
    //     textAlign: 'justify',
    //     fontFamily: 'Times-Roman',
    //   },
      image: {
        marginVertical: 15,
        marginHorizontal: 100,
      },
      image1: {
        marginRight:12,
        height: 75,
        width: 80,
      },
      header: {
        fontSize: 12,
        marginBottom: 15,
        textAlign: 'center',
        color: 'grey',
      },
      pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
      },
      br:{
        
      },
      right:{
          fontSize: 15,
          marginRight:12,
          textAlign: 'right',
          fontFamily: 'Times-Roman',
      },

       
  isapproved: {
  
    color:'blue',
    textAlign:'center',
    paddingLeft:20,
    // padding:11,
    paddingTop:25,
    // paddingRight:20,
    fontSize:10,
    border:'0.4 solid blue',
     
    // webkitMaskImage:"url('./grunge.png')",
    backgroundImage:"url('./grunge.png')",
  // WebkitMaskImage: 'url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/8399/grunge.png")',
    // webkitMaskPosition: '13 6',
    transform: 'rotate(-12deg)',
    borderRadius: 200,
    display:'Inline-Block',
    minHeight:90, 
    minWidth:90,
    maxWidth:90,
  },
   
   
  });

  
class Viewlor extends React.Component {
    constructor(props) {
          super(props)
          this.state = {
            obj:this.props.location.state.obj,
        }
        this.replace=this.replace.bind(this);
    }
    replace(index,replacement){
      return this.substr(0, index) + replacement + this.substr(index + replacement.length);
    }
    render(){
        return(
            // <div>
  <PDFViewer style={{width:"100%", height:"100vh",}} >
  <Document>
    <Page style={styles.body}>
      <Text style={styles.header} fixed>
        
      </Text>
      <Text style={styles.title}>Letter of Recommendation</Text>
      <Text style={styles.right}>{this.state.obj.date} </Text>
      
      <Text style={styles.subtitle}>
       Dear Sir/Madam,
 
      </Text>

      <Text style={styles.subject}>
       Sub: Letter of recommendation for the post of {this.state.obj.aDesignation}
 
      </Text>
      <Text style={styles.text}>
      &nbsp;&nbsp;&nbsp;It is my pleasure to strongly recommend {this.state.obj.aName} for {this.state.obj.arequestingFirm}.
        </Text>
        <Text style={styles.text}>
         &nbsp;&nbsp;&nbsp;I am {this.state.obj.sname}, working as {this.state.obj.sDesignation} at {this.state.obj.sOrganization}.
        I have {this.state.obj.yoe} years of experience in the  {this.state.obj.sIndustry} sector and have seen many young professionals come and go.{this.state.obj.aName} is 
        an individual who stands out from the crowd through {this.state.obj.gender=="Male"?" his ":" her "} extradinory contributions.I worked with {this.state.aName}
        through the Open Innovation Platform "Vignatree".The name of the project {this.state.obj.aName} was involved in is as given below. 
        
       </Text>
       <Text style={styles.text3}>
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.{this.state.obj.projectTitle}
      </Text>
      <Text style={styles.text}>
       
        &nbsp;&nbsp;&nbsp;{this.state.obj.aName} displayed a thorough understanding of {this.state.obj.askills.includes(",")?   <Text>{this.state.obj.askills.substring(0,this.state.obj.askills.lastIndexOf(","))+' & '+this.state.obj.askills.substring(this.state.obj.askills.lastIndexOf(",")+ 1)} </Text>:<Text>{this.state.obj.askills}</Text>}.
      When we first met, I was immediately impressed with {this.state.obj.aName} and during the time we worked together,{this.state.obj.gender=="Male"?" his ":" her "}
      understanding of the project scope outgrew that of {this.state.obj.gender=="Male"?" his ":" her "} peers.
      </Text>

      <Text style={styles.text}>
       
      &nbsp;&nbsp;&nbsp; {this.state.obj.rReason}    
      
     </Text>
     <Text style={styles.text}>
     &nbsp;&nbsp;&nbsp;It’s not just {this.state.obj.gender=="Male"?" his ":" her "} technical skills that impressed me.{this.state.obj.aName} was a joy to work with because of 
       {this.state.obj.gender=="Male"?" his ":" her "} amazingly positive attitude and {this.state.obj.trait1}.
       {this.state.obj.gender=="Male"?"His ":"Her "} {this.state.obj.trait2} and {this.state.obj.trait3} were also necessary and valued not just by myself, but by {this.state.gender=="Male"?" his ":" her "} peers, who often relied on 
       {this.state.obj.gender=="Male"?" him ":" her "} to get the job done.     
    </Text>


    <Text style={styles.text}>
     &nbsp;&nbsp;&nbsp;I am absolutely confident that {this.state.obj.aName} would be a great fit for your company.Not only 
     will {this.state.obj.gender=="Male"?" he ":" she "} bring the kind of skills and experiences you’re looking for in an applicant, but also {this.state.obj.gender=="Male"?" he ":" she "} will quickly become an asset and help your 
     firm grow in any way {this.state.obj.gender=="Male"?" he ":" she "} can.  
    </Text>

    <Text style={styles.text}>
    &nbsp;&nbsp;&nbsp;If you need more information or specific examples, please do not hesitate to contact me through my email-id:{this.state.obj.semailId} or hand phonenumber:{this.state.obj.smobileNumber}.As a recommendation letter likely only provides a snapshot 
    of {this.state.obj.gender=="Male"?" his ":" her "} talents and achievements, I would be happy to elaborate  further on my experience of working with {this.state.obj.gender=="Male"?" him ":" her "}.
        </Text>

        <Text style={styles.text1}>

&nbsp;
</Text>
        <Text style={styles.text1}>
  Sincerely,
  </Text>
  <Text style={styles.text1}>

  {this.state.obj.sname},
  </Text>
  <Text style={styles.text1}>

  {this.state.obj.sOrganization}.

        </Text>
        {this.state.obj.sLinkedIn!=''?
        <Text style={styles.text2}>
        ({this.state.obj.sLinkedIn})

      </Text>:""
    }


            
            {(this.state.obj.sSealName=='')?
           <Image
        style={{ height: "70px",
        width: "70px",marginLeft:"2%"}}
        src={this.state.obj.sSealImage}
      />:
      <Text style={styles.isapproved} >
      {this.state.obj.sSealName}
      </Text>
            }        


      <Text  style={styles.pageNumber} >
      VignaTree Inc, Chennai.
      </Text>
    </Page>
  </Document>
  </PDFViewer>

            // </div>

        );
    }
    

}
export default Viewlor;