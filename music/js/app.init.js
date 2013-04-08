(function($) {

$.extend(app, {
    init: function() {
        /*
        $('body').css({ 
            height : document.documentElement.clientHeight,
            width  : $(window).width()
        });
        
       
        
        
        window.setTimeout(function(){
             $('#index_page').css({ 
                height : 10000
            });
            new iScroll('index_page',{
                hScroll : false,
                hScrollbar : false,
                vScrollbar : false
            });
        },10*1000);
        */
        app.$globalLoading = $('#wrapper .global-loading');
        app.$pageLoading = $('#wrapper .page-loading');

        new app.router.vs();
        Backbone.history.start();

        function scroll(e){
            $(document.body).height(600);

            // http://remysharp.com/2010/08/05/doing-it-right-skipping-the-iphone-url-bar/
            setTimeout(function(){
                window.scrollTo(0, 0);
                $.later(function(){
                    $(document.body).height($(window).height());
                });
                app.isLoaded = true;
            }, 1000); 

        }

        $(function(e){
            scroll();
        });
    }

});

})(Zepto);    

