import $ from 'jquery';
import App from './views/app';

$(document).ready(() => {
    const $container = $('.container');

    $container.append(new App().$view);
});
