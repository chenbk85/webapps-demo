(function($){

app.collection.musichot_music = app.collection.extend({

    initialize: function(models, options){
        var me = this;
        
        me.options = $.extend({
            size : 20
        },options);
        
        
    }

    ,url: function(){
        var me = this;
        
        return _.template('/music/musichot.php?size=<%= size %>&time=<%= time %>')({
            size : me.options.size,
            time : (new Date()).getTime()
        });
        
    }

    ,parse: function(resp, xhr){
        return resp.song_list;
    }

});

})(Zepto);
