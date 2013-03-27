/// <reference path="../../TypeScriptTinyIoC/TypeScriptTinyIoC.ts" />
/// <reference path="../models/ListItemCollection.ts" />

// ------------------- ListItemCollection_Loaded

interface IListItemCollection_LoadeEvent {
    ListItemCollection: ListItemCollection;
}

class ListItemCollection_LoadedEvent implements IListItemCollection_LoadeEvent {
    ListItemCollection: ListItemCollection;
    constructor(input: ListItemCollection) {
        this.ListItemCollection = input;
    }
}

class IIListItemCollection_LoadedEvent implements IInterfaceChecker {
    className: string = "IIListItemCollection_LoadedEvent";
    propertyNames: string[] = ["ListItemCollection"];
}

interface IListItemCollection_LoadedEvent_Handler {
    handle_ListItemCollection_LoadedEvent(event: ListItemCollection_LoadedEvent);
}

class IIListItemCollection_LoadedEvent_Handler implements IInterfaceChecker {
    className: string = "IIListItemCollection_LoadedEvent_Handler";
    methodNames: string[] = ["handle_ListItemCollection_LoadedEvent"];
}


// ------------------- ListItem_Clicked

interface IListItem_Clicked {
    ListItem: ListItem;
}

class IIListItem_Clicked implements IInterfaceChecker {
    className: string = "IIListItem_Clicked";
    propertyNames: string[] = ["ListItem"];
}

class ListItem_Clicked implements IListItem_Clicked {
    ListItem: ListItem;
    constructor(listItem: ListItem) {
        this.ListItem = listItem;
    }
}

interface IListItem_Clicked_Handler {
    handleListItem_Clicked_Event(event: IListItem_Clicked);
}

class IIListItem_Clicked_Handler implements IInterfaceChecker {
    className: string = "IIListItem_Clicked_Handler";
    methodNames: string[] = ["handleListItem_Clicked_Event"];
}




