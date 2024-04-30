const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  Headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  params: {
    'api_key': API_KEY,
  }
});
//Utils
function createMovies(movies, container) {
  container.innerHTML = "";
  movies.forEach(movie => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');
    movieContainer.addEventListener('click', () => {
      location.hash=`#movie=${movie.id}`
    })

    function mostrarEstrellas(vote_average) {
    let estrellasLlenas = Math.round(vote_average / 2);
    let estrellasVacias = 5 - estrellasLlenas;

    let estrellas = '★'.repeat(estrellasLlenas) + '☆'.repeat(estrellasVacias);

    return estrellas;
}

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute(
      'src',
      'https://image.tmdb.org/t/p/w300' + movie.poster_path,
    );
    const movieTitle = document.createElement('h5');
    movieTitle.classList.add('movieTitle')
    movieTitle.innerHTML = movie.title;
    const movieCalification = document.createElement('div');
    const vote_average= movie.vote_average
    movieCalification.innerHTML = mostrarEstrellas(vote_average);
    movieCalification.classList.add('movieCalification');

    movieContainer.appendChild(movieImg);
    movieContainer.appendChild(movieTitle);
    movieContainer.appendChild(movieCalification)
    container.appendChild(movieContainer);

  })
}
function createCategories(categories, container) {
  container.innerHTML = "";
  categories.forEach(category => {
    
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', 'id' + category.id);
    const categoryImg = document.createElement('img');
    categoryImg.setAttribute('src', `./img/${category.name}.png`)
      categoryTitle.addEventListener('click', () => {
        location.hash=`#category=${category.id}-${category.name}`
      })
    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);    
    categoryContainer.appendChild(categoryImg);
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);
  });
}
//Llamado a API
async function getTrendingMoviesPreview() {
  const {data} = await api('trending/movie/day');

  const movies = data.results;
  createMovies(movies, trendingMoviesPreviewList);
}

async function getCategoriesPreview() {
    const {data} = await api('genre/movie/list');
    const categories = data.genres;
    
  createCategories(categories, categoriesPreviewList)
}

async function getMoviesByCategory(id) {
  const { data } = await api('discover/movie', {
    params: {
      with_genres: id,
    },
  });

  const movies = data.results;
  createMovies(movies, genericSection);
}

async function getMoviesBySearch(query) {
  const { data } = await api('search/movie', {
    params: {
      query,
    },
  });

  const movies = data.results;
  createMovies(movies, genericSection);
}

async function getTrendingMovies() {
  const {data} = await api('trending/movie/day');

  const movies = data.results;
  createMovies(movies, genericSection);
}
async function getMoviesById(id) {
  const { data: movie } = await api(`movie/${id}`);
  const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
  headerSection.style.background = `
  linear-gradient(
    180deg,
    rgba(0,0,0,0.35) 19.27%,
    rgba(0,0,0,0) 29.17%
  ),
  url(${movieImgUrl})`;

  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent =movie.overview;
  movieDetailScore.textContent = (movie.vote_average * 10).toFixed(1) + "%";;

  createCategories(movie.genres, movieDetailCategoriesList);
  getRelatedMoviesId(id)
}
async function getRelatedMoviesId(id) {
  const { data } = await api(`movie/${id}/recommendations`);
  const relatedMovies = data.results;
  createMovies(relatedMovies, relatedMoviesContainer )
}