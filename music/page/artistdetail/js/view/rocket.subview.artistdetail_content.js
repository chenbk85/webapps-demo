
(function($) {

rocket.subview.artistdetail_content = rocket.subview.extend({
    el: "#artistdetail_page_content"
    
    , events : {
          'tap .songs-panel'  : 'showPanelSongs'
        , 'tap .albums-panel' : 'showPanelAlbums'
    }
    
    
    ,init: function(options){
        var me = this, 
            id = options.id,
            subView;
        
        me.options = options;

        me._registerCurSubpage.call(me,id);
        
    }

    ,registerEvents: function(){
        var me = this, ec = me.ec;
        ec.on("pagebeforechange", me.onpagebeforechange, me);
    }

    ,onpagebeforechange: function(params){
        var me = this, 
            from = params.from,
            to = params.to,
            param = params.params;
        

        if(to == me.ec) {

            me.$el.show();
        }
    }
    
    , _registerCurSubpage : function(id){
        var me = this;
        
        me._registerSubpage.call(me,'artistdetail_content_info');

    }
    
    
    , _registerSubpage : function(subview){
    
        var me = this,subView,spm;
        spm = me.getSubpageManager({
            subpageClass: rocket.subview[ subview ]
        });
        subView = new rocket.subview[ subview ](
            $.extend({}, me.options), 
            me
        );
        me.append(subView);

        spm.registerSubpage(me.featureString, subView);

        return me;
    }
    
    , showPanelSongs : function(e){
        this._showPanel.call(this,'songs');
    }
    , showPanelAlbums : function(e){
        this._showPanel.call(this,'albums');
        
    }
    
    ,_showPanel : function(panel){
        var me = this,route = 'artistdetail/<%= id %>/<%= panel %>';
        me.$el.find('.songs-panel,.albums-panel').removeClass('on');
        me.$el.find('.' + panel + '-panel').addClass('on');
        
        me.$el.find('.songs,.albums').hide();
        me.$el.find('.' + panel).show();
        
        route = _.template(route)({
              id    : me.options.id
            , panel : panel
        });
        
        Backbone.history.navigate(route, {trigger:false});  
    }

});

})(Zepto);


