import { $_ready } from '@aegis-framework/artemis';

if ('serviceWorker' in navigator) {
	if (location.protocol.indexOf ('http') > -1) {
		navigator.serviceWorker.register ('./../service-worker.js');
	}
}

$_ready(() => {

});