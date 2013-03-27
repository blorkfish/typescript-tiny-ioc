/// <reference path="../TypeScriptTinyIoC/TypeScriptTinyIoC.ts" />
var IIConfigSettingsService = (function () {
    function IIConfigSettingsService() {
        this.className = 'IIConfigSettingsService';
        this.methodNames = [
            'storeSetting', 
            'readSetting'
        ];
    }
    return IIConfigSettingsService;
})();
var ConfigSettingsService = (function () {
    function ConfigSettingsService() {
        this.arrSettings = [];
    }
    ConfigSettingsService.prototype.storeSetting = function (settingName, settingValue) {
        this.arrSettings[settingName] = settingValue;
    };
    ConfigSettingsService.prototype.readSetting = function (settingName) {
        if(!this.arrSettings[settingName]) {
            throw new Error("ConfigSettingsService readSetting with name " + settingName + " was not found");
        }
        return this.arrSettings[settingName];
    };
    return ConfigSettingsService;
})();
