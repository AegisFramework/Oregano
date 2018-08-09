import './font-awesome.min.js';

import { $_ready, Platform } from '@aegis-framework/artemis';

// Check if the platform supports service workers and register them
if (Platform.serviceWorkers ()) {
	navigator.serviceWorker.register ('./../service-worker.js');
}

// When the page is ready, you can start modifying its DOM!
$_ready(() => {

});