
searchFormBtn.addEventListener('click', () => {
  
  location.hash = '#search=' + searchFormInput.value;
})
trendingBtn.addEventListener('click', () => {
    location.hash='#trends'
})
arrowBtn.addEventListener('click', () => {
  history.back();
  input.value = "";
  //location.hash = '#home'
  
})
window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
  console.log({ location });
  
  if (location.hash.startsWith('#trends')) {
    trendsPage();
  } else if (location.hash.startsWith('#search=')) {
    searchPage();
  } else if (location.hash.startsWith('#movie=')) {
    movieDetailsPage();
  } else if (location.hash.startsWith('#category=')) {
    categoriesPage();
  } else {
    homePage();
  }
  window.scrollTo(0, 0);
}


function homePage() {
    console.log('Home!!');
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');
  containerCarousel.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

getTrendingMoviesPreview();
getCategoriesPreview();
}

function categoriesPage() {
    console.log('categories!!');
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');
  containerCarousel.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

  const [endpoint, categoryData ]  = location.hash.split('=');
  const [id, categoryName] = categoryData.split('-');
  
  headerCategoryTitle.innerHTML = categoryName;
  getMoviesByCategory(id);
  
}

function movieDetailsPage() {
    console.log('Movie!!');

    headerSection.classList.add('header-container--long');
    //headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
  searchForm.classList.add('inactive');
  containerCarousel.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
  movieDetailSection.classList.remove('inactive');
  const [endpoint, movieId] = location.hash.split('=');
  getMoviesById(movieId)
}

function searchPage() {
    console.log('Search!!');
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');
  containerCarousel.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
  const [endpoint, query] = location.hash.split('=');
  getMoviesBySearch(query)
}

function trendsPage() {
    console.log('TRENDS!!');
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');
  containerCarousel.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');
  headerCategoryTitle.innerHTML = "Tendencias";
  getTrendingMovies();
}



// CARRUSEL
document.addEventListener('DOMContentLoaded', function () {
  var slideIndex = 0;
  var slides = document.querySelectorAll('.carousel-slide img');
  var dotsContainer = document.querySelector('.carousel-dots');
  var dots = [];

  // Crea los puntos de navegación
  slides.forEach(function (_, index) {
    var dot = document.createElement('span');
    dot.classList.add('carousel-dot');
    dotsContainer.appendChild(dot);
    dots.push(dot);

    // Agrega evento click a los puntos para navegar a la imagen correspondiente
    dot.addEventListener('click', function () {
      showSlide(index);
    });
  });

  // Muestra la diapositiva inicial
  showSlide(slideIndex);

  // Función para mostrar una diapositiva específica
  function showSlide(index) {
    if (index < 0) {
      index = slides.length - 1;
    } else if (index >= slides.length) {
      index = 0;
    }

    slideIndex = index;

    // Oculta todas las imágenes y desactiva todos los puntos
    slides.forEach(function (slide) {
      slide.style.display = 'none';
    });
    dots.forEach(function (dot) {
      dot.classList.remove('active');
    });

    // Muestra la imagen correspondiente y activa el punto correspondiente
    slides[slideIndex].style.display = 'block';
    dots[slideIndex].classList.add('active');
  }

  // Cambia de diapositiva cada 3 segundos
  setInterval(function () {
    showSlide(slideIndex + 1);
  }, 3000);
});
