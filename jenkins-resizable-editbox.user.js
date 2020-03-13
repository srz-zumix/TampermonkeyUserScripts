// ==UserScript==
// @name        Jenkins pipeline script editbox expansion/resizable
// @version     0.1
// @description Jenkins pipeline script editbox expansion/resizable
// @license     MIT
// @author      srz_zumix
// @namespace   https://github.com/srz-zumix/TampermonkeyUserScripts
// @run-at      document-idle
// @grant       GM_setValue
// @grant       GM_getValue
// @icon        https://jenkins.io/images/logos/ice-cream/ice_cream.svg
// @updateURL   https://github.com/srz-zumix/TampermonkeyUserScripts/raw/master/jenkins-resizable-editbox.user.js
// @downloadURL https://github.com/srz-zumix/TampermonkeyUserScripts/raw/master/jenkins-resizable-editbox.user.js
// ==/UserScript==

// forked from [a2intl/resize_jenkins_editor.js](https://gist.github.com/a2intl/293a76ae3323ec21d7cdceb6f7cd63af)

(() => {
    'use strict';

    function check() {
        var ace_editors = $$('.ace_editor');
        ace_editors.forEach(function(editor) {
            if(!editor.made_wide) {
                var container = editor.closest('tr.dropdownList-container');
                if(container) {
                    $(':scope > td:nth-child(1)', container).style.display = 'none';
                    $(':scope > td:nth-child(2)', container).colSpan = '3';
                    editor.made_wide = true;
                }
            }
            if(!editor.made_resizeable) {
                var jquery_ui = editor.closest('.jquery-ui-1');
                if(jquery_ui) {
                    jquery_ui.style.resize = 'both';
                    jquery_ui.style.overflow = 'scroll';
                    jquery_ui.style.height='750px';
                    editor.style.height='100%';
                    var w = GM_getValue("aceEditor-width" , editor.style.width);
                    var h = GM_getValue("aceEditor-height", editor.style.height);
                    jquery_ui.style.width = w.toString() + 'px';
                    jquery_ui.style.height = h.toString() + 'px';
                    const resizeObserver = new ResizeObserver(entries => {
                        entries.forEach(({target, contentRect}) => {
                            if(target.aceEditor) {
                                GM_setValue("aceEditor-width" , contentRect.width);
                                GM_setValue("aceEditor-height", contentRect.height);
                                target.aceEditor.resize();
                            }
                        });
                    });
                    resizeObserver.observe(editor);
                    editor.made_resizeable = true;
                }
            }
        });
    }

    function toWide() {
        $('.container').style.width = '100%';
        $('.container').style.padding = '0';
        $('.col-md-offset-2').style.width = '100%';
        $('.col-md-offset-2').style.margin = '0';
    }
    function $(selector, el) {
        return (el || document).querySelector(selector);
    }

    function $$(selector, el) {
        return [...(el || document).querySelectorAll(selector)];
    }
    toWide();
    (new MutationObserver(check)).observe(document, {childList: true, subtree: true});
})();
