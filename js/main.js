$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        
    // after submitting the search text's value, it will trigger function to get movies 
        let searchText = $('#searchText').val()
        getMovies(searchText)

        // stops form from submitting to an actual file
        e.preventDefault()
    })
})

function getMovies(searchText) {

    // communicate w axios API, if okay response will run
    // not my API key
    axios.get("https://api.themoviedb.org/3/search/movie?api_key=98325a9d3ed3ec225e41ccc4d360c817&language=en-US&query=" + searchText)
        .then((response) => {
            console.log(response)
            let movies = response.data.results // movies is the response in the 'results' within api
            let output = ''

            // iterate movies, and the values within 'index'
            $.each(movies, (index, movie) => {
                output += `
                    <div class="col-md-3 bg-light">
                        <div class="well text-center">
                            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                            <h5>${movie.title}</h5>
                            <a onclick="movieSelected('${movie.id}')" class="btn btn-secondary m-1 p-2" href="#">Movie Details</a>
                        </div>
                    </div>
                    `
            })

            $('#movies').html(output)
        })
        .catch((error) => {
            console.log(error)
        })
}

// save to local storage
function movieSelected(id) {

    // get key 'movieId' and set it to the 'id' value
    sessionStorage.setItem('movieId', id)
    window.location = 'movie.html'
    return false
}

function getMovie() {
    // get movie Id from local storage
    let movieId = sessionStorage.getItem('movieId')

    // not my API key - will need permission
    axios.get("https://api.themoviedb.org/3/movie/" + movieId + "?api_key=98325a9d3ed3ec225e41ccc4d360c817")
        .then((response) => {
            console.log(response)

            let movie = response.data //response of the api regarding 'data' object
            let output = `
                <div class="row">
                    <div class="col-md-4">
                        <img src="${movie.poster_path}" class="thumbnail">
                    </div>
                    <div class="col-md-8">
                        <h2>${movie.title}</h2>
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Genre:</strong> ${movie.genres[0].name}, ${movie.genres[1].name}</li>
                            <li class="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>
                            <li class="list-group-item"><strong>Rated:</strong> ${movie.vote_average}</li>
                            <li class="list-group-item"><strong>Runtime:</strong> ${movie.runtime}</li>
                            <li class="list-group-item"><strong>Popularity:</strong> ${movie.popularity}</li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="well">
                        <h3>Plot:</h3>
                        ${movie.overview}
                        <hr>
                        <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary">View IMDB</a>
                        <a href="index.html" class="btn btn-default">Go Back To Search</a>
                    </div>
                </div>
            `

            $('#movie').html(output);
        })
        .catch((error) => {
            console.log(error)
        })
}