/// <reference path="../modules/Jasmine.d.ts" />
/// <reference path="../modules/Jasmine-jquery.d.ts" />
/// <reference path="../modules/require.d.ts" />
/// <reference path="../modules/Backbone.d.ts" />
/// <reference path="../modules/jquery.d.ts" />
/// <reference path="../modules/Handlebars.d.ts" />
/// <reference path="../TypeScriptTinyIoC/TypeScriptTinyIoC.ts" />
/// <reference path="Test_TypeScriptTinyIoC_ClassDefinitions.ts" />


import amdClasses = module('./Test_TypeScriptTinyIoC_AMD_Classes');

class TodoEventClicked implements ITodoEventClicked {
    constructor (todoId: string) {
        this.TodoId = todoId;
    }
    public TodoId: string;
}

class TodoEventHandler implements ITodoEventHandler {
    public wasClicked: bool;
    public value: string;
    handleEvent(event: ITodoEventClicked) {
        this.wasClicked = true;
        this.value = event.TodoId;
    }
}

class TodoEventHandler_Throws {
}

class SecondEventClicked implements ISecondEventClicked {
    SecondId: string;
    constructor (secondId: string) {
        this.SecondId = secondId;
    }
}

class MultipleEventHandler implements ITodoEventHandler, ISecondEventHandler {
    public wasClicked_ITodo: bool;
    public value_ITodo: string;
    public wasClicked_ISecond: bool;
    public value_ISecond: string;

    handleEvent(event: ITodoEventClicked) {
        this.wasClicked_ITodo = true;
        this.value_ITodo = event.TodoId;
    };

    handleSecond(event: ISecondEventClicked) {
            this.wasClicked_ISecond = true;
            this.value_ISecond = event.SecondId;
    };
}





