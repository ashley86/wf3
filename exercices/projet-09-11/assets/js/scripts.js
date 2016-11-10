'use strict';
(function ($) {
    // Valeurs par defaut
    var defaultFontSize = 16;
    var realDefaultFontSize = parseFloat($('html').css('font-size'));
    var oldValueFontSize = realDefaultFontSize / defaultFontSize * 100;
    var newValueFontSize = realDefaultFontSize / defaultFontSize * 100;
    var defValueFontSize = realDefaultFontSize / defaultFontSize * 100;
    $(document).ready(function () {
        // Lors d'un clic sur le bouton 'dislexie'
        $('.dislexic').click(function (e) {
            e.preventDefault();
            $('body').toggleClass('dislexic');
        });
        // Lors d'un clic sur le bouton 'Augmenter le contraste'
        $('.contrast').click(function (e) {
            e.preventDefault();
            $('body').toggleClass('contrast');
        });
        // Lors d'un clic que le bouton 'Reduire la taille de la police'
        $('.decrease-font').click(function (e) {
            decreaseFontSize();
        });
        // Lors d'un clic que le bouton 'Reinitialiser la taille de la police'
        $('.reset-font').click(function (e) {
            resetFontSize();
        });
        // Lors d'un clic que le bouton 'Augmenter la taille de la police'
        $('.increase-font').click(function (e) {
            increaseFontSize();
        });
        // Augmente la taille de la police
        function increaseFontSize() {
            oldValueFontSize = parseFloat($('html').css('font-size')) / defaultFontSize;
            newValueFontSize = oldValueFontSize * 1.125 * 100;
            $('html').css('font-size', newValueFontSize + '%');
        }
        // Reduit la taille de la police
        function decreaseFontSize() {
            oldValueFontSize = parseFloat($('html').css('font-size')) / defaultFontSize;
            newValueFontSize = oldValueFontSize * 0.89 * 100;
            $('html').css('font-size', newValueFontSize + '%');
        }
        // Reinitialise la taille de la police
        function resetFontSize() {
            newValueFontSize = 62.5;
            $('html').css('font-size', newValueFontSize + '%');
        }
    });
})(jQuery);