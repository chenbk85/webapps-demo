App.eventCenter = {
    init: function(){
        // 点击搜索按钮时触发
        App.on('searchIconClick', function(){

            //TODO 获取当前view
            // 竖屏时，把toolbar改成relative定位，增加可视区域高度
            if(App.Metric === 'portrait'){
                $('.app_toolbar').css('position', 'relative');
                $('.main_wrap').css('margin-top', 0);
                $('.pageview').css('padding-top', 0);
            }
        });

        // 搜索框失去焦点时触发
        App.on('searchInputBlur', function(){
            if(App.Metric === 'portrait'){
                $('.app_toolbar').css('position', 'fixed');
                $('.main_wrap').css('margin-top', '54px');
                $('.pageview').css('padding-top', '52px');
            }
        });

        //当页面停止滚动时触发
        $(window).on('scrollStop', function(){
            App.toolbar.removeAppMenu();
            App.toolbar.hideSubMenu();
        });

        //当横竖屏切换时触发
        $(window).on('ortchange', function(){
            App.toolbar.removeAppMenu();
            App.toolbar.hideSubMenu();
        });

        //当用户搜索时触发
        App.on('ask', function(){
            App.trigger('answer');
        });

        //当系统返回搜索结果时触发
        App.on('answer', function(){
            App.search.addAnswer('欢迎使用客为尊轻应用：http://www.baidu.com');
        });


        //当view切换时触发
        App.on('indexViewIn', function(){
            //显示搜索icon
            setTimeout(function(){
                $('#J_searchIcon').show();
            }, 100);
        });
        App.on('indexViewOut', function(){
            App.toolbar.removeAppMenu();
            $('#J_searchIcon').hide();
        });
        App.on('detailViewOut', function(){
            //App.toolbar.removeAppMenu();
        });
    }
};