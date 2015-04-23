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
/// <reference path="../../../SampleApp/views/ListItemView.ts" />
/// <reference path="../../../TypeScriptTinyIoC/ConfigSettingsService.ts" />

//class MockListItemEventHandler_Views implements IListItemCollection_LoadedEvent_Handler {
//    ListItemCollection: ListItemCollection;
//    handle_ListItemCollection_LoadedEvent(event: ListItemCollection_LoadedEvent) {
//        this.ListItemCollection = event.ListItemCollection;
//    }
//}


class MockListItem_Clicked_Handler implements IListItem_Clicked_Handler {
    lastEvent: IListItem_Clicked;
    handleListItem_Clicked_Event(event: IListItem_Clicked) {
        this.lastEvent = event;
    }
}


describe('ListItemView_Tests', () => {

    //var mockHandler: MockListItemEventHandler_Views;

    beforeEach(() => {
        var htmlSnippet = null;
        $.ajax({ url: "/SampleApp/views/ListItemView.html", async: false, success: function (data) { htmlSnippet = data; } });

        var configSettingService = new ConfigSettingsService();
        TypeScriptTinyIoC.register(configSettingService, IIConfigSettingsService);
        
        configSettingService.storeSetting('ListItemView_Snippet', htmlSnippet);

        // setup mock handler
        //mockHandler = new MockListItemEventHandler_Views();

        //TypeScriptTinyIOC.registerHandler(mockHandler, new IIListItemCollection_LoadedEvent_Handler(), new IIListItemCollection_LoadedEvent());

    });

    afterEach(() => {

    });

    it('config service should have stored ListItemView.html as snippet', () => {

        var configSettingService: ConfigSettingsService = TypeScriptTinyIoC.resolve(IIConfigSettingsService);
        expect(configSettingService).toBeDefined();

        expect(configSettingService.readSetting('ListItemView_Snippet')).toEqual("<div id=\"list-item-view-{{Id}}\">Id : {{Id}} Name : {{Name}}</div>");
    });

    it('renders a list item view', () => {
        var listItem: ListItem = new ListItem({ Id: 5, Name: 'testName' });

        var listItemView: ListItemView = new ListItemView({ model: listItem });
        listItemView.render();

        var itemEl = $(listItemView.el).find('list-item-view-5');
        var innerHtml = listItemView.el.innerHTML;

        expect(innerHtml).toEqual("<div id=\"list-item-view-5\">Id : 5 Name : testName</div>");

    });

    it('list item clicked fires ListItem_Clicked event', () => {

        var listItemView: ListItemView = new ListItemView({ model: new ListItem({ Id: 5, Name: 'testName' }) });
        listItemView.render();

        var mock_Handler = new MockListItem_Clicked_Handler();

        TypeScriptTinyIoC.registerHandler(mock_Handler, IIListItem_Clicked_Handler, IIListItem_Clicked);

        var handlerSpy = spyOn(mock_Handler, 'handleListItem_Clicked_Event');

        var listItem = $(listItemView.el).find('#list-item-view-5');

        listItem.trigger('click');

        expect(handlerSpy).toHaveBeenCalled();

    });
});