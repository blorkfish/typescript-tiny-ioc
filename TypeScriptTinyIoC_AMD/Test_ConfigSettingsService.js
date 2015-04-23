/// <reference path="../modules/Jasmine.d.ts" />
/// <reference path="../modules/Jasmine-jquery.d.ts" />
/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../TypeScriptTinyIoC/TypeScriptTinyIoC.ts" />
/// <reference path="../TypeScriptTinyIoC/ConfigSettingsService.ts" />
describe("TypeScriptTinyIoC_AMD : Test_ConfigSettingsService", function () {
    var configSettingsService;
    beforeEach(function () {
        configSettingsService = new ConfigSettingsService();
        configSettingsService.storeSetting("test_setting", "test_value");
        TypeScriptTinyIoC.register(configSettingsService, IIConfigSettingsService);
    });
    it("should be able to read a config setting", function () {
        expect(configSettingsService.readSetting("test_setting")).toEqual("test_value");
    });
    it("should be able to read a config setting from TypeScriptTinyIoC", function () {
        var configFromIoc = TypeScriptTinyIoC.resolve(IIConfigSettingsService);
        expect(configFromIoc).not.toBeNull();
        expect(configFromIoc.readSetting("test_setting")).toEqual("test_value");
    });
    it("should be able to read a second config setting from TypeScriptTinyIoC", function () {
        var configFromIoc = TypeScriptTinyIoC.resolve(IIConfigSettingsService);
        configFromIoc.storeSetting("second_setting", "second_setting_value");
        var secondCallToIoc = TypeScriptTinyIoC.resolve(IIConfigSettingsService);
        expect(secondCallToIoc.readSetting("second_setting")).toEqual("second_setting_value");
    });
});
//# sourceMappingURL=Test_ConfigSettingsService.js.map