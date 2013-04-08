(function($){

app.model.play_music = app.model.extend({

    initialize: function(attributes, options){
        
        var me = this;
        me.options = options;
    }

    ,url: function(){
        var me = this;
        
        return '/music/play.php?id='+ me.options.id +'&' + (new Date()).getTime();
    }

    ,parse: function(resp, xhr){
        return resp.songinfo;
    }

});

})(Zepto);
