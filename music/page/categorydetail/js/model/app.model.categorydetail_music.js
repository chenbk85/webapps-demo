(function($){

app.model.categorydetail_music = app.model.extend({

    initialize: function(models, options){
        var me = this;
        me.options = options;
    }

    ,url: function(){
        var me = this;
        return '/music/categorydetail.php?tag='+ me.options.id + '&' + (new Date()).getTime();
    }

    ,parse: function(resp, xhr){
        return resp.taginfo;
    }

});

})(Zepto);
