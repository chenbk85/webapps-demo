(function(){
    var appMenuTpl = '<div class="app_menu">' +
                            '<ul>' +
                                '<li><a href="#app_info">应用简介</a></li>' +
                                '<li><a href="#app_setting">设置</a></li>' +
                            '</ul>' +
                        '</div>';
    App.toolbar = {
        init: function(){
            this.appMenuIsShow = false;
            this.bindUI();
        },

        bindUI: function(){
            var me = this,
                menuContainer;

            $('.app_more').bind('click', function(){
                menuContainer = $(this).parent();

                if(me.appMenuIsShow){
                    me.removeAppMenu();
                }else{
                    me.createAppMenu(menuContainer);
                }
                
            });

            $('.item_filter').bind('touchend', function(){
                if($(this).find('.sub_list').css('display') === 'none'){
                    me.hideSubMenu();
                    me.showSubMenu($(this));
                }else{
                    me.hideSubMenu();
                }
            });

            $('.app_back').bind('click', function(){
                window.history.go(-1);
            });

            // $(document.body).bind('touchstart', function(ev){
            //     var target = ev.touches[0].target;

            //     if(!me.appMenuIsShow || $(target).attr('id') === 'J_appMore'){
            //         return;
            //     }


            //     if($(target).hasClass('app_menu') || $(target).parents('.app_menu').length > 0){
            //         return;
            //     }else{
            //         me.removeAppMenu();
            //     }
            // });
        },

        removeAppMenu: function(){
            this.appMenuIsShow && this.appMenu.remove();
            this.appMenuIsShow = false;
        },

        createAppMenu: function(menuContainer){
            this.appMenu = $(appMenuTpl).appendTo(menuContainer);
            this.appMenuIsShow = true;
			
			//this.appMenu.css( 'position','relative' );
			//alert( JSON.stringify(this.appMenu.offset()) );
        },

        hideSubMenu: function(){
            $('.sub_list').hide();
        },

        showSubMenu: function($el){
            $el.find('.sub_list').show();
        }
    };
})();
