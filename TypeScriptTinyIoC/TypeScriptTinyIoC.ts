
interface IInterfaceChecker {
    className: string;
    methodNames?: string[];
    propertyNames?: string[];
}

class InterfaceChecker {
    name: string;
    methods: string[];
    properties: string[];

    constructor (object: IInterfaceChecker) {
        this.name = object.className;
        this.methods = [];
        this.properties = [];
        var i, len: number;
        if (object.methodNames) {
            for (i = 0, len = object.methodNames.length; i < len ; i++) {
                this.methods.push(object.methodNames[i]);
            };
        };
        if (object.propertyNames) {
            for (i = 0, len = object.propertyNames.length; i < len ; i++) {
                this.properties.push(object.propertyNames[i]);
            };
        };
    }

    static ensureImplements(object: any, targetInterface: InterfaceChecker) {
        var i, len: number;
        for (i = 0, len = targetInterface.methods.length; i < len; i++) {
            var method: string = targetInterface.methods[i];
            if (!object[method] || typeof object[method] !== 'function') {
                throw new Error("Function InterfaceChecker.ensureImplements: object does not implement the " + targetInterface.name +
                    " interface. Method " + method + " was not found");
            }
        };
        for (i = 0, len = targetInterface.properties.length; i < len; i++) {
            var property: string = targetInterface.properties[i];
            if (!object[property] || typeof object[property] == 'function') {
                throw new Error("Function InterfaceChecker.ensureImplements: object does not implement the " + targetInterface.name +
                    " interface. Property " + property + " was not found");
            }
        };

    };

    static implementsInterface(object: any, targetInterface: InterfaceChecker) {
        var i, len: number;
        for (i = 0, len = targetInterface.methods.length; i < len; i++) {
            var method: string = targetInterface.methods[i];
            if (!object[method] || typeof object[method] !== 'function') {
                return false;
                //throw new Error("Function InterfaceChecker.ensureImplements: object does not implement the " + targetInterface.name +
                //    " interface. Method " + method + " was not found");

            }
        }
        return true;
    };

}


class EventHandlerList {
    constructor (handleEventMethod: string) {
        this.handleEventMethod = handleEventMethod;
    }
    eventHandlers: any[] = [];
    handleEventMethod: string;
    registerHandler(handler: any, interfaceType: IInterfaceChecker) {
        var interfaceToImplement = new InterfaceChecker(interfaceType);
        InterfaceChecker.ensureImplements(handler, interfaceToImplement); // will throw if not implemented
        this.eventHandlers.push(handler);
    }
    raiseEvent(event: any) {
        var i, len = 0;
        for (i = 0, len = this.eventHandlers.length; i < len; i++) {
            var handler = this.eventHandlers[i];
            //try {
                handler[this.handleEventMethod](event);
            //} catch (ex) {
            //    // an error occurred raising an event.
            //    // NOTE : console.log does NOT work here.
            //}
        }

    }

    unregisterHandler(handler: any) {
        var index = this.eventHandlers.indexOf(handler, 0);
        if (index != undefined) {
            this.eventHandlers.splice(index, 1);
        }
    }
}

class TypeScriptTinyIOC {

    static registeredClasses: any[] = [];
    static eventHandlers: any[] = [];

    static register(targetObject: any, interfaceType: IInterfaceChecker) {
        var interfaceToImplement = new InterfaceChecker(interfaceType);

        InterfaceChecker.ensureImplements(targetObject, interfaceToImplement); // will throw if not implemented
        if (InterfaceChecker.implementsInterface(targetObject, interfaceToImplement)) {
            this.registeredClasses[interfaceType.className] = targetObject;
        }
    }

    static unregister(targetObject: any, interfaceType: IInterfaceChecker) {
        var resolvedInterface = this.registeredClasses[interfaceType.className];
        if (resolvedInterface) {
            delete this.registeredClasses[interfaceType.className];
        }
    }


    static registerHandler(handler: any, handlerInterface: IInterfaceChecker, eventInterface: IInterfaceChecker) {

        var handlerList = this.eventHandlers[eventInterface.className];
        if (handlerList) {
            handlerList.registerHandler(handler, handlerInterface);
        } else {
            handlerList = new EventHandlerList(handlerInterface.methodNames[0]);
            handlerList.registerHandler(handler, handlerInterface);
            this.eventHandlers[eventInterface.className] = handlerList;
        }

    }

    static unregisterHandler(handler: any, eventInterface: IInterfaceChecker) {

        var handlerList = this.eventHandlers[eventInterface.className];
        if (handlerList) {
            handlerList.unregisterHandler(handler);
            if (handlerList.eventHandlers.length <= 0) {
                delete this.eventHandlers[eventInterface.className];
            }
        } 
    }

    static raiseEvent(event: any, eventInterface: IInterfaceChecker) {
        var eventChecker = new InterfaceChecker(eventInterface);
        InterfaceChecker.ensureImplements(event, eventChecker);
        var handlerList = this.eventHandlers[eventInterface.className];
        if (handlerList) {
            handlerList.raiseEvent(event);
        }
    }


    static resolve(interfaceType: IInterfaceChecker): any {
        var resolvedInterface = this.registeredClasses[interfaceType.className];
        return resolvedInterface;
    }

    static clearAll() {
        //this.registeredClasses = [];
        this.eventHandlers = [];
        
    }

};




