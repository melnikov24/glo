const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
const urlposter= 'https://image.tmdb.org/t/p/w500';
 function apiSearch(event) {
     event.preventDefault();
     const searchText = document.querySelector(".form-control").value;
     const server = 'https://api.themoviedb.org/3/search/multi?api_key=360e2c574804ff5a45cef3fa4bf67af8&language=ru&query=' + searchText;
     movie.innerHTML = "Загрузка";

    fetch(server)
      .then(function(value){
        if (value.status !== 200) {
          return Promise.reject(value);
        }
          return value.json();
      })
      .then(function(output){
        console.log('output: ', output);
        let inner = '';

        output.results.forEach(function (item){
            let dateItem = item.release_date || item.first_air_date;
           let nameItem = item.name || item.title; 

           if (item.poster_path == null) {
            inner += `
            <div class="col12 col-md-4 col-xl-3">
            <h5>нет картинки</h5>
            <h5>${nameItem +' ' + dateItem}</h5>
            </div>
            `;
            return inner;
           }
         
          inner += `
          <div class="col12 col-md-4 col-xl-3">
           <img src="${urlposter + item.poster_path}" alt="${nameItem}">
          <h5>${nameItem +' ' + dateItem}</h5>
          </div>
          `;
          
        });

        movie.innerHTML = inner;
      })
      .catch(function(reason){
        movie.innerHTML = 'Упс, ошибка';
        console.error('error ' + reason.status);
      })

     

 }

 searchForm.addEventListener('submit', apiSearch);

 