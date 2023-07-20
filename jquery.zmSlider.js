(function ($) {

	$.fn.zmSlider = function (settings) {

		settings.indexActive;
		settings.moving;
		settings.numberOfSlides;
		settings.myTimer;
		settings.itemsPerSlide;
		settings.newItemsPerSlide;
		console.log(this, $(this), $(this)[0], $(this)[0].id);
		settings.target = "#" + $(this)[0].id;

		settings.sliderItems = [];

		jQuery.each($(settings.target).children(), function (index, value) {
			settings.sliderItems[index] = value.outerHTML;
		});

		var sliderStructure = '<div class="container">'+
								'<div class="row marg-b-30px">'+
									'<div class="col-md-6 pull-left"><h2></h2>'+
									'</div>'+
									'<div class="col-md-6 pull-right text-right">'+
										'<button class="btn btn-default prev"><span>&lt;</span>'+
										'</button>'+
										'<button class="btn btn-default next"><span>&gt;</span>'+
										'</button>'+
									'</div>'+
								'</div>'+
								'<div class="row slidesWrapper">'+
									'<div class="slidesHolder">'+
										'<div class="slidesKeeper"></div>'+
									'</div>'+
								'</div>'+
							'</div>';


		$(settings.target).html(sliderStructure);

		$(settings.target + " h2").html(settings.title);

		$.storeItemsInSlides(settings);

		$(window).resize(function () {
			$.storeItemsInSlides(settings);
		});
		console.log(settings.target + " .prev");
		$(settings.target + " .prev").click(function (e) {
			$.slideRight(settings);
		});
		$(settings.target + " .next").click(function (e) {
			$.slideLeft(settings);
		});

		$(settings.target).on("swipeleft", function () {
			$.slideLeft(settings);
		});
		$(settings.target).on("swiperight", function () {
			$.slideRight(settings);
		});

		return this;

	};

	$.storeItemsInSlides = function (settings) {
		var windowWidth = window.innerWidth;

		jQuery.each(settings.responsive, function (index, value) {
			if (value[2] == undefined || value[2] > windowWidth) {
				settings.newItemsPerSlide = value[0];
				settings.itemWidth = value[1];
			}
		});

		if (settings.itemsPerSlide != settings.newItemsPerSlide) {
			settings.itemsPerSlide = settings.newItemsPerSlide;

			settings.numberOfSlides = Math.round(settings.sliderItems.length / settings.itemsPerSlide);

			$(settings.target + " .slidesKeeper").html("");
			//$(settings.target + " .indicator").html("");
			console.log(settings.itemsPerSlide, settings.numberOfSlides, settings.sliderItems);
			for (var i = 0; i < settings.numberOfSlides; i++) {
				$(settings.target + " .slidesKeeper").append('<div class="slide"></div>');
			}

			var activeSlide = 1;

			jQuery.each(settings.sliderItems, function (index, item) {
				var activeSlideNumberOfItems = $(settings.target + " .slidesKeeper .slide:nth-child(" + activeSlide + ")").children().length;
				if (!(activeSlideNumberOfItems < settings.itemsPerSlide)) {
					activeSlide++;
				}
				console.log(item);
				$(settings.target + " .slidesKeeper > .slide:nth-child(" + activeSlide + ")").append(item);
			});

			$(settings.target + " .item").css("width", settings.itemWidth + "%")

			var slidesKeeperWidth = settings.numberOfSlides * 100;
			var slideWidth = 100 / settings.numberOfSlides;
			settings.indexActive = 1;
			settings.moving = 0;


			$(settings.target + " .slidesKeeper").css("width", slidesKeeperWidth + "%");
			$(settings.target + " .slide").css("width", slideWidth + "%");
			$(settings.target + " .slidesKeeper").css("margin-left", settings.moving + "%");

			if(settings.numberOfSlides>1) {
				for (var i = 0; i != settings.numberOfSlides; i++) {
					$(settings.target + " .indicator").append('<div class="dot"></div>');
				};

				$(settings.target + " .dot:nth-child(" + settings.indexActive + ")").addClass("active");


				$(settings.target + " .dot").click(function (e) {
					settings.indexActive = $(this).index() + 1;

					settings.moving = settings.indexActive - 1;
					settings.moving *= 100;
					settings.moving *= -1;
					$(settings.target + " .slidesKeeper").css("margin-left", settings.moving + "%");

					$(settings.target + " .dot").removeClass("active");
					$(settings.target + " .dot:nth-child(" + settings.indexActive + ")").addClass("active");
					clearInterval(settings.myTimer);
					settings.myTimer = setInterval(function () {
						$.slideLeft(settings);
					}, 15000);
				});
			}
			clearInterval(settings.myTimer);
			settings.myTimer = setInterval(function () {
				$.slideLeft(settings);
			}, 15000);

		}

		return this;
	};

	$.slideLeft = function (settings) {

		if (settings.indexActive < settings.numberOfSlides) {
			settings.moving -= 100;
			settings.indexActive += 1;
		} else {
			settings.moving = 0;
			settings.indexActive = 1;
		}
		$(settings.target + " .slidesKeeper").css("margin-left", settings.moving + "%");
		$(settings.target + " .dot").removeClass("active");
		$(settings.target + " .dot:nth-child(" + settings.indexActive + ")").addClass("active");

		clearInterval(settings.myTimer);
		settings.myTimer = setInterval(function () {
			$.slideLeft(settings);
		}, 15000);
	}

	$.slideRight = function (settings) {

		if (settings.indexActive > 1) {
			settings.moving += 100;
			settings.indexActive -= 1;
		} else {
			settings.indexActive = settings.numberOfSlides;
			settings.moving = settings.indexActive - 1;
			settings.moving *= 100;
			settings.moving *= -1;
		}
		$(settings.target + " .slidesKeeper").css("margin-left", settings.moving + "%");
		$(settings.target + " .dot").removeClass("active");
		$(settings.target + " .dot:nth-child(" + settings.indexActive + ")").addClass("active");

		clearInterval(settings.myTimer);
		settings.myTimer = setInterval(function () {
			$.slideLeft(settings);
		}, 15000);
	}

}(jQuery));