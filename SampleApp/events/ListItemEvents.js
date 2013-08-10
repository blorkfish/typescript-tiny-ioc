var ListItemCollection_LoadedEvent = (function () {
    function ListItemCollection_LoadedEvent(input) {
        this.ListItemCollection = input;
    }
    return ListItemCollection_LoadedEvent;
})();

var IIListItemCollection_LoadedEvent = (function () {
    function IIListItemCollection_LoadedEvent() {
        this.className = "IIListItemCollection_LoadedEvent";
        this.propertyNames = ["ListItemCollection"];
    }
    return IIListItemCollection_LoadedEvent;
})();

var IIListItemCollection_LoadedEvent_Handler = (function () {
    function IIListItemCollection_LoadedEvent_Handler() {
        this.className = "IIListItemCollection_LoadedEvent_Handler";
        this.methodNames = ["handle_ListItemCollection_LoadedEvent"];
    }
    return IIListItemCollection_LoadedEvent_Handler;
})();

var IIListItem_Clicked = (function () {
    function IIListItem_Clicked() {
        this.className = "IIListItem_Clicked";
        this.propertyNames = ["ListItem"];
    }
    return IIListItem_Clicked;
})();

var ListItem_Clicked = (function () {
    function ListItem_Clicked(listItem) {
        this.ListItem = listItem;
    }
    return ListItem_Clicked;
})();

var IIListItem_Clicked_Handler = (function () {
    function IIListItem_Clicked_Handler() {
        this.className = "IIListItem_Clicked_Handler";
        this.methodNames = ["handleListItem_Clicked_Event"];
    }
    return IIListItem_Clicked_Handler;
})();
