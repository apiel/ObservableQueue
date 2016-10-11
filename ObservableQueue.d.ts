declare module 'ObservableQueue/ObservableQueue' {
	import { Observable } from 'rx';
	export class ObservableQueue {
	    private onCompleted;
	    private maxProcess;
	    private queue;
	    private processingCount;
	    private processingIds;
	    constructor(onCompleted: any, maxProcess?: number);
	    protected done(id?: string): void;
	    protected removeIdFromProcessing(id: string): void;
	    protected shiftProcess(): void;
	    getProcessingCount(): number;
	    getProcessingids(): string[];
	    subscribe(observer: Observable<any>, onNext?: any, onError?: any, onCompleted?: () => any, id?: string): Observable<any>;
	}

}