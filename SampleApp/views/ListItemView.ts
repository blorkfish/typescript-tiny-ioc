/// <reference path="../../modules/Backbone.d.ts" />
/// <reference path="../../modules/Handlebars.d.ts" />
/// <reference path="../../TypeScriptTinyIoC/ConfigSettingsService.ts" />
/// <reference path="../events/ListItemEvents.ts" />


class ListItemView extends Backbone.View {

    constructor(options?: any) {
        this.model = options.model;
        this.events = {
            'click' : 'onClicked'
        };
        super(options);
    }

    render(): Backbone.View {
        
        var configService : ConfigSettingsService = TypeScriptTinyIOC.resolve(new IIConfigSettingsService());
        var snippet = configService.readSetting('ListItemView_Snippet');

        var template = Handlebars.compile(snippet);
        var html = template(this.model.toJSON());
        $(this.el).html(html);

        return this;
    }

    onClicked() {
        var listItemEvent = new ListItem_Clicked(<ListItem> this.model);
        TypeScriptTinyIOC.raiseEvent(listItemEvent, new IIListItem_Clicked());
    }
}
