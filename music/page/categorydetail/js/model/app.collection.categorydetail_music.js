(function($){

app.collection.categorydetail_music = app.collection.extend({

    initialize: function(models, options){
        var me = this;
    }

    ,url: function(){
        return '/music/ad.json?' + (new Date()).getTime();
    }

    ,parse: function(resp, xhr){
        return resp.content;
    }

});

})(Zepto);
