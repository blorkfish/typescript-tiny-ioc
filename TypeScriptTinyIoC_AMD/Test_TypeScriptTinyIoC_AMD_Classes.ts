/// <reference path="Test_TypeScriptTinyIoC_ClassDefinitions.ts" />

export class Test_TypeScriptTinyIoC_AMD_TodoEventHandler implements ITodoEventHandler {
    public wasClicked: boolean;
    public value: string;
    handleEvent(event: ITodoEventClicked) {
        this.wasClicked = true;
        this.value = event.TodoId;
    }
}

export class Test_TypeScriptTinyIoC_AMD_NoEventHandler {
}
