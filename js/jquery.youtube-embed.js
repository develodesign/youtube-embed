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
        this.$button = null;
        this.$image = null;
        this.$iframe = null;
        this.videoId = null;
        this._name = pluginName;
        this._defaults = {
            autoPlay: true,
            autoPosition: true,
            buttonClass: 'btn btn-primary',
            buttonText: 'Play Video',
            controls: 0,
            width: null,
            height: null,
            fillContainer: false,
            showControls: false,
            onComplete: function(){ return true }
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

            plugin.$element.on( 'click.' + plugin._name, function( event ) {

                event.preventDefault();

                plugin.getOnClickCallbacks.call(plugin);
            });
        },

        /**
         * Fire our onClick callbacks
         */
        getOnClickCallbacks: function() {

            this.showVideo();

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
        showVideo: function() {

            if( ! this.$iframe ){

                this.renderIframe();
            }

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

        /**
         * Render the button
         */
        setupButton: function() {
            this.$button =  $('<button/>')
                .addClass( this.options.buttonClass )
                .text( this.options.buttonText );

            this.$element.append(
                this.$button
            );
        },

        /**
         * Add the 16:9 style padding onto our container
         * so that it has the correct amount of height.
         */
        imageContainerRatioPadding: function() {
            this.$element.css( 'padding-bottom', '56.25%' );
        },

        /**
         * Setups the youtube embed and adds it to the container $element
         */
        renderIframe: function()  {

            this.getIframeDimensions();

            var autoplayParam = '';
            if( this.options.autoPlay ) {
                autoplayParam = '&autoplay=1';
            }

            var videoControls = 0;
            if( this.options.showControls ) {
                videoControls = 1;
            }

            var videoUrl = 'https://www.youtube.com/embed/' + this.getVideoId() + '?feature=player_detailpage&rel=0&frameborder=0&modestbranding=1&showinfo=0&controls='+videoControls+autoplayParam;

            var iframeStyling = '';
            if(this.options.fillContainer == true) {
                iframeStyling = 'style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px;"';

                this.imageContainerRatioPadding();
            }

            this.$iframe = $( '<iframe width="'+this.options.width+'" height="'+this.options.height+'" src="'+ videoUrl +'" '+iframeStyling+' frameborder="0" toolbars="0" allowfullscreen></iframe>' );
            this.$element.append( this.$iframe );

            // Add controls
            if( this.options.controls )
                this.$iframe.prop( 'controls', this.options.controls );
        },

        /**
         * Get the deminsions of the size the iframe should be
         * If one is not defined in the options then use the image width and height
         *
         * @returns {{height: number, width: number}}
         */
        getIframeDimensions: function(){

            if( ! this.options.width )
                this.options.width = this.$image.width();

            if( ! this.options.height )
                this.options.height = this.$image.height();

            return {
                height: this.options.height,
                width: this.options.width
            }
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