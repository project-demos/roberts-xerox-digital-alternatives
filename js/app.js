var currentPage = '#dashboard';
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
		$(".owl-carousel").owlCarousel({
			slideSpeed : 300,
			rewindNav : false,
			paginationSpeed : 400,
			singleItem:true
		});

		$(".owl-carousel-video").owlCarousel({
			slideSpeed : 300,
			rewindNav : false,
			paginationSpeed : 400,
			singleItem:true,
			pagination: false
		});

		sliders['overview'] = $("#slider-overview").data('owlCarousel');
		sliders['key-features'] = $("#slider-features").data('owlCarousel');
		sliders['industry-applications'] = $("#slider-industry").data('owlCarousel');
		sliders['technical-info'] = $("#slider-tech").data('owlCarousel');

		showPage(window.location.hash);

		$('.slider-prev').on('click', function() {
			var sliderId = $(this).parent().parent().attr('id');
			var slider = sliders[sliderId];

			if (slider.currentItem !== 0) {
				slider.prev();

				if (slider.currentItem == 0) {
					$('#'+sliderId+' .slider-prev').hide();
				}
				else if (slider.currentItem == (slider.maximumItem-1)) {
					$('#'+sliderId+' .slider-next').show();
				}

				changeTitle(sliderId, slider.currentItem);
			}
		});

		$('.slider-next').on('click', function() {
			var sliderId = $(this).parent().parent().attr('id');
			var slider = sliders[sliderId];

			if (slider.currentItem !== slider.maximumItem) {
				slider.next();

				if (slider.currentItem == 1) {
					$('#'+sliderId+' .slider-prev').show();
				}
				else if (slider.currentItem == slider.maximumItem) {
					$('#'+sliderId+' .slider-next').hide();
				}

				changeTitle(sliderId, slider.currentItem);
			}

		});

		$('.slider-nav-item').on('click', function() {
			var slideNum = $(this).attr('data-slide');
			var sliderId = $(this).attr('data-slider');

			sliders[sliderId].goTo(slideNum);
		});

		$('.grid-item').on('click', function() {
			$('#faq .content-top').hide();
			$('.grid-item').removeClass('active');
			$(this).addClass('active');

			var question = $(this).attr('data-question');
			if (question !== '' && question !== undefined) {
				$('.answer').hide();
				$($('.answer')[question-1]).show();

				$('#faq .content-top').show();
				//$('#faq .content-top').show("slide", { direction: "down" }, 300);

				//fix height
				checkHeight();


				$('html, body').animate({ scrollTop: 0 }, 'slow');
			}
		});

		$(window).on('resize', checkHeight);
	});

	function checkHeight() {
		var answerHeight = $('#faq .answers').css('height');
		answerHeight = parseInt(answerHeight.substring(0, answerHeight.length-2)) + ($('body').width()*.035);
		var topContentHeight = $('#faq .content-top').height();

		//console.log(answerHeight);

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

	function changeTitle(page, slideNum) {
		//console.log('page ' +page+ ' - slide '+slideNum);
		var $title = $('#'+page+' .title');

		$title.html(sliderTitles[page][slideNum]);

	}

	var pages = ['#dashboard', '#overview', '#key-features', '#industry-applications', '#technical-info', '#faq'];

	$(window).on('hashchange', function(){
		showPage(window.location.hash);
	});

	function showPage(newPage) {
		if ($.inArray(newPage, pages) == -1) {
			window.location.hash = '#dashboard';
			return false;
		}

		/*$(newPage).show().css('z-index', '1');
		$(currentPage).css('z-index', '9999').hide("slide", { direction: "left" }, 1000);
		//$(newPage).show("slide", { direction: "right" }, 500);*/

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