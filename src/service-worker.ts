import { manifest, version } from '@parcel/service-worker';

const IDENTIFIER = `oregano-v${version}`;

async function install () {
	const cache = await caches.open(IDENTIFIER);
	return cache.addAll(manifest);
}

async function activate () {
	const keys = await caches.keys();
	const promises = keys.map(key => key !== IDENTIFIER && caches.delete(key));
	return Promise.all(promises);
}

self.addEventListener('install', event => event.waitUntil(install()));

self.addEventListener('activate', event => {
	event.waitUntil(activate());
	return self.clients.claim();
});

self.addEventListener('fetch', event => {

	if (event.request.method !== 'GET') {
		return;
	}

	event.respondWith(
		caches.match(event.request).then(cached => {
			const fetchedFromNetwork = async response => {
				const cache = await caches.open(IDENTIFIER);

				cache.put(event.request, response.clone());

				return response;
			};

			const unableToResolve = () => new Response(`
				<!DOCTYPE html><html lang=en><title>Bad Request</title><meta charset=UTF-8><meta content="width=device-width,initial-scale=1"name=viewport><style>body,html{width:100%;height:100%}body{text-align:center;color:#545454;margin:0;display:flex;justify-content:center;align-items:center;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Fira Sans","Droid Sans","Helvetica Neue",sans-serif}h1,h2{font-weight:lighter}h1{font-size:4em}h2{font-size:2em}</style><div><h1>Service Unavailable</h1><h2>Sorry, the server is currently unavailable or under maintenance, try again later.</h2></div>
			`, {
				status: 503,
				statusText: 'Service Unavailable',
				headers: new Headers({ 'Content-Type': 'text/html' }),
			});

			const networked = fetch(event.request)
				.then(fetchedFromNetwork, unableToResolve)
				.catch(unableToResolve);

			return cached || networked;
		})
	);
});