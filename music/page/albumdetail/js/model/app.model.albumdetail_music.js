(function($){

app.model.albumdetail_music = app.model.extend({

    initialize: function(attributes, options){
        var me = this;
        me.options = options;
    }

    ,url: function(){
        var me = this;
        
        return _.template('/music/albumdetail.php?<%= date %>')({
             date : (new Date()).getTime()
        });
    }

    ,parse: function(resp, xhr){
        return resp;
    }

});

})(Zepto);
