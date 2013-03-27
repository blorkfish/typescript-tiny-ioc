typescript-tiny-ioc
===================

A Tiny Inversion of Control container for TypeScript / JavaScript.  

Introduction
---
Inversion of Control is a powerful programming technique in which object coupling is bound at runtime.  

This is easily implemented in languages that have the concept of Interfaces, but a little harder to do with JavaScript - as object reflection, or runtime type discovery is virtually impossible.

TypeScriptTinyIoC uses a simple technique for object reflection described in the book "[Pro JavaScript Design Patterns](http://jsdesignpatterns.com/)" by Ross Harmes and Dustin Diaz.

For a more in-depth look at the approach taken with TypeScriptTinyIoC, please read through my blog on the subject: [TypeScript: Implementing a Simple IOC Container for Service Location](http://blorkfish.wordpress.com/2012/10/17/typescript-implementing-a-simple-ioc-container-for-service-location/)

Features
--------

- Service Location via Interfaces.  
- Strongly-typed Domain events.

Register and use a Service
-----

To use TypeScriptTinyIoC for service location follow the following steps.

**Define an Interface**  
(samples taken from /TypeScriptTinyIoC/ConfigSettingsService.ts )

    interface IConfigSettingsService {
    	storeSetting(settingName: string, settingValue: any);
    	readSetting(settingName: string): any;
    }

**Implement the interface**


    class ConfigSettingsService implements IConfigSettingsService {
	    storeSetting(settingName: string, settingValue: any) {
	    	// implementation
	    };
	    readSetting(settingName: string): any {
	    	// implementation
	    };
    }

**Create an IInterfaceChecker class**

Construct a class that implements the IInterfaceChecker interface as found in TypeScriptTinyIoC.ts as follows:

    class IIConfigSettingsService implements IInterfaceChecker {
	    className: string = 'IIConfigSettingsService';
    	methodNames: string[] = ['storeSetting', 'readSetting'];
    }

**Register your class with TypeScriptTinyIoC**

Construct an instance of your service, and register it with TypeScriptTinyIoC: (see SampleApp/SampleApp.ts)

    var configSettingService: ConfigSettingsService = new ConfigSettingsService();
    TypeScriptTinyIOC.register(configSettingService, new IIConfigSettingsService());

**Resolve the Service**

Use the TypeScriptTinyIoC container to resolve your service anywhere in your code as follows: ( see SampleApp/views/ListItemView.ts )

    var configService : ConfigSettingsService = TypeScriptTinyIOC.resolve(new IIConfigSettingsService());
    var snippet = configService.readSetting('ListItemView_Snippet');


Again, please refer to my blog for an in-depth discussion: 
[TypeScript: Implementing a Simple IOC Container for Service Location](http://blorkfish.wordpress.com/2012/10/17/typescript-implementing-a-simple-ioc-container-for-service-location/)

Domain Events Design Pattern
--

The Domain Events design pattern is used as a pattern of communication that broadcasts an event which affects the domain.  
Martin Fowler describes an early use of this design pattern in his blog [DomainEvent](http://martinfowler.com/eaaDev/DomainEvent.html).  
Udi Dahan further refines this pattern in his blog entitled [Domain Events - Salvation](http://www.udidahan.com/2009/06/14/domain-events-salvation/).  
Mike Hadlow also blogs about [Separation of Concerns with Domain Events](http://mikehadlow.blogspot.com.au/2010/09/separation-of-concerns-with-domain.html).  
Anyone who has read the book [Professional ASP.NET Design Patterns](http://www.wrox.com/WileyCDA/WroxTitle/Professional-ASP-NET-Design-Patterns.productCd-0470292784.html) by Scott Millet will also recognise the Domain Events design pattern, and it's benefits.

TypeScriptTinyIoC brings the Domain Event pattern to TypeScript.   
Moreover, these events are strongly typed.

Using Domain Events
---

In order to use Domain Events in TypeScript, follow the following steps:

**Define an Event Interface**  
( see SampleApp/events/ListItemEvents.ts )  

    interface IListItem_Clicked {
    	ListItem: ListItem;
    }

**Implement the interface**

    class ListItem_Clicked implements IListItem_Clicked {
    	ListItem: ListItem;
    	constructor(listItem: ListItem) {
    		this.ListItem = listItem;
    	}
    }

**Create an IInterfaceChecker**

    class IIListItem_Clicked implements IInterfaceChecker {
    	className: string = "IIListItem_Clicked";
    	propertyNames: string[] = ["ListItem"];
    }

**Raise the Event**

( see SampleApp/views/ListItemView.ts)

    var listItemEvent = new ListItem_Clicked(<ListItem> this.model);
    TypeScriptTinyIOC.raiseEvent(listItemEvent, new IIListItem_Clicked());

**Define an event Handler interface**  
( see SampleApp/events/ListItemEvents.ts)

    interface IListItem_Clicked_Handler {
    	handleListItem_Clicked_Event(event: IListItem_Clicked);
    }

**Create an IInterfaceChecker for the event handler**

    class IIListItem_Clicked_Handler implements IInterfaceChecker {
    	className: string = "IIListItem_Clicked_Handler";
    	methodNames: string[] = ["handleListItem_Clicked_Event"];
    }

**Implement the Handler interface**  
( see SampleApp/SampleApp.ts, or SampleApp/tests/views/ListItemView_Tests.ts )  

    class MockListItem_Clicked_Handler implements IListItem_Clicked_Handler {
    	lastEvent: IListItem_Clicked;
    	handleListItem_Clicked_Event(event: IListItem_Clicked) {
    		this.lastEvent = event;
    	}
    }

**Register the handler**  

    TypeScriptTinyIOC.registerHandler(this, new IIListItem_Clicked_Handler(), new IIListItem_Clicked());

Jasmine Unit Tests
---

The TypeScriptTinyIoC source includes three sets of Jasmine Unit tests.  These can be found in the TypeScriptTinyIoC_SpecRunner project :  

For tests using CommonJS run SpecRunner_Common.html

For tests using AMD run SpecRunner_AMD.html

For test for the SampleApp, run SpecRunner_SampleApp.html

SampleApp
--

For a full demo on using Domain Events, and Service Location, run SampleApp.html

have fun,  
Blorkfish.