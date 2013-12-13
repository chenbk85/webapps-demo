var App = {
    init: function(){
    	$.extend(this, this.event);
        this.listeningMetric();
        this.eventCenter.init();
        this.search.init();
        this.toolbar.init();
		
		
				
        this.router.init();
    },

    listeningMetric: function(){
        var Metric = 'portrait';    //竖屏

        if(window.innerWidth > window.innerHeight) {
            Metric = 'landscape';
        }
        $(window).on('ortchange', function () {        //当转屏的时候触发
            if(window.innerWidth > window.innerHeight) {
                Metric = 'landscape';
            }else{
                Metric = 'portrait';
            }
        });

        this.Metric = Metric;
    },

    /**
     * 更新每次对话的时间
     */
    updateTime: function(){

    }
};