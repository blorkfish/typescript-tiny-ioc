/// <reference path="./IListItemService.ts" />
/// <reference path="../../TypeScriptTinyIoC/TypeScriptTinyIoC.ts" />
/// <reference path="../../SampleApp/models/ListItem.ts" />
/// <reference path="../../SampleApp/models/ListItemCollection.ts" />
/// <reference path="../../SampleApp/events/ListItemEvents.ts" />

class MockListItemService implements IListItemService {
    public loadListItems() {
        var listItemArr: ListItem[];
        listItemArr = [
            new ListItem({ Id: 1, Name: 'FirstName', Description: 'firstDescription' }),
            new ListItem({ Id: 2, Name: 'SecondName', Description: 'secondDescription' }),
            new ListItem({ Id: 3, Name: 'ThirdName', Description: 'thirdDescription' }),
            new ListItem({ Id: 4, Name: 'FourthName', Description: 'fourthDescription' }),
            new ListItem({ Id: 5, Name: 'FifthName', Description: 'fifthDescription' }),
        ];

        var listItemCollection = new ListItemCollection();
        listItemCollection.loadCollectionFromArray(listItemArr);

        var event: ListItemCollection_LoadedEvent = new ListItemCollection_LoadedEvent(listItemCollection);
        TypeScriptTinyIOC.raiseEvent(event, new IIListItemCollection_LoadedEvent());

    };
}