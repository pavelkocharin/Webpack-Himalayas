'use strict'
//поведение при использовании тачскрина (не монитора с клавиатурой)
window.onload = function(e){ 

  //проверка на открытие на мобильном устройстве
  var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };

  if (isMobile.any()) {
    //Проверяет элемент на попадание в видимую часть экрана.
    //Для попадания достаточно, чтобы верхняя и нижняя границы элемента были видны (если только одна граница - ||).
    function isVisible(elem) {

      var coords = elem.getBoundingClientRect();
      var windowHeight = document.documentElement.clientHeight;

      // верхняя граница elem в пределах видимости ИЛИ нижняя граница видима
      var topVisible = coords.top > 0 && coords.top < windowHeight;
      var bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

      return topVisible && bottomVisible;
    }

    /*
    Вариант проверки, считающий элемент видимым,
    если он не более чем -1 страница назад или +1 страница вперед

    function isVisible(elem) {

      var coords = elem.getBoundingClientRect();

      var windowHeight = document.documentElement.clientHeight;

      var extendedTop = -windowHeight;
      var extendedBottom = 2 * windowHeight;

      // top visible || bottom visible
      var topVisible = coords.top > extendedTop && coords.top < extendedBottom;
      var bottomVisible = coords.bottom < extendedBottom && coords.bottom > extendedTop;

      return topVisible || bottomVisible;
    }
    */

    function showVisible() {
      
      var elementsMobile = document.querySelectorAll(".places__image, .places__link, .places__image-title, .intro__welcome, .jornal__item-image, .main__article-title, .main__text-h--title");
      
      for (var i = 0; i < elementsMobile.length; i++) {
        var className = elementsMobile[i].classList.item(0) + '--mobile-visible';

        if (isVisible(elementsMobile[i])) {
          elementsMobile[i].classList.add(className);
        } else {
          elementsMobile[i].classList.remove(className);
        }

      }  
    }

    window.onscroll = showVisible;
    showVisible();
  }

}();

/*
  //проверка на поддержку touch events - здесь не используется
  function is_touch_device() {
    return !!('ontouchstart' in window);
  }
 */