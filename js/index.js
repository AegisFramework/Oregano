/**
 * Space for all imported JavaScript Libraries
 *
 * TODO: Find a way to import Font Awesome in a better way
 */

import '@babel/polyfill';
import './../node_modules/@fortawesome/fontawesome-free/js/all.js';

/**
 * Import needed libraries for the website
 */
import { $_ready, Platform } from '@aegis-framework/artemis';


// Check if the platform supports service workers and register them
if (Platform.serviceWorkers ()) {
	navigator.serviceWorker.register ('./../service-worker.js');
}

// When the page is ready, you can start modifying its DOM!
$_ready (() => {

});