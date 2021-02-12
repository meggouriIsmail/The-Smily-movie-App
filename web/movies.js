// event listner to content loaded
document.addEventListener("DOMContentLoaded", main, false);

const form = document.querySelector('#form');
const root = document.querySelector('.root');
form.addEventListener('submit', searchMovies);
const URL = document.location.origin;
console.log(URL);
function main() {
    
    // Get genres
    (function getGenres() {
        fetch(URL+'/genres')
            .then(response => response.json())
            .then(data => data.map(function (genre) {
                if (genre.name.toLowerCase() !== "documentary") {
                    displayData(genre.id, genre.name);
                }
            }));
    })();
    
    function displayData(id, name) {
    
        const row = document.createElement('DIV');
        
        row.innerHTML = '';
        row.classList.add('row_movies');const containerGenres = document.createElement('DIV');
        const h2 = document.createElement('H2');
        const section = document.createElement('SECTION');
        const container = document.createElement('DIV');
        
        containerGenres.classList.add('movies_by_genres');
        h2.classList.add('genre_title');
        section.classList.add('movie_section');
        container.classList.add('container');
        h2.innerText = name;
        
    
        h2.setAttribute('data-id', id);
        container.appendChild(row);
        section.appendChild(container);
        containerGenres.appendChild(h2);
        containerGenres.appendChild(section);
        
        root.appendChild(containerGenres);
    
        moviesView(id, row);
    }
    
    
    
    function moviesView(id, row = "") {
        const img = document.createElement('IMG');
        const container = document.createElement('DIV');
        const divInfo = document.createElement('DIV');
        const div = document.createElement('DIV');
        const holder = document.createElement('DIV');
        const span = document.createElement('SPAN');
        const h3 = document.createElement('H3');
        var content = "";
    
        fetch(URL+'/movies&with_genre='+id)
            .then(response => response.json())
            .then(data => { data.map(movie => {
                const movieTitle = movie.title.slice(0, 9);
                container.classList.add('container_bloc');
                divInfo.classList.add('info');
                div.classList.add('movie_info');
                h3.classList.add('movie_title');
                span.classList.add('vote');
                let src = (movie.poster_path ? "https://image.tmdb.org/t/p/w300/" + movie.poster_path : "movie_slate.jpg")
                img.src = src;

                h3.innerText = (movie.title.length > 10 ? movieTitle + ' ...' : movie.title);
                span.textContent = movie.vote_average;

                h3.setAttribute('title', movie.title);
                h3.setAttribute('data-id', movie.id);
                div.appendChild(h3);
                div.appendChild(span);
                divInfo.appendChild(img);
                divInfo.appendChild(div);
                container.appendChild(divInfo);
                holder.appendChild(container);

                content += holder.innerHTML;
            });
            row.innerHTML = content;
        });
    }
    setTimeout(() => {
        var scriptElement = document.createElement('script');
        scriptElement.type = 'text/javascript';
        scriptElement.src = 'movie_details.js';
        document.body.appendChild(scriptElement);
    }, 3000);
}

function searchMovies(e) {
    e.preventDefault();

    const rootSearch = document.querySelector('.root_search');
    const input = document.querySelector('input');

    const term = input.value;

    fetch("/search_movie/key_word=" + term)
        .then(response => response.json())
        .then(data => {
            let content = "";
            root.innerText = '';
            rootSearch.innerText = '';
            data.map(movie => {
                let movieTitle;
                let title;
                if (movie.name) {
                    movieTitle = movie.name.slice(0, 9);
                    title = movie.name;
                } else if (movie.title) {
                    movieTitle = movie.title.slice(0, 9)
                    title = movie.title;
                }

                const mainTitle = (title.length > 10 ? movieTitle + ' ...' : title);

                src = (movie.poster_path ? "https://image.tmdb.org/t/p/w300/" + movie.poster_path : "movie_slate.jpg");

                content += `
                    <div class="container_bloc">
                        <div class="info">
                            <img src="${src}">
                            <div class="movie_info">
                                <h3 class="movie_title" title="${title}">${mainTitle}</h3>
                                <span class="vote">${movie.vote_average}</span>
                            </div>
                        </div>
                    </div>
                `
            });
            rootSearch.innerHTML = content;
        });
}
