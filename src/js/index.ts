/**
 * Space for all imported JavaScript Libraries
 *
 */

/**
 * Import needed libraries for the website
 */
import { $_ready, Platform } from '@aegis-framework/artemis';


// Check if the platform supports service workers and register them
if (Platform.serviceWorkers()) {
	navigator.serviceWorker.register(new URL('../service-worker.ts', import.meta.url), { type: 'module' });
}

// When the page is ready, you can start modifying its DOM!
$_ready(() => {

});