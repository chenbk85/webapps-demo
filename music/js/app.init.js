(function($) {

$.extend(app, {
    init: function() {

        app.$globalLoading = $('#wrapper .global-loading');
        app.$pageLoading = $('#wrapper .page-loading');

        new app.router.vs();
        Backbone.history.start();

        function scroll(e){
            $(document.body).height(600);

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

