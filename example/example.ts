import { Observable } from 'rx';
import { ObservableQ } from './../ObservableQueue';

var obs = Observable.create(function(observer) {
	console.log('start');
	setTimeout(function() {
		observer.onNext({'hello': 'world'});
		observer.onCompleted();
	}, 1);
});

let observableQ = new ObservableQ(() => console.log('completed'));
observableQ.subscribe(obs, data => console.log(data), null, () => console.log('hi'));
observableQ.subscribe(obs, data => console.log(data), null, () => console.log('hi'));
observableQ.subscribe(obs, data => console.log(data), null, () => console.log('hi'));