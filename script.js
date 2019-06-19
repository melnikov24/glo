 const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
 function apiSearch(event) {
     event.preventDefault();
     const searchText = document.querySelector(".form-control").value;
     const server = 'https://api.themoviedb.org/3/search/multi?api_key=360e2c574804ff5a45cef3fa4bf67af8&language=ru&query=' + searchText;
     requestApi("GET", server);


 }

 searchForm.addEventListener('submit', apiSearch);

 function requestApi(method, url) {
     const request = new XMLHttpRequest() ;
     request.open(method, url);
     request.send();

     request.addEventListener('readystatechange',  function(){
         if (request.readyState !== 4) return;
             
        if(request.status !== 200){
            console.log("error :" + request.status);
            return;
        } 

        const output = JSON.parse(request.responseText);
        console.log(output);
          let inner = '';

        output.results.forEach(function (item){
            let dateItem = item.release_date || item.first_air_date;
           let nameItem = item.name || item.title;
         
         
          inner += `<div class="col-5">${nameItem +' ' + dateItem}</div>`;
        });

        movie.innerHTML = inner;

     });
 }