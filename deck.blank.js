/*!
Deck JS - deck.blank
Copyright (c) 2012 Daniel Knittl-Frank
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/deck.js/blob/master/MIT-license.txt
https://github.com/imakewebthings/deck.js/blob/master/GPL-license.txt
*/

/*
This module adds the methods and key binding to show a blank page instead of
the slides in the deck.  The deck menu state is indicated by the presence of
a class on the deck container.
*/
(function($, deck, undefined) {
	var $d = $(document);

	/*
	Extends defaults/options.

	options.classes.blank
		These classes are added to the deck container when blanking the screen.

	options.keys.black
	options.keys.white
		The numeric keycodes used to toggle between a blank screen and slides.
	*/
	$.extend(true, $[deck].defaults, {
		classes: {
			blank: 'deck-blank',
			black: 'deck-blank-black',
			white: 'deck-blank-white'
		},

		keys: {
			black: [66, 190], // b, .
			white: 87         // w
		}
	});

	/*
	jQuery.deck('toggleBlank', color)

	Shows a blank page (either black or white), or unhides the slides,
	if currently blanked.
	*/
	$[deck]('extend', 'toggleBlank', function(color) {
		var $c = $[deck]('getContainer'),
		opts = $[deck]('getOptions');

		if ($c.hasClass(opts.classes.blank))
			$c.removeClass([opts.classes.blank, opts.classes.black, opts.classes.white].join(' '));
		else
			$c.addClass([opts.classes.blank, opts.classes[color]].join(' '));
	});

	$d.bind('deck.init', function() {
		var opts = $[deck]('getOptions');

		$d.unbind('keydown.deckblank').bind('keydown.deckblank', function(e) {
			if (e.ctrlKey) return;
			if (e.which === opts.keys.black || $.inArray(e.which, opts.keys.black) > -1) {
				$[deck]('toggleBlank', 'black');
				e.preventDefault();
			} else if (e.which === opts.keys.white || $.inArray(e.which, opts.keys.white) > -1) {
				$[deck]('toggleBlank', 'white');
				e.preventDefault();
			}
		});

	});
})(jQuery, 'deck');

