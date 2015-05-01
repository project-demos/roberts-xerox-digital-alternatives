var currentPage = '#dashboard';
var sliderTitles = {
	'overview': {
		0: 'Overview',
		1: 'Overview',
		2: 'Overview<a class="next-page" href="#key-features">Continue to Key Features &#187;</a>'
	},
	'key-features': {
		0: 'Key Features',
		1: 'Key Features > Import Documents',
		2: 'Key Features > Read and Review',
		3: 'Key Features > Annotate and Comment',
		4: 'Key Features > Complete and Sign a Form',
		5: 'Key Features > Share',
		6: 'Key Features > Sync Across Devices<a class="next-page" href="#industry-applications">Continue to Industry Applications &#187;</a>'
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
		showPage(window.location.hash);

		$(".owl-carousel").owlCarousel({
			slideSpeed : 300,
			rewindNav : false,
			paginationSpeed : 400,
			singleItem:true
		});

		sliders['overview'] = $("#slider-overview").data('owlCarousel');
		sliders['key-features'] = $("#slider-features").data('owlCarousel');
		sliders['industry-applications'] = $("#slider-industry").data('owlCarousel');
		sliders['technical-info'] = $("#slider-tech").data('owlCarousel');

		$('.slider-prev').on('click', function() {
			var sliderId = $(this).parent().parent().attr('id');
			var slider = sliders[sliderId];

			if (slider.currentItem !== 0) {
				slider.prev();
				changeTitle(sliderId, slider.currentItem);
			}
		});

		$('.slider-next').on('click', function() {
			var sliderId = $(this).parent().parent().attr('id');
			var slider = sliders[sliderId];

			if (slider.currentItem !== slider.maximumItem) {
				slider.next();
				changeTitle(sliderId, slider.currentItem);
			}
		});

		$('.grid-item').on('click', function() {
			$('#faq .content-top').hide();
			$('.grid-item').removeClass('active');
			$(this).addClass('active');

			var question = $(this).attr('data-question');
			if (question !== '' && question !== undefined) {
				$('.answer').hide();
				$($('.answer')[question-1]).show();
				//$('#faq .content-top').show();
				$('#faq .content-top').show("slide", { direction: "down" }, 300);
				$('html, body').animate({ scrollTop: 0 }, 'slow');
			}
		});
	});

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
		$(newPage).show();

		currentPage = newPage;
	}// showPage()

});