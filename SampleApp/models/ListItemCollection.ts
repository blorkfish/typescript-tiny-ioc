/// <reference path="../../modules/Backbone.d.ts" />
/// <reference path="./ListItem.ts" />

class ListItemCollection extends Backbone.Collection {
    model:   ListItem;
    loadCollectionFromArray( arr : ListItem[]) {
        this.add(arr);
    }
}