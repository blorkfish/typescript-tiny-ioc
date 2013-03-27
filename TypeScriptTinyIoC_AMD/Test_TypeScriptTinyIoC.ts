/// <reference path="../modules/Jasmine.d.ts" />
/// <reference path="../modules/Jasmine-jquery.d.ts" />
/// <reference path="../modules/require.d.ts" />
/// <reference path="../modules/Backbone.d.ts" />
/// <reference path="../modules/jquery.d.ts" />
/// <reference path="../modules/Handlebars.d.ts" />
/// <reference path="../TypeScriptTinyIoC/TypeScriptTinyIoC.ts" />

interface IDrawable {
    centerOnPoint();
    zoom();
    draw(): string;
}

class IDrawableInterface implements IInterfaceChecker {
    className: string = 'IDrawableInterface';
    methodNames: string[] = ['centerOnPoint', 'zoom', 'draw'];
    propertyNames: string[] = [];
}

interface IUnknown {
    unknown();
}

class IUnknownInterface implements IInterfaceChecker {
    className: string = "IUnknownInterface";
    methodNames: string[] = ['unknown'];
    propertyNames: string[] = [];
}
 
class TestImplementsIDrawable implements IDrawable {
    centerOnPoint() {
    };
    zoom() {
    };
    draw() : string {
        return 'drawn';
    };
}


class TestDoesNotImplementIDrawable {
    centerOnPoint() {
    };
    zoom() {
    };
}

class TestImplementsIDynamicMap {
    centerOnPoint() {
    };
    zoom() {
    };
    draw() {
    };
}

class TestDoesNotImplementIDynamicMap {
    centerOnPoint() {
    };
    zoom() {
    };
}

interface Drivable {
    // Start the car's ignition so that it can drive.
    start(): void;
    // Attempt to drive a distance. Returns true or false based on whether or not the drive was successful.
    drive(distance: number): bool;
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
    private _isRunning: bool;
    private _distanceFromStart: number;
    public start() {
        this._isRunning = true;
    }
    public drive(distance: number): bool {
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
        this.typeScriptTinyIoC = new TypeScriptTinyIOC();
    });
    it("test register class of interface does not throw", () => {
            
        TypeScriptTinyIOC.register(new TestImplementsIDrawable(), new IDrawableInterface());
    });
    it("test register throws with invalid object", () => {
            
        expect(() => { TypeScriptTinyIOC.register(new TestDoesNotImplementIDrawable(), new IDrawableInterface()) })
            .toThrow(new Error("Function InterfaceChecker.ensureImplements: object does not implement the IDrawableInterface interface. Method draw was not found"));
    });

    it("test resolve class of interface returns valid object", () => {
        var testImplementsIDrawable = new TestImplementsIDrawable();
        TypeScriptTinyIOC.register(testImplementsIDrawable, new IDrawableInterface());
        var implementsIDrawable = TypeScriptTinyIOC.resolve(new IDrawableInterface());
        expect(implementsIDrawable.draw()).toEqual("drawn");
    });

    it("test resolve class with no implementation throws", () => {
        var testImplementsIDrawable = new TestImplementsIDrawable();
        expect(() => {
            TypeScriptTinyIOC.resolve(new IUnknownInterface());
        }).not.toThrow(new Error("Cannot find registered class that implements interface: IUnknownInterface"));
    });

    it("test interface checker does not throw with valid object", () => {
            
        var IDynamicMap = new InterfaceChecker(new IDriveable());
        var IDynamicMap_Strings = new InterfaceChecker({ className: 'test', methodNames: ['test'], propertyNames: []});

        var myCar = new Car();
        InterfaceChecker.ensureImplements(myCar, IDynamicMap);
        expect(InterfaceChecker.implementsInterface(myCar, IDynamicMap)).toBeTruthy();
    });
    it("test interface throws with invalid object", () => {
        var testObject = new TestDoesNotImplementIDynamicMap();
        var IDynamicMap = new InterfaceChecker({ className: "IDynamicMap", methodNames: ['centerOnPoint', 'zoom', 'draw'], propertyNames: [] });
        expect(InterfaceChecker.implementsInterface(testObject, IDynamicMap)).not.toBeTruthy();
        expect(() => { InterfaceChecker.ensureImplements(testObject, IDynamicMap) } ).toThrow(new Error("Function InterfaceChecker.ensureImplements: object does not implement the IDynamicMap interface. Method draw was not found"));
    });




});




