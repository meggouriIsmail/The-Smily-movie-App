
const posters = document.querySelectorAll(".info");

posters.forEach(function getMovieId(moviePoster) {
    moviePoster.addEventListener('click', function clicked() {
        const id = moviePoster.childNodes[1].firstElementChild.getAttribute('data-id');
        window.location = "/movie-details.html?id="+id;
    });
});

document.addEventListener("DOMContentLoaded", main, false);

const videoContainer = document.querySelector('.box');
const description = document.querySelector('.description-text');
const poster = document.querySelector('.poster');
const title = document.querySelector('.title');
const vote = document.querySelector('.vote');
const backdrop = document.querySelector('.backdrop');
const page = document.querySelector('.page');

const backdropPath = "https://image.tmdb.org/t/p/original";
const posterPath = "https://image.tmdb.org/t/p/w300";
const URL_M = document.location.origin;


function main() {
    
    const id = window.location.href.split('=')[1];
    // Get The video
    getvideos(id);
    function getvideos(id) {
        fetch(URL_M + '/movie_videos/id=' + id)
        .then(response => response.json())
        .then(function (video) {
            const key = video[0]['key'];
            videoContainer.src = "https://www.youtube.com/embed/"+key;
        });
    };
    
    moviesDetails(id)
    function moviesDetails(id) {
        fetch(URL_M + '/movie_informations/id=' + id)
        .then(response => response.json())
        .then(function (movie) {
            backdrop.src = backdropPath + movie['backdrop_path'];
            poster.src = posterPath + movie['poster_path'];
            title.innerHTML = movie['original_title'];
            description.innerHTML = movie['overview'];
            vote.innerHTML = "vote average: "+ " " + movie['vote_average'];
        });
    }
}

window.addEventListener('resize', function () {
    if (window.document.body.offsetWidth <= 970){
        page.classList.add('page-sm');        
        page.style.backgroundImage = "url(" + poster.src +")";
    }else {
        page.classList.remove('page-sm');
        page.style.backgroundImage = "url()";
    }
})
