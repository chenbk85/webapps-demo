(function($){

app.model.index_music_recommendalbum = app.model.extend({

    initialize: function(attributes, options){
        var me = this;
        
        me.options = options;
    }

    ,url: function(){
        return '/music/recommendalbum.php?' + (new Date()).getTime();
    }

    ,parse: function(resp, xhr){
        return resp.plaze_album_list.RM.album_list.list;
    }

});

})(Zepto);
