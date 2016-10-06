# ObservableQueue

Observable queue help you to create a queue of observable and wait for all them to finish before to trigger a callback function.

	import { Observable } from 'rx';
	import { ObservableQueue } from 'ObservableQueue';
	
	var obs = Observable.create(function(observer) {
		console.log('start');
		setTimeout(function() {
			observer.onNext({'hello': 'world'});
			observer.onCompleted();
		}, 1);
	});
	
	let observableQueue = new ObservableQueue(() => console.log('completed'));
	observableQueue.subscribe(obs, data => console.log(data), null, () => console.log('hi'));
	observableQueue.subscribe(obs, data => console.log(data), null, () => console.log('hi'));
	observableQueue.subscribe(obs, data => console.log(data), null, () => console.log('hi'));
	
	
The output will be:

	$ npm start

	> test@1.0.0 start /home/apiel/share/typescript/ObservableQueue
	> tsc && node dist/example/example.js

	start
	start
	start
	{ hello: 'world' }
	hi
	{ hello: 'world' }
	hi
	{ hello: 'world' }
	hi
	completed