/// <reference path="../../modules/Backbone.d.ts" />
/// <reference path="../../modules/Handlebars.d.ts" />
/// <reference path="../../TypeScriptTinyIoC/ConfigSettingsService.ts" />
/// <reference path="../events/ListItemEvents.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
        var configService = TypeScriptTinyIoC.resolve(IIConfigSettingsService);
        var snippet = configService.readSetting('ListItemView_Snippet');
        var template = Handlebars.compile(snippet);
        var html = template(this.model.toJSON());
        $(this.el).html(html);
        return this;
    };
    ListItemView.prototype.onClicked = function () {
        var listItemEvent = new ListItem_Clicked(this.model);
        TypeScriptTinyIoC.raiseEvent(listItemEvent, IIListItem_Clicked);
    };
    return ListItemView;
})(Backbone.View);
//# sourceMappingURL=ListItemView.js.map