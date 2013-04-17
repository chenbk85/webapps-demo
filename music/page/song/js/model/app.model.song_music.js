(function($){

app.model.song_music = app.model.extend({

    initialize: function(attributes, options){
        
        var me = this;
        me.options = options;
    }

    ,url: function(){
        var me = this;
        
        return _.template('/music/play.php?id=<%= id %>&<%= time %>')({
              time : (new Date()).getTime()
            , id   : me.options.id
        });
        
    }

    ,parse: function(resp, xhr){
        return resp.songinfo;
    }

});

})(Zepto);
