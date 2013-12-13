(function($){

Chassis.SubView.detail_content = Chassis.SubView.extend({

    className: 'detail_page_content'

    ,init: function(options){
        var me = this,
            title = options.title,
            subView,
            spm;
        
        this.spm = new Chassis.SubPageMgr({
          owner: this,
          max: 15,
          klass: 'detail_content_detail'
        });
    }

    


	
	, onBeforePageIn : function(){
		this.$el.show();

	}

});

})(Zepto);
