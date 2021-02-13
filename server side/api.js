const express = require('express');
const fetch = require("node-fetch");
const path = require('path');

require('dotenv').config();

const app = express();


const apikey = '?api_key=' + process.env.API_KEY;
const mainUrl = "https://api.themoviedb.org/3";
const getMoviesUrl = mainUrl + '/discover/movie'+ apikey + '&language=en-US&page=1&with_genres=';
const getGenresUrl = mainUrl + '/genre/movie/list'+ apikey + '&language=en-US&page=1';
const dt = apikey + '&language=en-US';
const vid = `/videos${apikey}&language=en-US`;
const movieDetails = mainUrl + '/movie/';
const movieVideos = `${mainUrl}/movie/`;
const search = mainUrl + '/search/multi' + apikey + '&language=en-US&query=';
const params = '&page=1&include_adult=false';

const ASSETS_PATH = path.resolve(__dirname, '..', 'public');

async function getGenres() {
    const genres = await fetch(getGenresUrl)
        .then((response) => response.json())
        .then((data) => data.genres)
        .catch((err) => err);
    return await genres;
};

async function getMovies(id) {
    const list = await fetch(getMoviesUrl + id + params)
        .then(response => response.json())
        .then(data => data.results)
        .catch((err) => err);
    return await list;
}

async function getMovieVideos(id) {
    const videos = await fetch(movieVideos + id + vid)
        .then(response => response.json())
        .then(data => data.results)
        .catch((err) => err);
    return await videos;
}

async function getMovieDetails(id) {
    const movie_details = await fetch(movieDetails + id + dt)
        .then(response => response.json())
        .then(data => data)
        .catch((err) => err);
    return await movie_details;
}

async function searchMovies(term) {
    const results = fetch(search + term + params)
        .then(response => response.json())
        .then(data => data.results)
        .catch((err) => err);
    return await results;
}

app.get('/genres', async function (req, res){
    
    let genres = await getGenres();
    

    res.writeHead(200, {
        "Content-Type": "application/json",
        "Cache-Controm": "no-cache"
    }); 
    res.end(JSON.stringify(genres));
});

app.get('/search_movie/key_word=:term', async function (req, res){
    const term = req.params.term;
    let serchedMovies = await searchMovies(term);

    res.writeHead(200, {
        "Content-Type": "application/json",
        "Cache-Controm": "no-cache"
    }); 
    res.end(JSON.stringify(serchedMovies));
});

app.get('/movie_informations/id=:id', async function (req, res){
    const id = req.params.id;
    let movie_info = await getMovieDetails(id);

    res.writeHead(200, {
        "Content-Type": "application/json",
        "Cache-Controm": "no-cache"
    }); 
    res.end(JSON.stringify(movie_info));
});

app.get('/movie_videos/id=:id', async function (req, res){
    const id = req.params.id;
    let movie_video = await getMovieVideos(id);

    res.writeHead(200, {
        "Content-Type": "application/json",
        "Cache-Controm": "no-cache"
    }); 
    res.end(JSON.stringify(movie_video));
});

app.get("/movies&with_genre=:id", async function (req, res){
    const id = req.params.id;

    let movies = await getMovies(id);
    
    res.writeHead(200, {
        "Content-Type": "application/json",
        "Cache-Controm": "no-cache"
    });
    res.end(JSON.stringify(movies));
});

app.use(express.static(ASSETS_PATH));

module.exports = app;