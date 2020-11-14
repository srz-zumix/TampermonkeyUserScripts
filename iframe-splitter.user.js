// ==UserScript==
// @name         iframe splitter
// @namespace    https://github.com/srz-zumix/TampermonkeyUserScripts
// @version      0.3
// @description  split current page
// @author       srz_zumix
// @run-at       document-idle
// @match        *://*/*
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @require      https://code.jquery.com/ui/1.12.0/jquery-ui.min.js
// @resource     jquery-ui.css https://code.jquery.com/ui/1.12.0/themes/smoothness/jquery-ui.css
// @updateURL    https://github.com/srz-zumix/TampermonkeyUserScripts/raw/master/iframe-splitter.user.js
// @downloadURL  https://github.com/srz-zumix/TampermonkeyUserScripts/raw/master/iframe-splitter.user.js
// ==/UserScript==

function split_current_page() {
    'use strict';

    if(window == window.parent) {
        var index = $('.iframe_splitter').length;
        var data_index = index;
        if( data_index >= 3 ) {
            data_index = 3;
        }
        var s=document.createElement('div');
        var root_class_name = '_' + Math.random().toString(36).substr(2, 9);
        s.setAttribute("class",  `iframe_splitter ${root_class_name}`);
        s.innerHTML='<div class="move_target split_resizable" style="position:absolute;top:100px;left:0px;width:90%;height:300px;"><div><button type="button" name="split_move" class="split_move split_button" style="float:left;left:0px;">≡≡≡≡</button><button type="button" name="split_close" class="split_close split_button" style="right:0px;float:right;" >X</button></div><iframe src="#" width="100%" height="90%"  frameborder="0" ></iframe></div>';
        document.body.appendChild(s);

        var newCSS ;
        newCSS = GM_getResourceText ("jquery-ui.css");
        GM_addStyle(newCSS);
        GM_addStyle(".ui-resizable-se { width: 7px; height: 7px; border-right: 2px solid #F0897F; border-bottom: 2px solid #F0897F;}");
        GM_addStyle(".ui-resizable-nw { border-left: 2px solid #F0897F; border-top: 2px solid #F0897F; }");
        GM_addStyle(".split_resizable { padding: 0px 4px 4px 8px; border:2px solid #F0897F; background-color:#fff; z-index:10000; }");
        GM_addStyle(".split_button { border: none; background-color:#F0897F; color:#eee; font-size: 6px; height: 12px; position:absolute; padding: 0px 4px; } .split_button:focus { outline: none; }");
        GM_addStyle(".split_close { border-left: 2px solid #F0897F; border-bottom: 2px solid #F0897F; }");
        GM_addStyle(".split_move { border-right: 2px solid #F0897F; border-bottom: 2px solid #F0897F; cursor: move; }");

        var r = $(".split_resizable", s);
        var wparam = `split-width-${data_index}`;
        var hparam = `split-width-${data_index}`;
        var lparam = `split-left-${data_index}`;
        var tparam = `split-top-${data_index}`;
        var move_target = $(".move_target", s);
        var move_marker = $(".split_move", s);
        var w = GM_getValue(wparam , r.width());
        var h = GM_getValue(hparam, r.height());
        var l = GM_getValue(lparam, 10);
        var t = GM_getValue(tparam, 100);

        r.width(w).height(h);
        $("iframe", r).width(w-20).height(h-20);
        move_target.css("left", l);
        move_target.css("top", t);

        r.resizable({
            handles: 'n, e, s, w, se, nw',
            start: function(event, ui) {
                ui.element.append($("<div/>", {
                    id: "iframe-barrier",
                    css: {
                        position: "absolute",
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        "z-index": 10
                    }
                }));
            },
            stop: function(event, ui) {
                $("#iframe-barrier", ui.element).remove();
            },
            resize: function(event, ui) {
                $("iframe", ui.element).width(ui.size.width-20).height(ui.size.height-30);
                GM_setValue(wparam, ui.size.width);
                GM_setValue(hparam, ui.size.height);
                var l = move_target.css("left");
                var t = move_target.css("top");
                GM_setValue(lparam, l);
                GM_setValue(tparam, t);
            }
        });

        var drag_flg = false;
        var posX1 = 0;
        var posY1 = 0;
        move_marker.mousedown(function(evt1) {
            if(drag_flg == false) {
                var pos1 = move_target.position();
                posX1 = evt1.clientX - pos1.left;
                posY1 = evt1.clientY - pos1.top;
                drag_flg = true;
            } else if(drag_flg == true) {
                drag_flg = false;
            }
        });
        $(document).mouseup(function() {
            drag_flg = false;
        });
        $(document).mousemove(function(evt2) {
            if(drag_flg == true) {
                var l = evt2.clientX - posX1;
                var t = evt2.clientY - posY1;
                move_target.css("left", l);
                move_target.css("top", t);
                GM_setValue(lparam, l);
                GM_setValue(tparam, t);
            }
        });

        $(".split_close", s).on('click', function() {
            s.remove();
        });
    }
}

GM_registerMenuCommand('Split current page', function() {
    split_current_page();
}, 'r');
