/// <reference path="Test_TypeScriptTinyIoC_ClassDefinitions.ts" />
define(["require", "exports"], function (require, exports) {
    var Test_TypeScriptTinyIoC_AMD_TodoEventHandler = (function () {
        function Test_TypeScriptTinyIoC_AMD_TodoEventHandler() {
        }
        Test_TypeScriptTinyIoC_AMD_TodoEventHandler.prototype.handleEvent = function (event) {
            this.wasClicked = true;
            this.value = event.TodoId;
        };
        return Test_TypeScriptTinyIoC_AMD_TodoEventHandler;
    })();
    exports.Test_TypeScriptTinyIoC_AMD_TodoEventHandler = Test_TypeScriptTinyIoC_AMD_TodoEventHandler;
    var Test_TypeScriptTinyIoC_AMD_NoEventHandler = (function () {
        function Test_TypeScriptTinyIoC_AMD_NoEventHandler() {
        }
        return Test_TypeScriptTinyIoC_AMD_NoEventHandler;
    })();
    exports.Test_TypeScriptTinyIoC_AMD_NoEventHandler = Test_TypeScriptTinyIoC_AMD_NoEventHandler;
});