describe("TypeScriptTinyIoC_AMD : Test_TypeScriptTinyIoC_Events.ts", () => {
        beforeEach(() => {
            this.typeScriptTinyIoC = new TypeScriptTinyIOC();
        });
        it("test register and raise works correctly ", () => {

            var event = new TodoEventClicked("test");

            var eventHandler = new TodoEventHandler();
            TypeScriptTinyIOC.register(eventHandler, new IITodoEventHandler());

            TypeScriptTinyIOC.registerHandler(eventHandler, new IITodoEventHandler(), new IITodoEventClicked());

            TypeScriptTinyIOC.raiseEvent(event, new IITodoEventClicked());

            expect(eventHandler.wasClicked).toBeTruthy();
            expect(eventHandler.value).toEqual("test");

        });

        it("test raise event with multiple handlers fires on all handlers ", () => {

            var event = new TodoEventClicked("test");

            var eventHandler_1 = new TodoEventHandler();
            var eventHandler_2 = new TodoEventHandler();

            TypeScriptTinyIOC.registerHandler(eventHandler_1, new IITodoEventHandler(), new IITodoEventClicked());
            TypeScriptTinyIOC.registerHandler(eventHandler_2, new IITodoEventHandler(), new IITodoEventClicked());

            TypeScriptTinyIOC.raiseEvent(event, new IITodoEventClicked());

            expect(eventHandler_1.wasClicked).toBeTruthy();
            expect(eventHandler_1.value).toEqual("test");

            expect(eventHandler_2.wasClicked).toBeTruthy();
            expect(eventHandler_2.value).toEqual("test");

        });

        it("test raise event of wrong type throws ", () => {

            var event = new TodoEventClicked("test");
            var incorrectEvent = 'undefined';

            var eventHandler = new TodoEventHandler();

            TypeScriptTinyIOC.registerHandler(eventHandler, new IITodoEventHandler(), new IITodoEventClicked());

            expect(() => {
                TypeScriptTinyIOC.raiseEvent(incorrectEvent, new IITodoEventClicked());
            }).toThrow(new Error("Function InterfaceChecker.ensureImplements: object does not implement the IITodoEventClicked interface. Property TodoId was not found"));

        });

        it("test registerHandler with class that does not implement interface throws ", () => {

            var event = new TodoEventClicked("test");
            var incorrectEvent = 'undefined';

            var eventHandler = new TodoEventHandler_Throws();

            expect(() => {
                TypeScriptTinyIOC.registerHandler(eventHandler, new IITodoEventHandler(), new IITodoEventClicked());
            }).toThrow(new Error("Function InterfaceChecker.ensureImplements: object does not implement the IITodoEventHandler interface. Method handleEvent was not found"));

        });

        it("test registerHandler with AMD class gets event correctly ", () => {

            var event = new TodoEventClicked("test");
            var incorrectEvent = 'undefined';

            var eventHandler = new amdClasses.Test_TypeScriptTinyIoC_AMD_TodoEventHandler();

            TypeScriptTinyIOC.registerHandler(eventHandler, new IITodoEventHandler(), new IITodoEventClicked());

            TypeScriptTinyIOC.raiseEvent(event, new IITodoEventClicked());

            expect(eventHandler.wasClicked).toBeTruthy();
            expect(eventHandler.value).toEqual("test");

        });

        it("test registerHandler with AMD class that does not implement interface throws ", () => {

            var event = new TodoEventClicked("test");
            var incorrectEvent = 'undefined';

            var eventHandler = new amdClasses.Test_TypeScriptTinyIoC_AMD_NoEventHandler();

            expect(() => {
                TypeScriptTinyIOC.registerHandler(eventHandler, new IITodoEventHandler(), new IITodoEventClicked());
            }).toThrow(new Error("Function InterfaceChecker.ensureImplements: object does not implement the IITodoEventHandler interface. Method handleEvent was not found"));

        });

        it("test one class with two registerHandler events gets called correctly ", () => {

            var event = new TodoEventClicked("test");
            var incorrectEvent = 'undefined';

            var multipleHandler = new MultipleEventHandler();
            TypeScriptTinyIOC.registerHandler(multipleHandler, new IITodoEventHandler(), new IITodoEventClicked());
            TypeScriptTinyIOC.registerHandler(multipleHandler, new IISecondEventHandler(), new IISecondEventClicked());

            TypeScriptTinyIOC.raiseEvent(event, new IITodoEventClicked());

            expect(multipleHandler.wasClicked_ITodo).toBeTruthy();
            expect(multipleHandler.value_ITodo).toEqual("test");

            TypeScriptTinyIOC.raiseEvent(new SecondEventClicked("secondId"), new IISecondEventClicked());

            expect(multipleHandler.wasClicked_ISecond).toBeTruthy();
            expect(multipleHandler.value_ISecond).toEqual("secondId");

        });

        it("test unregisterHandler method does unregister the registered handlers ", () => {
            
            TypeScriptTinyIOC.eventHandlers = [];

            var event = new TodoEventClicked("test");

            var eventHandler_1 = new TodoEventHandler();

            TypeScriptTinyIOC.registerHandler(eventHandler_1, new IITodoEventHandler(), new IITodoEventClicked());

            TypeScriptTinyIOC.raiseEvent(event, new IITodoEventClicked());

            expect(eventHandler_1.wasClicked).toBeTruthy();
            expect(eventHandler_1.value).toEqual("test");

            TypeScriptTinyIOC.unregisterHandler(eventHandler_1, new IITodoEventClicked());
            eventHandler_1.wasClicked = false;
            eventHandler_1.value = undefined;

            TypeScriptTinyIOC.raiseEvent(event, new IITodoEventClicked());

            expect(eventHandler_1.wasClicked).not.toBeTruthy();
            expect(eventHandler_1.value).not.toBeDefined();
            
            expect(Object.keys(TypeScriptTinyIOC.eventHandlers).length).toBe(0);
        });

        it("test unregisterHandler method should not remove eventHandler if it has multiple handlers attached and one of them is unregisterd", () => {

            TypeScriptTinyIOC.eventHandlers = [];

            var event = new TodoEventClicked("test");

            var eventHandler_1 = new TodoEventHandler();
            var eventHandler_2 = new TodoEventHandler();

            TypeScriptTinyIOC.registerHandler(eventHandler_1, new IITodoEventHandler(), new IITodoEventClicked());
            TypeScriptTinyIOC.registerHandler(eventHandler_2, new IITodoEventHandler(), new IITodoEventClicked());

            TypeScriptTinyIOC.raiseEvent(event, new IITodoEventClicked());

            expect(eventHandler_1.wasClicked).toBeTruthy();
            expect(eventHandler_1.value).toEqual("test");

            expect(eventHandler_2.wasClicked).toBeTruthy();
            expect(eventHandler_2.value).toEqual("test");

            TypeScriptTinyIOC.unregisterHandler(eventHandler_1, new IITodoEventClicked());
            eventHandler_1.wasClicked = false;
            eventHandler_1.value = undefined;
            eventHandler_2.wasClicked = false;
            eventHandler_2.value = undefined;

            TypeScriptTinyIOC.raiseEvent(event, new IITodoEventClicked());

            expect(eventHandler_1.wasClicked).not.toBeTruthy();
            expect(eventHandler_1.value).not.toBeDefined();

            expect(eventHandler_2.wasClicked).toBeTruthy();
            expect(eventHandler_2.value).toEqual("test");


            expect(Object.keys(TypeScriptTinyIOC.eventHandlers).length).not.toBe(0);
        });

    });




