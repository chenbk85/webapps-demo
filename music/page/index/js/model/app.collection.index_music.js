(function($){

app.collection.index_music = app.collection.extend({

    initialize: function(models, options){
        var me = this;
        
        me.options = options;
    }

    ,url: function(){
        return '/music/ad.json?' + (new Date()).getTime();
    }

    ,parse: function(resp, xhr){
        return resp.content;
    }

});

})(Zepto);
