import { Observable } from 'rx';

export class ObservableQueue{
	queue: number = 0;
	
	constructor(private onCompleted) {}
	
	protected add() {
		this.queue++;
	}
	
	protected done() {
		if (!--this.queue) {
			this.onCompleted();
		}
	}
	
	subscribe(observer: Observable<any>, onNext?: any, onError?: any, onCompleted?: () => any) {
		this.add();
		return observer.subscribe(next => onNext(next), error => onError(error), function() {
			onCompleted();
			this.done();
		}.bind(this));
	}
}