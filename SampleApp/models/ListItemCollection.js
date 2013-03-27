var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../modules/Backbone.d.ts" />
/// <reference path="./ListItem.ts" />
var ListItemCollection = (function (_super) {
    __extends(ListItemCollection, _super);
    function ListItemCollection() {
        _super.apply(this, arguments);

    }
    ListItemCollection.prototype.loadCollectionFromArray = function (arr) {
        this.add(arr);
    };
    return ListItemCollection;
})(Backbone.Collection);
