/**
 * Youtube Embed
 * - Turns a data-attribute into a playable youtube video
 *
 * @copyright   (c) Develo Design 2015
 * @author      Mike
 * @package     youtube-embed
 * @date        08/06/15
 */

;(function ($, window, document, undefined) {

    var pluginName = 'youtubeEmbed';

    function youtubeEmbed (element, options) {
        this.element = element;
        this.$button;
        this.$image;
        this.videoId;
        this._name = pluginName;
        this._defaults = {
            buttonClass: 'btn btn-primary',
            buttonText: 'Play Video',
            autoplay: true,
            autoPosition: true,
            width: null,
            height: null,
            onComplete: null
        };
        this.options = $.extend( {}, this._defaults, options );
        this.init();
    }

    $.extend(youtubeEmbed.prototype, {

        // Initialization logic
        init: function () {
            this.buildCache();
            this.setupBindings();

            /**
             * If we have an valid id
             */
            if( this.setImageVideoAttributes() ) {
                this.imageContainerToRelative();
                this.setupButton();
                if(this.options.autoPosition) {
                    this.imageContainerToRelative();
                    this.autoPosition();
                }
            }
        },

        /**
         * Setup any bindings that we need
         * this.$button by default needs a binding setup
         */
        setupBindings: function() {
            var plugin = this;
            plugin.$element.on('click'+'.'+plugin._name, function() {
                plugin.getOnClickCallbacks.call(plugin);
            });
        },

        /**
         * Fire our onClick callbacks
         */
        getOnClickCallbacks: function() {
            this.setupEmbed();
            this.hideElements();

            // Now we have finished
            this.getOnCompleteCallbacks();
        },

        /**
         * Fire the onComplete events if any
         */
        getOnCompleteCallbacks: function() {
            // Cache onComplete option
            var onComplete = this.options.onComplete;
            if ( typeof onComplete === 'function' ) {
                onComplete.call(this.element);
            }
        },

        /**
         * Hides the image and button attribute when playing.
         */
        hideElements: function() {
            this.$image.hide();
            this.$button.hide();
        },

        /**
         * Uses this.$element to find any images inside, for each one we loop through and try and find out data-youtube-id attribute.
         *
         * @return boolean|string
         */
        setImageVideoAttributes: function() {

            this.$image = this.$element.children('img');

            if ( ! this.$image.length ) {
                return false;
            }

            return this.videoId = this.$image.data( 'youtube-id' );
        },

        /**
         * As we are centering this.$element needs to be
         * relative for positioning of it's children elements.
         */
        imageContainerToRelative: function() {
            this.$element.css( 'position', 'relative' );
        },

        setupButton: function() {
            this.$button =  $('<div/>')
                .addClass( this.options.buttonClass )
                .text( this.options.buttonText );

            this.$element.append(
                this.$button
            );
        },

        /**
         * Setups the youtube embed and adds it to the container $element
         */
        setupEmbed: function()  {
            var autoplayParam = '';
            if( this.options.autoplay ) {
                autoplayParam = '&autoplay=1';
            }
            var videoUrl = 'https://www.youtube.com/embed/' + this.getVideoId() + '?feature=player_detailpage&rel=0&frameborder=0&modestbranding=1&showinfo=0&controls=0'+autoplayParam;
            var embedSetup = '<iframe width="'+this.options.width+'" height="'+this.options.height+'" src="'+ videoUrl +'" frameborder="0" toolbars="0" allowfullscreen></iframe>';
            this.$element.append(embedSetup);
        },

        /**
         *
         * @returns this.videoId
         */
        getVideoId: function() {
            return this.videoId;
        },

        /**
         * Center's the button relative to the this.$element container.
         */
        autoPosition: function() {
            this.$button.css({ top: 'calc(50% - ' + this.getButtonHeight()/2 + 'px)', left: 'calc(50% - ' + this.getButtonWidth()/2 + 'px)', position: 'absolute' });
        },

        /**
         * @returns $this.button height
         */
        getButtonHeight: function() {
            return this.$button.outerHeight();
        },

        /**
         * @returns this.$button width
         */
        getButtonWidth: function() {
            return this.$button.outerWidth();
        },

        // Cache DOM nodes for performance
        buildCache: function () {
            this.$element = $(this.element);
        }
    });

    $.fn.youtubeEmbed = function (options) {
        this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new youtubeEmbed( this, options ) );
            }
        });
        return this;
    };

})( jQuery, window, document );