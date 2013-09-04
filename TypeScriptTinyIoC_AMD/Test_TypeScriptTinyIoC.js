/// <reference path="../modules/Jasmine.d.ts" />
/// <reference path="../modules/Jasmine-jquery.d.ts" />
/// <reference path="../modules/require.d.ts" />
/// <reference path="../modules/Backbone.d.ts" />
/// <reference path="../modules/jquery.d.ts" />
/// <reference path="../modules/Handlebars.d.ts" />
/// <reference path="../TypeScriptTinyIoC/TypeScriptTinyIoC.ts" />
var _this = this;
var IDrawableInterface = (function () {
    function IDrawableInterface() {
        this.className = 'IDrawableInterface';
        this.methodNames = ['centerOnPoint', 'zoom', 'draw'];
        this.propertyNames = [];
    }
    return IDrawableInterface;
})();

var IUnknownInterface = (function () {
    function IUnknownInterface() {
        this.className = "IUnknownInterface";
        this.methodNames = ['unknown'];
        this.propertyNames = [];
    }
    return IUnknownInterface;
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
        _this.typeScriptTinyIoC = new TypeScriptTinyIOC();
    });
    it("test register class of interface does not throw", function () {
        TypeScriptTinyIOC.register(new TestImplementsIDrawable(), new IDrawableInterface());
    });
    it("test register throws with invalid object", function () {
        expect(function () {
            TypeScriptTinyIOC.register(new TestDoesNotImplementIDrawable(), new IDrawableInterface());
        }).toThrow(new Error("Function InterfaceChecker.ensureImplements: object does not implement the IDrawableInterface interface. Method draw was not found"));
    });

    it("test resolve class of interface returns valid object", function () {
        var testImplementsIDrawable = new TestImplementsIDrawable();
        TypeScriptTinyIOC.register(testImplementsIDrawable, new IDrawableInterface());
        var implementsIDrawable = TypeScriptTinyIOC.resolve(new IDrawableInterface());
        expect(implementsIDrawable.draw()).toEqual("drawn");
    });

    it("test resolve class with no implementation throws", function () {
        var testImplementsIDrawable = new TestImplementsIDrawable();
        expect(function () {
            TypeScriptTinyIOC.resolve(new IUnknownInterface());
        }).not.toThrow(new Error("Cannot find registered class that implements interface: IUnknownInterface"));
    });

    it("test interface checker does not throw with valid object", function () {
        var IDynamicMap = new InterfaceChecker(new IDriveable());
        var IDynamicMap_Strings = new InterfaceChecker({ className: 'test', methodNames: ['test'], propertyNames: [] });

        var myCar = new Car();
        InterfaceChecker.ensureImplements(myCar, IDynamicMap);
        expect(InterfaceChecker.implementsInterface(myCar, IDynamicMap)).toBeTruthy();
    });
    it("test interface throws with invalid object", function () {
        var testObject = new TestDoesNotImplementIDynamicMap();
        var IDynamicMap = new InterfaceChecker({ className: "IDynamicMap", methodNames: ['centerOnPoint', 'zoom', 'draw'], propertyNames: [] });
        expect(InterfaceChecker.implementsInterface(testObject, IDynamicMap)).not.toBeTruthy();
        expect(function () {
            InterfaceChecker.ensureImplements(testObject, IDynamicMap);
        }).toThrow(new Error("Function InterfaceChecker.ensureImplements: object does not implement the IDynamicMap interface. Method draw was not found"));
    });
});
