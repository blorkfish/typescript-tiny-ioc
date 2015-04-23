/// <reference path="../../../modules/Jasmine.d.ts" />
/// <reference path="../../../modules/Jasmine-jquery.d.ts" />
/// <reference path="../../../modules/Backbone.d.ts" />
/// <reference path="../../../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../../TypeScriptTinyIoC/TypeScriptTinyIoC.ts" />
/// <reference path="../../../SampleApp/models/ListItem.ts" />
/// <reference path="../../../SampleApp/models/ListItemCollection.ts" />
/// <reference path="../../../SampleApp/events/ListItemEvents.ts" />
/// <reference path="../../../SampleApp/services/IListItemService.ts" />
/// <reference path="../../../SampleApp/services/MockListItemService.ts" />

class MockListItemEventHandler implements IListItemCollection_LoadedEvent_Handler
{
    ListItemCollection: ListItemCollection;
    handle_ListItemCollection_LoadedEvent(event: ListItemCollection_LoadedEvent) {
        this.ListItemCollection = event.ListItemCollection;
    }
}

describe("SampleApp : tests : services : ListItemService_Tests ", () => {

    var mockListLitemHandler: MockListItemEventHandler;

    beforeEach(() => {
        mockListLitemHandler = new MockListItemEventHandler();
        TypeScriptTinyIoC.registerHandler(
            mockListLitemHandler,
            IIListItemCollection_LoadedEvent_Handler,
            IIListItemCollection_LoadedEvent);

    });

    afterEach(() => {
        TypeScriptTinyIoC.unregisterHandler(mockListLitemHandler, IIListItemCollection_LoadedEvent);
    });
    

    it("MockListItemService should raise ListItemCollection_LoadedEvent", () => {
        var mockService: MockListItemService = new MockListItemService();

        var eventHandler_Spy = spyOn(mockListLitemHandler, "handle_ListItemCollection_LoadedEvent");
        eventHandler_Spy.andCallThrough();

        mockService.loadListItems();

        expect(eventHandler_Spy).toHaveBeenCalled();
    });
});
