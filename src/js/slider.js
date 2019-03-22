'use strict'
//конструктор слайдера
window.onload = function(e){

  new Slider({
    images: '.slider__slides img',
    next: '.slider__btn--next',
    prev: '.slider__btn--prev',
    interval: 5000,
  });
  
  function Slider(images){
    this.images = document.querySelectorAll(images.images);
    this.btPrev = document.querySelector(images.prev);
    this.btNext = document.querySelector(images.next);
    this.interval = images.interval;

    if(!this.btPrev) {
      return null;
    }

    var i = 0;
  
    this.prev = function() {
      this.images[i].classList.remove("slider__img--shown");
      i--;
      if( i < 0){
        i = this.images.length - 1;
      }
      this.images[i].classList.add("slider__img--shown");
    },
  
    this.next = function() {
      this.images[i].classList.remove("slider__img--shown");
      i++;
      if( i >= this.images.length){
        i = 0;
      }
      this.images[i].classList.add("slider__img--shown");
    }
  
    this.btPrev.addEventListener('click', this.prev.bind(this));
    this.btNext.addEventListener('click', this.next.bind(this));
  
    setInterval(this.next.bind(this), this.interval);
  }  
}();