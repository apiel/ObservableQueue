"use strict";
var rx_1 = require('rx');
var ObservableQueue_1 = require('./../ObservableQueue');
var obs = rx_1.Observable.create(function (observer) {
    console.log('start ' + (new Date).toLocaleTimeString());
    setTimeout(function () {
        observer.onNext({ 'hello': 'world' });
        observer.onCompleted();
    }, 1000);
});
// Here allow only 2 observer at the same time
var observableQueue = new ObservableQueue_1.ObservableQueue(function () { return console.log('completed: queue is empty'); }, 2);
observableQueue.subscribe(obs, function (data) { return console.log(data); }, null, function () { return console.log('hi ' + (new Date).toLocaleTimeString()); });
observableQueue.subscribe(obs, function (data) { return console.log(data); }, null, function () { return console.log('hi ' + (new Date).toLocaleTimeString()); });
observableQueue.subscribe(obs, function (data) { return console.log(data); }, null, function () { return console.log('hi ' + (new Date).toLocaleTimeString()); });
setTimeout(function () {
    observableQueue.subscribe(obs, function (data) { return console.log(data); }, null, function () { return console.log('hi ' + (new Date).toLocaleTimeString()); });
}, 4000);
//let observableQueue = new ObservableQueue(() => console.log('completed: queue is empty'), 2);
//observableQueue.subscribe(obs, data => test(data), null, () => console.log('hi ' + (new Date).toLocaleTimeString()), 'a');
//observableQueue.subscribe(obs, data => test(data), null, () => console.log('hi ' + (new Date).toLocaleTimeString())/*, 'b'*/);
//observableQueue.subscribe(obs, data => test(data), null, () => console.log('hi ' + (new Date).toLocaleTimeString()), 'c');
//observableQueue.subscribe(obs, data => test(data), null, () => console.log('hi ' + (new Date).toLocaleTimeString()));
//observableQueue.subscribe(obs, data => test(data), null, () => console.log('hi ' + (new Date).toLocaleTimeString()));
//observableQueue.subscribe(obs, data => test(data), null, () => console.log('hi ' + (new Date).toLocaleTimeString()), 'e');
//observableQueue.subscribe(obs, data => test(data), null, () => console.log('hi ' + (new Date).toLocaleTimeString()), 'f');
//
//function test(data) {
//    console.log(observableQueue.getProcessingids());
//    console.log(data)
//}
//# sourceMappingURL=example.js.map