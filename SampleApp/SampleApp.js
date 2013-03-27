/// <reference path="../modules/Jasmine.d.ts" />
/// <reference path="../modules/Jasmine-jquery.d.ts" />
/// <reference path="../modules/Backbone.d.ts" />
/// <reference path="../modules/jquery.d.ts" />
/// <reference path="../TypeScriptTinyIoC/TypeScriptTinyIoC.ts" />
/// <reference path="../SampleApp/models/ListItem.ts" />
/// <reference path="../SampleApp/models/ListItemCollection.ts" />
/// <reference path="../SampleApp/events/ListItemEvents.ts" />
/// <reference path="../SampleApp/services/IListItemService.ts" />
/// <reference path="../SampleApp/services/MockListItemService.ts" />
/// <reference path="../SampleApp/views/ListItemCollectionView.ts" />
var SampleApp = (function () {
    function SampleApp() { }
    SampleApp.prototype.run = function () {
        var htmlSnippet = null;
        var configSettingService = new ConfigSettingsService();
        TypeScriptTinyIOC.register(configSettingService, new IIConfigSettingsService());
        $.ajax({
            url: "/SampleApp/views/ListItemView.html",
            async: false,
            success: function (data) {
                htmlSnippet = data;
            }
        });
        configSettingService.storeSetting('ListItemView_Snippet', htmlSnippet);
        $.ajax({
            url: "/SampleApp/views/ListItemCollectionView.html",
            async: false,
            success: function (data) {
                htmlSnippet = data;
            }
        });
        configSettingService.storeSetting('ListItemCollectionView_Snippet', htmlSnippet);
        TypeScriptTinyIOC.registerHandler(this, new IIListItemCollection_LoadedEvent_Handler(), new IIListItemCollection_LoadedEvent());
        TypeScriptTinyIOC.registerHandler(this, new IIListItem_Clicked_Handler(), new IIListItem_Clicked());
        var mockListItemService = new MockListItemService();
        mockListItemService.loadListItems();
    };
    SampleApp.prototype.handle_ListItemCollection_LoadedEvent = function (event) {
        this.ListItemCollection = event.ListItemCollection;
        var listItemCollectionView = new ListItemCollectionView({
            collection: this.ListItemCollection
        });
        $('#sample-app-div').html(listItemCollectionView.render().el);
    };
    SampleApp.prototype.handleListItem_Clicked_Event = function (event) {
        $('#sample-app-div').append('<br/>' + event.ListItem.Id + ' ' + event.ListItem.Name + ' clicked');
    };
    return SampleApp;
})();
