/*
* Мобильное меню
*/
var menuTrigger = $('.js--menu-open');
if(menuTrigger) {
  var headerWrapper = $('.main-header__wrapper');
  $(menuTrigger).click(function(event){
    event.preventDefault();
    $(this).toggleClass('menu-open--active');
    $(headerWrapper).toggleClass('main-header__wrapper--open');
  })
}

/*
* Слайдер Промо
*/
var mainSlider = $('.js--promo-slider');
if(mainSlider) {
  $(mainSlider).slick({
    arrows: false,
    dots: true,
    appendDots: $('.js--promo-slider-dots')
  });
  $('.js--promo-slider-prev').click(function(){
    mainSlider.slick('slickPrev');
  });
  $('.js--promo-slider-next').click(function(){
    mainSlider.slick('slickNext');
  });
  var dotWidth = 100 / (mainSlider.slick("getSlick").slideCount);
  $('.promo-slider li[role=presentation]').css('width', dotWidth + '%' );
  $('.js--promo-slider-counter__total').text( mainSlider.slick("getSlick").slideCount);
    mainSlider.on('afterChange', function(event, slick, currentSlide){
	  $('.js--promo-slider-counter__num').text(currentSlide + 1);
	});
}

/*
* Слайдер О компании
*/
var aboutSlider = $('.js--about-slider');
if(aboutSlider) {
  $(aboutSlider).slick({
    arrows: false,
    dots: true,
    appendDots: $('.js--about-slider-dots')
  });
  $('.js--about-slider-prev').click(function(){
    aboutSlider.slick('slickPrev');
  });
  $('.js--about-slider-next').click(function(){
    aboutSlider.slick('slickNext');
  });
  var dotWidth = 100 / (aboutSlider.slick("getSlick").slideCount);
  $('.about-slider li[role=presentation]').css('width', dotWidth + '%' );
  $('.js--about-slider-counter__total').text( aboutSlider.slick("getSlick").slideCount);
    aboutSlider.on('afterChange', function(event, slick, currentSlide){
	  $('.js--about-slider-counter__num').text(currentSlide + 1);
	});
}

/*
* Слайдер Статьи
*/
var articleSlider = $('.js--article-list');
if(articleSlider) {
  $(articleSlider).slick({
    arrows: false,
    dots: true,
    appendDots: $('.js--article-dots'),
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 1
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 1570,
        settings: {
          slidesToShow: 3
        }
      }
    ]
  });
  $('.js--article-prev').click(function(){
    articleSlider.slick('slickPrev');
  });
  $('.js--article-next').click(function(){
    articleSlider.slick('slickNext');
  });
  var dotWidth = 100 / (articleSlider.slick("getSlick").slideCount);
  $('.article__navigation li[role=presentation]').css('width', dotWidth + '%' );
  $('.js--article-counter__total').text( articleSlider.slick("getSlick").slideCount);
  articleSlider.on('afterChange', function(event, slick, currentSlide){
	  $('.js--article-counter__num').text(currentSlide + 1);
	});
}

/*
* Открытие меню футера
*/
var footerNavigationOpen = $('.js--footer-navigation-open');
if(footerNavigationOpen) {
  $(footerNavigationOpen).click(function(event){
    event.preventDefault();
    $(this).siblings('.footer-navigation__list').slideToggle();
  })
}

/*
* Лейбл формы
*/
var inputOutline = document.getElementsByClassName('input-outline');
if(inputOutline) {
  for(let i = 0; i < inputOutline.length; i++) {
    inputOutline[i].addEventListener('click', function() {
      this.classList.add('active');
      this.nextElementSibling.classList.add('active');
    })
    inputOutline[i].addEventListener('blur', function() {
      if(this.value.length < 1) {
        this.nextElementSibling.classList.remove('active');
        this.classList.remove('active');
      }
    })
  }
}

