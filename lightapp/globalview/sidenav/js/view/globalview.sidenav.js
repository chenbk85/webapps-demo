(function($){
 
Chassis.GlobalView.sidenav = Chassis.GlobalView.extend({
     
    el: '#sidenav_globalview'

    ,init: function(options){
        var me = this;

         

        
		
		me.registerEvents();
    }

    ,registerEvents: function(){
        var me = this, ec = me.root;

        ec.on('routechange', me.onRouteChange, me);
       
    }

    ,onRouteChange: function(params){
        this.$el.find( '.action' ).html( params.action );
    }

    

});

 })(Zepto);
