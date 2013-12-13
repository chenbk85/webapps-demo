// ==========================================
// Copyright 2013 Baidu, Inc
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// ==========================================
define(  
	[
		'base/index',
		'mixin/index'
	],
	
	function( base, mixin ){
		var 
			//namespace split
			nsRE  = /:|\./,
			
			//name split
			nmRE  = /\s+|,/,
			
			event,
			_event,
			on,
			off,
			once,
			trigger,
			stopListening,
			matchEvent,
			matchAllEvent,
			getEventNS;

		on = function( name, callback, context ) {
			var me = this,
				nameGroup,
				comCallback
			
			//数组类型，支持同个事件多个回调。
			//如果相同的事件某一个结果为false，则这次触发的事件链停止
			
			!me._events && ( me._events = [] )
			
			nameGroup = base.isObject( name ) ? 
						( context = callback, name ) : 
						( comCallback = callback, name.split( nmRE ) );
			
			base.each( nameGroup, function( value ) {
				var ns        = getEventNS( value ),
					eventName = ns.name,
					eventNS   = ns.namespace;
				
				//all事件没有namespace
				if ( eventName === 'all' ) {
					!me._events.all && ( me._events.all = [] );
					me._events.all.push( {
						callback  : comCallback || value,
						context   : context,
						namespace : eventNS || 'after'
					} );
					return;
				}
				
				eventName && me._events.push( {
					name      : eventName,
					callback  : comCallback || value,
					context   : context,
					namespace : eventNS
				} );
			} );
			
			return this;
		};
		
		off = function( name ) {
			var me = this;

			if ( !arguments.length ) {
				this._events = [];
				return this;
			}
			
			base.each( name.split( nmRE ), function( value ) {
				var ns        = getEventNS( value ),
					eventName = ns.name,
					eventNS   = ns.namespace;
				
				
				if ( eventName === 'all' ) {
					me._events.all = [];
					base.each( me._events.all, function( eventAll, eventAllKey ) {
						( 
							// off( 'all' )等同于 off( 'all.after' )
							( eventNS === eventAll.namespace ) ||
							(
							  !eventNS && 
							  ( eventAll.namespace === 'after' )
							)
						) &&
						delete me._events.all[ eventAllKey ];
					} );
					return;
				}
				
				matchEvent.call(me, 
						value, 
						function( meEvent, meEventKey ) {
							delete me._events[ meEventKey ]
						} 
				);
				
			} );

			return this;
		};
		
		once = function( name, callback, context ) {
			var me = this,
				once = function() {
					callback.apply( context, arguments );
					me.off( name );
				};	
			return this.on( name, once, context );
		};
		
		/**
		 *
		 *
		 */
		trigger = function( name, args, allow ) {
			var me = this,
				result;
			
			if ( !this._events ) {
				this._events = [];
				return this;
			}
			
			
			// 如果trigger( 'all' )怎么办?
			matchAllEvent.call( me, 'all', 'before', args );
			
			// 主动调用trigger( 'all' )是不会触发all之外的事件的
			base.each( name.split( nmRE ), function( value ) {
				var ns        = getEventNS( value ),
					eventName = ns.name,
					eventNS   = ns.namespace;

				matchEvent.call(me, 
						value, 
						function( meEvent, meEventKey ) {
							return meEvent.callback.apply( 
								meEvent.context, 
								[ 
									{
										type   : meEvent.name,
										target : me
									},
									args
								] 
							)
						} 
				);
				
				
				
			} );
			
			// trigger( 'all.after' )
			matchAllEvent.call( me, 'all', 'after', args );
			
			return this;
		};
		
		stopListening = function( obj, name, callback ) {
			var listeners = this._listeners,
				me = this,
				deleteListener,
				id;
			
			if ( !listeners ) {
				return this;
			}
			
			deleteListener = !name && !callback;
			
			
			if ( base.isObject( name ) ) {
				callback = me;
			}
			
			if ( obj ) {
				(listeners = {})[ obj._listenerId ] = obj;
			}

			base.each( listeners, function( item, key ){
				name ? 
					listeners[ key ].off( name, callback, me ) :
					listeners[ key ].off();
				
				if ( deleteListener ) {
					delete me._listeners[ key ];
				}
				
			} );
			
			return this;
		};
		
		getEventNS = function( event ) {
			var ns,
				eventName,
				eventNS;
				
			if ( base.isObject( event ) ) {
				eventName = event.eventName;
				eventNS   = eventNS;
				
			} else {
				ns        = event.split( nsRE );
				eventName = ns[ 0 ];
				eventNS   = (ns.length > 1) ? ns[ 1 ] : '';
			}
			    
			return {
				name      : eventName,
				namespace : eventNS
			};
		};
		
		matchEvent = function( event, callback ) {
			var me        = this,
				ns        = getEventNS( event ),
				eventName = ns.name,
				eventNS   = ns.namespace;
			
			
			base.each( me._events, function( meEvent, meEventKey ) {
				var able = meEvent &&
					(
						(
							
							//off( "?:namespace" )
							eventNS && (
								(
									
									//off( "event:namespace" )
									( meEvent.name === eventName ) &&
									( meEvent.namespace === eventNS )
								) || (
									
									//off( ":namespace" )
									!eventName &&
									( eventNS === meEvent.namespace )
								)
							)
						) || (
							
							//off( 'event' )
							!eventNS && ( 
								meEvent.name === eventName 
							)
						)
					);
					
					if ( able ) {
						return callback.call( me, meEvent, meEventKey );
					}
			} );
		
		};
		
		matchAllEvent = function( eventName, eventNS, args ) {
			var me = this;
			if ( base.inArray( [ 'anything', 'all' ], eventName ) ) {
				
				base.each( me._events.all || [], function( allEvent, allKey ) {
					( eventNS == allEvent.namespace ) &&
						allEvent.callback.apply(
							allEvent.context,
							[ 
								{
									type   : allEvent.name,
									target : me
								},
								args
							]
						);
				} );
			}
		};
		
		_event = {
			on            : on,
			off           : off,
			once          : once,
			trigger       : trigger,
			stopListening : stopListening
			
		};
		
		base.each( { listenTo : 'on' , listenToOnce : 'once' }, function( value, key ) {
			_event[ key ] = function( obj, name, callback ) {
				var me = this,
					listeners,
					id;
				
				listeners = this._listeners || (this._listeners = {});
				id = obj._listenerId || (obj._listenerId = base.uniqueId( 'l' ));
				listeners[ id ] = obj;
				
				if ( base.isObject( name ) ) {
					callback = me;
				}
				
				obj[ value ]( name, callback, this );
				
				return this;
			};
			
		} );
		
		event = {
			mixto : function( dest ) {
				return mixin( dest, _event );
			}
		};
		
		return event;
	}
);