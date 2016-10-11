"use strict";
var ObservableItem = (function () {
    function ObservableItem(observer, onNext, onError, onCompleted, id) {
        this.observer = observer;
        this.onNext = onNext;
        this.onError = onError;
        this.onCompleted = onCompleted;
        this.id = id;
    }
    return ObservableItem;
}());
var ObservableQueue = (function () {
    function ObservableQueue(onCompleted, maxProcess) {
        if (maxProcess === void 0) { maxProcess = 0; }
        this.onCompleted = onCompleted;
        this.maxProcess = maxProcess;
        this.queue = [];
        this.processingCount = 0;
        this.processingIds = [];
    }
    ObservableQueue.prototype.done = function (id) {
        this.removeIdFromProcessing(id);
        if (!--this.processingCount) {
            this.onCompleted();
        }
        this.shiftProcess();
    };
    ObservableQueue.prototype.removeIdFromProcessing = function (id) {
        var index = this.processingIds.indexOf(id);
        if (index !== -1) {
            this.processingIds.splice(index, 1);
        }
    };
    ObservableQueue.prototype.shiftProcess = function () {
        if (this.queue.length && (!this.maxProcess || this.processingCount < this.maxProcess)) {
            this.processingCount++;
            var observableItem_1 = this.queue.shift();
            this.processingIds.push(observableItem_1.id);
            observableItem_1.observer.subscribe(function (next) { return observableItem_1.onNext(next); }, function (error) { return observableItem_1.onError(error); }, function () {
                observableItem_1.onCompleted();
                this.done(observableItem_1.id);
            }.bind(this));
        }
    };
    ObservableQueue.prototype.getProcessingCount = function () {
        return this.processingCount;
    };
    ObservableQueue.prototype.getProcessingids = function () {
        return this.processingIds;
    };
    ObservableQueue.prototype.subscribe = function (observer, onNext, onError, onCompleted, id) {
        this.queue.push(new ObservableItem(observer, onNext, onError, onCompleted, id));
        this.shiftProcess();
        return observer;
    };
    return ObservableQueue;
}());
exports.ObservableQueue = ObservableQueue;
//# sourceMappingURL=ObservableQueue.js.map