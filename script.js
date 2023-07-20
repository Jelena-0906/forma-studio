//JS dugme

function toggleMenu() {
  const links = document.getElementById("links");
  links.classList.toggle("visibility");
}
  
// JavaScript kod za povratak na vrh stranice
  const backToTopButton = document.getElementById('back-to-top');

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  backToTopButton.addEventListener('click', scrollToTop);

// aktivni element

document.addEventListener("DOMContentLoaded", function() {
  var currentPath = window.location.pathname;
  var navLinks = document.querySelectorAll("nav li a");

  navLinks.forEach(function(link) {
      if (link.getAttribute("href") === currentPath) {
          link.classList.add("active");
      }
  });
});


  /*za mapu*/
  
  function initMap() {
    var myLatLng = {lat: 44.860751, lng: 20.457840}; // Koordinate adrese
  
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: myLatLng
    });
  
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Dobrivoja Božića 7, Borča, Palilula, Beograd'
    });
  }  



// za slajder



