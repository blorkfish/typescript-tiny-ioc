/// <reference path="../modules/Jasmine.d.ts" />
/// <reference path="../modules/Jasmine-jquery.d.ts" />
/// <reference path="../modules/require.d.ts" />
/// <reference path="../modules/Backbone.d.ts" />
/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../modules/Handlebars.d.ts" />
/// <reference path="../TypeScriptTinyIoC/TypeScriptTinyIoC.ts" />
/// <reference path="Test_TypeScriptTinyIoC_ClassDefinitions.ts" />
define(["require", "exports", './Test_TypeScriptTinyIoC_AMD_Classes'], function (require, exports, amdClasses) {
    var TodoEventClicked = (function () {
        function TodoEventClicked(todoId) {
            this.TodoId = todoId;
        }
        return TodoEventClicked;
    })();
    var TodoEventHandler = (function () {
        function TodoEventHandler() {
        }
        TodoEventHandler.prototype.handleEvent = function (event) {
            this.wasClicked = true;
            this.value = event.TodoId;
        };
        return TodoEventHandler;
    })();
    var TodoEventHandler_Throws = (function () {
        function TodoEventHandler_Throws() {
        }
        return TodoEventHandler_Throws;
    })();
    var SecondEventClicked = (function () {
        function SecondEventClicked(secondId) {
            this.SecondId = secondId;
        }
        return SecondEventClicked;
    })();
    var MultipleEventHandler = (function () {
        function MultipleEventHandler() {
        }
        MultipleEventHandler.prototype.handleEvent = function (event) {
            this.wasClicked_ITodo = true;
            this.value_ITodo = event.TodoId;
        };
        MultipleEventHandler.prototype.handleSecond = function (event) {
            this.wasClicked_ISecond = true;
            this.value_ISecond = event.SecondId;
        };
        return MultipleEventHandler;
    })();
    describe("TypeScriptTinyIoC_AMD : Test_TypeScriptTinyIoC_Events.ts", function () {
        //var typeScriptTinyIoC = new TypeScriptTinyIOC();
        beforeEach(function () {
            //this.typeScriptTinyIoC = new TypeScriptTinyIOC();
        });
        it("test register and raise works correctly ", function () {
            var event = new TodoEventClicked("test");
            var eventHandler = new TodoEventHandler();
            TypeScriptTinyIoC.register(eventHandler, IITodoEventHandler);
            TypeScriptTinyIoC.registerHandler(eventHandler, IITodoEventHandler, IITodoEventClicked);
            TypeScriptTinyIoC.raiseEvent(event, IITodoEventClicked);
            expect(eventHandler.wasClicked).toBeTruthy();
            expect(eventHandler.value).toEqual("test");
        });
        it("test raise event with multiple handlers fires on all handlers ", function () {
            var event = new TodoEventClicked("test");
            var eventHandler_1 = new TodoEventHandler();
            var eventHandler_2 = new TodoEventHandler();
            TypeScriptTinyIoC.registerHandler(eventHandler_1, IITodoEventHandler, IITodoEventClicked);
            TypeScriptTinyIoC.registerHandler(eventHandler_2, IITodoEventHandler, IITodoEventClicked);
            TypeScriptTinyIoC.raiseEvent(event, IITodoEventClicked);
            expect(eventHandler_1.wasClicked).toBeTruthy();
            expect(eventHandler_1.value).toEqual("test");
            expect(eventHandler_2.wasClicked).toBeTruthy();
            expect(eventHandler_2.value).toEqual("test");
        });
        it("test raise event of wrong type throws ", function () {
            var event = new TodoEventClicked("test");
            var incorrectEvent = 'undefined';
            var eventHandler = new TodoEventHandler();
            TypeScriptTinyIoC.registerHandler(eventHandler, IITodoEventHandler, IITodoEventClicked);
            expect(function () {
                TypeScriptTinyIoC.raiseEvent(incorrectEvent, IITodoEventClicked);
            }).toThrow(new Error("Function InterfaceChecker.ensureImplements: object does not implement the IITodoEventClicked interface. Property TodoId was not found"));
        });
        it("test registerHandler with class that does not implement interface throws ", function () {
            var event = new TodoEventClicked("test");
            var incorrectEvent = 'undefined';
            var eventHandler = new TodoEventHandler_Throws();
            expect(function () {
                TypeScriptTinyIoC.registerHandler(eventHandler, IITodoEventHandler, IITodoEventClicked);
            }).toThrow(new Error("Function InterfaceChecker.ensureImplements: object does not implement the IITodoEventHandler interface. Method handleEvent was not found"));
        });
        it("test registerHandler with AMD class gets event correctly ", function () {
            var event = new TodoEventClicked("test");
            var incorrectEvent = 'undefined';
            var eventHandler = new amdClasses.Test_TypeScriptTinyIoC_AMD_TodoEventHandler();
            TypeScriptTinyIoC.registerHandler(eventHandler, IITodoEventHandler, IITodoEventClicked);
            TypeScriptTinyIoC.raiseEvent(event, IITodoEventClicked);
            expect(eventHandler.wasClicked).toBeTruthy();
            expect(eventHandler.value).toEqual("test");
        });
        it("test registerHandler with AMD class that does not implement interface throws ", function () {
            var event = new TodoEventClicked("test");
            var incorrectEvent = 'undefined';
            var eventHandler = new amdClasses.Test_TypeScriptTinyIoC_AMD_NoEventHandler();
            expect(function () {
                TypeScriptTinyIoC.registerHandler(eventHandler, IITodoEventHandler, IITodoEventClicked);
            }).toThrow(new Error("Function InterfaceChecker.ensureImplements: object does not implement the IITodoEventHandler interface. Method handleEvent was not found"));
        });
        it("test one class with two registerHandler events gets called correctly ", function () {
            var event = new TodoEventClicked("test");
            var incorrectEvent = 'undefined';
            var multipleHandler = new MultipleEventHandler();
            TypeScriptTinyIoC.registerHandler(multipleHandler, IITodoEventHandler, IITodoEventClicked);
            TypeScriptTinyIoC.registerHandler(multipleHandler, IISecondEventHandler, IISecondEventClicked);
            TypeScriptTinyIoC.raiseEvent(event, IITodoEventClicked);
            expect(multipleHandler.wasClicked_ITodo).toBeTruthy();
            expect(multipleHandler.value_ITodo).toEqual("test");
            TypeScriptTinyIoC.raiseEvent(new SecondEventClicked("secondId"), IISecondEventClicked);
            expect(multipleHandler.wasClicked_ISecond).toBeTruthy();
            expect(multipleHandler.value_ISecond).toEqual("secondId");
        });
        it("test unregisterHandler method does unregister the registered handlers ", function () {
            TypeScriptTinyIoC.events = [];
            var event = new TodoEventClicked("test");
            var eventHandler_1 = new TodoEventHandler();
            TypeScriptTinyIoC.registerHandler(eventHandler_1, IITodoEventHandler, IITodoEventClicked);
            TypeScriptTinyIoC.raiseEvent(event, IITodoEventClicked);
            expect(eventHandler_1.wasClicked).toBeTruthy();
            expect(eventHandler_1.value).toEqual("test");
            TypeScriptTinyIoC.unregisterHandler(eventHandler_1, IITodoEventClicked);
            eventHandler_1.wasClicked = false;
            eventHandler_1.value = undefined;
            TypeScriptTinyIoC.raiseEvent(event, IITodoEventClicked);
            expect(eventHandler_1.wasClicked).not.toBeTruthy();
            expect(eventHandler_1.value).not.toBeDefined();
            expect(Object.keys(TypeScriptTinyIoC.events).length).toBe(0);
        });
        it("test unregisterHandler method should not remove eventHandler if it has multiple handlers attached and one of them is unregisterd", function () {
            TypeScriptTinyIoC.events = [];
            var event = new TodoEventClicked("test");
            var eventHandler_1 = new TodoEventHandler();
            var eventHandler_2 = new TodoEventHandler();
            TypeScriptTinyIoC.registerHandler(eventHandler_1, IITodoEventHandler, IITodoEventClicked);
            TypeScriptTinyIoC.registerHandler(eventHandler_2, IITodoEventHandler, IITodoEventClicked);
            TypeScriptTinyIoC.raiseEvent(event, IITodoEventClicked);
            expect(eventHandler_1.wasClicked).toBeTruthy();
            expect(eventHandler_1.value).toEqual("test");
            expect(eventHandler_2.wasClicked).toBeTruthy();
            expect(eventHandler_2.value).toEqual("test");
            TypeScriptTinyIoC.unregisterHandler(eventHandler_1, IITodoEventClicked);
            eventHandler_1.wasClicked = false;
            eventHandler_1.value = undefined;
            eventHandler_2.wasClicked = false;
            eventHandler_2.value = undefined;
            TypeScriptTinyIoC.raiseEvent(event, IITodoEventClicked);
            expect(eventHandler_1.wasClicked).not.toBeTruthy();
            expect(eventHandler_1.value).not.toBeDefined();
            expect(eventHandler_2.wasClicked).toBeTruthy();
            expect(eventHandler_2.value).toEqual("test");
            expect(Object.keys(TypeScriptTinyIoC.events).length).not.toBe(0);
        });
    });
});
//# sourceMappingURL=Test_TypeScriptTinyIoC_Events.js.map