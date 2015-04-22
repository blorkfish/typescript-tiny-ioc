var InterfaceChecker = (function () {
    function InterfaceChecker(object) {
        this.name = object.className;
        this.methods = [];
        this.properties = [];
        var i, len;
        if (object.methodNames) {
            for (i = 0, len = object.methodNames.length; i < len; i++) {
                this.methods.push(object.methodNames[i]);
            }
            ;
        }
        ;
        if (object.propertyNames) {
            for (i = 0, len = object.propertyNames.length; i < len; i++) {
                this.properties.push(object.propertyNames[i]);
            }
            ;
        }
        ;
    }
    InterfaceChecker.ensureImplements = function (object, targetInterface) {
        var i, len;
        for (i = 0, len = targetInterface.methods.length; i < len; i++) {
            var method = targetInterface.methods[i];
            if (!object[method] || typeof object[method] !== 'function') {
                throw new Error("Function InterfaceChecker.ensureImplements: object does not implement the " + targetInterface.name + " interface. Method " + method + " was not found");
            }
        }
        ;
        for (i = 0, len = targetInterface.properties.length; i < len; i++) {
            var property = targetInterface.properties[i];
            if (!object[property] || typeof object[property] == 'function') {
                throw new Error("Function InterfaceChecker.ensureImplements: object does not implement the " + targetInterface.name + " interface. Property " + property + " was not found");
            }
        }
        ;
    };
    InterfaceChecker.implementsInterface = function (object, targetInterface) {
        var i, len;
        for (i = 0, len = targetInterface.methods.length; i < len; i++) {
            var method = targetInterface.methods[i];
            if (!object[method] || typeof object[method] !== 'function') {
                return false;
            }
        }
        return true;
    };
    return InterfaceChecker;
})();
var EventHandlerList = (function () {
    function EventHandlerList(handleEventMethod) {
        this.eventHandlers = [];
        this.handleEventMethod = handleEventMethod;
    }
    EventHandlerList.prototype.registerHandler = function (handler, interfaceType) {
        var interfaceToImplement = new InterfaceChecker(interfaceType);
        InterfaceChecker.ensureImplements(handler, interfaceToImplement); // will throw if not implemented
        this.eventHandlers.push(handler);
    };
    EventHandlerList.prototype.raiseEvent = function (event) {
        var i, len = 0;
        for (i = 0, len = this.eventHandlers.length; i < len; i++) {
            var handler = this.eventHandlers[i];
            //try {
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
var TypeScriptTinyIOC = (function () {
    function TypeScriptTinyIOC() {
    }
    TypeScriptTinyIOC.register = function (targetObject, interfaceType) {
        var interfaceToImplement = new InterfaceChecker(interfaceType);
        InterfaceChecker.ensureImplements(targetObject, interfaceToImplement); // will throw if not implemented
        if (InterfaceChecker.implementsInterface(targetObject, interfaceToImplement)) {
            this.registeredClasses[interfaceType.className] = targetObject;
        }
    };
    TypeScriptTinyIOC.unregister = function (targetObject, interfaceType) {
        var resolvedInterface = this.registeredClasses[interfaceType.className];
        if (resolvedInterface) {
            delete this.registeredClasses[interfaceType.className];
        }
    };
    TypeScriptTinyIOC.registerHandler = function (handler, handlerInterface, eventInterface) {
        var handlerList = this.eventHandlers[eventInterface.className];
        if (handlerList) {
            handlerList.registerHandler(handler, handlerInterface);
        }
        else {
            handlerList = new EventHandlerList(handlerInterface.methodNames[0]);
            handlerList.registerHandler(handler, handlerInterface);
            this.eventHandlers[eventInterface.className] = handlerList;
        }
    };
    TypeScriptTinyIOC.unregisterHandler = function (handler, eventInterface) {
        var handlerList = this.eventHandlers[eventInterface.className];
        if (handlerList) {
            handlerList.unregisterHandler(handler);
            if (handlerList.eventHandlers.length <= 0) {
                delete this.eventHandlers[eventInterface.className];
            }
        }
    };
    TypeScriptTinyIOC.raiseEvent = function (event, eventInterface) {
        var eventChecker = new InterfaceChecker(eventInterface);
        InterfaceChecker.ensureImplements(event, eventChecker);
        var handlerList = this.eventHandlers[eventInterface.className];
        if (handlerList) {
            handlerList.raiseEvent(event);
        }
    };
    TypeScriptTinyIOC.resolve = function (interfaceType) {
        var resolvedInterface = this.registeredClasses[interfaceType.className];
        return resolvedInterface;
    };
    TypeScriptTinyIOC.clearAll = function () {
        //this.registeredClasses = [];
        this.eventHandlers = [];
    };
    TypeScriptTinyIOC.registeredClasses = [];
    TypeScriptTinyIOC.eventHandlers = [];
    return TypeScriptTinyIOC;
})();
;
