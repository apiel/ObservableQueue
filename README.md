# ObservableQueue

ObservableQueue help you to create a queue of observable to be executed with a limit of simultaneous process and wait for all them to finish before to trigger a finale callback function.

        import { Observable } from 'rx';
        import { ObservableQueue } from './../ObservableQueue';

        var obs = Observable.create(function(observer) {
                console.log('start ' + (new Date).toLocaleTimeString());
                setTimeout(function() {
                        observer.onNext({'hello': 'world'});
                        observer.onCompleted();
                }, 1000);
        });

        // Here allow only 2 observer at the same time
        let observableQueue = new ObservableQueue(() => console.log('completed'), 2);
        observableQueue.subscribe(obs, data => console.log(data), null, () => console.log('hi ' + (new Date).toLocaleTimeString()));
        observableQueue.subscribe(obs, data => console.log(data), null, () => console.log('hi ' + (new Date).toLocaleTimeString()));
        observableQueue.subscribe(obs, data => console.log(data), null, () => console.log('hi ' + (new Date).toLocaleTimeString()));


The output will be:

        start 10:30:40
        start 10:30:40
        { hello: 'world' }
        hi 10:30:41
        start 10:30:41
        { hello: 'world' }
        hi 10:30:41
        { hello: 'world' }
        hi 10:30:42
        completed
