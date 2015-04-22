/// <reference path="../../modules/Backbone.d.ts" />
/// <reference path="../../modules/Handlebars.d.ts" />
/// <reference path="../../TypeScriptTinyIoC/ConfigSettingsService.ts" />
/// <reference path="../../SampleApp/models/ListItem.ts" />
/// <reference path="../../SampleApp/views/ListItemView.ts" />
/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../scripts/typings/underscore/underscore.d.ts" />

class ListItemCollectionView extends Backbone.View {
    constructor(options?: any) {
        super(options);
    }
    initialize() {
        _.bindAll(this, 'addListItem');
    }

    render(): Backbone.View {

        var configService: ConfigSettingsService = TypeScriptTinyIOC.resolve(new IIConfigSettingsService());
        var snippet = configService.readSetting('ListItemCollectionView_Snippet');

        $(this.el).html(snippet);

        if (this.collection != undefined) {
            this.collection.each(this.addListItem);
        }

        return this;
    }

    addListItem(listItem: ListItem) {
        var listItemView = new ListItemView({ model: listItem });
        var listItemViewEl = listItemView.render().el;
        $(this.el).find('#list-item-collection-view-items').append(listItemViewEl);
    }
}
