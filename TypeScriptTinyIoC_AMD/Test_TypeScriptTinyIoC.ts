/// <reference path="../modules/Jasmine.d.ts" />
/// <reference path="../modules/Jasmine-jquery.d.ts" />
/// <reference path="../modules/require.d.ts" />
/// <reference path="../modules/Backbone.d.ts" />
/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../modules/Handlebars.d.ts" />
/// <reference path="../TypeScriptTinyIoC/TypeScriptTinyIoC.ts" />

interface IDrawable {
    centerOnPoint();
    zoom();
    draw(): string;
}

class IIDrawable implements IInterfaceChecker {
    className: string = 'IIDrawable';
    methodNames: string[] = ['centerOnPoint', 'zoom', 'draw'];
    propertyNames: string[] = [];
}

interface IUnknown {
    unknown();
}

class IIUnknown implements IInterfaceChecker {
    className: string = "IIUnknown";
    methodNames: string[] = ['unknown'];
    propertyNames: string[] = [];
}
 
class TestImplementsIDrawable implements IDrawable {
    centerOnPoint() {
    }
    zoom() {
    }
    draw() : string {
        return 'drawn';
    }
}


class TestDoesNotImplementIDrawable {
    centerOnPoint() {
    }
    zoom() {
    }
}

class TestImplementsIDynamicMap {
    centerOnPoint() {
    }
    zoom() {
    }
    draw() {
    }
}

class TestDoesNotImplementIDynamicMap {
    centerOnPoint() {
    }
    zoom() {
    }
}

interface Drivable {
    // Start the car's ignition so that it can drive.
    start(): void;
    // Attempt to drive a distance. Returns true or false based on whether or not the drive was successful.
    drive(distance: number): boolean;
    // Give the distance from the start.
    getPosition(): number;
}


class IDriveable implements IInterfaceChecker {
    className: string = 'IDriveable';
    methodNames: string[] = ['start', 'drive', 'getPosition'];
    propertyNames: string[] = [];
}

class Car implements Drivable {
    myName: string;
    private _isRunning: boolean;
    private _distanceFromStart: number;
    public start() {
        this._isRunning = true;
    }
    public drive(distance: number): boolean {
        if (this._isRunning) {
            this._distanceFromStart += distance;
            return true;
        }
        return false;
    }
    public getPosition(): number {
        return this._distanceFromStart;
    }
    public printDebugString() {
    }
}


describe("TypeScriptTinyIoC_AMD : Test_TypeScriptTinyIoc.ts", () => {
    beforeEach(() => {
        this.typeScriptTinyIoC = new TypeScriptTinyIoC();
    });
    it("test register class of interface does not throw", () => {
            
        TypeScriptTinyIoC.register(new TestImplementsIDrawable(), IIDrawable);
    });
    it("test register throws with invalid object", () => {
            
        expect(() => { TypeScriptTinyIoC.register(new TestDoesNotImplementIDrawable(), IIDrawable) })
            .toThrow(new Error("TypeScriptTinyIoC cannot register instance of IIDrawable"));
    });

    it("test resolve class of interface returns valid object", () => {
        var testImplementsIDrawable = new TestImplementsIDrawable();
        TypeScriptTinyIoC.register(testImplementsIDrawable, IIDrawable);
        var implementsIDrawable = TypeScriptTinyIoC.resolve(IIDrawable);
        expect(implementsIDrawable.draw()).toEqual("drawn");
    });

    it("test resolve class with no implementation throws", () => {
        var testImplementsIDrawable = new TestImplementsIDrawable();
        expect(() => {
            TypeScriptTinyIoC.resolve(IIUnknown);
        }).not.toThrow(new Error("Cannot find registered class that implements interface: IUnknownInterface"));
    });

    //it("test interface checker does not throw with valid object", () => {
            
    //    var IDynamicMap = new InterfaceChecker<IDriveable>();
    //    var IDynamicMap_Strings = new InterfaceChecker<IDriveable>(/*{ className: 'test', methodNames: ['test'], propertyNames: []}*/);

    //    var myCar = new Car();
    //    IDynamicMap.implementsInterface(myCar, IIDynamicMap);
    //    expect(IDynamicMap_Strings.implementsInterface(myCar, IDynamicMap)).toBeTruthy();
    //});
    //it("test interface throws with invalid object", () => {
    //    var testObject = new TestDoesNotImplementIDynamicMap();
    //    var IDynamicMap = new InterfaceChecker<IDriveable>({ className: "IDynamicMap", methodNames: ['centerOnPoint', 'zoom', 'draw'], propertyNames: [] });
    //    expect(InterfaceChecker.implementsInterface(testObject, IDynamicMap)).not.toBeTruthy();
    //    expect(() => { InterfaceChecker.ensureImplements(testObject, IDynamicMap) } ).toThrow(new Error("Function InterfaceChecker.ensureImplements: object does not implement the IDynamicMap interface. Method draw was not found"));
    //});




});




