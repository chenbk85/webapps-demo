(function($){

app.model.singerhot_music = app.model.extend({

    initialize: function(attributes, options){
        var me = this;
    }

    ,url: function(){
        return '/music/singerhot.php?' + (new Date()).getTime();
    }

    ,parse: function(resp, xhr){
        return resp.artist;
    }

});

})(Zepto);
