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
    // using someone else's API key
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
                            <a onclick="movieSelected('${movie.id}')" class="btn btn-secondary" href="#"> Movie Details </a>
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