;(function(){
/**
 * @fileOverview 命名空间初始化
 */

/**
 * 命名空间
 * @class Chassis
 */
var root = this,
    exportName = 'Chassis',
    Chassis = root[ exportName ] = {};

/**
 * 版本号
 * @property VERSION
 * @static
 * @type string
 */
Chassis.VERSION = '0.1.0';

/**
 * 页面切换动画命名空间
 * @property FX
 * @static
 * @type string
 */
Chassis.FX = {}; 

/**
 * see [jQuery](http://api.jquery.com/),
 * [Zepto](http://zeptojs.com/),[GMU](http://gmu.baidu.com/)
 * or [ender](https://ender.no.de)
 * @property $
 * @type object
 */
Chassis.$ = root.Zepto;


 /*jshint camelcase:false*/
 /**
 * @fileOverview 语言增强
 */

var proto = Array.prototype,
        nativeForEach = proto.forEach,
        breaker = {},
        toString = proto.toString,
        nativeIsArray = Array.isArray;

/**
 * mixin方法，等同于$.extend;
 * @method mixin
 * @static
 */
Chassis.mixin = $.extend;

/**
 * 实现类继承
 * @method extend
 * @static
 * @param    {object} protoProps    原型属性或方法
 * @param    {object} staticProps 类属性或方法
 * @return {function}
 */
Chassis.extend = function( protoProps, staticProps ) {
        var parent = this,
                Proxy,
                child;

        // 构造函数
        if ( protoProps && protoProps.hasOwnProperty( 'constructor' ) ) {
                child = protoProps.constructor;
        } else {
                child = function() {
                        return parent.apply( this, arguments );
                };
        }

        // 静态方法
        Chassis.mixin( child, parent, staticProps );

        // 原型链处理
        Proxy = function() {
                this.constructor = child;
        };

        Proxy.prototype = parent.prototype;
        child.prototype = new Proxy();

        if ( protoProps ) {
                Chassis.mixin( child.prototype, protoProps );
        }

        child.__super__ = parent.prototype;

        return child;

};

/**
 * 创建一个只能调用一次的函数。
 * > 重复调用改进的方法也没有效果，还是返回第一次执行的结果。
 * > 有助于初始化类型的方法，代替过去设置一个boolean标记及后续对标记检测。
 *
 * @method _once
 * @static
 * @param    {function} func 传入的函数
 * @return {function} 只能调用一次的函数
 */         
Chassis._once = function( func ) {
        var me = this,
                ran = false, 
                memo;

        return function() {
                
                if ( ran ) {
                        return memo;
                }
                
                ran = true;
                memo = func.apply( me, arguments );
                func = null;
                return memo;
        };
};

/**
 * 判断一个对象是否有你给出名称的属性或对象。
 * > 需要注意的是，此方法无法检查该对象的原型链中是否具有该属性，该属性必须是对象本身的一个成员。
 *
 * @method has
 * @static
 * @param    {object} obj 目标对象
 * @param {string} key 属性
 * @return {boolean} key 属性
 */
Chassis.has = function( obj, key ) {
        return hasOwnProperty.call( obj, key );
};

/**
 * 检索object的所有的属性名称。
 *
 * @method keys
 * @static
 * @param    {object} obj 目标对象
 * @return {array} 所有的属性名称
 */
Chassis.keys = function( obj ) {
        var keys = [];
        
        if ( obj !== Object( obj ) ) {
                throw new TypeError( 'Invalid object' );
        }
        
        Chassis.$.each( obj, function( key, item ) {
                if ( Chassis.has( obj, key ) ) {
                        keys[ keys.length ] = key;
                }
        } );
        
        return keys;
};

/**
 * 为需要的客户端模型或DOM元素生成一个全局唯一的id。
 * > 如果prefix参数存在， id 将附加给它
 *
 * @method uniqueId
 * @static
 * @param    {string} prefix 前缀
 * @return {string}
 */
Chassis.uniqueId = (function() {
        var idCounter = 0;

        return function( prefix ) {
                var id = ++idCounter + '';
                return prefix ? prefix + id : id;
        };
})();

        
/**
 * see [$.isArray](http://zeptojs.com/#$.isArray)
 * @method isArray
 * @static
 */
Chassis.isArray = Chassis.$.isArray;

/**
 * 判断是否是对象
 *
 * @method isObject
 * @static
 * @param    {*} obj 目标
 * @return {boolean}
 */
Chassis.isObject = function( obj ) {
        return obj === Object( obj );
};

/**
 * see [$.isFunction](http://zeptojs.com/#$.isFunction)
 *
 * @method isFunction
 * @static
 */
Chassis.isFunction = Chassis.$.isFunction;

/**
 * 创建 一个浅复制（浅拷贝）的克隆object。
 * > 任何嵌套的对象或数组都通过引用拷贝，不会复制。
 *
 * @method clone
 * @static
 * @param    {object} obj 目标对象
 * @return {object}
 */
Chassis.clone = function( obj ) {
        if ( !Chassis.isObject( obj ) ) {
                return obj;
        }
        return Chassis.isArray( obj ) ? obj.slice() : Chassis.mixin( {}, obj );
};

/**
 * 返回对象属性的运行结果
 * > 如果该属性是一个方法，则返回该方法的运算结果
 *
 * @method result
 * @static
 * @param    {object} obj 目标对象
 * @param    {object} property 目标属性
 * @return {object}
 */
Chassis.result = function( object, property ) {
        var value;

        if ( object === null ) {
                return null;
        }
        
        value = object[ property ];
        return Chassis.isFunction( value ) ? value.call( object ) : value;
};

/**
 * 转义HTML字符串，替换&, <, >, ", ', /字符
 *
 * @method escape
 * @static
 * @param    {string} str 目标字符串
 * @return {string}
 */
Chassis.escape = function( str ) {
        return str ?
                str.replace( /\&/g, '&amp;' )
                        .replace( /</g, '&lt;' )
                        .replace( /\>/g, '&gt;' )
                        .replace( /\"/g, '&quot;' )
                        .replace( /\'/g, '&#x27' )
                        .replace( /\//g, '&#x2F' ):
                str;

};

/**
 * see [$.proxy](http://zeptojs.com/#$.proxy)
 *
 * @method proxy
 * @static
 */
Chassis.proxy = $.proxy;

/**
 * 将两个数组转换为名称-值对的对象
 *
 * @method object
 * @param    {array} list 目标数组(key)
 * @param    {array} values 目标数组(value)
 * @return {object}
 * @static
 */
Chassis.object = function( list, values ) {
        var result = {};

        if ( list === null ) {
                return {};
        }
        
        Chassis.$.each( list, function( key, item ) {
                if ( values ) {
                        result[ item ] = values[ key ];
                } else {
                        result[ item[ 0 ] ] = item[ 1 ];
                }
        } );

        return result;
};






$.support = Chassis.mixin( $.support || {}, {
        has3d: 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix()
} );

/**
 * Undefined
 * @property Undefined
 * @static
 * @type undefined
 * @private
 */
Chassis.Undefined;
/**
 * @fileOverview 事件机制
 */

/**
 * Events
 * @class Events
 * @namespace Chassis
 */
var Events = Chassis.Events = {
        
        /**
         * > 绑定 `callback` 函数到 `object` 对象。
         *
         * > 当事件触发时执行回调函数 callback 。
         *
         * @method on
         * @param {string} name
         * @param {function} callback
         * @param {object} context
         * @return {object}
         * @static
         * @example

                var obj = Chassis.mixin({},Chassis.Events);
                obj.on("a b c",callback);
                obj.on({a:callback, b:callback, c:callback},obj);

         */
        on: function( name, callback, context ) {
                var events;
                
                if ( !eventsApi( this, 'on', name, [ callback, context ] ) ||
                                !callback ) {
                        return this;
                }
                
                if ( !this._events ) {
                        this._events = {};
                }
                
                events = this._events[ name ] || (this._events[ name ] = []);
                events.push({
                        callback: callback,
                        context: context,
                        ctx: context || this
                });
                
                return this;
        },

        /**
         * > 绑定 只能运行一次的callback 函数到 object 对象。 
         *
         * > 当事件触发时执行回调函数 callback 。
         *
         * @method once
         * @param {string} name
         * @param {function} callback
         * @param {object} context
         * @return {object}
         * @static
         * @example
        
                var obj = Chassis.mixin({},Chassis.Events);
                obj.once("a b c",callback);
                obj.once({a:callback, b:callback, c:callback},obj);
        
         */
        once: function( name, callback, context ) {
                var me = this,
                        once;
                
                if ( !eventsApi( this, 'once', name, [ callback, context ] ) ||
                                !callback ) {
                        return this;
                }
                

                once = Chassis._once(function() {
                        me.off( name, once );
                        callback.apply( me, arguments );
                });
                
                once._callback = callback;

                return this.on( name, once, context );
        },

        /**
         * > 移除绑定的事件。 
         *
         * @method off
         * @param {string} name
         * @param {function} callback
         * @param {object} context
         * @return {object}
         * @static
         * @example
        
                var obj = Chassis.mixin({},Chassis.Events);
                obj.off("a b c",callback);
                obj.off({a:callback, b:callback, c:callback},obj);
        
         */
        off: function( name, callback, context ) {
                var me = this,
                        retain, 
                        ev, 
                        events, 
                        names, 
                        i, 
                        l, 
                        j, 
                        k;
                        
                if ( !this._events ||
                                !eventsApi( this, 'off', name, [ callback, context ] ) ) {
                        return this;
                }
                
                if ( !name && !callback && !context ) {
                        this._events = {};
                        return this;
                }

                names = name ? [ name ] : this._events;
                
                Chassis.$.each( names, function( nKey, nItem ) {
                        var evtName = name ? nItem : nKey;

                        events = me._events[ evtName ];

                        if ( events ) {
                                me._events[ evtName ] = retain = [];

                                if ( callback || context ) {
                                        Chassis.$.each( events, function( eKey, eItem ) {
                                                ev = eItem;
                                                if ( (callback && callback !== ev.callback &&
                                                                callback !== ev.callback._callback) ||
                                                                (context && context !== ev.context) ) {
                                                        retain.push( ev );
                                                }
                                        } );
                                        
                                }
                                if ( !retain.length ) {
                                        delete me._events[ evtName ];
                                }
                        }
                } );
                
                return this;
        },

        /**
         * > 触发绑定的事件。 
         *
         * @method trigger
         * @param {string} name
         * @return {object}
         * @static
         * @example
        
                var obj = Chassis.mixin({},Chassis.Events);
                obj.trigger("a b c");
        
         */
        trigger: function( name ) {
                var args,
                        events,
                        allEvents;
                
                if ( !this._events ) {
                        return this;
                }
                
                args = [].slice.call( arguments, 1 );
                
                if ( !eventsApi( this, 'trigger', name, args ) ) {
                        return this;
                }
                
                events = this._events[ name ];
                allEvents = this._events.all;
                
                if ( events ) {
                        triggerEvents( events, args );
                }
                
                if ( allEvents ) {
                        triggerEvents( allEvents, arguments );
                }
                
                return this;
        },

        /**
         * > 停止监听事件 
         *
         * @method stopListening
         * @param {string} name
         * @param {function} callback
         * @param {object} context
         * @return {object}
         * @static
         * @example
        
                var obj = Chassis.mixin({},Chassis.Events);
                obj.stopListening("a b c",callback);
        
         */
        stopListening: function( obj, name, callback ) {

                var listeners = this._listeners,
                        me = this,
                        deleteListener,
                        id;
                
                if ( !listeners ) {
                        return this;
                }
                
                deleteListener = !name && !callback;
                
                if ( typeof name === 'object' ) {
                        callback = me;
                }
                
                if ( obj ) {
                        (listeners = {})[ obj._listenerId ] = obj;
                }
                
                Chassis.$.each( listeners, function( key, item ) {

                        listeners[ key ].off( name, callback, me );
                        
                        if ( deleteListener ) {
                                delete me._listeners[ key ];
                        }
                } );
                
                return this;
        }

};

var eventSplitter = /\s+/;

var eventsApi = function( obj, action, name, rest ) {
        var names,
                i,
                l;

        if ( !name ) {
                return true;
        }

        if ( typeof name === 'object' ) {
                Chassis.$.each( name, function( key, item ) {
                        obj[ action ].apply( obj, [ key, item ].concat( rest ) );
                } );
                
                return false;
        }

        if ( eventSplitter.test( name ) ) {
                
                names = name.split( eventSplitter );
                
                Chassis.$.each( names, function( key, item ) {
                        obj[ action ].apply( obj, [ item ].concat( rest ) );
                } );
                
                return false;
        }

        return true;
};


var triggerEvents = function( events, args ) {

        var l = events.length, 
                a1 = args[ 0 ], 
                a2 = args[ 1 ], 
                a3 = args[ 2 ], 
                i = -1,
                ev;
        
        switch ( args.length ) {
                case 0: 
                        while ( ++i < l ) {
                                (ev = events[ i ]).callback.call( ev.ctx ); 
                        }
                        return;
                case 1: 
                        while ( ++i < l ) {
                                (ev = events[ i ]).callback.call( ev.ctx, a1 ); 
                        }
                        return;
                case 2: 
                        while ( ++i < l ) {
                                (ev = events[ i ]).callback.call( ev.ctx, a1, a2 ); 
                        }
                        return;
                case 3: 
                        while ( ++i < l ) {
                                (ev = events[ i ]).callback.call( ev.ctx, a1, a2, a3 ); 
                        }
                        return;
                default: 
                        while ( ++i < l ) {
                                (ev = events[ i ]).callback.apply( ev.ctx, args );
                        }
        }
};

var listenMethods = { listenTo: 'on', listenToOnce: 'once' };

/**
 * see [on](#method_on)
 *
 * @method listenTo
 * @static
 */
/**
 * see [once](#method_once)
 *
 * @method listenToOnce
 * @static
 */
Chassis.$.each( listenMethods, function( method, implementation ) {
        Events[ method ] = function( obj, name, callback ) {

                var me = this,
                        listeners,
                        id;
                
                listeners = this._listeners || (this._listeners = {});
                id = obj._listenerId || (obj._listenerId = Chassis.uniqueId( 'l' ));
                listeners[ id ] = obj;
                
                if ( typeof name === 'object' ) {
                        callback = me;
                }
                
                obj[ implementation ]( name, callback, this );
                return this;
        };
} );

/**
 * see [on](#method_on)
 *
 * @method bind
 * @static
 */

/**
 * see [off](#method_off)
 *
 * @method unbind
 * @static
 */

Events.bind     = Events.on;
Events.unbind = Events.off;

Chassis.mixin( Chassis, Events );
/**
 * @fileOverview Model
 */

/**
 * @fileOverview Router核心实现
 * @requires Router.History || Router.Pushstate
 */

/**
 * 路由
 * @class Router
 * @namespace Chassis
 * @constructor
 * @param {object} opts
 */
var Router = Chassis.Router = function( opts ) {
        
        this.pageOrder = [];
        
        if ( !opts ) {
                opts = {};
        }
        
        /**
         * 路由规则
         * @property routes
         * @description
         *
         *            路由规则包括两种配置方式
         *
         *            1. 键值对配置，例如：
         *            {
         *                    '': 'index',
         *                    'info/:id': 'info'
         *            }
         *            其中的key表示路由解析规则，规则中包括`action`和参数；`action`指定路由的目标
         *            页面；
         *            其中的val表示的是自定义路由处理函数，如果需要自定义路由行为则可以在`Router`类中
         *            定义名称为val的函数，其实参为路由规则解析后得到的参数；如果需要阻止默认路由行为则
         *            需要返回false。
         *
         *            2. 数组配置，例如：
         *            [
         *                    'info/:id'
         *            ]
         *            这种配置方式会使用默认的路由行为：路由目标为`Chassis.PageView.info`;
         *            使用这种配置方式时如果路由action为空时会默认路由到`Chassis.PageView.index`,
         *            可以通过`opts.index`来重新设置;
         * @type object
         */
         

        if ( opts.routes ) {
                this.routes = opts.routes;
        }

        // 默认的路由action
        this._index = opts.index || 'index';

        // 保存的视图列表，对应不同页面
        this.views = {};

        // 记录控制器变化
        this.currentView = null;
        this.previousView = null;
        
        this._bindRoutes();
        
        this.init.apply( this, arguments );
        
        if ( opts.start ) {
                Chassis.history.start();
        }
};

Chassis.mixin( Router.prototype, Events, {
        
    /**
     * 实例化一个路由对象
     *
     * @public
     * @method init
     * @optional
     * @return 
     **/
    init : function() {},
    
    /**
     * 
    为路由对象手动创建路由，route 参数可以是 路由字符串 或 正则表达式。 

    每个捕捉到的被传入的路由或正则表达式，都将作为参数传入回调函数（callback）。
         *
         * @public
         * @method route
         * @param {string} route
         * @param {string} name
         * @param {function} callback
         * @return 
         **/
        route : function( route, name, callback ) {

                var me = this,
                        routeRe = me._routeToRegExp( route ),
                        keys = routeRe.exec( route ).slice( 1 );
                
                if ( Chassis.isFunction( name ) ) {
                        callback = name;
                        name = '';
                }
                
                if ( !callback ) {
                        callback = this._getHandler( name );
                }
                
                Chassis.$.each( keys, function( key, item ) {
                        keys[ key ] = item.substring( 1 );
                } );
                
                Chassis.history.route( routeRe, function( fragment ) {
                
                        var vals, 
                                Request;
                        
                        vals = routeRe.exec( fragment ).slice( 1 );
                        Request = Chassis.object( keys, vals );
                        
                        me.Request = Request;

                        callback.call( me );
                
                } );

        },
        
        /**
         * 手动路由
         *
         * @private
         * @method navigate
         * @param {string} fragment
         * @param {object} opts
         * @return 
         **/
        navigate : function( fragment, opts ) {
                return Chassis.history.navigate( fragment, opts );
        },

        /**
         * 页面切换顺序配置
         * @property pageOrder
         * @type array
         */
        pageOrder: [],
        
        /**
         * 默认页面切换动画，合理选择配置
         * @property defaultTransition
         * @note: slide比较适用于固高切换(默认)
         * @note: fade比较适用DOM树较小的两个页面切换
         * @note: simple性能最好，但效果最一般
         * @note: dropdown只能用于固高切换
         * @type string
         */
        defaultTransition: 'slider',


        /**
         * 页面切换动画配置
         * @property pageTransition
         * @key {string} actionname-actionname，"-"号分隔的action名称串，不分先后，但支持精确设定
         * @value {string} animation name
         * @note: 以index和search为例，有两种可设定的值：index-search和search-index：
         *         1. 如果只设定了其中一个，则不分先后顺序同时生效。比如'index-search':'fade'，
         *         无论index->search还是search->index，切换动画总是fade
         *         2. 如果两个都设定了，则分别生效。比如'index-search':'fade'，'search-index':
         *         'slide'，那么index->search使用fade动画，search->index使用slide动画
         *         3. 如果两个都没有设定，则都是用默认动画
         * @type object
         */
        pageTransition: {
                
                // 'index-search': 'fade'
                // ,'index-page': 'slide'
        },

        /**
         * 通用切换页面逻辑
         * @method switchPage
         * @param {pageview} from
         * @param {pageview} to
         * @param {object} params
         */
        switchPage: function( from, to, params ) {

                var me = this,
                        e = {
                                from: from,
                                to: to,
                                params: params
                        },
                        dir = 0, 
                        order = me.pageOrder, 
                        fromAction = from && from.action,
                        toAction = to && to.action,
                        fromIndex = order.indexOf( fromAction ),
                        toIndex = order.indexOf( toAction );

                /**
                 * 计算页面切换方向：0-无方向，1-向左，2-向右
                 */
                 
                
                if ( fromAction !== toAction ) {
                        if ( -1 !== fromIndex && -1 !== toIndex ) {
                                dir = fromIndex > toIndex ? 2 : 1;
                        }
                }

                // 记忆位置
                if ( me.enablePositionRestore && from ) {
                        from.savePos();
                }
                
                if ( from ) {
                        from.trigger( 'beforepageout', e );
                }
                
                if ( to ) {
                        to.trigger( 'beforepagein', e );
                }


                /*
                Chassis.each( 
                        from == to ? [ from ] : [ from, to ], function( item, key ) {

                        item && item.trigger( 'pagebeforechange', {
                                from: me.previousView, 
                                to: me.currentView,
                                params: params 
                        });
                });
                */
                
                
                
                me._doTransition(
                        from,
                                to,
                                dir,
                                function() {
                                
                                /**
                                 * 尽可能等切换稳定了再开始数据请求
                                 * 延后一点用户感觉不出来，但能保证页面的稳定性
                                 */

                                // 恢复位置
                                if ( me.enablePositionRestore && to ) {
                                        to.restorePos( params );
                                }
                                

                                /*
                                $.each(from == to ? [from] : [from, to], function(key, item){
                                        // item && console.log('pageafterchange');
                                        item && item.trigger(
                                                'pageafterchange', {
                                                        from: me.previousView, 
                                                        to: me.currentView,
                                                        params: params 
                                                });
                                });
                                */
                                
                                if ( from && from.$el ) {
                                        
                                        if ( from.trigger( 'afterpageout', e ) ) {
                                                from.$el.hide();
                                        }
                                     
                                        
                                }
                                
                                if ( to && to.$el ) {
                                        to.trigger( 'afterpagein', e );
                                }

                        }
                );

        },

        /**
         * 选择相应切换动画并执行
         *
         * @method _doTransition
         * @private
         * @param {pageview} from
         * @param {pageview} to
         * @param {int} dir
         * @param {function} transitionEnd
         */
        _doTransition: function( from, to, dir, transitionEnd ) {

                var me = this,
                        animate;
                
                
                // 根据action组合，选择不同切换动画方法
                animate = me._selectTransition( from && from.action, to && to.action );
                
                animate = animate || Chassis.FX[ me.defaultTransition ].animate; 
                
                animate(
                        from && from.el, 
                                to && to.el, 
                                dir,
                                transitionEnd
                );

        },

        /**
         * 根据action组合选择相应切换动画
         * @param {string} fromAction
         * @param {string} toAction
         * @return {string}
         */
        _selectTransition: function( fromAction, toAction ) {
                var me = this,
                        transition,
                        fx;
                if ( !fromAction || !toAction ) {
                        return;
                }


                // key不分顺序，需要试探两种顺序的配置
                transition = me.pageTransition[ fromAction + '-' + toAction ] ||
                                me.pageTransition[ toAction + '-' + fromAction ];

                
                fx = Chassis.FX[ transition ];
                return fx && fx.animate;
        },
        
        /**
         * 批量绑定路由事件
         *
         * @private
         * @method _bindRoutes
         * @return 
         **/
        _bindRoutes : function() {
                var me = this; 
                
                // 对routes支持数组的处理
                me._routeArray.call( me );

                Chassis.$.each( me.routes, function( key, item ) {
                        me.route( key, item );
                        
                        if ( (typeof item === 'string') && (Chassis.$.inArray( item, me.pageOrder ) === -1) ) {
                                me.pageOrder.push( item );
                        }
                        
                } );
                
                
                
                // 设定一个空的配置
                if ( !me.routes[ '' ] ) {
                        me.route( '', me._index );
                }
                
                
                return me;
        },
        
        /**
         * 当routes为Array时解析为Object
         *
         * @private
         * @method _routeArray
         * @return 
         **/
        _routeArray : function() {
                var me = this,
                        _routes = {};
                
                
                if ( !Chassis.isArray( me.routes ) ) {
                        return me;
                }
                
                
                Chassis.$.each( me.routes, function( key, item ) {
                        var first = item.split( /\//g )[ 0 ],
                                name = first;

                        if ( first.substring( 0, 1 ) === '*' ) {
                                name = 'all';
                        }
                        
                        if ( first === '' ) {
                                name = me._index;
                        }
                        
                        _routes[ item ] = name;
                        
                        
                        
                } );
                
                me.routes = Chassis.clone( _routes );
                
                return me;
             
        },
        
        /**
         * 将路由规则解析为正则
         *
         * @private
         * @method _routeToRegExp
         * @param {string} route
         * @return 
         **/
        _routeToRegExp : function( route ) {

                var optionalParam = /\((.*?)\)/g,
                        namedParam        = /(\(\?)?:\w+/g,
                        splatParam        = /\*\w+/g,
                        escapeRegExp    = /[\-{}\[\]+?.,\\\^$|#\s]/g;
                        
                route = route.replace( escapeRegExp, '\\$&' )
                                .replace( optionalParam, '(?:$1)?' )
                                .replace( namedParam, function( match, optional ) {
                                        return optional ? match : '([^\/]+)';
                                } )
                                .replace( splatParam, '(.*?)' );
                return new RegExp( '^' + route + '$' );
        },

        _getHandler: function( action ) {
                var me = this;

                return function() {
                        var fn = me[ action ];

                        // 先执行自定义路由行为
                        if ( Chassis.isFunction( fn ) &&
                                        fn.apply( this, arguments ) === false ) {
                                return;
                        }

                        me._doAction( action, me.Request );

                };

        },

        _doAction: function( action, request ) {

                var me = this,
                        view = me.views[ action ];
                
                // 如果该view被销毁，需要重新new
                if ( view && !view.$el ) {
                        me.views[ action ] = null;
                        return me._doAction( action, request );
                }
                
                this._decodeRequest( request );
                
                if ( !view ) {
                        
                        // TODO 如果是异步加载的话怎么办？
                        if ( (action === me._index) && (!Chassis.PageView[ action ]) ) {
                                //return;
                                
                        }
                        
                        view = me.views[ action ] = 
                                        new Chassis.PageView[ action ]( request, action )

                }
                
                // 切换视图控制器
                me.previousView = me.currentView;
                me.currentView = view;

                me.trigger( 'routechange', {
                        from: me.previousView,
                        to: me.currentView,
                        params: request,
                        action : action,
                        views: this.views
                } );

                me.switchPage(
                        me.previousView, 
                                me.currentView, 
                                request
                );
        },

        _decodeRequest: function( request ) {

                if ( !request ) {
                        return;
                }

                Chassis.$.each( request, function( key, val ) {
                        request[ key ] = decodeURIComponent( val );
                } );

        }
        
} );

Router.extend = Chassis.extend;
/**
 * @fileOverview history 基类
 */

/**
 * History
 * @class History
 * @namespace Chassis
 * @constructor
 * @param {object} handler
 */

var History = Chassis.History = function( handler ) {
        this.handler = handler || [];
};

Chassis.mixin( History.prototype, Events, {
        
        /**
         * 为路由对象手动创建路由
         * > route 参数可以是 路由字符串 或 正则表达式。 
         * > 每个捕捉到的被传入的路由或正则表达式，都将作为参数传入回调函数
         *
         * @public
         * @method route
         * @param {object} routeRe
         * @param {Function} callback
         * @return 
         **/
        route: function( routeRe, callback ) {

                this.handler.unshift({
                        reg : routeRe,
                        callback : callback
                });
        },
        
        /**
         * 手动到达应用程序中的某个位置
         *
         * @public
         * @method navigate
         * @param {string} fragment hash字符串
         * @param {object} opts 配置，opts.trigger指定是否触发事件
         * @return 
         **/
        navigate: function() {
                return this;
        },
        

        
        /**
         * 当所有的 路由 创建并设置完毕，调用 Chassis.history.start() 开始监控路由变化事件并分发事件。
         * @public
         * @method start
         * @param {object} opts (optional) 
         * opts.trigger 是否触发事件;
         * opts.pushState 是否使用pushState;
         * opts.root 使用pushState时配置的相对路径;
         * @return 
         **/
        start : function( opts ) {
                var handler = {},
                        type = 'Hash',
                        router;
                
                if ( !opts ) {
                        opts = {};
                }
                
                
                
                if ( opts.router ) {
                        
                        opts.trigger = (opts.trigger === false) ? false : true;
                        router = Chassis.Router.extend( opts.router );
                        new router();
                }
                opts.trigger = (opts.trigger === false) ? false : true;
                handler = Chassis.clone( this.handler );
                
                this.destroy();
                
                if ( opts.pushState && history.pushState ) {
                        type = 'Pushstate';
                }
                
                if ( !History[ type ] ) {
                        throw new Error( 'History.' + type + ' is not found' );
                }
                Chassis.history = new History[ type ]( handler );
                return Chassis.history.start( opts );
        },

        loadUrl: function( fragmentOverride ) {
                var i = 0,
                        fragment = this.getFragment( fragmentOverride ),
                        len = this.handler.length,
                        handler;

                for ( ; i < len; i++ ) {
                        handler = this.handler[ i ];
                        
                        if ( handler.reg.test( fragment ) ) {
                                handler.callback.call( this, fragment );
                                break;
                        }
                        
                }
        },
        
        reload : function() {
                return this.loadUrl( this.getFragment() );
        },

        /**
         * 销毁当前的history实例，并重新生成新的History实例。
         * > 当应用的路由配置在hash和pushState之间来回切换时尤其有用。
         *
         * @public
         * @method destroy
         * @return 
         **/
        destroy : function() {
                this.pushState = false;
                this.root = '/';
                this.handler = [];
                this.cacheOptions = null;
                $( window ).off( 'hashchange' );
                $( window ).off( 'popstate' );
                History.start = false;
                
                // 销毁后重新指向原始的History，方便重新调用
                Chassis.history = new History();
        }
} );


History.extend = Chassis.extend;

Chassis.history = new History();
/**
 * @fileOverview 浏览器历史管理
 */

/**
 * Hash
 * > 用户不需要手动调用，当使用`history.start`时，会根据传递的参数自动实例化此类并覆盖之前的`history`实例。
 *
 * > 当用户调用destroy时，history将自动恢复至初始状态。
 * @class Hash
 * @namespace Chassis.History
 * @constructor
 * @param {object} handler
 * @private
 */
History.Hash = History.extend({
        
        /**
         * 当所有的路由创建并设置完毕，调用 `Chassis.history.start()` 监控 `hashchange` 事件并分配路由。
         *
         * @overwrite
         * @public
         * @method start
         * @param {object} opts
         * @return 
         **/
        start : function( opts ) {
                var me = this;

                if ( History.start ) {
                        return;
                }
                
                History.start = true;
                
                if ( !opts ) {
                        opts = { trigger : true };
                }
                
                // 开始监听hashchange
                if ( ('onhashchange' in window) &&
                                ((typeof document.documentMode === 'undefined') ||
                                document.documentMode === 8) ) {

                        me.curFragment = '';
                        $( window ).on( 'hashchange', function( e ) {
                                if ( me.curFragment === me.getFragment() ) {
                                        return;
                                }
                                
                                me.curFragment = me.getFragment();
                                me.loadUrl.call( me, me.curFragment );
                        } );
                        
                        // 处理当前hash
                        if ( opts.trigger ) {
                                me.loadUrl.call( me, me.getFragment() );
                        }
                        
                        return;
                }
                
                throw new Error( 'current browser do not suport hashchange event;' );
        },
        
        /**
         * 手动到达应用程序中的某个位置 
         *
         * @overwrite
         * @public
         * @method navigate
         * @param {string} fragment
         * @param {object} opts
         * @return 
         **/
        navigate : function( fragment, opts ) {
                var me = this;

                
                if ( !opts ) {
                        opts = { trigger : true };
                }

                fragment = this.getFragment( fragment );
                
                this.curFragment = fragment;
                
                me._setHash( fragment, opts.replace );

                if ( opts.trigger ) {
                        this.loadUrl( fragment );
                }

        },
        
        /**
         * 设置hash 
         *
         * @private
         * @method _setHash
         * @param {string} fragment
         * @param {boolean} replace
         * @return 
         **/
        _setHash : function( fragment, replace ) {
                var me = this,
                        folder = '',
                        href;
                
                fragment = Chassis.$.trim( fragment ).replace( /^[#]+/, '' );
                
                

                if ( replace ) {
                        href = location.href.replace( /(javascript:|#).*$/, '' );

                        if ( /android/i.test( navigator.userAgent ) &&
                                        'replaceState' in window.history ) {
                                window.history.replaceState( 
                                        {}, '', href + '#' + fragment );
                        }

                        location.replace( href + '#' + fragment );
                } else {

                        // Some browsers require that `hash` contains a leading #.
                        location.hash = '#' + fragment;
                }
                

                return me;
        },
        
        /**
         * 获取hash 
         *
         * @private
         * @method getFragment
         * @return 
         **/
        getFragment : function( fragment ) {
                var match;

                if ( fragment === undefined ) {
                        match = location.href.match( /#(.*)$/ );
                 
                        return match ? match[ 1 ] : '';
                }
                else {
                        return fragment.replace( /^[#\/]|\s+$/g, '' );
                }
        }
});


/**
 * @fileOverview 视图
 * 层级关系管理
 * 事件管理
 */

// View构造函数中的opts参数中需要添加到View实例中的属性列表
var viewOptions = [ 'model', 'el', 'id', 'attributes', 'className',
                'tagName', 'events' ],
        rDelegateEventSplitter = /^(\S+)\s*(.*)$/,
        noop = function() {};

/**
 * 视图类
 * @class View
 * @constructor
 * @namespace Chassis
 * @param {object} opts
 * @param {view} super
 */
var View = Chassis.View = function( opts ) {
        this.cid = Chassis.uniqueId( 'view' );
        this._configure( opts );
        this._ensureElement();
        this._initialize.apply( this, arguments );
        this.delegateEvents();
};

Chassis.mixin( View.prototype, Events, {

        // view默认自动生成的元素的标签为div
        tagName: 'div',

        /**
         * $
         * @method $
         * @param    {mixed} selector
         * @return {$}
         */
        $: function( selector ) {
                return this.$el.find( selector );
        },

        /**
         * 完成View的渲染，需子类重载实现。
         * @method render
         */
        render: function() {
                return this;
        },

        /**
         * 移除DOM元素以及清除事件监听
         * @method destroy
         */
        destroy: function() {

                var cld = this.children,
                        cid;

                this.onDestroy();

                /**
                 * View销毁前触发事件
                 * @event beforedestroy
                 */
                this.trigger( 'beforedestroy', this );

                // 销毁子视图
                for ( cid in cld ) {
                        if ( cld.hasOwnProperty( cid ) ) {
                                cld[ cid ].destroy();
                                delete cld[ cid ];
                        }
                }

                // 解除事件绑定
                this.undelegateEvents();

                // 移除DOM
                this.$el.remove();

                // 移除引用
                this.$el = this.el = null;

                // 如果是子视图则从父视图中删除
                if ( this.parent ) {
                        delete this.parent.children[ this.cid ];
                }

                // TODO subpages清除
                /**
                 * View销毁后触发事件
                 * @event afterdestroy
                 */
                this.trigger( 'afterdestroy', this );

                return this;
        },

        /**
         * 设置view所属的元素
         * @method setElement
         * @param    {mixed} el 新元素或者选择符
         * @param    {boolean} delegate 是否需要重新绑定事件
         */
        setElement: function( el, delegate ) {
                if ( this.$el ) {
                        this.undelegateEvents();
                }

                this.$el = el instanceof Chassis.$ ? el : Chassis.$( el );
                this.el = this.$el[ 0 ];

                if ( delegate !== false ) {
                        this.delegateEvents();
                }

                return this;
        },

        /**
         * 设置需绑定的事件，事件由参数`events`或者`this.events`中的键值对指定。
         * 事件绑定采用代理的方式实现(除了选择符是window和document)，事件回调中的执行上下文为当
         * 前`View`实例。
         * @note 每次调用时都不会自动接绑定之前的事件，因此多次调用会多次绑定；
         * @method delegateEvents
         * @param    {objects} events
         * @example
         *            //格式为 {"event[ selector]": "callback"}
         *            {
         *                    'mousedown .title': 'edit',
         *                    'click .button': 'save',
         *                    'click .open': function( e ){},
         *                    'orientationchange window': 'refresh',
         *                    'click document': 'close',
         *                    'beforepagein view': 'onBeforePageIn',
         *                    'change model': 'render'
         *            }
         */
        delegateEvents: function( events ) {

                var key,
                        method,
                        match,
                        eventName,
                        selector,
                        fullEventName;

                if ( !(events || (events = this.events)) ) {
                        return this;
                }

                // 默认undelegate时，对于view/model的事件不好处理，如果view/model的事件直接
                // 解绑定的话将会使外界注册的以及beforepagein/afterpagein失效；因此暂时去掉
                // 自动解绑定功能。
                // this.undelegateEvents();

                for ( key in events ) {

                        if ( events.hasOwnProperty( key ) ) {
                                method = events[ key ];

                                if ( !Chassis.isFunction( method ) ) {
                                        method = this[ events[ key ] ];
                                }

                                if ( !method ) {
                                        throw new Error(
                                                'Method "' + events[ key ] + '" does not exist' );
                                }

                                match = key.match( rDelegateEventSplitter );
                                eventName = match[ 1 ];
                                selector = match[ 2 ];

                                method = Chassis.proxy( method, this );

                                fullEventName = eventName + '.delegateEvents' + this.cid;

                                switch ( selector ) {
                                        case 'window':
                                        case 'document':
                                                Chassis.$( window[ selector ] )
                                                                .on( fullEventName, method );
                                                break;
                                        case 'view':
                                                this.listenTo( this, eventName, method );
                                                break;
                                        case 'model':
                                                if ( this.model ) {
                                                        this.listenTo( this.model, eventName, method );
                                                }
                                                break;
                                        case '':
                                                this.$el.on( fullEventName, method );
                                                break;
                                        default:
                                                this.$el.on( fullEventName, selector, method );
                                }
                        }
                }

                return this;
        },

        /**
         * 解除view的所有事件绑定
         */
        undelegateEvents: function() {
                var eventName = '.delegateEvents' + this.cid;
                this.$el.off( eventName );

                Chassis.$( window ).off( eventName );
                Chassis.$( document ).off( eventName );

                this.stopListening();

                return this;
        },



        /**
         * 子类初始化
         */
        init: noop,
        


        /**
         * View销毁时调用，需子类实现。
         * @method onDestroy
         * @override
         */
        onDestroy: noop,

        /**
         * View所在Page即将显示前调用，需子类实现。
         * @method onBeforePageIn
         * @param {object} params
         *            params.from: 当前显示但是即将被替换的视图
         *            params.to: 即将显示的视图
         *            params.params: 路由参数
         * @override
         */
        onBeforePageIn: noop,

        onBeforePageOut: noop,

        /**
         * View所在Page显示后前调用，需子类实现。
         * @method onAfterPageIn
         * @param {object} params
         *            params.from: 被当前显示视图替换的视图
         *            params.to: 当前显示视图
         *            params.params: 路由参数
         * @override
         */
        onAfterPageIn: noop,

        /**
         * View所在PageView显示前触发
         * @event beforepagein
         * @param {object} params
         *            params.from: 即将被隐藏的视图
         *            params.to: 即将显示的视图
         *            params.params: 路由参数
         */
        _onBeforePageIn: function( params ) {

                this.onBeforePageIn( params );
                
                
                
        },

        _onBeforePageOut: function( params ) {

                this.onBeforePageOut( params );
                
                
                
        },

        /**
         * View所在PageView显示后触发
         * @event afterpagein
         * @param {object} params
         *            params.from: 已隐藏的视图
         *            params.to: 当前显示的视图
         *            params.params: 路由参数
         */
        _onAfterPageIn: function( params ) {

                this.onAfterPageIn( params );
                
                
        },

        /**
         * 初始化
         * @method initialize
         * @param {object} opts
         */
        _initialize: function( opts ) {

                this.root = this._getRoot();
                this.children = {};

                // 子类初始化
                this.init( opts );

                var listenTarget = this.root || this;

                // 自动监听常用事件
                this.listenTo( listenTarget, 'beforepagein', this._onBeforePageIn );
                this.listenTo( listenTarget, 'afterpagein', this._onAfterPageIn );
                this.listenTo( listenTarget, 'beforepageout', this._onBeforePageOut );

        },

        _getRoot: function() {
                var pointer = this;

                while ( pointer.parent ) {
                        pointer = pointer.parent;
                }

                return pointer;
        },

        _configure: function( opts ) {

                var len = viewOptions.length,
                        i = 0,
                        opt,
                        val;

                opts = opts || {};

                this.options = opts;

                for ( ; i < len; i++ ) {

                        opt = viewOptions[ i ];
                        val = this.options[ opt ];

                        if ( val ) {
                                this[ opt ] = val;
                        }
                }
        },

        _ensureElement: function() {

                var attrs,
                        $el;

                // 如果未指定DOM元素则自动创建并设置id/className
                if ( !this.el ) {

                        // attributes有可能来自原型属性因此需要复制
                        attrs = Chassis.mixin( {}, this.attributes || {} );

                        if ( this.id ) {
                                attrs.id = this.id;
                        }

                        if ( this.className ) {
                                attrs[ 'class' ] = this.className;
                        }

                        $el = Chassis.$( '<' + this.tagName + '>' ).attr( attrs );
                        this.setElement( $el, false );

                // 如果已经指定DOM元素则不会设置id/className
                } else {
                        this.setElement( this.el, false );
                }
        }
} );

// 引入view.loading.js后会在view的原型增加以下方法

/**
 * 显示页面Loading
 * @method showLoading
 */

/**
 * 隐藏页面Loading
 * @method hideLoading
 */

/**
 * 显示全局Loading
 * @method showGLoading
 */

/**
 * 隐藏全局Loading
 * @method hideGLoading
 */

Chassis.mixin( View, {

        /**
         * 创建自定义视图类，Chassis.View的子类中可用。
         * @method define
         * @param    {string} viewId            视图ID，确保在相同类型视图下是唯一的。
         * @param    {object} protoProps    视图原型方法和属性。
         * @param    {object} staticProps 视图静态方法和属性。
         * @static
         * @example
         *         // 定义PageView
         *         Chassis.PageView.define( 'home', {} );
         *
         *         // 定义PageView下面的SubView（SubView ID建议加上所属PageView的ID）
         *         Chassis.SubView.define( 'home.banner', {} );
         */
        define: function( viewId, protoProps, staticProps ) {
                
                /*
                if ( this[ viewId ] ) {
                        throw new Error( 'View ' + viewId + ' exists already.' );
                }
                */

                this[ viewId ] = this.extend( protoProps, staticProps );

        },

        /**
         * 获取自定义视图类，Chassis.View的子类中可用。
         * @method get
         * @static
         * @param    {string} viewId 视图ID
         * @return {view}
         */
        get: function( viewId ) {
                return this[ viewId ];
        },

        /**
         * 创建自定义视图类实例，Chassis.View的子类中可用。
         * @method create
         * @static
         * @param    {string} viewId 视图ID
         * @param    {object} opts1    创建实例参数（不同类型的视图类具有不同的参数）
         * @param    {object} opts2    创建实例参数（不同类型的视图类具有不同的参数）
         * @return {view}
         */
        create: function( viewId, opts1, opts2    ) {

                var klass = this.get( viewId );

                return klass ? (new klass( opts1, opts2 )) : null;
        },
        
        /**
         * 根据字符串获取View实例
         * @method getViewInstance
         * @static
         * @param    {string} action 
         * @param    {object} request    请求参数
         * @return {view}
         */
        getViewInstance : function( action, request ) {
                var me = this,
                        view;
                view = new Chassis.PageView[ action ]( request, action );
                
                return view;
        },


        extend: Chassis.extend
} );



/**
 * @fileOverview 页面视图控制器
 */

/**
 * 子视图控制器
 *
 * @class PageView
 * @namespace Chassis
 * @constructor
 * @param {object} opts
 * @param {string} action
 */
var PageView = Chassis.PageView = View.PageView = View.extend({

        _initialize: function( opts, action ) {

                this.action = action;

                this._tops = {};
                this._logicString = this._getLogicString( opts );
                
                
                
                

                PageView.__super__._initialize.call( this, opts );
        },

        isActive: function() {
                var display = this.$el.css( 'display' );
                return    display !== 'none' && display !== '';
        },

        _getLogicString: function( opts ) {
                return Chassis.$.param( opts || {} ) || '__empty_logic_string__'; 
        },

        savePos: function() {

                // @note: chrome pc (mac or win) 浏览器存在读取值不准确的情况
                this._tops[ this._logicString ] = window.scrollY;
        },

        restorePos: function( opts ) {
                var me = this,
                        cls = me._logicString = me._getLogicString( opts );

                // @note: iOS4需要延时
                setTimeout( function() {
                        window.scrollTo( 0, me._tops[ cls ] || 0 );
                }, 0 );
        }
});
/*jshint camelcase:false*/

/**
 * @fileOverview 子页面管理
 */




/**
 * @fileOverview    全局视图控制器
 * 用于管理独立于页面之外，不参与页面事件流的部分，层级上与全局路由同级，能读取全局路由信息
 */

/**
 * 全局视图控制器
 * @class GlobalView
 * @namespace Chassis
 * @constructor
 * @param {object} opts
 * @param {router} router
 */
var GlobalView = Chassis.GlobalView = View.GlobalView = View.extend({

        _initialize: function( opts, router ) {

                this.router = router;
                this.listenTo( router, 'routechange', this._onRouteChange );

                GlobalView.__super__._initialize.call( this, opts );
        },

        /** 
         * 默认路由事件响应函数
         * @param params.from 起始页面视图
         * @param params.to 目标页面视图
         * @param params.views 页面视图列表，以action为索引
         * @param params.params 路由中的参数
         */
        _onRouteChange: function( params ) {
                
                /**
                 * 路由事件
                 * @event routechange
                 * @param {pageview} params.from 起始页面视图
                 * @param {pageview} params.to 目标页面视图
                 * @param {object} params.views 页面视图列表，以action为索引
                 * @param {object} params.params 路由中的参数
                 */
                this.trigger( 'routechange', Chassis.mixin( {}, params ) );
        },

        /**
         * 触发页面事件
         * @method triggerPageEvent
         * @param action 页面action名称，多个action可由逗号分隔
         * @param eventName 事件名
         * @params params 事件参数
         */
        triggerPageEvent: function( action, eventName, params ) {
                var me = this,
                        actions = action.split( /\s*,\s*/ ),
                        pageView;

                Chassis.$.each( actions, function( index, item ) {
                        pageView = me.router.views[ item ];

                        if ( pageView ) {
                                pageView.trigger( eventName, params );
                        }
                        
                } );
        },

        /**
         * 获取当前活动action
         * @method getCurrentAction
         * @return {string}
         */
        getCurrentAction: function() {
                return this.router && this.router.currentView.action || '';                
        }

});
/**
 * @fileOverview slider 切换效果
 */
Chassis.FX.slider = (function() {

        function generateTransform( x, y, z ) {
                return 'translate' + ($.support.has3d ? '3d' : '') + 
                                '(' + x + 'px, ' + y + 'px' +
                                ($.support.has3d ? (', ' + z + 'px)') : ')');
        }

        return {
                animate: function( fromEl, toEl, dir, transitionEnd ) {

                        // 由于多种动画混杂，必须进行位置恢复
                        var restore = true,
                                clientWidth = document.documentElement.clientWidth;
                        
                        if ( dir === 0 ) {
                                if ( fromEl !== toEl ) {

                                        // 先隐藏当前，避免当前页面残留，确保切换效果
                                        if ( fromEl ) {
                                                $( fromEl ).hide();
                                        }
                                        
                                        if ( toEl ) {
                                                $( toEl ).show();
                                        }

                                }

                                if ( transitionEnd ) {
                                        transitionEnd();
                                }

                                return;
                        }

                        // 准备位置
                        toEl = $( toEl );
                        fromEl = $( fromEl );
                        
                        
                        
							
							fromEl.css({
                                '-webkit-transition-property': '-webkit-transform',
                                '-webkit-transform': generateTransform( 0, 0, 0 ), 
                                '-webkit-transition-duration': '0ms',
                                '-webkit-transition-timing-function': 'ease-out',
                                '-webkit-transition-delay': 'initial',

							});
							
							
							toEl.css({
									'-webkit-transition-property': '-webkit-transform',
									'-webkit-transform': generateTransform( (dir === 1 ?
													'' : '-') + clientWidth, 0, 0 ), 
									'-webkit-transition-duration': '0ms',
									'-webkit-transition-timing-function': 'ease-out',
									'-webkit-transition-delay': 'initial',
									'display': 'block'
							});
						
							
                        
						
                        setTimeout( function() {

                                function endAllTransition() {

                                        // 是否恢复原状，子页面切换使用
                                        
										if ( restore ) {
                                                fromEl.css({
                                                        'display': 'none',
                                                        '-webkit-transform': generateTransform( 0, 0, 0 ), 
                                                        '-webkit-transition-duration': '0ms'
                                                });


                                                toEl.css({
                                                        'display': 'block',
                                                        '-webkit-transform': 'none', 
                                                        '-webkit-transition-duration': '0ms'
                                                });
                                        } else {

                                                fromEl.css({
                                                        'display': 'none'
                                                });

                                                toEl.css({
                                                        'display': 'block'
                                                });
                                        }
                                }

                                // hack
                                window.scrollTo(0, 0);
								
								
                                // 开始动画
                                toEl.css({
                                        '-webkit-transform': generateTransform( 0, 0, 0 ), 
                                        '-webkit-transition-duration': '350ms',
										'display' : 'block'
                                });

                                fromEl.css({
                                        '-webkit-transform': generateTransform( (dir === 1 ? '-' :
                                        '') + clientWidth, 0, 0 ), 
                                        '-webkit-transition-duration': '350ms'
                                });

                                setTimeout( function() {
                                        setTimeout( function() {
                                                endAllTransition();

                                                if ( transitionEnd ) {
                                                        transitionEnd();
                                                }
                                        }, 0 );
                                }, 400 );

                        }, 0 );
                }
        };
})();
/**
 * @fileOverview Loading管理
 */

})();