(function () {
  // Слайдер баннеров
  const mainSlider = $('.js--main-slider');
  if(mainSlider) {
    $(mainSlider).slick({
      arrows: false,
      dots: true
    });
  };

  // Открываем мобильное меню
  const menuTrigger = $('.js--menu-trigger');
  const menuOverlay = $('.js--menu-overlay');
  if(menuTrigger) {
    $(menuTrigger).click(function(event){
      event.preventDefault();
      $(this).toggleClass('active');
      $(menuOverlay).toggleClass('open');
    });
  };
})();
