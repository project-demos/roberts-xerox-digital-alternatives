var currentPage = '#dashboard';
var pages = ['#dashboard', '#overview', '#key-features', '#industry-applications', '#technical-info', '#faq'];
var sliderTitles = {
	'overview': {
		0: 'Overview<a class="next-page" href="#key-features">Continue to Key Features &#187;</a>',
		1: 'Overview<a class="next-page" href="#key-features">Continue to Key Features &#187;</a>',
		2: 'Overview<a class="next-page" href="#key-features">Continue to Key Features &#187;</a>'
	},
	'key-features': {
		0: 'Key Features',
		1: 'Key Features > Import Documents',
		2: 'Key Features > Read and Review',
		3: 'Key Features > Annotate and Comment',
		4: 'Key Features > Complete and Sign a Form',
		5: 'Key Features > Share<a class="next-page" href="#industry-applications">Continue to Industry Applications &#187;</a>',
	},
	'industry-applications': {
		0: 'Industry Applications > Education',
		1: 'Industry Applications > Financial Services',
		2: 'Industry Applications > Government',
		3: 'Industry Applications > Healthcare',
		4: 'Industry Applications > Manufacturing',
		5: 'Industry Applications > Retail<a class="next-page" href="#technical-info">Continue to Technical Info &#187;</a>'
	},
	'technical-info': {
		0: 'Technical Info > Administration Guide',
		1: 'Technical Info > Client Software User Guide',
		2: 'Technical Info > Technical Brief',
		3: 'Technical Info > Security and Evaluation Guide<a class="next-page" href="#faq">Continue to FAQs &#187;</a>'
	}
};

$(function() {
	var sliders = {};

	$(document).ready(function() {
		//initialize page sliders
		$(".owl-carousel").owlCarousel({
			slideSpeed : 300,
			rewindNav : false,
			paginationSpeed : 400,
			singleItem:true,
			afterMove: updateSlider
		});

		//initialize video slider
		$(".owl-carousel-video").owlCarousel({
			slideSpeed : 300,
			rewindNav : false,
			paginationSpeed : 400,
			singleItem:true,
			pagination: false
		});

		//store slider instances
		sliders['overview'] = $("#slider-overview").data('owlCarousel');
		sliders['key-features'] = $("#slider-features").data('owlCarousel');
		sliders['industry-applications'] = $("#slider-industry").data('owlCarousel');
		sliders['technical-info'] = $("#slider-tech").data('owlCarousel');

		showPage(window.location.hash);

		//slider navigation - previous
		$('.slider-prev').on('click', function() {
			var sliderId = $(this).parent().parent().attr('id');
			var slider = sliders[sliderId];
			slider.prev();
		});

		//slider navigation - next
		$('.slider-next').on('click', function() {
			var sliderId = $(this).parent().parent().attr('id');
			var slider = sliders[sliderId];
			slider.next();
		});

		//slider navigation - video thumbnails
		$('.slider-nav-item').on('click', function() {
			var slideNum = $(this).attr('data-slide');
			var sliderId = $(this).attr('data-slider');

			sliders[sliderId].goTo(slideNum);
		});

		// FAQ click functionality
		$('.grid-item').on('click', function() {
			$('#faq .content-top').hide();
			$('.grid-item').removeClass('active');
			$(this).addClass('active');

			var question = $(this).attr('data-question');
			if (question !== '' && question !== undefined) {
				$('.answer').hide();
				$($('.answer')[question-1]).show();

				$('#faq .content-top').show();

				checkHeight();

				$('html, body').animate({ scrollTop: 0 }, 'slow');
			}
		});

		// Industry Applications Nav
		$('#industry-applications .section-nav-link').on('click', function() {
			var slideNum = $(this).attr('data-slide');
			sliders['industry-applications'].goTo(slideNum);
		});

		// Navigation
		$('#btn-nav').on('click', function() {
			//$('#popup-menu').toggle('slide', {direction: 'down', easing: 'easeInQuad'}, 600);
			$('#popup-menu').slideToggle();
		});

		$('#popup-menu .menu-item-link').on('click', function() {
			$('#popup-menu').hide();
		});

		$(window).on('resize', checkHeight);
	});

	// changes slider section title
	// hide/show navigation arrows
	function updateSlider() {
		var sliderId = $(this.$elem[0]).attr('data-page');
		var slider = sliders[sliderId];
		var $prevButton = $('#'+sliderId+' .slider-prev');
		var $nextButton = $('#'+sliderId+' .slider-next');

		if (slider.currentItem == 0) {
			$prevButton.hide();
			$nextButton.show();
		}
		else if (slider.currentItem == slider.maximumItem) {
			$nextButton.hide();
			$prevButton.show();
		}
		else {
			$nextButton.show();
			$prevButton.show();
		}

		changeTitle(sliderId, slider.currentItem);

	}

	// fixes top section height for FAQ answers
	function checkHeight() {
		var answerHeight = $('#faq .answers').css('height');
		answerHeight = parseInt(answerHeight.substring(0, answerHeight.length-2)) + ($('body').width()*.035);
		var topContentHeight = $('#faq .content-top').height();

		if (answerHeight > topContentHeight) {
			$('#faq .content-top').height(answerHeight+'px');
			$('#faq .content').css('top', answerHeight+'px');
		}
		else {
			if (answerHeight > $(window).height()*.4) {
				$('#faq .content-top').height(answerHeight+'px');
				$('#faq .content').css('top', answerHeight+'px');
			}
			else {
				$('#faq .content-top').height('40%');
				$('#faq .content').css('top', '40%');
			}
		}
	}

	// changes the title of given page based on current slide
	function changeTitle(page, slideNum) {
		var $title = $('#'+page+' .title');

		$title.html(sliderTitles[page][slideNum]);
	}

	// listen for page change
	$(window).on('hashchange', function(){
		showPage(window.location.hash);
	});

	// if page is valid, show page
	// else, show dashboard
	function showPage(newPage) {
		if ($.inArray(newPage, pages) == -1) {
			window.location.hash = '#dashboard';
			return false;
		}

		$(currentPage).hide();

		// reset slider for new page
		var pageId = newPage.substring(1,newPage.length);
		if (pageId !== 'dashboard' && pageId !== 'faq') {
			sliders[pageId].jumpTo(0);
			$(newPage+' .slider-prev').hide();
			$(newPage+' .slider-next').show();
			changeTitle(pageId, 0);
		}


		$(newPage).show();

		currentPage = newPage;
	}// showPage()

});