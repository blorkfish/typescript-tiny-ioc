interface IInterfaceChecker {
    methodNames?: string[];
    propertyNames?: string[];
    className: string;
}

class InterfaceChecker<T extends IInterfaceChecker> {
    implementsInterface(classToCheck: any, t: { new (): T; })
        : boolean {
        var targetInterface = new t();
        var i, len: number;
        if (targetInterface.methodNames) {
            for (i = 0, len = targetInterface.methodNames.length; i < len; i++) {
                var method: string = targetInterface.methodNames[i];
                if (!classToCheck[method] ||
                    typeof classToCheck[method] !== 'function') {
                    console.log("Function :" + method + " not found");
                    return false;
                }
            }
        }
        if (targetInterface.propertyNames) {
            for (i = 0, len = targetInterface.propertyNames.length; i < len; i++) {
                var property: string = targetInterface.propertyNames[i];
                if (!classToCheck[property] ||
                    typeof classToCheck[property] == 'function') {
                    console.log("Property :" + property + " not found");
                    return false;
                }
            }
        }
        return true;
    }
}

class EventHandlerList {
    handleEventMethod: string;
    constructor(handleEventMethodName: string) {
        this.handleEventMethod = handleEventMethodName;
    }
    eventHandlers: any[] = new Array();
    registerHandler(handler: any,
        interfaceType: { new (): IInterfaceChecker }) {

        var interfaceChecker = new InterfaceChecker();
        if (interfaceChecker.implementsInterface(handler, interfaceType)) {
            this.eventHandlers.push(handler);
        } else {
            var interfaceExpected = new interfaceType();
            throw new Error("EventHandlerList cannot register handler of "
                + interfaceExpected.className);
        }
    }

    raiseEvent(event: any) {
        var i, len = 0;
        for (i = 0, len = this.eventHandlers.length; i < len; i++) {
            var handler = this.eventHandlers[i];
            handler[this.handleEventMethod](event);
        }
    }
	unregisterHandler(handler: any) {
        var index = this.eventHandlers.indexOf(handler, 0);
        if (index != undefined) {
            this.eventHandlers.splice(index, 1);
        }
    }
}

class TypeScriptTinyIoC {
    static registeredClasses: any[] = new Array();
    static events: EventHandlerList[] = new Array<EventHandlerList>();

    public static register(
        targetObject: any,
        targetInterface: { new (): IInterfaceChecker; }) {
        var interfaceChecker = new InterfaceChecker();
        var targetClassName = new targetInterface();
        if (interfaceChecker.implementsInterface(targetObject, targetInterface)) {
            this.registeredClasses[targetClassName.className] = targetObject;
        } else {
            throw new Error("TypeScriptTinyIoC cannot register instance of "
                + targetClassName.className);
        }
    }

    public static resolve(
        targetInterface: { new (): IInterfaceChecker; }) {
        var targetClassName = new targetInterface();
        if (this.registeredClasses[targetClassName.className]) {
            return this.registeredClasses[targetClassName.className];
        } else {
            throw new Error("TypeScriptTinyIoC cannot find instance of "
                + targetClassName.className);
        }
    }

    public static unregister(targetInterface: { new (): IInterfaceChecker; }) {
        var targetClassName = new targetInterface();
        if (this.registeredClasses[targetClassName.className]) {
            delete this.registeredClasses[targetClassName.className];
        }
    }

    public static registerHandler(
        handler: any,
        handlerInterface: { new (): IInterfaceChecker },
        eventInterface: { new (): IInterfaceChecker }) {

        var eventInterfaceInstance = new eventInterface();
        var handlerInterfaceInstance = new handlerInterface();

        var handlerList = this.events[eventInterfaceInstance.className];
        if (handlerList) {
            handlerList.registerHandler(handler, handlerInterface);
        } else {
            handlerList = new EventHandlerList(handlerInterfaceInstance.methodNames[0]);
            handlerList.registerHandler(handler, handlerInterface);
            this.events[eventInterfaceInstance.className] = handlerList;
        }
    }

    static raiseEvent(event: any,
        eventInterface: { new (): IInterfaceChecker }) {

        var eventChecker = new InterfaceChecker();
		var eventInterfaceInstance = new eventInterface();
        if (eventChecker.implementsInterface(event, eventInterface)) {
            
            var handlerList = this.events[eventInterfaceInstance.className];
            if (handlerList) {
                handlerList.raiseEvent(event);
            }
        } else {
            throw new Error("TypeScriptTinyIoC cannot raiseEvent "
                + eventInterfaceInstance.className);
        }
    }

	static unregisterHandler(handler: any, eventInterface: {new (): IInterfaceChecker}) {

		var eventInterfaceInstance = new eventInterface;
        var handlerList = this.events[eventInterfaceInstance.className];
        if (handlerList) {
            handlerList.unregisterHandler(handler);
            if (handlerList.eventHandlers.length <= 0) {
                delete this.events[eventInterfaceInstance.className];
            }
        }
    }
}

