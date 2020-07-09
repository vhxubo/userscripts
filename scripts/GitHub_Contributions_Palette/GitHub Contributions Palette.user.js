// ==UserScript==
// @name               GitHub Contributions Palette
// @name:zh-CN         GitHub 提交记录画板
// @version            0.1
// @description        DIY your profile contributions.
// @description:zh-CN  自定义 profile 页面的提交记录。左键上色，右键清空，切勿双击；插件拥有油猴菜单，可以一键清空、设置颜色。
// @author             Vhxubo
// @match              https://github.com/*
// @grant              GM_addStyle
// @grant              GM_registerMenuCommand
// ==/UserScript==

(function () {
    'use strict';
    var colors = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'];
    var css = `.calendar-graph.days-selected rect.day{opacity:1;}`;
    var rect = document.querySelectorAll('rect');
    var i,
        colorNum = 3;

    GM_addStyle(css);

    function setColor(index) {
        return function () {
            colorNum = index;
        };
    }

    GM_registerMenuCommand('一键清空', function () {
        for (i = 0; i < rect.length; i++) {
            rect[i].setAttribute('fill', colors[0]);
        }
    });

    GM_registerMenuCommand('color 1', setColor(1));
    GM_registerMenuCommand('color 2', setColor(2));
    GM_registerMenuCommand('color 3', setColor(3));
    GM_registerMenuCommand('color 4', setColor(4));

    for (i = 0; i < rect.length; i++) {
        rect[i].addEventListener('click', function (event) {
            event.target.setAttribute('fill', colors[colorNum]);
        });

        rect[i].addEventListener('contextmenu', function (event) {
            event.preventDefault();
            event.target.setAttribute('fill', colors[0]);
        });
    }
})();
