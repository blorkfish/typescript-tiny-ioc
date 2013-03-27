/// <reference path="../../TypeScriptTinyIoC/TypeScriptTinyIoC.ts" />

interface IListItemService {
    loadListItems() : void;
}

class IIMockListItemService implements IInterfaceChecker {
    className: string = "IIMockListItemService";
    methodNames: string[] = ["loadListItems"];
}



