

export function fetchTech(){
    //return the actual action to do
        return function(dispatch){
            fetch("https://newsapi.org/v1/articles?source=the-verge&sortBy=top&apiKey=6b0c7f47509b41e6b331ae5fc5315612")
            .then(res => {
                return res.json();
                
            })
            .then(res => {
             // console.log(res)
              dispatch({type:"FETCH_TECH", payload: res.articles});
            })
            .catch(err => {
                console.log(err);
            })
      
         }
      
}