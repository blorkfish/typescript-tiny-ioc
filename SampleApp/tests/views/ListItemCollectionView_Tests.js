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
/// <reference path="../../../SampleApp/views/ListItemCollectionView.ts" />
/// <reference path="../../../TypeScriptTinyIoC/ConfigSettingsService.ts" />
var MockListItemEventHandler_CollectionViews = (function () {
    function MockListItemEventHandler_CollectionViews() {
    }
    MockListItemEventHandler_CollectionViews.prototype.handle_ListItemCollection_LoadedEvent = function (event) {
        this.ListItemCollection = event.ListItemCollection;
    };
    return MockListItemEventHandler_CollectionViews;
})();
describe('ListItemCollectionView_Tests', function () {
    //var mockHandler: MockListItemEventHandler_CollectionViews;
    beforeEach(function () {
        var htmlSnippet = null;
        $.ajax({ url: "/SampleApp/views/ListItemCollectionView.html", async: false, success: function (data) {
            htmlSnippet = data;
        } });
        var configSettingService = TypeScriptTinyIoC.resolve(IIConfigSettingsService);
        if (!configSettingService) {
            configSettingService = new ConfigSettingsService();
            TypeScriptTinyIoC.register(configSettingService, IIConfigSettingsService);
        }
        configSettingService.storeSetting('ListItemCollectionView_Snippet', htmlSnippet);
        //// setup mock handler
        //mockHandler = new MockListItemEventHandler_CollectionViews();
        //TypeScriptTinyIOC.registerHandler(mockHandler, new IIListItemCollection_LoadedEvent_Handler(), new IIListItemCollection_LoadedEvent());
    });
    afterEach(function () {
    });
    it('config service should have stored ListItemCollectionView.html as snippet', function () {
        var configSettingService = TypeScriptTinyIoC.resolve(IIConfigSettingsService);
        expect(configSettingService).toBeDefined();
        expect(configSettingService.readSetting('ListItemCollectionView_Snippet')).toContain("<div id=\"list-item-collection-view\">");
    });
    it('renders a list item collection view', function () {
        var listItemCollection = new ListItemCollection();
        listItemCollection.loadCollectionFromArray([
            new ListItem({ Id: 5, Name: 'testName' }),
            new ListItem({ Id: 10, Name: 'testName10' })
        ]);
        var listItemCollectionView = new ListItemCollectionView({ collection: listItemCollection });
        listItemCollectionView.render();
        var itemEl = $(listItemCollectionView.el).find('list-item-view-5');
        var innerHtml = listItemCollectionView.el.innerHTML;
        expect(innerHtml).toContain("<div id=\"list-item-view-5\">Id : 5 Name : testName</div>");
    });
});
//# sourceMappingURL=ListItemCollectionView_Tests.js.map