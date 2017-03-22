jQuery(document).ready(function(){
    linkInterno = $('a[href^="#"]');
    linkInterno.on('click',function(e) {
    e.preventDefault();
    var href = $(this).attr('href');
    $('html, body').animate({ scrollTop : $( href ).offset().top -=71 }, 'slow');

    });
});

jQuery(document).ready(function($){
	var slidesWrapper = $('.slide');

	//check if a .slide exists in the DOM
	if ( slidesWrapper.length > 0 ) {
		var primaryNav = $('.menu'),
			sliderNav = $('.slider-nav'),
			navigationMarker = $('.cd-marker'),
			slidesNumber = slidesWrapper.children('li').length,
			visibleSlidePosition = 0,
			autoPlayId,
			autoPlayDelay = 5000;

		//upload videos (if not on mobile devices)
		uploadVideo(slidesWrapper);

		//autoplay slider
		setAutoplay(slidesWrapper, slidesNumber, autoPlayDelay);

		//on mobile - open/close primary navigation clicking/tapping the menu icon
		primaryNav.on('click', function(event){
			if($(event.target).is('.menu')) $(this).children('ul').toggleClass('is-visible');
		});

		//change visible slide
		sliderNav.on('click', 'li', function(event){
			event.preventDefault();
			var seleccionadoItem = $(this);
			if(!seleccionadoItem.hasClass('seleccionado')) {
				// if it's not already seleccionado
				var seleccionadoPosition = seleccionadoItem.index(),
					activePosition = slidesWrapper.find('li.seleccionado').index();

				if( activePosition < seleccionadoPosition) {
					nextSlide(slidesWrapper.find('.seleccionado'), slidesWrapper, sliderNav, seleccionadoPosition);
				} else {
					prevSlide(slidesWrapper.find('.seleccionado'), slidesWrapper, sliderNav, seleccionadoPosition);
				}

				//this is used for the autoplay
				visibleSlidePosition = seleccionadoPosition;

				updateSliderNavigation(sliderNav, seleccionadoPosition);
				updateNavigationMarker(navigationMarker, seleccionadoPosition+1);
				//reset autoplay
				setAutoplay(slidesWrapper, slidesNumber, autoPlayDelay);
			}
		});
	}

	function nextSlide(visibleSlide, container, pagination, n){
		visibleSlide.removeClass('seleccionado from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			visibleSlide.removeClass('is-moving');
		});

		container.children('li').eq(n).addClass('seleccionado from-right').prevAll().addClass('move-left');
		checkVideo(visibleSlide, container, n);
	}

	function prevSlide(visibleSlide, container, pagination, n){
		visibleSlide.removeClass('seleccionado from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			visibleSlide.removeClass('is-moving');
		});

		container.children('li').eq(n).addClass('seleccionado from-left').removeClass('move-left').nextAll().removeClass('move-left');
		checkVideo(visibleSlide, container, n);
	}

	function updateSliderNavigation(pagination, n) {
		var navigationDot = pagination.find('.seleccionado');
		navigationDot.removeClass('seleccionado');
		pagination.find('li').eq(n).addClass('seleccionado');
	}

	function setAutoplay(wrapper, length, delay) {
		if(wrapper.hasClass('autoplay')) {
			clearInterval(autoPlayId);
			autoPlayId = window.setInterval(function(){autoplaySlider(length)}, delay);
		}
	}

	function autoplaySlider(length) {
		if( visibleSlidePosition < length - 1) {
			nextSlide(slidesWrapper.find('.seleccionado'), slidesWrapper, sliderNav, visibleSlidePosition + 1);
			visibleSlidePosition +=1;
		} else {
			prevSlide(slidesWrapper.find('.seleccionado'), slidesWrapper, sliderNav, 0);
			visibleSlidePosition = 0;
		}
		updateNavigationMarker(navigationMarker, visibleSlidePosition+1);
		updateSliderNavigation(sliderNav, visibleSlidePosition);
	}

	function uploadVideo(container) {
		container.find('.bgVideoEnvoltura').each(function(){
			var videoWrapper = $(this);
			if( videoWrapper.is(':visible') ) {
				// if visible - we are not on a mobile device
				var	videoUrl = videoWrapper.data('video'),
					video = $('<video loop><source src="'+videoUrl+'.mp4" type="video/mp4" /><source src="'+videoUrl+'.webm" type="video/webm" /></video>');
				video.appendTo(videoWrapper);
				// play video if first slide
				if(videoWrapper.parent('.bgVideo.seleccionado').length > 0) video.get(0).play();
			}
		});
	}

	function checkVideo(hiddenSlide, container, n) {
		//check if a video outside the viewport is playing - if yes, pause it
		var hiddenVideo = hiddenSlide.find('video');
		if( hiddenVideo.length > 0 ) hiddenVideo.get(0).pause();

		//check if the select slide contains a video element - if yes, play the video
		var visibleVideo = container.children('li').eq(n).find('video');
		if( visibleVideo.length > 0 ) visibleVideo.get(0).play();
	}

	function updateNavigationMarker(marker, n) {
		marker.removeClassPrefix('item').addClass('item-'+n);
	}

	$.fn.removeClassPrefix = function(prefix) {
		//remove all classes starting with 'prefix'
	    this.each(function(i, el) {
	        var classes = el.className.split(" ").filter(function(c) {
	            return c.lastIndexOf(prefix, 0) !== 0;
	        });
	        el.className = $.trim(classes.join(" "));
	    });
	    return this;
	};
});

//GALERIAAAAAAAAAAAA
$('.galeria__img').click(function(e){
  var img = e.target.src;
  var modal = '<div class="modal" id="modal"><img src="'+ img + '" class="modal__img"></div>';
  $('body').append(modal);
  $('#modal').click(function(){
    $('#modal').remove();
  })
});


$(document).keyup(function(e){
  if (e.which==27) {
    $('#modal').remove();
  }
})

$(function(){
  var cantidadImagenes = $(".galeria img").length;
  var boton = '<div class="btn-galeria">VER MÁS</div>';
  for(i=cantidadImagenes;i<8; i++);
    if(cantidadImagenes > 8){
      $(".galeria").html(boton);
      // HTML remplaza todo
      //append crea aparte de lo que ya está
  }
});
