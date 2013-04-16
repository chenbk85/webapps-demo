(function($){

app.model.singerhot_music = app.model.extend({

    initialize: function(attributes, options){
        var me = this;
    }

    ,url: function(){
        var me = this;
        
        return _.template('/music/singerhot.php?<%= time %>')({
              time : (new Date()).getTime()
        });
    }

    ,parse: function(resp, xhr){
        return resp.artist;
    }

});

})(Zepto);
