  // JavaScript kod za funkcionalnost slajdera
  const slider = document.getElementById('slider');
  const videos = document.getElementsByTagName('video');
  const prevButton = document.getElementsByClassName('prev')[0];
  const nextButton = document.getElementsByClassName('next')[0];
  let currentSlide = 0;

  function showSlide(slideIndex) {
    for (let i = 0; i < videos.length; i++) {
      videos[i].style.display = 'none';
    }
    videos[slideIndex].style.display = 'block';
  }

  function prevSlide() {
    currentSlide--;
    if (currentSlide < 0) {
      currentSlide = videos.length - 1;
    }
    showSlide(currentSlide);
  }

  function nextSlide() {
    currentSlide++;
    if (currentSlide >= videos.length) {
      currentSlide = 0;
    }
    showSlide(currentSlide);
  }

  prevButton.addEventListener('click', prevSlide);
   nextButton.addEventListener('click', nextSlide);
