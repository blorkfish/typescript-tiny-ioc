/// <reference path="../TypeScriptTinyIoC/TypeScriptTinyIoC.ts" />
var IITodoEventClicked = (function () {
    function IITodoEventClicked() {
        this.className = 'IITodoEventClicked';
        this.propertyNames = ['TodoId'];
    }
    return IITodoEventClicked;
})();
var IITodoEventHandler = (function () {
    function IITodoEventHandler() {
        this.className = 'IITodoEventHandler';
        this.methodNames = ['handleEvent'];
    }
    return IITodoEventHandler;
})();
var IISecondEventClicked = (function () {
    function IISecondEventClicked() {
        this.className = 'IISecondEvent';
        this.propertyNames = ['SecondId'];
    }
    return IISecondEventClicked;
})();
var IISecondEventHandler = (function () {
    function IISecondEventHandler() {
        this.className = 'IISecondEventHandler';
        this.methodNames = ['handleSecond'];
    }
    return IISecondEventHandler;
})();
//# sourceMappingURL=Test_TypeScriptTinyIoC_ClassDefinitions.js.map