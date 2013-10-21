(function($){
Chassis.SubView.detail_content = Chassis.SubView.extend({

    el: '#detail_page_content',
	
	events : {
		
	},

    init: function(options){
        this.spm = new Chassis.SubPageMgr({
          owner: this,
          max: 15,
          klass: 'detail_content_item'
        });

    },

    


	
	onBeforePageIn : function(){
		this.$el.show();
	}

	
	


});

})(Zepto);
