(function($){

app.collection.musichot_music = app.collection.extend({

    initialize: function(models, options){
        var me = this;
    }

    ,url: function(){
        return '/music/musichot.php?' + (new Date()).getTime();
    }

    ,parse: function(resp, xhr){
        return resp.song_list;
    }

});

})(Zepto);
