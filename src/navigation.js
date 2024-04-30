
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
document.addEventListener('DOMContentLoaded', async function () {
  const carousel = document.querySelector('.carousel-slide');
  const dotsContainer = document.querySelector('.carousel-dots');

  const slides = await getImagesPopular();
  slides.forEach(slide => {
    carousel.appendChild(slide);
  });

  const totalSlides = slides.length;
  let slideIndex = 0;
  let intervalId;

  // Oculta todas las imágenes excepto la primera
  slides.forEach((slide, index) => {
    if (index !== slideIndex) {
      slide.style.display = 'none';
    }
  });

  // Crea los puntos de navegación
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    dot.classList.add('carousel-dot');
    dot.dataset.index = i;
    dotsContainer.appendChild(dot);

    // Agrega evento click a los puntos para navegar a la imagen correspondiente
    dot.addEventListener('click', function () {
      showSlide(parseInt(this.dataset.index));
    });
  }

  // Activa el punto correspondiente a la imagen actual
  dotsContainer.children[slideIndex].classList.add('active');

  // Función para mostrar una diapositiva específica
  function showSlide(index) {
    if (index < 0 || index >= totalSlides || index === slideIndex) {
      return;
    }

    // Oculta la imagen actual y muestra la nueva imagen
    slides[slideIndex].style.display = 'none';
    slides[index].style.display = 'block';

    // Actualiza la clase active en los puntos de navegación
    dotsContainer.children[slideIndex].classList.remove('active');
    dotsContainer.children[index].classList.add('active');

    slideIndex = index;
  }

  // Función para avanzar automáticamente las diapositivas cada 3 segundos
  function startCarousel() {
    intervalId = setInterval(() => {
      const nextIndex = (slideIndex + 1) % totalSlides;
      showSlide(nextIndex);
    }, 3000);
  }

  // Inicia el carrusel
  startCarousel();

  // Detiene el carrusel cuando el mouse está sobre el carrusel
  carousel.addEventListener('mouseenter', () => {
    clearInterval(intervalId);
  });

  // Reinicia el carrusel cuando el mouse sale del carrusel
  carousel.addEventListener('mouseleave', () => {
    startCarousel();
  });
});
