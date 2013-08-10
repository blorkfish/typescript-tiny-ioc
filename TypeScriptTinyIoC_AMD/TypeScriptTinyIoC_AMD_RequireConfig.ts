/// <reference path="../modules/require.d.ts" />
/// <reference path="../modules/Jasmine.d.ts" />

require.config({
    paths: {
        'jquery': '../lib/jquery-1.7.2',
        'underscore': '../lib/underscore',
        'backbone': '../lib/backbone',
        'handlebars': '../lib/handlebars-1.0.rc.1',
        'text': '../lib/text',
        'console': '../lib/console'
        , 'tinyioc': '../TypeScriptTinyIoC/TypeScriptTinyIoC'
        , 'configsettingsservice': '../TypeScriptTinyIoC/ConfigSettingsService'

    },
    shim: {
        jqueryui: {
            deps: ["jquery"],
            exports: "$"
        },
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        handlebars: {
            deps: ["underscore"],
            exports: "Handlebars"
        },
        console: {
            exports: "console"
        }
        , tinyioc: {
            deps: ["jquery"]
        }
    }
});


require(['jquery', 'backbone', 'tinyioc', 'console'
    , 'configsettingsservice'
    , 'Test_TypeScriptTinyIoC'
    , 'Test_TypeScriptTinyIoC_ClassDefinitions'
    , 'Test_TypeScriptTinyIoC_Events'
    , 'Test_ConfigSettingsService'
], function ($, Backbone, tinyioc, console, configsettingsservice
        ) {
    $(function () {
        $.ajaxSetup({
            // Disable caching of AJAX responses
            cache: false
        });

        var jasmineEnv = jasmine.getEnv();
        jasmineEnv.updateInterval = 1000;

        var htmlReporter = new jasmine.TrivialReporter();

        jasmineEnv.addReporter(htmlReporter);

        jasmineEnv.specFilter = function (spec) {
            return htmlReporter.specFilter(spec);
        };

        jasmine.getEnv().execute();


    });
});