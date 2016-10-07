import { Observable } from 'rx';

class ObservableItem{
    constructor(    
        public observer: Observable<any>,
        public onNext: any,
        public onError: any,
        public onCompleted: any
        /*, public id: string*/) {} // we could assign an id to identify which observer is running
        
}

export class ObservableQueue{
	queue: ObservableItem[] = [];
        processingCount: number = 0;
	
	constructor(private onCompleted, private maxProcess: number = 0) {}
	
	protected done() {
            if (!--this.processingCount) {
                    this.onCompleted();
            }
            this.shiftProcess();
	}
	
        protected shiftProcess() {
            if (this.queue.length && (!this.maxProcess || this.processingCount < this.maxProcess)) {
                this.processingCount++;
                let observableItem: ObservableItem = this.queue.shift();
                observableItem.observer.subscribe(
                        next => observableItem.onNext(next), 
                        error => observableItem.onError(error), 
                        function() {
                            observableItem.onCompleted();
                            this.done();
                         }.bind(this));   
            }
        }
        
        getProcessingCount(): number {
            return this.processingCount;
        }
        
	subscribe(observer: Observable<any>, onNext?: any, onError?: any, onCompleted?: () => any/*, id?: string*/) {
            this.queue.push(new ObservableItem(observer, onNext, onError, onCompleted/*, id*/));
            this.shiftProcess();
            
            return observer;
	}
}