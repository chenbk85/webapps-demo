(function($){

app.model.singerdetail_info = app.collection.extend({

    initialize: function(models, options){
        var me = this;
        me.id = options.id;
    }

    ,url: function(){
        return '/music/getInfo?id=' + this.id;
    }

    ,parse: function(resp, xhr){
        return resp;
    }

});

})(Zepto);
