(function($){

app.collection.allview = app.collection.extend({

    initialize: function(models, options){
        var me = this;
        
        me.options = options;
    }

    ,url: function(){
        return '/lvyou/place?id=' + this.options.id +'&' + (new Date()).getTime();
    }

    ,parse: function(resp, xhr){
        return resp.content;
    }

});

})(Zepto);
