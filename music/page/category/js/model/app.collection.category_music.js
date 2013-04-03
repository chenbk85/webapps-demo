(function($){

app.collection.category_music = app.collection.extend({

    initialize: function(models, options){
        var me = this;
    }

    ,url: function(){
        return '/music/category.json?' + (new Date()).getTime();
    }

    ,parse: function(resp, xhr){
        return resp.content;
    }

});

})(Zepto);
