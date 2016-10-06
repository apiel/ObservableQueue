import { Observable } from 'rx';
import { ObservableQueue } from './../ObservableQueue';

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