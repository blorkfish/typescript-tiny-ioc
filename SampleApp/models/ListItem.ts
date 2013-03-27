/// <reference path="../../modules/Backbone.d.ts" />

interface IListItem {
    Id: number;
    Name: string;
}

class ListItem extends Backbone.Model implements IListItem {
    get Id(): number { return this.get('Id'); }
    set Id(value: number) { this.set('Id', value); }
    set Name(value: string) { this.set('Name', value); }
    get Name(): string { return this.get('Name'); }
    
    constructor(input: IListItem) {
        super();
        for (var key in input) {
            if (key) {
                this[key] = input[key];
            }
        }
        
    }
}