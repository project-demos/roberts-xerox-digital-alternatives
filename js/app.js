$(function() {
	showPage(window.location.hash);

	$(window).on('hashchange', function(){
		showPage(window.location.hash);
	});

	function showPage(newPage) {
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