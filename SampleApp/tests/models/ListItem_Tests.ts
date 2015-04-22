/// <reference path="../../../modules/Jasmine.d.ts" />
/// <reference path="../../../modules/Jasmine-jquery.d.ts" />
/// <reference path="../../../modules/Backbone.d.ts" />
/// <reference path="../../../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../../TypeScriptTinyIoC/TypeScriptTinyIoC.ts" />
/// <reference path="../../../SampleApp/models/ListItem.ts" />
/// <reference path="../../../SampleApp/models/ListItemCollection.ts" />


describe("SampleApp : tests : models : ListItem_tests.ts ", () => {
    it("can construct a ListItem model", () => {
        var listItem = new ListItem(
            {
                Id: 1,
                Name: "TestName",
            });
        expect(listItem.get("Id")).toEqual(1);
        expect(listItem.get("Name")).toEqual("TestName");

        expect(listItem.Id).toEqual(1);

        listItem.Id = 5;
        expect(listItem.get("Id")).toEqual(5);

        listItem.set("Id", 20);
        expect(listItem.Id).toEqual(20);
    });

    it("can construct a ListItemCollection model", () => {

        var listItemArr: ListItem[];
        listItemArr = [
            new ListItem ( {Id: 1, Name: 'FirstName', Description: 'firstDescription' } ),
            new ListItem ( {Id: 2, Name: 'SecondName', Description: 'secondDescription' } ),
        ];

        var listItemCollection = new ListItemCollection();
        listItemCollection.loadCollectionFromArray(listItemArr);
            
        expect(listItemCollection.size()).toEqual(2);

        // smoke tests
        var firstItem = <ListItem>listItemCollection.at(0);
        expect(firstItem.Id).toEqual(1);

        

    });

});