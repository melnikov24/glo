 const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
 function apiSearch(event) {
     event.preventDefault();
     const searchText = document.querySelector(".form-control").value;
     const server = 'https://api.themoviedb.org/3/search/multi?api_key=360e2c574804ff5a45cef3fa4bf67af8&language=ru&query=' + searchText;
     movie.innerHTML = "Загрузка";
     requestApi("GET", server)
     .then(function(result){
        const output = JSON.parse(result);
       
        let inner = '';

        output.results.forEach(function (item){
            let dateItem = item.release_date || item.first_air_date;
           let nameItem = item.name || item.title;
         
         
          inner += `<div class="col-5">${nameItem +' ' + dateItem}</div>`;
        });

        movie.innerHTML = inner;
     })
     .catch()
     ;


 }

 searchForm.addEventListener('submit', apiSearch);

 function requestApi(method, url) {
     return new Promise (function (resolve, reject){
        const request = new XMLHttpRequest() ;
        request.open(method, url);
        request.addEventListener('load', function(){
          if (request.status !== 200){
            reject({status: request.status});
            return
          }

          resolve(request.response)
        });
        request.addEventListener('error', function(){
             reject({status: request.status});
             
        });
        request.send();
     });
     
    }

 