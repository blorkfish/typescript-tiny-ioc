var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../modules/Backbone.d.ts" />
/// <reference path="../../modules/Handlebars.d.ts" />
/// <reference path="../../TypeScriptTinyIoC/ConfigSettingsService.ts" />
var ListItemView = (function (_super) {
    __extends(ListItemView, _super);
    function ListItemView(options) {
        this.model = options.model;
        this.events = {
            'click': 'onClicked'
        };
        _super.call(this, options);
    }
    ListItemView.prototype.render = function () {
        var configService = TypeScriptTinyIOC.resolve(new IIConfigSettingsService());
        var snippet = configService.readSetting('ListItemView_Snippet');
        var template = Handlebars.compile(snippet);
        var html = template(this.model.toJSON());
        $(this.el).html(html);
        return this;
    };
    ListItemView.prototype.onClicked = function () {
        var listItemEvent = new ListItem_Clicked(this.model);
        TypeScriptTinyIOC.raiseEvent(listItemEvent, new IIListItem_Clicked());
    };
    return ListItemView;
})(Backbone.View);
