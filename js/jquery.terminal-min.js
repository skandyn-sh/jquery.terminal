/*

 |       __ _____                     ________                              __
 |      / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /
 |  __ / // // // // // _  // _// // / / // _  // _//     // //  \/ // _ \/ /
 | /  / // // // // // ___// / / // / / // ___// / / / / // // /\  // // / /__
 | \___//____ \\___//____//_/ _\_  / /_//____//_/ /_/ /_//_//_/ /_/ \__\_\___/
 |           \/              /____/                              version 0.6.5
 http://terminal.jcubic.pl

 Licensed under GNU LGPL Version 3 license
 Copyright (c) 2011-2013 Jakub Jankiewicz <http://jcubic.pl>

 Includes:

 Storage plugin Distributed under the MIT License
 Copyright (c) 2010 Dave Schindler

 jQuery Timers licenced with the WTFPL
 <http://jquery.offput.ca/every/>

 Cross-Browser Split 1.1.1
 Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 Available under the MIT License

 Date: Sat, 13 Jul 2013 11:09:33 +0000
*/
(function(f,L){function ka(c,e){var i;if(typeof c==="string"&&typeof e==="string"){localStorage[c]=e;return true}else if(typeof c==="object"&&typeof e==="undefined"){for(i in c)if(c.hasOwnProperty(i))localStorage[i]=c[i];return true}return false}function ga(c,e){var i,g;i=new Date;i.setTime(i.getTime()+31536E6);i="; expires="+i.toGMTString();if(typeof c==="string"&&typeof e==="string"){document.cookie=c+"="+e+i+"; path=/";return true}else if(typeof c==="object"&&typeof e==="undefined"){for(g in c)if(c.hasOwnProperty(g))document.cookie=
g+"="+c[g]+i+"; path=/";return true}return false}function la(c){return localStorage[c]}function ma(c){var e,i,g;c+="=";e=document.cookie.split(";");for(i=0;i<e.length;i++){for(g=e[i];g.charAt(0)===" ";)g=g.substring(1,g.length);if(g.indexOf(c)===0)return g.substring(c.length,g.length)}return null}function na(c){return delete localStorage[c]}function oa(c){return ga(c,"",-1)}function ca(c,e){var i=[],g=c.length;if(g<e)return[c];for(var j=0;j<g;j+=e)i.push(c.substring(j,j+e));return i}function pa(c){var e=
c?[c]:[];f.extend(this,{size:function(){return e.length},pop:function(){if(e.length===0)return null;else{var i=e[e.length-1];e=e.slice(0,e.length-1);return i}},push:function(i){e=e.concat([i]);return i},top:function(){return e.length>0?e[e.length-1]:null}})}function qa(c,e){var i=true;if(typeof c==="string"&&c!=="")c+="_";var g=f.Storage.get(c+"commands");g=g?(new Function("return "+g+";"))():[];var j=g.length-1;f.extend(this,{append:function(o){if(i)if(g[g.length-1]!==o){g.push(o);j=g.length-1;if(e&&
g.length>e)g=g.slice(-e);f.Storage.set(c+"commands",f.json_stringify(g))}},data:function(){return g},next:function(){j<g.length-1&&++j;if(j!==-1)return g[j]},reset:function(){j=g.length-1},last:function(){return g[length-1]},end:function(){return j===g.length-1},position:function(){return j},previous:function(){var o=j;j>0&&--j;if(o!==-1)return g[o]},clear:function(){g=[];f.Storage.remove(c+"commands")},enable:function(){i=true},purge:function(){f.Storage.remove(c+"commands")},disable:function(){i=
false}})}function ha(c){return f("<div>"+f.terminal.strip(c)+"</div>").text().length}function da(c,e){var i=c.split(/( +)/);return{name:i[0],args:e(i.slice(2).join(""))}}f.omap=function(c,e){var i={};f.each(c,function(g,j){i[g]=e.call(c,g,j)});return i};var $=typeof window.localStorage!=="undefined";f.extend({Storage:{set:$?ka:ga,get:$?la:ma,remove:$?na:oa}});jQuery.fn.extend({everyTime:function(c,e,i,g,j){return this.each(function(){jQuery.timer.add(this,c,e,i,g,j)})},oneTime:function(c,e,i){return this.each(function(){jQuery.timer.add(this,
c,e,i,1)})},stopTime:function(c,e){return this.each(function(){jQuery.timer.remove(this,c,e)})}});jQuery.extend({timer:{guid:1,global:{},regex:/^([0-9]+)\s*(.*s)?$/,powers:{ms:1,cs:10,ds:100,s:1E3,das:1E4,hs:1E5,ks:1E6},timeParse:function(c){if(c===L||c===null)return null;var e=this.regex.exec(jQuery.trim(c.toString()));return e[2]?parseInt(e[1],10)*(this.powers[e[2]]||1):c},add:function(c,e,i,g,j,o){var u=0;if(jQuery.isFunction(i)){j||(j=g);g=i;i=e}e=jQuery.timer.timeParse(e);if(!(typeof e!=="number"||
isNaN(e)||e<=0)){if(j&&j.constructor!==Number){o=!!j;j=0}j=j||0;o=o||false;if(!c.$timers)c.$timers={};c.$timers[i]||(c.$timers[i]={});g.$timerID=g.$timerID||this.guid++;var l=function(){if(!(o&&l.inProgress)){l.inProgress=true;if(++u>j&&j!==0||g.call(c,u)===false)jQuery.timer.remove(c,i,g);l.inProgress=false}};l.$timerID=g.$timerID;c.$timers[i][g.$timerID]||(c.$timers[i][g.$timerID]=window.setInterval(l,e));this.global[i]||(this.global[i]=[]);this.global[i].push(c)}},remove:function(c,e,i){var g=
c.$timers,j;if(g){if(e){if(g[e]){if(i){if(i.$timerID){window.clearInterval(g[e][i.$timerID]);delete g[e][i.$timerID]}}else for(var o in g[e])if(g[e].hasOwnProperty(o)){window.clearInterval(g[e][o]);delete g[e][o]}for(j in g[e])if(g[e].hasOwnProperty(j))break;if(!j){j=null;delete g[e]}}}else for(var u in g)g.hasOwnProperty(u)&&this.remove(c,u,i);for(j in g)if(g.hasOwnProperty(j))break;if(!j)c.$timers=null}}}});if(jQuery.browser&&jQuery.browser.msie||/(msie) ([\w.]+)/.exec(navigator.userAgent.toLowerCase()))jQuery(window).one("unload",
function(){var c=jQuery.timer.global,e;for(e in c)if(c.hasOwnProperty(e))for(var i=c[e],g=i.length;--g;)jQuery.timer.remove(i[g],e)});(function(c){if(String.prototype.split.toString().match(/\[native/)){var e=String.prototype.split,i=/()??/.exec("")[1]===c,g;g=function(j,o,u){if(Object.prototype.toString.call(o)!=="[object RegExp]")return e.call(j,o,u);var l=[],G=(o.ignoreCase?"i":"")+(o.multiline?"m":"")+(o.extended?"x":"")+(o.sticky?"y":""),B=0,A,w,D;o=RegExp(o.source,G+"g");j+="";i||(A=RegExp("^"+
o.source+"$(?!\\s)",G));for(u=u===c?4294967295:u>>>0;w=o.exec(j);){G=w.index+w[0].length;if(G>B){l.push(j.slice(B,w.index));!i&&w.length>1&&w[0].replace(A,function(){for(var J=1;J<arguments.length-2;J++)if(arguments[J]===c)w[J]=c});w.length>1&&w.index<j.length&&Array.prototype.push.apply(l,w.slice(1));D=w[0].length;B=G;if(l.length>=u)break}o.lastIndex===w.index&&o.lastIndex++}if(B===j.length){if(D||!o.test(""))l.push("")}else l.push(j.slice(B));return l.length>u?l.slice(0,u):l};String.prototype.split=
function(j,o){return g(this,j,o)};return g}})();f.json_stringify=function(c,e){var i="",g;e=e===L?1:e;switch(typeof c){case "function":i+=c;break;case "boolean":i+=c?"true":"false";break;case "object":if(c===null)i+="null";else if(c instanceof Array){i+="[";var j=c.length;for(g=0;g<j-1;++g)i+=f.json_stringify(c[g],e+1);i+=f.json_stringify(c[j-1],e+1)+"]"}else{i+="{";for(j in c)if(c.hasOwnProperty(j))i+='"'+j+'":'+f.json_stringify(c[j],e+1);i+="}"}break;case "string":j=c;var o={"\\\\":"\\\\",'"':'\\"',
"/":"\\/","\\n":"\\n","\\r":"\\r","\\t":"\\t"};for(g in o)if(o.hasOwnProperty(g))j=j.replace(RegExp(g,"g"),o[g]);i+='"'+j+'"';break;case "number":i+=String(c)}i+=e>1?",":"";if(e===1)i=i.replace(/,([\]}])/g,"$1");return i.replace(/([\[{]),/g,"$1")};f.fn.cmd=function(c){function e(){E.toggleClass("inverted")}function i(){K="(reverse-i-search)`"+J+"': ";N()}function g(d){var r=b.data(),P=r.length;if(d&&Q>0)P-=Q;if(J.length>0)for(var O=J.length;O>0;O--){d=RegExp("^"+J.substring(0,O));for(var m=P;m--;)if(d.test(r[m])){Q=
r.length-m;q=0;l.set(r[m],true);F();if(J.length!==O){J=J.substring(0,O);i()}return}}}function j(d){var r=d.substring(0,A-w);d=d.substring(A-w);return[r].concat(ca(d,A))}function o(){B.focus();l.oneTime(1,function(){l.insert(B.val());B.blur().val("")})}function u(d){if(typeof c.keydown=="function"){var r=c.keydown(d);if(r!==L)return r}if(H){if(D&&(d.which===35||d.which===36||d.which===37||d.which===38||d.which===39||d.which===40||d.which===13||d.which===27)){K=I;D=false;Q=null;J="";N();if(d.which===
27)p="";F();u.call(this,d)}else if(d.altKey){if(d.which===68){l.set(p.slice(0,q)+p.slice(q).replace(/[^ ]+ |[^ ]+$/,""),true);return false}return true}else if(d.keyCode===13){if(b&&p&&(c.historyFilter&&c.historyFilter(p)||!c.historyFilter))b.append(p);d=p;b.reset();l.set("");c.commands&&c.commands(d);typeof K==="function"&&N()}else if(d.which===8)if(D){J=J.slice(0,-1);i()}else{if(p!==""&&q>0){p=p.slice(0,q-1)+p.slice(q,p.length);--q;F()}}else if(d.which===9&&!(d.ctrlKey||d.altKey))l.insert("\t");
else if(d.which===46){if(p!==""&&q<p.length){p=p.slice(0,q)+p.slice(q+1,p.length);F()}return true}else if(b&&d.which===38||d.which===80&&d.ctrlKey){if(b.end())T=p;l.set(b.previous())}else if(b&&d.which===40||d.which===78&&d.ctrlKey)l.set(b.end()?T:b.next());else if(d.which===37||d.which===66&&d.ctrlKey)if(d.ctrlKey&&d.which!==66){r=q-1;d=0;for(p[r]===" "&&--r;r>0;--r)if(p[r]===" "&&p[r+1]!==" "){d=r+1;break}else if(p[r]==="\n"&&p[r+1]!=="\n"){d=r;break}l.position(d)}else{if(q>0){--q;F()}}else if(d.which===
82&&d.ctrlKey)if(D)g(true);else{I=K;i();T=p;p="";F();D=true}else if(d.which==71&&d.ctrlKey){if(D){K=I;N();p=T;F();D=false}}else if(d.which===39||d.which===70&&d.ctrlKey)if(d.ctrlKey&&d.which!==70){p[q]===" "&&++q;d=p.slice(q).match(/\S[\n\s]{2,}|[\n\s]+\S?/);if(!d||d[0].match(/^\s+$/))q=p.length;else if(d[0][0]!==" ")q+=d.index+1;else{q+=d.index+d[0].length-1;d[0][d[0].length-1]!==" "&&--q}F()}else{if(q<p.length){++q;F()}}else if(d.which===123)return true;else if(d.which===36)l.position(0);else if(d.which===
35)l.position(p.length);else if(d.shiftKey&&d.which==45){o();return true}else if(d.ctrlKey||d.metaKey){if(d.which===192)return true;if(d.metaKey){if(d.which===82)return true;if(d.which===76)return true}if(d.shiftKey){if(d.which===84)return true}else if(d.which===87){if(p!==""){d=p.slice(0,q);r=p.slice(q+1);var P=d.match(/([^ ]+ *$)/);q=d.length-P[0].length;p=d.slice(0,q)+r;F()}}else if(d.which===72){if(p!==""&&q>0){p=p.slice(0,--q);if(q<p.length-1)p+=p.slice(q);F()}}else if(d.which===65)l.position(0);
else if(d.which===69)l.position(p.length);else if(d.which===88||d.which===67||d.which===84)return true;else if(d.which===86){o();return true}else if(d.which===75)if(q===0)l.set("");else q!==p.length&&l.set(p.slice(0,q));else if(d.which===85){l.set(p.slice(q,p.length));l.position(0)}}else return true;return false}}var l=this,G=l.data("cmd");if(G)return G;l.addClass("cmd");l.append('<span class="prompt"></span><span></span><span class="cursor">&nbsp;</span><span></span>');var B=f("<textarea/>").addClass("clipboard").appendTo(l);
c.width&&l.width(c.width);var A,w,D=false,J="",Q=null,I,U=c.mask||false,p="",q=0,K,H=c.enabled,X=c.historySize||60,Y,b,E=l.find(".cursor"),F=function(d){function r(x,z){if(z===x.length){M.html(f.terminal.encode(x));E.html("&nbsp;");V.html("")}else if(z===0){M.html("");E.html(f.terminal.encode(x.slice(0,1)));V.html(f.terminal.encode(x.slice(1)))}else{var t=f.terminal.encode(x.slice(0,z));M.html(t);t=x.slice(z,z+1);E.html(t===" "?"&nbsp;":f.terminal.encode(t));z===x.length-1?V.html(""):V.html(f.terminal.encode(x.slice(z+
1)))}}function P(x){return"<div>"+f.terminal.encode(x)+"</div>"}function O(x){var z=V;f.each(x,function(t,n){z=f(P(n)).insertAfter(z).addClass("clear")})}function m(x){f.each(x,function(z,t){M.before(P(t))})}var M=E.prev(),V=E.next();return function(){var x=U?p.replace(/./g,"*"):p,z,t;d.find("div").remove();M.html("");if(x.length>A-w-1||x.match(/\n/)){var n,a=x.match(/\t/g),h=a?a.length*3:0;if(a)x=x.replace(/\t/g,"\u0000\u0000\u0000\u0000");if(x.match(/\n/)){var k=x.split("\n");t=A-w-1;for(z=0;z<
k.length-1;++z)k[z]+=" ";if(k[0].length>t){n=[k[0].substring(0,t)];n=n.concat(ca(k[0].substring(t),A))}else n=[k[0]];for(z=1;z<k.length;++z)if(k[z].length>A)n=n.concat(ca(k[z],A));else n.push(k[z])}else n=j(x);if(a)n=f.map(n,function(s){return s.replace(/\x00\x00\x00\x00/g,"\t")});t=n[0].length;if(!(t===0&&n.length===1))if(q<t){r(n[0],q);O(n.slice(1))}else if(q===t){M.before(P(n[0]));r(n[1],0);O(n.slice(2))}else{z=n.length;if(q<t){r(n[0],q);O(n.slice(1))}else if(q===t){M.before(P(n[0]));r(n[1],0);
O(n.slice(2))}else{a=n.slice(-1)[0];k=x.length-q;var v=a.length;x=0;if(k<=v){m(n.slice(0,-1));r(a,(v===k?0:v-k)+h)}else if(z===3){M.before("<div>"+f.terminal.encode(n[0])+"</div>");r(n[1],q-t-1);V.after('<div class="clear">'+f.terminal.encode(n[2])+"</div>")}else{x=q;for(z=0;z<n.length;++z){t=n[z].length;if(x>t)x-=t;else break}t=n[z];h=z;if(x===t.length){x=0;t=n[++h]}r(t,x);m(n.slice(0,h));O(n.slice(h+1))}}}}else if(x===""){M.html("");E.html("&nbsp;");V.html("")}else r(x,q)}}(l),T,N=function(){var d=
l.find(".prompt");return function(){if(typeof K==="string"){w=ha(K);d.html(f.terminal.format(K))}else K(function(r){w=ha(r);d.html(f.terminal.format(r))})}}(),Z=[];f.extend(l,{name:function(d){if(d!==L){Y=d;b=new qa(d,X);Z.push(b);return l}else return Y},purge:function(){for(var d=Z.length;d--;)Z[d].purge();Z=[];return l},history:function(){return b},set:function(d,r){if(d!==L){p=d;if(!r)q=p.length;F();if(typeof c.onCommandChange==="function")c.onCommandChange(p)}return l},insert:function(d,r){if(q===
p.length)p+=d;else p=q===0?d+p:p.slice(0,q)+d+p.slice(q);r||(q+=d.length);F();if(typeof c.onCommandChange==="function")c.onCommandChange(p);return l},get:function(){return p},commands:function(d){if(d){c.commands=d;return l}else return d},destroy:function(){f(document.documentElement||window).unbind(".cmd");l.stopTime("blink",e);l.find(".cursor").next().remove().end().prev().remove().end().remove();l.find(".prompt, .clipboard").remove();l.removeClass("cmd").removeData("cmd");return l},prompt:function(d){if(d===
L)return K;else{if(typeof d==="string"||typeof d==="function")K=d;else throw"prompt must be a function or string";N();F();return l}},position:function(d){if(typeof d==="number"){q=d<0?0:d>p.length?p.length:d;F();return l}else return q},visible:function(){var d=l.visible;return function(){d.apply(l,[]);F();N()}}(),show:function(){var d=l.show;return function(){d.apply(l,[]);F();N()}}(),resize:function(d){if(d)A=d;else{d=l.width();var r=E.innerWidth();A=Math.floor(d/r)}F();return l},enable:function(){if(!H){E.addClass("inverted");
l.everyTime(500,"blink",e);H=true}return l},isenabled:function(){return H},disable:function(){if(H){l.stopTime("blink",e);E.removeClass("inverted");H=false}return l},mask:function(d){if(typeof d==="boolean"){U=d;F();return l}else return U}});l.name(c.name||c.prompt||"");K=c.prompt||"> ";N();if(c.enabled===L||c.enabled===true)l.enable();f(document.documentElement||window).bind("keypress.cmd",function(d){var r;if(d.ctrlKey&&d.which===99)return true;if(!D&&typeof c.keypress==="function")r=c.keypress(d);
if(r===L||r){if(H)if(f.inArray(d.which,[38,13,0,8])>-1&&d.keyCode!==123&&!(d.which===38&&d.shiftKey))return false;else if(!d.ctrlKey&&!(d.altKey&&d.which===100)||d.altKey){if(D){J+=String.fromCharCode(d.which);g();i()}else l.insert(String.fromCharCode(d.which));return false}}else return r}).bind("keydown.cmd",u);l.data("cmd",l);return l};var ra=/(\[\[[gbius]*;[^;]*;[^\]]*\](?:[^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?)/,ea=/\[\[([gbius]*);([^;]*);([^;\]]*;|[^\]]*);?([^;\]]*;|[^\]]*);?([^\]]*)\]([^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?/g;
ea=/\[\[([gbius]*);([^;]*);([^;\]]*);?([^;\]]*);?([^\]]*)\]([^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?/g;var ia=/#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})/,sa=/https?:\/\/(?:(?!&[^;]+;)[^\s:"'<>)])+/g,ta=/((([^<>('")[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))/g,ja=/('[^']*'|"(\\"|[^"])*"|\/(\\\/|[^\/])*\/|(\\ |[^ ])+|[\w-]+)/g;f.terminal={split_equal:function(c,e){for(var i=/\[\[([gbius]*;[^;]*;[^;\]]*;|[^\]]*;?[^\]]*)\]([^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?/g,
g=/(\[\[[gbius]*;[^;]*;[^\]]*\])/,j=/\[\[[gbius]*;?[^;]*;?[^\]]*\]?$/,o=false,u=false,l="",G=[],B=c.replace(i,function(K,H,X){K=H.match(/;/g).length;return"[["+H+(K==2?";;":K==3?";":"")+X.replace(/\\\]/g,"&#93;").replace(/\n/g,"\\n")+"]"+X+"]"}).split(/\n/g),A=0,w=B.length;A<w;++A)if(B[A]==="")G.push("");else for(var D=B[A],J=0,Q=0,I=0,U=D.length;I<U;++I){if(D[I]==="["&&D[I+1]==="[")o=true;else if(o&&D[I]==="]")if(u)u=o=false;else u=true;else if(o&&u||!o)if(D[I]==="&"){var p=D.substring(I).match(/^(&[^;]+;)/);
if(!p)throw"Unclosed html entity at char "+I;I+=p[1].length-2;I===U-1&&G.push(q+p[1]);continue}else if(D[I]==="]"&&D[I-1]==="\\")--Q;else++Q;if(Q===e||I===U-1){var q=D.substring(J,I+1);if(l){q=l+q;if(q.match("]"))l=""}J=I+1;Q=0;if(p=q.match(i)){p=p[p.length-1];if(p[p.length-1]!=="]"){l=p.match(g)[1];q+="]"}else if(q.match(j)){q=q.replace(j,"");l=p.match(g)[1]}}G.push(q)}}return G},encode:function(c){return c.replace(/&(?!#[0-9]+;|[a-zA-Z]+;|[^=]+=)/,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,
"<br/>").replace(/ /g,"&nbsp;").replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;")},format:function(c){if(typeof c==="string"){c=f.terminal.encode(c);var e=c.split(ra);if(e&&e.length>1)c=f.map(e,function(i){return i===""?i:i.substring(0,1)==="["?i.replace(ea,function(g,j,o,u,l,G,B){if(B==="")return"<span>&nbsp;</span>";B=B.replace(/\\]/g,"]");g="";if(j.indexOf("b")!==-1)g+="font-weight:bold;";var A="text-decoration:";if(j.indexOf("u")!==-1)A+="underline ";if(j.indexOf("s")!==-1)A+="line-through";if(j.indexOf("s")!==
-1||j.indexOf("u")!==-1)g+=A+";";if(j.indexOf("i")!==-1)g+="font-style:italic;";if(o.match(ia)){g+="color:"+o+";";if(j.indexOf("g")!==-1)g+="text-shadow: 0 0 5px "+o+";"}if(u.match(ia))g+="background-color:"+u;return'<span style="'+g+'"'+(l!==""?' class="'+l+'"':"")+' data-text="'+(G===""?B:G.replace(/&#93;/g,"]")).replace('"',"&quote;")+'">'+B+"</span>"}):"<span>"+i+"</span>"}).join("");return f.map(c.split(/(<\/?span[^>]*>)/g),function(i){return i.match(/span/)?i:i.replace(sa,function(g){var j=
g.match(/\.$/);g=g.replace(/\.$/,"");return'<a target="_blank" href="'+g+'">'+g+"</a>"+(j?".":"")}).replace(ta,'<a href="mailto:$1">$1</a>')}).join("").replace(/<span><br\/?><\/span>/g,"<br/>")}else return""},strip:function(c){return c.replace(ea,"$6")},active:function(){return W.front()},ansi_colors:{normal:{black:"#000",red:"#AA0000",green:"#008400",yellow:"#AA5500",blue:"#0000AA",magenta:"#AA00AA",cyan:"#00AAAA",white:"#AAA"},faited:{black:"#000",red:"#640000",green:"#006100",yellow:"#737300",
blue:"#000087",magenta:"#650065",cyan:"#008787",white:"#818181"},bold:{black:"#000",red:"#FF5555",green:"#44D544",yellow:"#FFFF55",blue:"#5555FF",magenta:"#FF55FF",cyan:"#55FFFF",white:"#fff"}},from_ansi:function(){function c(g){var j=g.split(";"),o,u=g=false,l=false,G=[],B="",A="",w;for(w in j){o=parseInt(j[w],10);switch(o){case 1:G.push("b");l=true;g=false;break;case 4:G.push("u");break;case 3:G.push("i");break;case 2:g=true;l=false;break;case 7:u=true}if(i[o])A=i[o];if(e[o])B=e[o]}if(u){w=A;A=
B;B=w}B||(B=u?"black":"white");A||(A=u?"white":"black");w=u=f.terminal.ansi_colors.normal;if(l)u=w=f.terminal.ansi_colors.bold;else if(g)u=w=f.terminal.ansi_colors.faited;return"[["+[G.join(""),u[B],w[A]].join(";")+"]"}var e={30:"black",31:"red",32:"green",33:"yellow",34:"blue",35:"magenta",36:"cyan",37:"white"},i={40:"black",41:"red",42:"green",43:"yellow",44:"blue",45:"magenta",46:"cyan",47:"white"};return function(g){var j=g.split(/(\x1B\[[0-9;]*[A-Za-z])/g);if(j.length==1)return g;g=[];if(j.length>
3&&j.slice(0,3).join("")=="[0m")j=j.slice(3);for(var o=false,u=0;u<j.length;++u){var l=j[u].match(/^\x1B\[([0-9;]*)([A-Za-z])$/);if(l)switch(l[2]){case "m":if(l[1]=="")continue;if(o){g.push("]");if(l[1]=="0")o=false;else g.push(c(l[1]))}else{o=true;g.push(c(l[1]))}}else g.push(j[u])}o&&g.push("]");return g.join("")}}(),parseArguments:function(c){return f.map(c.match(ja)||[],function(e){if(e[0]==="'"&&e[e.length-1]==="'")return e.replace(/^'|'$/g,"");else if(e[0]==='"'&&e[e.length-1]==='"'){e=e.replace(/^"|"$/g,
"").replace(/\\([" ])/g,"$1");return e.replace(/\\\\|\\t|\\n/g,function(i){return i[1]==="t"?"\t":i[1]==="n"?"\n":"\\"}).replace(/\\x([0-9a-f]+)/gi,function(i,g){return String.fromCharCode(parseInt(g,16))}).replace(/\\0([0-7]+)/g,function(i,g){return String.fromCharCode(parseInt(g,8))})}else return e[0]==="/"&&e[e.length-1]=="/"?RegExp(e.replace(/^\/|\/$/g,"")):e.match(/^-?[0-9]+$/)?parseInt(e,10):e.match(/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/)?parseFloat(e):e.replace(/\\ /g," ")})},splitArguments:function(c){return f.map(c.match(ja)||
[],function(e){return e[0]==="'"&&e[e.length-1]==="'"?e.replace(/^'|'$/g,""):e[0]==='"'&&e[e.length-1]==='"'?e.replace(/^"|"$/g,"").replace(/\\([" ])/g,"$1"):e[0]==="/"&&e[e.length-1]=="/"?e:e.replace(/\\ /g," ")})},parseCommand:function(c){return da(c,f.terminal.parseArguments)},splitCommand:function(c){return da(c,f.terminal.splitArguments)}};f.fn.visible=function(){return this.css("visibility","visible")};f.fn.hidden=function(){return this.css("visibility","hidden")};f.jrpc=function(c,e,i,g,j,
o){e=f.json_stringify({jsonrpc:"2.0",method:i,params:g,id:e});return f.ajax({url:c,data:e,success:j,error:o,contentType:"application/json",dataType:"json",async:true,cache:false,type:"POST"})};$=/ {13}$/;var ua=[["jQuery Terminal","(c) 2011-2013 jcubic"],["jQuery Terminal Emulator v. 0.6.5","(c) 2011-2013 Jakub Jankiewicz <http://jcubic.pl>".replace(/ *<.*>/,"")],["jQuery Terminal Emulator version version 0.6.5","(c) 2011-2013 Jakub Jankiewicz <http://jcubic.pl>"],["      _______                 ________                        __",
"     / / _  /_ ____________ _/__  ___/______________  _____  / /"," __ / / // / // / _  / _/ // / / / _  / _/     / /  \\/ / _ \\/ /","/  / / // / // / ___/ // // / / / ___/ // / / / / /\\  / // / /__","\\___/____ \\\\__/____/_/ \\__ / /_/____/_//_/ /_/ /_/  \\/\\__\\_\\___/","         \\/          /____/                                   ".replace($,"")+"version 0.6.5","(c) 2011-2013 Jakub Jankiewicz <http://jcubic.pl>"],["      __ _____                     ________                              __",
"     / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /"," __ / // // // // // _  // _// // / / // _  // _//     // //  \\/ // _ \\/ /","/  / // // // // // ___// / / // / / // ___// / / / / // // /\\  // // / /__","\\___//____ \\\\___//____//_/ _\\_  / /_//____//_/ /_/ /_//_//_/ /_/ \\__\\_\\___/","          \\/              /____/                                          ".replace($,"")+"version 0.6.5","(c) 2011-2013 Jakub Jankiewicz <http://jcubic.pl>"]],fa=[],W=new function(c){var e=
c?[c]:[],i=0;f.extend(this,{get:function(){return e},rotate:function(){if(e.length===1)return e[0];else{if(i===e.length-1)i=0;else++i;return e[i]}},length:function(){return e.length},set:function(g){for(var j=e.length;j--;)if(e[j]===g){i=j;return}this.append(g)},front:function(){return e[i]},append:function(g){e.push(g)}})},ba=[];f.fn.terminal=function(c,e){function i(){return b.get(0).scrollHeight>b.innerHeight()}function g(){var a=b.find(".cursor").width(),h=Math.floor(b.width()/a);if(i()){var k=
b.innerWidth()-b.width();h-=Math.ceil((20-k/2)/(a-1))}return h}function j(a){return a.replace(/\[/g,"&#91;").replace(/\]/g,"&#93;")}function o(a,h){if(m.displayExceptions){b.error("&#91;"+h+"&#93;: "+(typeof a==="string"?a:typeof a.fileName==="string"?a.fileName+": "+a.message:a.message));if(typeof a.fileName==="string"){b.pause();f.get(a.fileName,function(k){b.resume();var v=a.lineNumber-1;(k=k.split("\n")[v])&&b.error("&#91;"+a.lineNumber+"&#93;: "+k)})}a.stack&&b.error(a.stack)}}function u(){var a=
H.prop?H.prop("scrollHeight"):H.attr("scrollHeight");H.scrollTop(a)}function l(a,h){try{if(typeof h==="function")h(function(){});else if(typeof h!=="string")throw a+" must be string or function";}catch(k){o(k,a.toUpperCase());return false}return true}function G(a,h){var k=f.extend({raw:false,finalize:f.noop},h||{});a=f.type(a)==="function"?a():a;a=f.type(a)==="string"?a:String(a);var v,s,y;if(!k.raw&&(a.length>N||a.match(/\n/))){var C=f.terminal.split_equal(f.terminal.from_ansi(a),N);v=f("<div></div>");
s=0;for(y=C.length;s<y;++s)C[s]===""||C[s]==="\r"?v.append("<div>&nbsp;</div>"):f("<div/>").html(k.raw?C[s]:f.terminal.format(C[s])).appendTo(v)}else{k.raw||(a=f.terminal.format(f.terminal.from_ansi(a)));v=f("<div/>").html("<div>"+a+"</div>")}F.append(v);v.width("100%");k.finalize(v);u();return v}function B(){if(m.greetings===L)b.echo(b.signature);else m.greetings&&b.echo(m.greetings)}function A(a,h){var k=1,v=function(s,y){h.pause();f.jrpc(a,k++,s,y,function(C){if(C.error)h.error("&#91;RPC&#93; "+
C.error.message);else if(typeof C.result==="string")h.echo(C.result);else if(C.result instanceof Array)h.echo(f.map(C.result,function(R){return f.json_stringify(R)}).join(" "));else typeof C.result==="object"&&h.echo(f.json_stringify(C.result));h.resume()},function(C,R){R!=="abort"&&h.error("&#91;AJAX&#93; "+R+" - Server reponse is: \n"+C.responseText);h.resume()})};return function(s,y){if(s!==""){s=q(s);if(!m.login||method==="help")v(s.name,s.args);else{var C=y.token();C?v(s.name,[C].concat(s.args)):
y.error("&#91;AUTH&#93; Access denied (no token)")}}}}function w(a){a=j(f.terminal.encode(a));var h=n.prompt();if(n.mask())a=a.replace(/./g,"*");typeof h==="function"?h(function(k){b.echo(k+a)}):b.echo(h+a)}function D(a,h){try{X=a;var k=t.top();if(a==="exit"&&m.exit)if(t.size()===1)if(m.login)Q();else{h||w(a);b.echo("You can't exit from main interpeter")}else b.pop("exit");else{h||w(a);var v=E.length-1;if(a==="clear"&&m.clear)b.clear();else{var s=k.eval(a,b);if(s!==L){if(v===E.length-1){E.pop();s!==
false&&b.echo(s)}else E=s===false?E.slice(0,v).concat(E.slice(v+1)):E.slice(0,v).concat([s]).concat(E.slice(v+1));b.resize()}}}}catch(y){o(y,"USER");b.resume();throw y;}}function J(){var a=null;n.prompt("login: ");m.history&&n.history().disable();n.commands(function(h){try{w(h);if(a){n.mask(false);b.pause();if(typeof m.login!=="function")throw"Value of login property must be a function";m.login(a,h,function(v){if(v){var s=m.name;s=(s?s+"_":"")+T+"_";f.Storage.set(s+"token",v);f.Storage.set(s+"login",
a);n.commands(D);U()}else{b.error("Wrong password try again");n.prompt("login: ");a=null}b.resume();m.history&&n.history().enable()},b)}else{a=h;n.prompt("password: ");n.mask(true)}}catch(k){o(k,"LOGIN",b);throw k;}})}function Q(){if(typeof m.onBeforelogout==="function")try{if(m.onBeforelogout(b)==false)return}catch(a){o(a,"onBeforelogout");throw a;}var h=(m.name?m.name+"_":"")+T+"_";f.Storage.remove(h+"token");f.Storage.remove(h+"login");m.history&&n.history().disable();J();if(typeof m.onAfterlogout===
"function")try{m.onAfterlogout(b)}catch(k){o(k,"onAfterlogout");throw k;}}function I(){var a=t.top(),h=m.name+"_"+T+(ba.length?"_"+ba.join("_"):"");n.name(h);typeof a.prompt=="function"?n.prompt(function(k){a.prompt(k,b)}):n.prompt(a.prompt);m.history&&n.history().enable();n.set("");if(typeof a.onStart==="function")a.onStart(b)}function U(){I();B();if(typeof m.onInit==="function")try{m.onInit(b)}catch(a){o(a,"OnInit");throw a;}}function p(a){var h=t.top();if(f.type(h.keydown)==="function"){h=h.keydown(a,
b);if(h!==L)return h}var k;b.oneTime(10,function(){V()});if(f.type(m.keydown)==="function"){h=m.keydown(a,b);if(h!==L)return h}if(b.paused()){if(a.which===68&&a.ctrlKey){for(k=fa.length;k--;){a=fa[k];if(4!==a.readyState)try{a.abort()}catch(v){b.error("error in aborting ajax")}}b.resume();return false}}else{if(a.which!==9)Y=0;if(a.which===68&&a.ctrlKey){if(n.get()==="")if(t.size()>1||m.login!==L)b.pop("");else{b.resume();b.echo("")}else b.set_command("");return false}else if(m.tabcompletion&&a.which===
9){++Y;var s=n.get().substring(0,n.position());a=s.split(" ");var y;if(a.length==1)y=a[0];else{y=a[a.length-1];for(k=a.length-1;k>0;k--)if(a[k-1][a[k-1].length-1]=="\\")y=a[k-1]+" "+y;else break}a=y.replace(/([\^\$\[\]\(\)\+\*\.\|])/g,"\\$1");var C=RegExp("^"+a);t.top().completion(b,y,function(R){if(n.get().substring(0,n.position())===s){var S=[];for(k=R.length;k--;)C.test(R[k])&&S.push(R[k]);if(S.length===1)b.insert(S[0].replace(C,""));else if(S.length>1)if(Y>=2){w(s);b.echo(S.join("\t"));Y=0}else{R=
false;var aa=y.length;a:for(;aa<S[0].length;++aa){for(k=1;k<S.length;++k)if(S[0].charAt(aa)!==S[k].charAt(aa))break a;R=true}R&&b.insert(S[0].slice(0,aa).replace(C,""))}}});return false}else if(a.which===86&&a.ctrlKey)b.oneTime(1,function(){u()});else if(a.which===9&&a.ctrlKey){if(W.length()>1){b.focus(false);return false}}else if(a.which===34)b.scroll(b.height());else a.which===33?b.scroll(-b.height()):b.attr({scrollTop:b.attr("scrollHeight")})}}function q(a){return f.type(m.processArguments)===
"function"?da(a,m.processArguments):m.processArguments?f.terminal.parseCommand(a):f.terminal.splitCommand(a)}function K(a){return function(h){if(h!==""){h=q(h);var k=a[h.name],v=f.type(k);if(v==="function")return k.apply(b,h.args);else if(v==="object"||v==="string"){var s=[];if(v==="object"){for(var y in k)k.hasOwnProperty(y)&&s.push(y);k=K(k)}b.push(k,{prompt:h.name+"> ",name:h.name,completion:v==="object"?function(C,R,S){S(s)}:L})}else b.error("Command '"+h.name+"' Not Found")}}}var H,X,Y=0,b=this;
if(this.length>1)return this.each(function(){f.fn.terminal.call(f(this),c,f.extend({name:b.selector},e))});else{if(b.data("terminal"))return b.data("terminal");if(b.length===0)throw'Sorry, but terminal said that "'+b.selector+'" is not valid selector!';var E=[],F,T=W.length(),N,Z=[],d,r,P,O=[],m=f.extend({name:b.selector,prompt:"> ",history:true,exit:true,clear:true,enabled:true,historySize:60,displayExceptions:true,cancelableAjax:true,processArguments:true,login:null,tabcompletion:null,historyFilter:null,
onInit:f.noop,onClear:f.noop,onBlur:f.noop,onFocus:f.noop,onTerminalChange:f.noop,onExit:f.noop,keypress:f.noop,keydown:f.noop},e||{}),M=!m.enabled;f.extend(b,f.omap({clear:function(){F.html("");n.set("");E=[];try{m.onClear(b)}catch(a){o(a,"onClear");throw a;}b.attr({scrollTop:0});return b},export_view:function(){return{prompt:b.get_prompt(),command:b.get_command(),position:n.position(),lines:E.slice(0)}},import_view:function(a){b.set_prompt(a.prompt);b.set_command(a.command);n.position(a.position);
E=a.lines;b.resize();return b},exec:function(a,h){M?O.push([a,h]):D(a,h);return b},commands:function(){return t.top().eval},greetings:function(){B();return b},paused:function(){return M},pause:function(){if(n){M=true;b.disable();n.hidden()}return b},resume:function(){if(n){b.enable();var a=O;for(O=[];a.length;){var h=a.shift();b.exec.apply(b,h)}n.visible();u()}return b},cols:function(){return N},rows:function(){return Math.floor(b.height()/b.find(".cursor").height())},history:function(){return n.history()},
next:function(){if(W.length()===1)return b;else{var a=b.offset().top;b.height();b.scrollTop();var h=b,k=f(window).scrollTop(),v=k+f(window).height(),s=f(h).offset().top;if(s+f(h).height()>=k&&s<=v){W.front().disable();a=W.rotate().enable();h=a.offset().top-50;f("html,body").animate({scrollTop:h},500);try{m.onTerminalChange(a)}catch(y){o(y,"onTerminalChange");throw y;}return a}else{b.enable();f("html,body").animate({scrollTop:a-50},500);return b}}},focus:function(a,h){b.oneTime(1,function(){if(W.length()===
1)if(a===false)try{!h&&m.onBlur(b)!==false&&b.disable()}catch(k){o(k,"onBlur");throw k;}else try{!h&&m.onFocus(b)!==false&&b.enable()}catch(v){o(v,"onFocus");throw v;}else if(a===false)b.next();else{var s=W.front();if(s!=b){s.disable();if(!h)try{m.onTerminalChange(b)}catch(y){o(y,"onTerminalChange");throw y;}}W.set(b);b.enable()}});return b},enable:function(){N===L&&b.resize();if(M)if(n){n.enable();M=false}return b},disable:function(){if(n){M=true;n.disable()}return b},enabled:function(){return M},
signature:function(){var a=b.cols();a=a<15?null:a<35?0:a<55?1:a<64?2:a<75?3:4;return a!==null?ua[a].join("\n")+"\n":""},version:function(){return"0.6.5"},get_command:function(){return n.get()},insert:function(a){if(typeof a==="string"){n.insert(a);return b}else throw"insert function argument is not a string";},set_prompt:function(a){if(l("prompt",a)){typeof a=="function"?n.prompt(function(h){a(h,b)}):n.prompt(a);t.top().prompt=a}return b},get_prompt:function(){return t.top().prompt},set_command:function(a){n.set(a);
return b},set_mask:function(a){n.mask(a);return b},get_output:function(a){return a?E:f.map(E,function(h,k){return typeof k=="function"?k():k}).join("\n")},resize:function(a,h){if(a&&h){b.width(a);b.height(h)}a=b.width();h=b.height();N=g();n.resize(N);var k=F.empty().detach();f.each(E,function(v,s){G.apply(null,s)});n.before(k);u();if(f.type(m.onResize)==="function"&&(P!==h||r!==a))m.onResize(b);if(P!==h||r!==a){P=h;r=a}return b},echo:function(a,h){var k=f.extend({raw:false,finalize:f.noop},h||{});
E.push([a,k]);G(a,k);V();return b},error:function(a,h){return b.echo("[[;#f00;]"+j(a).replace(/\\$/,"&#92;")+"]",h)},scroll:function(a){var h;a=Math.round(a);if(H.prop){a>H.prop("scrollTop")&&a>0&&H.prop("scrollTop",0);h=H.prop("scrollTop")}else{a>H.attr("scrollTop")&&a>0&&H.attr("scrollTop",0);h=H.attr("scrollTop")}H.scrollTop(h+a);return b},logout:m.login?function(){for(;t.size()>1;)t.pop();Q();return b}:function(){throw"You don't have login function";},token:m.login?function(){var a=m.name;return f.Storage.get((a?
a+"_":"")+T+"_token")}:f.noop,login_name:m.login?function(){var a=m.name;return f.Storage.get((a?a+"_":"")+T+"_login")}:f.noop,name:function(){return t.top().name},push:function(a,h){if(h&&(!h.prompt||l("prompt",h.prompt))||!h){h=h||{};h.name=h.name||X;h.prompt=h.prompt||h.name+" ";ba.push(h.name);t.top().mask=n.mask();if(f.type(a)==="string")a=A(a,b);else if(f.type(a)==="object"){var k=[],v;for(v in a)k.push(v);a=K(a);h=h||{};h.completion=function(s,y,C){C(k)}}else if(f.type(a)!="function")throw"Invalid value as eval in push command";
t.push(f.extend({eval:a},h));I()}return b},pop:function(a){a!==L&&w(a);ba.pop();if(t.top().name===m.name){if(m.login){Q();if(f.type(m.onExit)==="function")try{m.onExit(b)}catch(h){o(h,"onExit");throw h;}}}else{a=t.pop();I();if(f.type(a.onExit)==="function")try{a.onExit(b)}catch(k){o(k,"onExit");throw k;}b.set_mask(t.top().mask)}return b},level:function(){return t.size()},reset:function(){for(b.clear();t.size()>1;)t.pop();U();return b},purge:function(){n.purge();var a=(m.name?m.name+"_":"")+T+"_";
f.Storage.remove(a+"token");f.Storage.remove(a+"login");return b},destroy:function(){n.destroy().remove();F.remove();f(document).unbind(".terminal");f(window).unbind(".terminal");b.unbind("click, mousewheel");b.removeData("terminal").removeClass("terminal");m.width&&b.css("width","");m.height&&b.css("height","");return b}},function(a,h){return function(){try{return h.apply(this,Array.prototype.slice.apply(arguments))}catch(k){a!=="exec"&&o(k,"TERMINAL");throw k;}}}));var V=function(){var a=i();return function(){if(a!==
i()){b.resize();a=i()}}}();m.width&&b.width(m.width);m.height&&b.height(m.height);H=!navigator.userAgent.toLowerCase().match(/(webkit)[ \/]([\w.]+)/)&&b[0].tagName.toLowerCase()=="body"?f("html"):b;b.ajaxSend(function(a,h){fa.push(h)});F=f("<div>").addClass("terminal-output").appendTo(b);b.addClass("terminal");if("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch){b.click(function(){b.find("textarea").focus()});b.find("textarea").focus()}if(m.login&&f.type(m.onBeforeLogin)===
"function")try{m.onBeforeLogin(b)}catch(x){o(x,"onBeforeLogin");throw x;}if(f.type(c)==="string"){d=c;c=A(c,b)}else if(f.type(c)==="array")throw"You can't use array as eval";else if(f.type(c)==="object"){for(var z in c)c.hasOwnProperty(z)&&Z.push(z);c=K(c)}else if(f.type(c)!=="function")throw'Unknow object "'+String(c)+'" passed as eval';if(d&&(f.type(m.login)==="string"||m.login))m.login=function(a){var h=1;return function(k,v,s){b.pause();f.jrpc(d,h++,a,[k,v],function(y){b.resume();!y.error&&y.result?
s(y.result):s(null)},function(y,C){b.resume();b.error("&#91;AJAX&#92; Response: "+C+"\n"+y.responseText)})}}(f.type(m.login)==="boolean"?"login":m.login);if(l("prompt",m.prompt)){var t=new pa({name:m.name,eval:c,prompt:m.prompt,completion:m.completion?m.completion:function(a,h,k){k(Z)},greetings:m.greetings}),n=f("<div/>").appendTo(b).cmd({prompt:m.prompt,history:m.history,historyFilter:m.historyFilter,historySize:m.historySize,width:"100%",keydown:p,keypress:m.keypress?function(a){return m.keypress(a,
b)}:null,onCommandChange:function(a){if(f.type(m.onCommandChange)==="function")try{m.onCommandChange(a,b)}catch(h){o(h,"onCommandChange");throw h;}u()},commands:D});N=g();W.append(b);m.enabled===true?b.focus(L,true):b.disable();f(document).bind("click.terminal",function(a){!f(a.target).parents().hasClass("terminal")&&m.onBlur(b)!==false&&b.disable()});f(window).bind("resize.terminal",function(){if(b.is(":visible")){var a=b.width(),h=b.height();if(P!==h||r!==a)b.resize()}});b.click(function(){b.focus()});
m.login&&b.token&&!b.token()&&b.login_name&&!b.login_name()?J():U();f.type(f.fn.init.prototype.mousewheel)==="function"&&b.mousewheel(function(a,h){h>0?b.scroll(-40):b.scroll(40);return false},true)}b.data("terminal",b);return b}}})(jQuery);
