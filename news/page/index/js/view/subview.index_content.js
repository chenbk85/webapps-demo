(function($){

Chassis.SubView.index_content = Chassis.SubView.extend({

    el: '#index_page_content'

    ,init: function(options){
        var me = this,
            title = options.title,
            subView,
            spm;
        
        this.spm = new Chassis.SubPageMgr({
          owner: this,
          max: 15,
          klass: 'index_content_detail'
        });
		
		me.root.on('update',function(args){
			var e = $.extend(me.params, {params:args});
			
			e.from = e.to;
			
			me.spm._afterPageIn( e );
			
			
		});
    }

    


	
	, onBeforePageIn : function(e){
		this.params = e;
		this.$el.show();

	}


});

})(Zepto);
