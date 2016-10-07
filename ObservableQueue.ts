import { Observable } from 'rx';

class ObservableItem{
    constructor(    
        public observer: Observable<any>,
        public onNext: any,
        public onError: any,
        public onCompleted: any
        , public id: string) {}
        
}

export class ObservableQueue{
	queue: ObservableItem[] = [];
        processingCount: number = 0;
        processingIds: string[] = [];
	
	constructor(private onCompleted, private maxProcess: number = 0) {}
	
	protected done(id?: string) {
            this.removeIdFromProcessing(id);
            if (!--this.processingCount) {
                this.onCompleted();
            }
            this.shiftProcess();
	}
        
        protected removeIdFromProcessing(id: string) {
            var index = this.processingIds.indexOf(id);
            if (index !== -1) {
                this.processingIds.splice(index, 1);
            }
        }
	
        protected shiftProcess() {
            if (this.queue.length && (!this.maxProcess || this.processingCount < this.maxProcess)) {
                this.processingCount++;
                let observableItem: ObservableItem = this.queue.shift();
                this.processingIds.push(observableItem.id);
                observableItem.observer.subscribe(
                        next => observableItem.onNext(next), 
                        error => observableItem.onError(error), 
                        function() {
                            observableItem.onCompleted();
                            this.done(observableItem.id);
                         }.bind(this));   
            }
        }
        
        getProcessingCount(): number {
            return this.processingCount;
        }
        
        getProcessingids(): string[] {
            return this.processingIds;
        }
        
	subscribe(observer: Observable<any>, onNext?: any, onError?: any, onCompleted?: () => any, id?: string) {
            this.queue.push(new ObservableItem(observer, onNext, onError, onCompleted, id));
            this.shiftProcess();
            
            return observer;
	}
}