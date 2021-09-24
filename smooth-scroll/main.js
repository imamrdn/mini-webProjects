//option 2 - jQuery smooth scroll
// $('.navbar a').on('click', function(e) {
//     if (this.hash !== '') {
//         e.preventDefault();

//         const hash = this.hash;

//         $('html, body').animate({
//             scrollTop: $(hash).offset().top
//         }, 800);
//     }
// });

// option 3 - smooth scroll script
const scroll = new SmoothScroll('.navbar a[href*="#"]', {
    speed: 800
});