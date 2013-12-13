(function(m,h){var E=function(H,G){return new E.Instance(H,G||{})};E.defaults={stop_browser_behavior:{userSelect:"none",touchAction:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};E.HAS_POINTEREVENTS=m.navigator.pointerEnabled||m.navigator.msPointerEnabled;E.HAS_TOUCHEVENTS=("ontouchstart" in m);E.MOBILE_REGEX=/mobile|tablet|ip(ad|hone|od)|android|silk/i;E.NO_MOUSEEVENTS=E.HAS_TOUCHEVENTS&&m.navigator.userAgent.match(E.MOBILE_REGEX);E.EVENT_TYPES={};E.DIRECTION_DOWN="down";E.DIRECTION_LEFT="left";E.DIRECTION_UP="up";E.DIRECTION_RIGHT="right";E.POINTER_MOUSE="mouse";E.POINTER_TOUCH="touch";E.POINTER_PEN="pen";E.EVENT_START="start";E.EVENT_MOVE="move";E.EVENT_END="end";E.DOCUMENT=m.document;E.plugins={};E.READY=false;function t(){if(E.READY){return}E.event.determineEventTypes();for(var G in E.gestures){if(E.gestures.hasOwnProperty(G)){E.detection.register(E.gestures[G])}}E.event.onTouch(E.DOCUMENT,E.EVENT_MOVE,E.detection.detect);E.event.onTouch(E.DOCUMENT,E.EVENT_END,E.detection.detect);E.READY=true}E.Instance=function(I,H){var G=this;t();this.element=I;this.enabled=true;this.options=E.utils.extend(E.utils.extend({},E.defaults),H||{});if(this.options.stop_browser_behavior){E.utils.stopDefaultBrowserBehavior(this.element,this.options.stop_browser_behavior)}E.event.onTouch(I,E.EVENT_START,function(J){if(G.enabled){E.detection.startDetect(G,J)}});return this};E.Instance.prototype={on:function i(H,I){var J=H.split(" ");for(var G=0;G<J.length;G++){this.element.addEventListener(J[G],I,false)}return this},off:function x(H,I){var J=H.split(" ");for(var G=0;G<J.length;G++){this.element.removeEventListener(J[G],I,false)}return this},trigger:function b(H,J){if(!J){J={}}var I=E.DOCUMENT.createEvent("Event");I.initEvent(H,true,true);I.gesture=J;var G=this.element;if(E.utils.hasParent(J.target,G)){G=J.target}G.dispatchEvent(I);return this},enable:function q(G){this.enabled=G;return this}};var j=null;var v=false;var c=false;E.event={bindDom:function(I,K,J){var H=K.split(" ");for(var G=0;G<H.length;G++){I.addEventListener(H[G],J,false)}},onTouch:function z(I,H,J){var G=this;this.bindDom(I,E.EVENT_TYPES[H],function K(M){var N=M.type.toLowerCase();if(N.match(/mouse/)&&c){return}else{if(N.match(/touch/)||N.match(/pointerdown/)||(N.match(/mouse/)&&M.which===1)){v=true}else{if(N.match(/mouse/)&&M.which!==1){v=false}}}if(N.match(/touch|pointer/)){c=true}var L=0;if(v){if(E.HAS_POINTEREVENTS&&H!=E.EVENT_END){L=E.PointerEvent.updatePointer(H,M)}else{if(N.match(/touch/)){L=M.touches.length}else{if(!c){L=N.match(/up/)?0:1}}}if(L>0&&H==E.EVENT_END){H=E.EVENT_MOVE}else{if(!L){H=E.EVENT_END}}if(L||j===null){j=M}J.call(E.detection,G.collectEventData(I,H,G.getTouchList(j,H),M));if(E.HAS_POINTEREVENTS&&H==E.EVENT_END){L=E.PointerEvent.updatePointer(H,M)}}if(!L){j=null;v=false;c=false;E.PointerEvent.reset()}})},determineEventTypes:function s(){var G;if(E.HAS_POINTEREVENTS){G=E.PointerEvent.getEvents()}else{if(E.NO_MOUSEEVENTS){G=["touchstart","touchmove","touchend touchcancel"]}else{G=["touchstart mousedown","touchmove mousemove","touchend touchcancel mouseup"]}}E.EVENT_TYPES[E.EVENT_START]=G[0];E.EVENT_TYPES[E.EVENT_MOVE]=G[1];E.EVENT_TYPES[E.EVENT_END]=G[2]},getTouchList:function f(G){if(E.HAS_POINTEREVENTS){return E.PointerEvent.getTouchList()}else{if(G.touches){return G.touches}else{G.indentifier=1;return[G]}}},collectEventData:function o(I,H,K,J){var G=E.POINTER_TOUCH;if(J.type.match(/mouse/)||E.PointerEvent.matchType(E.POINTER_MOUSE,J)){G=E.POINTER_MOUSE}return{center:E.utils.getCenter(K),timeStamp:new Date().getTime(),target:J.target,touches:K,eventType:H,pointerType:G,srcEvent:J,preventDefault:function(){if(this.srcEvent.preventManipulation){this.srcEvent.preventManipulation()}if(this.srcEvent.preventDefault){this.srcEvent.preventDefault()}},stopPropagation:function(){this.srcEvent.stopPropagation()},stopDetect:function(){return E.detection.stopDetect()}}}};E.PointerEvent={pointers:{},getTouchList:function(){var G=this;var H=[];Object.keys(G.pointers).sort().forEach(function(I){H.push(G.pointers[I])});return H},updatePointer:function(H,G){if(H==E.EVENT_END){this.pointers={}}else{G.identifier=G.pointerId;this.pointers[G.pointerId]=G}return Object.keys(this.pointers).length},matchType:function(G,I){if(!I.pointerType){return false}var H={};H[E.POINTER_MOUSE]=(I.pointerType==I.MSPOINTER_TYPE_MOUSE||I.pointerType==E.POINTER_MOUSE);H[E.POINTER_TOUCH]=(I.pointerType==I.MSPOINTER_TYPE_TOUCH||I.pointerType==E.POINTER_TOUCH);H[E.POINTER_PEN]=(I.pointerType==I.MSPOINTER_TYPE_PEN||I.pointerType==E.POINTER_PEN);return H[G]},getEvents:function(){return["pointerdown MSPointerDown","pointermove MSPointerMove","pointerup pointercancel MSPointerUp MSPointerCancel"]},reset:function(){this.pointers={}}};E.utils={extend:function y(G,I,J){for(var H in I){if(G[H]!==h&&J){continue}G[H]=I[H]}return G},hasParent:function(H,G){while(H){if(H==G){return true}H=H.parentNode}return false},getCenter:function w(J){var K=[],I=[];for(var H=0,G=J.length;H<G;H++){K.push(J[H].pageX);I.push(J[H].pageY)}return{pageX:((Math.min.apply(Math,K)+Math.max.apply(Math,K))/2),pageY:((Math.min.apply(Math,I)+Math.max.apply(Math,I))/2)}},getVelocity:function k(G,I,H){return{x:Math.abs(I/G)||0,y:Math.abs(H/G)||0}},getAngle:function g(I,H){var J=H.pageY-I.pageY,G=H.pageX-I.pageX;return Math.atan2(J,G)*180/Math.PI},getDirection:function e(I,H){var G=Math.abs(I.pageX-H.pageX),J=Math.abs(I.pageY-H.pageY);if(G>=J){return I.pageX-H.pageX>0?E.DIRECTION_LEFT:E.DIRECTION_RIGHT}else{return I.pageY-H.pageY>0?E.DIRECTION_UP:E.DIRECTION_DOWN}},getDistance:function d(I,H){var G=H.pageX-I.pageX,J=H.pageY-I.pageY;return Math.sqrt((G*G)+(J*J))},getScale:function p(H,G){if(H.length>=2&&G.length>=2){return this.getDistance(G[0],G[1])/this.getDistance(H[0],H[1])}return 1},getRotation:function u(H,G){if(H.length>=2&&G.length>=2){return this.getAngle(G[1],G[0])-this.getAngle(H[1],H[0])}return 0},isVertical:function n(G){return(G==E.DIRECTION_UP||G==E.DIRECTION_DOWN)},stopDefaultBrowserBehavior:function r(I,H){var L,K=["webkit","khtml","moz","Moz","ms","o",""];if(!H||!I.style){return}for(var G=0;G<K.length;G++){for(var J in H){if(H.hasOwnProperty(J)){L=J;if(K[G]){L=K[G]+L.substring(0,1).toUpperCase()+L.substring(1)}I.style[L]=H[J]}}}if(H.userSelect=="none"){I.onselectstart=function(){return false}}if(H.userDrag=="none"){I.ondragstart=function(){return false}}}};E.detection={gestures:[],current:null,previous:null,stopped:false,startDetect:function C(H,G){if(this.current){return}this.stopped=false;this.current={inst:H,startEvent:E.utils.extend({},G),lastEvent:false,name:""};this.detect(G)},detect:function B(J){if(!this.current||this.stopped){return}J=this.extendEventData(J);var K=this.current.inst.options;for(var I=0,G=this.gestures.length;I<G;I++){var H=this.gestures[I];if(!this.stopped&&K[H.name]!==false){if(H.handler.call(H,J,this.current.inst)===false){this.stopDetect();break}}}if(this.current){this.current.lastEvent=J}if(J.eventType==E.EVENT_END&&!J.touches.length-1){this.stopDetect()}return J},stopDetect:function l(){this.previous=E.utils.extend({},this.current);this.current=null;this.stopped=true},extendEventData:function D(K){var L=this.current.startEvent;if(L&&(K.touches.length!=L.touches.length||K.touches===L.touches)){L.touches=[];for(var I=0,G=K.touches.length;I<G;I++){L.touches.push(E.utils.extend({},K.touches[I]))}}var H=K.timeStamp-L.timeStamp,N=K.center.pageX-L.center.pageX,M=K.center.pageY-L.center.pageY,J=E.utils.getVelocity(H,N,M);E.utils.extend(K,{deltaTime:H,deltaX:N,deltaY:M,velocityX:J.x,velocityY:J.y,distance:E.utils.getDistance(L.center,K.center),angle:E.utils.getAngle(L.center,K.center),interimAngle:this.current.lastEvent&&E.utils.getAngle(this.current.lastEvent.center,K.center),direction:E.utils.getDirection(L.center,K.center),interimDirection:this.current.lastEvent&&E.utils.getDirection(this.current.lastEvent.center,K.center),scale:E.utils.getScale(L.touches,K.touches),rotation:E.utils.getRotation(L.touches,K.touches),startEvent:L});return K},register:function a(H){var G=H.defaults||{};if(G[H.name]===h){G[H.name]=true}E.utils.extend(E.defaults,G,true);H.index=H.index||1000;this.gestures.push(H);this.gestures.sort(function(J,I){if(J.index<I.index){return -1}if(J.index>I.index){return 1}return 0});return this.gestures}};E.gestures=E.gestures||{};E.gestures.Tap={name:"tap",index:100,defaults:{tap_max_touchtime:250,tap_max_distance:10,tap_always:true,doubletap_distance:20,doubletap_interval:300},handler:function A(I,J){if(I.eventType==E.EVENT_END&&I.srcEvent.type!="touchcancel"){var H=E.detection.previous,G=false;if(I.deltaTime>J.options.tap_max_touchtime||I.distance>J.options.tap_max_distance){return}if(H&&H.name=="tap"&&(I.timeStamp-H.lastEvent.timeStamp)<J.options.doubletap_interval&&I.distance<J.options.doubletap_distance){J.trigger("doubletap",I);G=true}if(!G||J.options.tap_always){E.detection.current.name="tap";J.trigger(E.detection.current.name,I)}}}};var F=function(G,H){if(H===h){return G}G.event.bindDom=function(I,K,J){H(I).on(K,function(L){var M=L.originalEvent||L;if(M.pageX===h){M.pageX=L.pageX;M.pageY=L.pageY}if(!M.target){M.target=L.target}if(M.which===h){M.which=M.button}if(!M.preventDefault){M.preventDefault=L.preventDefault}if(!M.stopPropagation){M.stopPropagation=L.stopPropagation}J.call(this,M)})};G.Instance.prototype.on=function(I,J){return H(this.element).on(I,J)};G.Instance.prototype.off=function(I,J){return H(this.element).off(I,J)};G.Instance.prototype.trigger=function(I,K){var J=H(this.element);if(J.has(K.target).length){J=H(K.target)}return J.trigger({type:I,gesture:K})};H.fn.hammer=function(I){return this.each(function(){var J=H(this);var K=J.data("hammer");if(!K){J.data("hammer",new G(this,I||{}))}else{if(K&&I){G.utils.extend(K.options,I)}}})}};F(E,m.Zepto)})(this);
