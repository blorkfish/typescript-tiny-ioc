/// <reference path="../../modules/Backbone.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ListItem = (function (_super) {
    __extends(ListItem, _super);
    function ListItem(input) {
        _super.call(this);
        for (var key in input) {
            if (key) {
                this[key] = input[key];
            }
        }
    }
    Object.defineProperty(ListItem.prototype, "Id", {
        get: function () {
            return this.get('Id');
        },
        set: function (value) {
            this.set('Id', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListItem.prototype, "Name", {
        get: function () {
            return this.get('Name');
        },
        set: function (value) {
            this.set('Name', value);
        },
        enumerable: true,
        configurable: true
    });
    return ListItem;
})(Backbone.Model);
//# sourceMappingURL=ListItem.js.map