Chassis.PageView._TRANSITION_ = Chassis.PageView.extend({
    
    el : '#_common__page',
    
    init : function(){
        this.on('pageloadsuccess',this.onPageLoadSuccess);
        this.on('pageloaderror',this.onPageLoadError);
    },
    
    
    onBeforePageIn : function(){
        this.$el.html( 'page loading...' );
    },
    
    onPageLoadError : function(){
        this.$el.html( 'page loade error!<div><a href="#">GO Home!</a></div>' );
    },
    
    onPageLoadSuccess : function(){
        this.$el.hide();
    }
});