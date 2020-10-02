import React, { useState, useEffect } from 'react';
//redux hooks
//import the action
import { useSelector, useDispatch } from "react-redux";
import { fetchCustomNews } from "./fetch_custom_news";
import './main.css'


const Main = () => {
    //news sources
    const [sources, setSources] = useState([]);
    //select source
    const [source, setSource] = useState("");
    //select relevance
    const [relevance, setRelevance] = useState("");

    //----- connect redux
    //here we get add the reducer that has the state we want
    const customNewsSelector = useSelector((state) => state.CustomSearch);
    //dispatch hook
    const dispatch = useDispatch();
    //action to dispatch
    const getCustomNews = (source, relevance) => dispatch(fetchCustomNews(source, relevance));

    //get the sources
    const getSources = () => {
        fetch("https://newsapi.org/v1/sources?")
        .then(res => {
            console.log(customNewsSelector.customNews);
            return res.json();
            
        })
        .then(response => {
            console.log(response);
            setSources(response.sources)
        })
    }



    //effect
    useEffect(()=>{
        getSources();
    }, [])


    const getNews = (e) => {
        console.log(source);
        e.preventDefault();
        if(source === "" || source === "nothing" ){
            console.log("There is no source selected");
        }else{
            getCustomNews(source, relevance);
            console.log(customNewsSelector.customNews)
        }
    }
    
    let news;
    if(customNewsSelector.customNews.length > 0){
      news =  <div className="news">
                    { customNewsSelector.customNews.map(function(x,index) {
                            return (
                                <div>
                              <div className="post" key={index}> 
                                <img src={x.urlToImage} alt="loading"
                                style={{ borderRadius: "50%", height: "50px", width: "60px" }} /> 
                                <div className="profile float-right p-1">
                                    <p style={{fontWeight:"bolder",fontSize:"10pt"}}>{x.title}</p>
                                    <a className="card-link" id={index} data-toggle="collapse" href="#demo">
                                            +show more</a>
                                        </div>
                                    
                                   <div id="demo"  class="collapse">          
                                        <p style={{fontStyle:"oblique ",fontSize:"10pt"}}>"{x.description}"</p>
                                    </div>
                                       
                               </div><hr></hr></div>
                            )
                        }) 
                    }
               </div>              
    
    }else{
        news = <p></p>
    }
    
    return(
        <React.Fragment>
            <div className="card  p-3 rssMain"  style={{textAlign:"center"}} >
            <section > 

                 <form onSubmit = {getNews} id="form">
                    <div className="form-control"style={{border:"none"}}>
                        <select onChange = {e => setSource(e.target.value)}>
                            <option value="nothing">Select an option...</option>
                            {
                                sources.map(source => {
                                    return(
                                        <option key={source.id} value={source.id}>{source.name}</option>
                                    )
                                })
                            }
                        </select>
                        <select onChange={e => setRelevance(e.target.value) }>
                            <option value="latest">Latest</option>
                            <option value="top">Top</option>
                        </select>
                        <input type="submit" value="Search" />
                    </div>
                 </form>   <br/><br/><br/><br/><br/></section>
                      {news}
                    
                     
                           
            
            </div>
        </React.Fragment>
    )   
}

export default Main;