/*
* Открываем блок навигации карты
*/
var mapAsideOpen = $('.js--map-button');
if(mapAsideOpen) {
  $(mapAsideOpen).click(function(event){
    event.preventDefault();
    $('.map__navigation').addClass('map__navigation--open');
  });
  var mapAsideClose = $('.js--map-close');
  $(mapAsideClose).click(function(event){
    event.preventDefault();
    $('.map__navigation').removeClass('map__navigation--open');
  });
}

/*
* События модальной формы
*/
var modalForms = document.querySelectorAll('.js--modal-form');
if(modalForms) {
  // открытие формы
  var modalTriggers = document.querySelectorAll('.js--modal-trigger');

  var openModal = function(event) {
    event.preventDefault();
    var btnAttr = this.getAttribute('data-target');
    for(var targetForm of modalForms) {
      if(targetForm.getAttribute('id') == btnAttr) {
        targetForm.classList.add('active');
      }
      if(targetForm.getAttribute('id') == 'order-form') {
        var goodTitle = this.getAttribute('data-title');
        var goodPrice = this.getAttribute('data-price');
        var modalItemHideTitle = targetForm.querySelector('#order_title');
        var modalItemHidePrice = targetForm.querySelector('#order_price');
        modalItemHideTitle.value = goodTitle;
        modalItemHidePrice.value = goodPrice;
      }
    }
  }

  for(var modalTrg of modalTriggers) {
    modalTrg.addEventListener('click', openModal);
  }

  // закрытие формы крестиком
  var modalCloseBtns = document.querySelectorAll('.js--modal-close');

  var closeModal = function(event) {
    event.preventDefault();
    for(var targetForm of modalForms) {
      if(targetForm.classList.contains('active')) {
        targetForm.classList.remove('active');
      }
    }
  }

  for(var currentCloseBtn of modalCloseBtns) {
    currentCloseBtn.addEventListener('click', closeModal);
  }

  // закрытие формы ESC
  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      for(var targetForm of modalForms) {
        if(targetForm.classList.contains('active')) {
          targetForm.classList.remove('active');
        }
      }
    }
  });
}

