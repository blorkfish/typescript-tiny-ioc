/// <reference path="../TypeScriptTinyIoC/TypeScriptTinyIoC.ts" />

interface ITodoEventClicked {
    TodoId: string;
}

class IITodoEventClicked implements IInterfaceChecker {
    className: string = 'IITodoEventClicked';
    propertyNames: string[] = ['TodoId'];
}

interface ITodoEventHandler {
    handleEvent(event: ITodoEventClicked);
}

class IITodoEventHandler implements IInterfaceChecker {
    className: string = 'IITodoEventHandler';
    methodNames: string[] = ['handleEvent'];
}

interface ISecondEventClicked {
    SecondId: string;
}

class IISecondEventClicked implements IInterfaceChecker {
    className: string = 'IISecondEvent';
    propertyNames: string[] = ['SecondId'];
}

interface ISecondEventHandler {
    handleSecond(event: ISecondEventClicked);
}

class IISecondEventHandler implements IInterfaceChecker {
    className: string = 'IISecondEventHandler';
    methodNames: string[] = ['handleSecond'];
}

