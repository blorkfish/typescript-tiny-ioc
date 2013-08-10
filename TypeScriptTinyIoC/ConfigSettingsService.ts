/// <reference path="../TypeScriptTinyIoC/TypeScriptTinyIoC.ts" />

class IIConfigSettingsService implements IInterfaceChecker {
    className: string = 'IIConfigSettingsService';
    methodNames: string[] = ['storeSetting', 'readSetting'];
    propertyNames: string[] = [];
}

interface IConfigSettingsService {
    storeSetting(settingName: string, settingValue: any);
    readSetting(settingName: string): any;
}


class ConfigSettingsService implements IConfigSettingsService {
    arrSettings: any[] = [];
    storeSetting(settingName: string, settingValue: any) {
        this.arrSettings[settingName] = settingValue;
    }
    readSetting(settingName: string): any {
        if (!this.arrSettings[settingName]) {
            throw new Error("ConfigSettingsService readSetting with name " + settingName + " was not found");
        }
        return this.arrSettings[settingName];
    }
}
