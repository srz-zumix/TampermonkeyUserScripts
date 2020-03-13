// ==UserScript==
// @name        no referrer
// @version     1.0
// @description Add to referrer meta ['no-referrer' and 'same-origin']
// @license     MIT
// @author      srz_zumix
// @namespace   https://github.com/srz-zumix/TampermonkeyUserScripts
// @run-at      document-idle
// @grant       none
// @icon        https://github.githubassets.com/pinned-octocat.svg
// @updateURL   https://github.com/srz-zumix/TampermonkeyUserScripts/raw/master/no-referrer.user.js
// @downloadURL https://github.com/srz-zumix/TampermonkeyUserScripts/raw/master/no-referrer.user.js
// ==/UserScript==
(() => {
    'use strict';

    function init(){
        // <meta name="referrer" content="no-referrer"> を挿入
        // https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Referrer-Policy
        //
        // no-referrer
        //   Referer ヘッダー全体が省略されます。リクエストとともにリファラー情報が送られることはありません。
        // same-origin
        //   同じオリジンにはリファラーが送信されますが、オリジン間リクエストではリファラー情報が含まれません。
        //
        // 複数の値を指定すると、ブラウザーが対応しているもので最後に指定された値が適用されます

        // console.log("insert no-referrer")
        var noreferrer_contents = ['no-referrer', 'same-origin']
        var noreferrer = false
        var head = $('head');
        if( !noreferrer ) {
            noreferrer_contents.forEach(function( value ) {
                const meta = document.createElement("meta");
                meta.setAttribute("name", "referrer");
                meta.setAttribute("content", value);
                head.appendChild(meta);
                //console.log( value );
            });
        }
    }
    function $(selector, el) {
        return (el || document).querySelector(selector);
    }

    function $$(selector, el) {
        return [...(el || document).querySelectorAll(selector)];
    }

    init();
})();
