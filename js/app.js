$(function() {
	var pages = ['dashboard', 'overview', 'key-features', 'industry-applications', 'technical-info', 'faq'];

	showPage(window.location.hash);

	$(window).on('hashchange', function(){
		showPage(window.location.hash);
	});

	function showPage(newPage) {
		console.log($.inArray(newPage, pages));

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