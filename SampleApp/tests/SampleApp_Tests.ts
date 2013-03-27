/// <reference path="../../modules/Jasmine.d.ts" />
/// <reference path="../../modules/Jasmine-jquery.d.ts" />
/// <reference path="../../modules/Backbone.d.ts" />
/// <reference path="../../modules/jquery.d.ts" />
/// <reference path="../../TypeScriptTinyIoC/TypeScriptTinyIoC.ts" />
/// <reference path="../../SampleApp/models/ListItem.ts" />
/// <reference path="../../SampleApp/models/ListItemCollection.ts" />
/// <reference path="../../SampleApp/events/ListItemEvents.ts" />
/// <reference path="../../SampleApp/services/IListItemService.ts" />
/// <reference path="../../SampleApp/services/MockListItemService.ts" />
/// <reference path="../../SampleApp/SampleApp.ts" />

describe('SampleApp_Tests', () => {
    it('should handle handle_ListItemCollection_LoadedEvent', () => {
        var sampleApp: SampleApp = new SampleApp();

        var handleLoadedEventSpy = spyOn(sampleApp, 'handle_ListItemCollection_LoadedEvent');

        sampleApp.run();

        expect(handleLoadedEventSpy).toHaveBeenCalled();

    });
});