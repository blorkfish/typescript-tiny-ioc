/// <reference path="../modules/Jasmine.d.ts" />
/// <reference path="../modules/Jasmine-jquery.d.ts" />
/// <reference path="../modules/require.d.ts" />
/// <reference path="../modules/Backbone.d.ts" />
/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../modules/Handlebars.d.ts" />
/// <reference path="../TypeScriptTinyIoC/TypeScriptTinyIoC.ts" />
var _this = this;
var IIDrawable = (function () {
    function IIDrawable() {
        this.className = 'IIDrawable';
        this.methodNames = ['centerOnPoint', 'zoom', 'draw'];
        this.propertyNames = [];
    }
    return IIDrawable;
})();
var IIUnknown = (function () {
    function IIUnknown() {
        this.className = "IIUnknown";
        this.methodNames = ['unknown'];
        this.propertyNames = [];
    }
    return IIUnknown;
})();
var TestImplementsIDrawable = (function () {
    function TestImplementsIDrawable() {
    }
    TestImplementsIDrawable.prototype.centerOnPoint = function () {
    };
    TestImplementsIDrawable.prototype.zoom = function () {
    };
    TestImplementsIDrawable.prototype.draw = function () {
        return 'drawn';
    };
    return TestImplementsIDrawable;
})();
var TestDoesNotImplementIDrawable = (function () {
    function TestDoesNotImplementIDrawable() {
    }
    TestDoesNotImplementIDrawable.prototype.centerOnPoint = function () {
    };
    TestDoesNotImplementIDrawable.prototype.zoom = function () {
    };
    return TestDoesNotImplementIDrawable;
})();
var TestImplementsIDynamicMap = (function () {
    function TestImplementsIDynamicMap() {
    }
    TestImplementsIDynamicMap.prototype.centerOnPoint = function () {
    };
    TestImplementsIDynamicMap.prototype.zoom = function () {
    };
    TestImplementsIDynamicMap.prototype.draw = function () {
    };
    return TestImplementsIDynamicMap;
})();
var TestDoesNotImplementIDynamicMap = (function () {
    function TestDoesNotImplementIDynamicMap() {
    }
    TestDoesNotImplementIDynamicMap.prototype.centerOnPoint = function () {
    };
    TestDoesNotImplementIDynamicMap.prototype.zoom = function () {
    };
    return TestDoesNotImplementIDynamicMap;
})();
var IDriveable = (function () {
    function IDriveable() {
        this.className = 'IDriveable';
        this.methodNames = ['start', 'drive', 'getPosition'];
        this.propertyNames = [];
    }
    return IDriveable;
})();
var Car = (function () {
    function Car() {
    }
    Car.prototype.start = function () {
        this._isRunning = true;
    };
    Car.prototype.drive = function (distance) {
        if (this._isRunning) {
            this._distanceFromStart += distance;
            return true;
        }
        return false;
    };
    Car.prototype.getPosition = function () {
        return this._distanceFromStart;
    };
    Car.prototype.printDebugString = function () {
    };
    return Car;
})();
describe("TypeScriptTinyIoC_AMD : Test_TypeScriptTinyIoc.ts", function () {
    beforeEach(function () {
        _this.typeScriptTinyIoC = new TypeScriptTinyIoC();
    });
    it("test register class of interface does not throw", function () {
        TypeScriptTinyIoC.register(new TestImplementsIDrawable(), IIDrawable);
    });
    it("test register throws with invalid object", function () {
        expect(function () {
            TypeScriptTinyIoC.register(new TestDoesNotImplementIDrawable(), IIDrawable);
        }).toThrow(new Error("TypeScriptTinyIoC cannot register instance of IIDrawable"));
    });
    it("test resolve class of interface returns valid object", function () {
        var testImplementsIDrawable = new TestImplementsIDrawable();
        TypeScriptTinyIoC.register(testImplementsIDrawable, IIDrawable);
        var implementsIDrawable = TypeScriptTinyIoC.resolve(IIDrawable);
        expect(implementsIDrawable.draw()).toEqual("drawn");
    });
    it("test resolve class with no implementation throws", function () {
        var testImplementsIDrawable = new TestImplementsIDrawable();
        expect(function () {
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
//# sourceMappingURL=Test_TypeScriptTinyIoC.js.map