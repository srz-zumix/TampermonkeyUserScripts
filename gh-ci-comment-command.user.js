// ==UserScript==
// @name        github ci comment command
// @version     0.1
// @description 
// @license     MIT
// @author      srz_zumix
// @namespace   https://github.com/srz-zumix/TampermonkeyUserScripts
// @run-at      document-idle
// @grant       none
// @include     https://github.com/*
// @icon        https://github.githubassets.com/pinned-octocat.svg
// @updateURL   https://github.com/srz-zumix/TampermonkeyUserScripts/raw/master/gh-ci-comment-command.user.js
// @downloadURL https://github.com/srz-zumix/TampermonkeyUserScripts/raw/master/gh-ci-comment-command.user.js
// @require     https://code.jquery.com/jquery-3.5.1.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/at.js/1.5.2/js/jquery.atwho.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/Caret.js/0.3.1/jquery.caret.min.js
// ==/UserScript==

(() => {
    'use strict';

    // https://docs.microsoft.com/en-us/azure/devops/pipelines/repos/github?view=azure-devops&tabs=yaml#comment-triggers
    var azp_command = [
        {name: 'azp help [command]', content: '/azp help'},
        {name: 'azp run [pipeline-name]', content: '/azp run'},
    ]
    $('#new_comment_field').atwho({
        at: '/',
        data: azp_command,
        insertTpl: '${content}',
        suffix: ''
      });

      $('head').append(
        `<style>
    .atwho-view {
        position:absolute;
        top: 0;
        left: 0;
        display: none;
        margin-top: 18px;
        background: white;
        color: black;
        border: 1px solid #DDD;
        border-radius: 3px;
        box-shadow: 0 0 5px rgba(0,0,0,0.1);
        min-width: 120px;
        z-index: 11110 !important;
    }
    
    .atwho-view .atwho-header {
        padding: 5px;
        margin: 5px;
        cursor: pointer;
        border-bottom: solid 1px #eaeff1;
        color: #6f8092;
        font-size: 11px;
        font-weight: bold;
    }
    
    .atwho-view .atwho-header .small {
        color: #6f8092;
        float: right;
        padding-top: 2px;
        margin-right: -5px;
        font-size: 12px;
        font-weight: normal;
    }
    
    .atwho-view .atwho-header:hover {
        cursor: default;
    }
    
    .atwho-view .cur {
        background: #3366FF;
        color: white;
    }
    .atwho-view .cur small {
        color: white;
    }
    .atwho-view strong {
        color: #3366FF;
    }
    .atwho-view .cur strong {
        color: white;
        font:bold;
    }
    .atwho-view ul {
        /* width: 100px; */
        list-style:none;
        padding:0;
        margin:auto;
        max-height: 200px;
        overflow-y: auto;
    }
    .atwho-view ul li {
        display: block;
        padding: 5px 10px;
        border-bottom: 1px solid #DDD;
        cursor: pointer;
        /* border-top: 1px solid #C8C8C8; */
    }
    .atwho-view small {
        font-size: smaller;
        color: #777;
        font-weight: normal;
    }
        </style>`
    );      
})();
