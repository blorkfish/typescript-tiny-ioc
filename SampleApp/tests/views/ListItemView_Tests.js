/// <reference path="../../../modules/Jasmine.d.ts" />
/// <reference path="../../../modules/Jasmine-jquery.d.ts" />
/// <reference path="../../../modules/Backbone.d.ts" />
/// <reference path="../../../modules/jquery.d.ts" />
/// <reference path="../../../TypeScriptTinyIoC/TypeScriptTinyIoC.ts" />
/// <reference path="../../../SampleApp/models/ListItem.ts" />
/// <reference path="../../../SampleApp/models/ListItemCollection.ts" />
/// <reference path="../../../SampleApp/events/ListItemEvents.ts" />
/// <reference path="../../../SampleApp/services/IListItemService.ts" />
/// <reference path="../../../SampleApp/services/MockListItemService.ts" />
/// <reference path="../../../SampleApp/views/ListItemView.ts" />
/// <reference path="../../../TypeScriptTinyIoC/ConfigSettingsService.ts" />
//class MockListItemEventHandler_Views implements IListItemCollection_LoadedEvent_Handler {
//    ListItemCollection: ListItemCollection;
//    handle_ListItemCollection_LoadedEvent(event: ListItemCollection_LoadedEvent) {
//        this.ListItemCollection = event.ListItemCollection;
//    }
//}
var MockListItem_Clicked_Handler = (function () {
    function MockListItem_Clicked_Handler() { }
    MockListItem_Clicked_Handler.prototype.handleListItem_Clicked_Event = function (event) {
        this.lastEvent = event;
    };
    return MockListItem_Clicked_Handler;
})();
describe('ListItemView_Tests', function () {
    //var mockHandler: MockListItemEventHandler_Views;
    beforeEach(function () {
        var htmlSnippet = null;
        $.ajax({
            url: "/SampleApp/views/ListItemView.html",
            async: false,
            success: function (data) {
                htmlSnippet = data;
            }
        });
        var configSettingService = TypeScriptTinyIOC.resolve(new IIConfigSettingsService());
        if(!configSettingService) {
            configSettingService = new ConfigSettingsService();
            TypeScriptTinyIOC.register(configSettingService, new IIConfigSettingsService());
        }
        configSettingService.storeSetting('ListItemView_Snippet', htmlSnippet);
        // setup mock handler
        //mockHandler = new MockListItemEventHandler_Views();
        //TypeScriptTinyIOC.registerHandler(mockHandler, new IIListItemCollection_LoadedEvent_Handler(), new IIListItemCollection_LoadedEvent());
            });
    afterEach(function () {
    });
    it('config service should have stored ListItemView.html as snippet', function () {
        var configSettingService = TypeScriptTinyIOC.resolve(new IIConfigSettingsService());
        expect(configSettingService).toBeDefined();
        expect(configSettingService.readSetting('ListItemView_Snippet')).toEqual("<div id=\"list-item-view-{{Id}}\">Id : {{Id}} Name : {{Name}}</div>");
    });
    it('renders a list item view', function () {
        var listItem = new ListItem({
            Id: 5,
            Name: 'testName'
        });
        var listItemView = new ListItemView({
            model: listItem
        });
        listItemView.render();
        var itemEl = $(listItemView.el).find('list-item-view-5');
        var innerHtml = listItemView.el.innerHTML;
        expect(innerHtml).toEqual("<div id=\"list-item-view-5\">Id : 5 Name : testName</div>");
    });
    it('list item clicked fires ListItem_Clicked event', function () {
        var listItemView = new ListItemView({
            model: new ListItem({
                Id: 5,
                Name: 'testName'
            })
        });
        listItemView.render();
        var mock_Handler = new MockListItem_Clicked_Handler();
        TypeScriptTinyIOC.registerHandler(mock_Handler, new IIListItem_Clicked_Handler(), new IIListItem_Clicked());
        var handlerSpy = spyOn(mock_Handler, 'handleListItem_Clicked_Event');
        var listItem = $(listItemView.el).find('#list-item-view-5');
        listItem.trigger('click');
        expect(handlerSpy).toHaveBeenCalled();
    });
});