/*
* Яндекс-карта
*/
var groups = [
  {
    name: "Набережные челны",
    style: "islands#circleIcon",
    items: [
      {
          center: [50.426472, 30.563022],
          name: "Монумент &quot;Родина-Мать&quot;",
          address: "ул. Раиса Беляева 66",
          phone: "8 800 511 48 25",
          url: "https://jsfiddle.net"
      },
      {
          center: [50.45351, 30.516489],
          name: "Памятник &quot;Богдану Хмельницкому&quot;",
          address: "пр. Мира 21",
          phone: "",
          url: ""
      },
      {
          center: [50.454433, 30.529874],
          name: "Арка Дружбы народов",
          address: "ул. Раиса Беляева 66",
          phone: "",
          url: ""
      }
    ]},
  {
    name: "Елабуга",
    style: "islands#circleIcon",
    items: [
      {
          center: [50.50955, 30.60791],
          name: "Ресторан &quot;Калинка-Малинка&quot;",
          address: "ул. Мельникова 66",
          phone: "",
          url: ""
      },
      {
          center: [50.429083, 30.521708],
          name: "Бар &quot;Сало-бар&quot;",
          address: "пр. Людникова 25",
          phone: "",
          url: ""
      },
      {
          center: [50.450843, 30.498271],
          name: "Абсент-бар &quot;Палата №6&quot;",
          address: "пл. Победы 15",
          phone: "",
          url: ""
      },
      {
          center: [50.454834, 30.516498],
          name: "Ресторан &quot;Спотыкач&quot;",
          address: "ул. Мельникова 66",
          phone: "",
          url: ""
      }
    ]
  }
];
ymaps.ready(init);
function init() {
  // Создание экземпляра карты.
  var myMap = new ymaps.Map('js--map', {
    center: [50.443705, 30.530946],
    zoom: 13,
    controls: []
  }, {
    searchControlProvider: 'yandex#search'
  });
  var zoomControl = new ymaps.control.ZoomControl({
    options: {
      size: 'small',
      position: {
        top: 170,
        left: 10
      }
    }
  });
  myMap.controls.add(zoomControl);
  // Контейнер для меню.
  menu = $('<ul class="shops__list"/>');
  for (var i = 0, l = groups.length; i < l; i++) {
    createMenuGroup(groups[i]);
  }
  function createMenuGroup (group) {
    // Пункт меню.
    var menuItem = $('<li class="shops__city"><a class="shops__city-link" href="#">' + group.name + '</a></li>'),
    // Коллекция для геообъектов группы.
    collection = new ymaps.GeoObjectCollection(null, { preset: group.style, iconColor: '#7598cf' }),
    // Контейнер для подменю.
    submenu = $('<ul class="submenu shops__inner"/>');
    // Добавляем коллекцию на карту.
    myMap.geoObjects.add(collection);
    // Добавляем подменю.
    menuItem
      .append(submenu)
      // Добавляем пункт в меню.
      .appendTo(menu)
      // По клику удаляем/добавляем коллекцию на карту и скрываем/отображаем подменю.
      .find('a')
      .bind('click', function () {
        if (collection.getParent()) {
          myMap.geoObjects.remove(collection);
          submenu.hide();
        } else {
          myMap.geoObjects.add(collection);
          submenu.show();
      }
    });
    for (var j = 0, m = group.items.length; j < m; j++) {
      createSubMenu(group.items[j], collection, submenu);
    }
  }

  function createSubMenu (item, collection, submenu) {
    // Пункт подменю.
    var submenuItem = $('<li class="shops__detail"><a class="shops__detail-link" href="#"><span class="shops__detail-label">' + item.address +
     '</span>' + item.name + '</a><div style="display: none;" class="shops__detail-more"><p><span class="shops__detail-label">Телефон</span>' +
     item.phone + '</p><p><span class="shops__detail-label">Сайт</span><a href="'+ item.url +'" target="_blank">' + item.url + '</a></p></div></li>'),
    // Создаем метку.
    placemark = new ymaps.Placemark(item.center, { balloonContent: item.name });
    // Добавляем метку в коллекцию.
    collection.add(placemark);
    // Добавляем пункт в подменю.
    submenuItem
      .appendTo(submenu)
      // При клике по пункту подменю открываем/закрываем баллун у метки.
      .find('.shops__detail-link')
      .bind('click', function () {
        $('.shops__list').find('.shops__detail-more').slideUp();
        $('.shops__list').find('.shops__detail-link').removeClass('open');
        if (!placemark.balloon.isOpen()) {
          placemark.balloon.open();
          $(this).siblings('.shops__detail-more').slideDown();
          $(this).addClass('open');
          //placemark.options.set({iconColor: '#394e8f'});
        } else {
          placemark.balloon.close();
          $(this).siblings('.shops__detail-more').slideUp();
          $(this).removeClass('open');
          //placemark.unset('preset');
        }
        return false;
      });
  }
  // Добавляем меню в тэг BODY.
  menu.appendTo($('.js--map-shops'));
  // Выставляем масштаб карты чтобы были видны все группы.
  myMap.setBounds(myMap.geoObjects.getBounds());
}

/*
* Класс для шапки при скроле
*/
if(document.documentElement.clientWidth >= 768) {
  $(window).scroll(function(){
    if((document.documentElement.clientWidth >= 768) && (document.documentElement.clientWidth < 1571)) {
      var scrollHeight = 0;
    } else if (document.documentElement.clientWidth >= 1571) {
      var scrollHeight = 30;
    }
    if ($(window).scrollTop() > scrollHeight) {
      $('.main-header').addClass('main-header--scroll');
    } else {
      $('.main-header').removeClass('main-header--scroll');
    }
  });
}

