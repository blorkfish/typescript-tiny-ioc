var InterfaceChecker = (function () {
    function InterfaceChecker() {
    }
    InterfaceChecker.prototype.implementsInterface = function (classToCheck, t) {
        var targetInterface = new t();
        var i, len;
        if (targetInterface.methodNames) {
            for (i = 0, len = targetInterface.methodNames.length; i < len; i++) {
                var method = targetInterface.methodNames[i];
                if (!classToCheck[method] || typeof classToCheck[method] !== 'function') {
                    console.log("Function :" + method + " not found");
                    return false;
                }
            }
        }
        if (targetInterface.propertyNames) {
            for (i = 0, len = targetInterface.propertyNames.length; i < len; i++) {
                var property = targetInterface.propertyNames[i];
                if (!classToCheck[property] || typeof classToCheck[property] == 'function') {
                    console.log("Property :" + property + " not found");
                    return false;
                }
            }
        }
        return true;
    };
    return InterfaceChecker;
})();
var EventHandlerList = (function () {
    function EventHandlerList(handleEventMethodName) {
        this.eventHandlers = new Array();
        this.handleEventMethod = handleEventMethodName;
    }
    EventHandlerList.prototype.registerHandler = function (handler, interfaceType) {
        var interfaceChecker = new InterfaceChecker();
        if (interfaceChecker.implementsInterface(handler, interfaceType)) {
            this.eventHandlers.push(handler);
        }
        else {
            var interfaceExpected = new interfaceType();
            throw new Error("EventHandlerList cannot register handler of " + interfaceExpected.className);
        }
    };
    EventHandlerList.prototype.raiseEvent = function (event) {
        var i, len = 0;
        for (i = 0, len = this.eventHandlers.length; i < len; i++) {
            var handler = this.eventHandlers[i];
            handler[this.handleEventMethod](event);
        }
    };
    EventHandlerList.prototype.unregisterHandler = function (handler) {
        var index = this.eventHandlers.indexOf(handler, 0);
        if (index != undefined) {
            this.eventHandlers.splice(index, 1);
        }
    };
    return EventHandlerList;
})();
var TypeScriptTinyIoC = (function () {
    function TypeScriptTinyIoC() {
    }
    TypeScriptTinyIoC.register = function (targetObject, targetInterface) {
        var interfaceChecker = new InterfaceChecker();
        var targetClassName = new targetInterface();
        if (interfaceChecker.implementsInterface(targetObject, targetInterface)) {
            this.registeredClasses[targetClassName.className] = targetObject;
        }
        else {
            throw new Error("TypeScriptTinyIoC cannot register instance of " + targetClassName.className);
        }
    };
    TypeScriptTinyIoC.resolve = function (targetInterface) {
        var targetClassName = new targetInterface();
        if (this.registeredClasses[targetClassName.className]) {
            return this.registeredClasses[targetClassName.className];
        }
        else {
            throw new Error("TypeScriptTinyIoC cannot find instance of " + targetClassName.className);
        }
    };
    TypeScriptTinyIoC.unregister = function (targetInterface) {
        var targetClassName = new targetInterface();
        if (this.registeredClasses[targetClassName.className]) {
            delete this.registeredClasses[targetClassName.className];
        }
    };
    TypeScriptTinyIoC.registerHandler = function (handler, handlerInterface, eventInterface) {
        var eventInterfaceInstance = new eventInterface();
        var handlerInterfaceInstance = new handlerInterface();
        var handlerList = this.events[eventInterfaceInstance.className];
        if (handlerList) {
            handlerList.registerHandler(handler, handlerInterface);
        }
        else {
            handlerList = new EventHandlerList(handlerInterfaceInstance.methodNames[0]);
            handlerList.registerHandler(handler, handlerInterface);
            this.events[eventInterfaceInstance.className] = handlerList;
        }
    };
    TypeScriptTinyIoC.raiseEvent = function (event, eventInterface) {
        var eventChecker = new InterfaceChecker();
        var eventInterfaceInstance = new eventInterface();
        if (eventChecker.implementsInterface(event, eventInterface)) {
            var handlerList = this.events[eventInterfaceInstance.className];
            if (handlerList) {
                handlerList.raiseEvent(event);
            }
        }
        else {
            throw new Error("TypeScriptTinyIoC cannot raiseEvent " + eventInterfaceInstance.className);
        }
    };
    TypeScriptTinyIoC.unregisterHandler = function (handler, eventInterface) {
        var eventInterfaceInstance = new eventInterface;
        var handlerList = this.events[eventInterfaceInstance.className];
        if (handlerList) {
            handlerList.unregisterHandler(handler);
            if (handlerList.eventHandlers.length <= 0) {
                delete this.events[eventInterfaceInstance.className];
            }
        }
    };
    TypeScriptTinyIoC.registeredClasses = new Array();
    TypeScriptTinyIoC.events = new Array();
    return TypeScriptTinyIoC;
})();
//# sourceMappingURL=TypeScriptTinyIoC.js.map