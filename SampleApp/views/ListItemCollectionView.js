/// <reference path="../../modules/Backbone.d.ts" />
/// <reference path="../../modules/Handlebars.d.ts" />
/// <reference path="../../TypeScriptTinyIoC/ConfigSettingsService.ts" />
/// <reference path="../../SampleApp/models/ListItem.ts" />
/// <reference path="../../SampleApp/views/ListItemView.ts" />
/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../scripts/typings/underscore/underscore.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ListItemCollectionView = (function (_super) {
    __extends(ListItemCollectionView, _super);
    function ListItemCollectionView(options) {
        _super.call(this, options);
    }
    ListItemCollectionView.prototype.initialize = function () {
        _.bindAll(this, 'addListItem');
    };
    ListItemCollectionView.prototype.render = function () {
        var configService = TypeScriptTinyIOC.resolve(new IIConfigSettingsService());
        var snippet = configService.readSetting('ListItemCollectionView_Snippet');
        $(this.el).html(snippet);
        if (this.collection != undefined) {
            this.collection.each(this.addListItem);
        }
        return this;
    };
    ListItemCollectionView.prototype.addListItem = function (listItem) {
        var listItemView = new ListItemView({ model: listItem });
        var listItemViewEl = listItemView.render().el;
        $(this.el).find('#list-item-collection-view-items').append(listItemViewEl);
    };
    return ListItemCollectionView;
})(Backbone.View);
