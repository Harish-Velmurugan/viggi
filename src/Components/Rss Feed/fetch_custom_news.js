
export function fetchCustomNews(source, relevance){
    //return the actual action to do
    return function(dispatch){
      fetch("https://newsapi.org/v1/articles?source="+ source+"&sortBy="+ relevance +"&apiKey=6b0c7f47509b41e6b331ae5fc5315612")
      .then(res => {
          return res.json();
          
      })
      .then(res => {
       // console.log(res)
        dispatch({type:"FETCH_CUSTOM_NEWS", payload: res.articles});
      })
      .catch(err => {
          console.log(err);
      })

   }
}