/*
* Обработчик разделов блога
*/
if(document.documentElement.clientWidth < 768) {
  var blogNavOpen = document.getElementsByClassName('js--blog-navigation-trigger');
  if(blogNavOpen) {
    $(blogNavOpen).toggle(function() {
      event.preventDefault();
      $('.blog__navigation').slideDown();
      $(this).text('Свернуть');
    }, function() {
      event.preventDefault();
      $('.blog__navigation').slideUp();
      $(this).text('Разделы');
    });
  }
}

/*
* Слайдер миниатюр товара в каталоге
*/
var goodsSlider = $('.js--goods-item-gallery');
if(goodsSlider) {
  $(goodsSlider).slick({
    arrows: false,
    dots: true
  });
}

/*
* Обработчик скролла раздела истории
*/
var timescaleNavigation = $('.js--timescale-navigation');
if(timescaleNavigation) {
  var lastId;
  var contentBg = $('#content_bg');
  var timescaleNavigationHeight = 170; //цифра это расстояние от верхушки меню до нужной секции(можно менять)
  var menuItems = timescaleNavigation.find("a");
      // Anchors corresponding to menu items
  var scrollItems = menuItems.map(function(){
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
      });

  // Bind click handler to menu items
  // so we can get a fancy scroll animation
  menuItems.click(function(e){
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top - 150;//цифру можно менять или убрать..
    $('html, body').stop().animate({
        scrollTop: offsetTop
    }, 300);
    e.preventDefault();
  });

  // Bind to scroll
  $(window).scroll(function(){
     // Get container scroll position
     var fromTop = $(this).scrollTop()+timescaleNavigationHeight;

     // Get id of current scroll item
     var cur = scrollItems.map(function(){
       if ($(this).offset().top < fromTop) {
         return this;
       }

     });

     // Get the id of the current element
     cur = cur[cur.length-1];
     var id = cur && cur.length ? cur[0].id : "";
     console.log(id);
    $('div').removeClass('red');
    $('#' + id).addClass('red');
    contentText  = $('#' + id).data('date');
    setTimeout(function() {
  $(contentBg).text(contentText);
  }, 0);
     if (lastId !== id) {
         lastId = id;
         // Set/remove active class
         menuItems
           .parent().removeClass("active")
           .end().filter("[href='#"+id+"']").parent().addClass("active");
     }
  });

  /*
  * Обработчик прилипания таймлайна
  */
  $.fn.stickyfloat = function(options, lockBottom) {
    var $obj                = this;
    //var parentPaddingTop    = parseInt($obj.parent().css('padding-top'));
    var parentPaddingTop    = 27;
    var startOffset         = $obj.parent().offset().top - 150;
    var opts                = $.extend({ startOffset: startOffset, offsetY: parentPaddingTop, duration: 200, lockBottom:true }, options);

    $obj.css({ 'position': 'absolute', 'top': '0' });

    if(opts.lockBottom){
        var bottomPos = $obj.parent().height() - $obj.height() + parentPaddingTop;
        if( bottomPos < 0 ) {
          bottomPos = 0;
        }
    }

    $(window).scroll(function () {
        $obj.stop();

        var pastStartOffset         = $(document).scrollTop() > opts.startOffset;
        var objFartherThanTopPos    = $obj.offset().top > startOffset;
        var objBiggerThanWindow     = $obj.outerHeight() < $(window).height();
        if( (pastStartOffset || objFartherThanTopPos) && objBiggerThanWindow ){
            var newpos = ($(document).scrollTop() - startOffset + opts.offsetY);
            if ( newpos > bottomPos )
                newpos = bottomPos;
            if ( $(document).scrollTop() < opts.startOffset )
                newpos = parentPaddingTop;

            $obj.animate({ top: newpos }, opts.duration );
        }
    });
  };
  $('.js--timescale-navigation').stickyfloat({ duration: 0 });
}


