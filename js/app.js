$(function() {
	var sliders = {};

	$(document).ready(function() {
		$(".owl-carousel").owlCarousel({
			slideSpeed : 300,
			rewindNav : false,
			paginationSpeed : 400,
			singleItem:true
		});

		sliders['overview'] = $("#slider-overview").data('owlCarousel');
		sliders['key-features'] = $("#slider-features").data('owlCarousel');

		$('.slider-prev').on('click', function() {
			var slider = $(this).parent().parent().attr('id');
			sliders[slider].prev();
		});

		$('.slider-next').on('click', function() {
			var slider = $(this).parent().parent().attr('id');
			sliders[slider].next();
		});
	});

	var pages = ['#dashboard', '#overview', '#key-features', '#industry-applications', '#technical-info', '#faq'];

	showPage(window.location.hash);

	$(window).on('hashchange', function(){
		showPage(window.location.hash);
	});

	function showPage(newPage) {

		if ($.inArray(newPage, pages) == -1) {
			window.location.hash = '#dashboard';
		}

		$('.page').removeClass('visible').addClass('hidden');
		$(newPage).removeClass('hidden').addClass('visible');

		/*var map = {
			'overview': function() {

			},
			'key-features': function() {

			},
			'industry-applications': function() {

			},
			'technical-info': function() {

			},
			'faq': function() {

			}
		};*/
	}// showPage()

});