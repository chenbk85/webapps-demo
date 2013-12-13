(function(){
	var searchIcon,
		searchForm,
		searchInput,
		searchSubmit,
		askTpl,
		answerTpl;

	App.search = {

		init: function(){

			searchIcon = $('#J_searchIcon');
			searchForm = $('.app_search_form');
			searchInput = $('.app_search_input');
			searchSubmit = $('.app_search_submit');
			askTpl = '<section class="dialogue_wrap ask">' +
						'<div class="dialogue_inner">' +
							'<div class="dialogue">' +
								'<p>{text}</p>' +
							'</div>' +
							'<p class="dialogue_time" data-time="{timeStr}">刚刚</p>' +
						'</div>' +
					'</section>';
			answerTpl = '<section class="dialogue_wrap answer">' +
							'<div class="dialogue_inner">' +
								'<div class="dialogue">' +
									'<p>{text}</p>' +
								'</div>' +
								'<p class="dialogue_time" data-time="{timeStr}">刚刚</p>' +
							'</div>' +
						'</section>';

			this.bindUI();
		},

		bindUI: function(){
			var me = this;

			searchIcon.bind('click', function(){
				//TODO 输入时转屏，有bug
				App.trigger('searchIconClick');
				$(this).hide();

				me.enableSearchForm();
			});

			$(document.body).bind('touchstart', function(ev){
	            var target = ev.touches[0].target;

	            if(!me.searchFormEnable){
	            	return;
	            }

	            if($(target).hasClass('app_search_form') || $(target).parents('.app_search_form').length > 0){
	                return;
	            }else{
	            	me.blurSearchForm();
	            }
	        });

			searchForm.bind('submit', function(ev){
				var input = searchInput.val();
				ev.preventDefault();

				me.addAsk(input);

				App.trigger('ask');
				
				me.blurSearchForm();
			});
		},

		blurSearchForm: function(){
			App.trigger('searchInputBlur');
			searchIcon.show();
			searchInput.blur();
			this.disableSearchForm();
		},

		enableSearchForm: function(){
			searchForm.css('opacity', 1);
			// app_search_form使用opacity:0使其不可见，但Input仍然可以获得焦点，所以将其disabled设置为true，可见时在enable
			searchInput.removeAttr('disabled');
			searchSubmit.removeAttr('disabled');
			searchInput.focus();
			searchInput.val('');

			this.searchFormEnable = true;
		},

		disableSearchForm: function(){
			searchForm.css('opacity', 0);
			searchInput.attr('disabled', 'true');
			searchSubmit.attr('disabled', 'true');

			this.searchFormEnable = false;
		},

		addAsk: function(text){
			var html = askTpl.replace('{text}', text).replace('{timeStr}', new Date().getTime());
			$($('.main_wrap').children()[0]).before(html);

			window.scrollTo(0, 0);
		},

		addAnswer: function(text){
			var html = answerTpl.replace('{text}', text).replace('{timeStr}', new Date().getTime());
			$($('.main_wrap').children()[0]).before(html);

			window.scrollTo(0, 0);
		}
	};
})();
