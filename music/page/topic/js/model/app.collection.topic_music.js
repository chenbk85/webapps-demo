(function($){

app.collection.topic_music = app.collection.extend({

    initialize: function(models, options){
        var me = this;
    }

    ,url: function(){
        return '/music/topic.php?' + (new Date()).getTime();
    }

    ,parse: function(resp, xhr){
        return resp.content;
    }

});

})(Zepto);
