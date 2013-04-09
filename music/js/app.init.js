(function($) {

$.extend(app, {
    init: function() {

        
        
        app.refreshScroll();
        
        app.$globalLoading = $('#wrapper .global-loading');
        app.$pageLoading = $('#wrapper .page-loading');

        new app.router.vs();
        Backbone.history.start();

        function scroll(e){
            $(document.body).height(3600);
            
            setTimeout(function(){
                window.scrollTo(0, 1);
                
                $.later(function(){
                    $(document.body).height($(window).height());
                    
                });
                app.isLoaded = true;
            }, 0); 

        }

        $(function(e){
            scroll();
        });
    },
    
    refreshScroll : function(){
        app.wrapperScroll = app.wrapperScroll || new iScroll('wrapper');
        app.wrapperScroll.refresh();

    }
    

});

})(Zepto);    

