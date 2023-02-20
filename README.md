# Introduction 
TODO: Give a short introduction of your project. Let this section explain the objectives or the motivation behind this project.

It's PCF copy-to-clipboard component that leverage existing component's capabilities.
Component reference - https://github.com/TBag/power-apps-copy-text-to-clipboard

Previously - main copy() function can only be triggered by clicking the Copy button.
Improvement - main copy() function can now be triggered from an behavioural events in Power App. In particular example it triggers from an OnVisible property of the Power App.
This component doesn't include any textboxes/buttons, all values can be passed silently.
The current value of the copied text is available as a component output property.This allows the value to be used directly from the Power App.
# Getting Started
TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:
1.	Installation process
2.	Software dependencies
3.	Latest releases
4.	API references

# Build and Test
TODO: Describe and show how to build your code and run the tests.

How it works?

It was mainly done based on the UpdateView function.
In the documentation is stated:
This method will be called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, component metadata values such as label, visible, etc.

To understand how it works, you should know about the basic structure of pcf components and main functions (init, UpdateView, GetOutputs, Destroy), here are a couple of helpful resources:
1) https://learn.microsoft.com/en-us/training/paths/use-power-apps-component-framework/
2) https://www.youtube.com/watch?v=URQLR8ndsOE
3) https://dianabirkelbach.wordpress.com/2020/03/29/pcf-when-is-updateview-called/
4) https://learn.microsoft.com/en-us/power-apps/developer/component-framework/manifest-schema-reference/property
5) https://www.youtube.com/watch?v=RwDGFB_h1rY

In our example, the UpdateView function fires a CopyFunction, which basically should only run when a condition is met.
Once the value has been copied, the showPopUp property is set to true.
showPopUp - bound property. By running notifyOutputChanged you can then get that value in power-apps and display a confirmation pop up.


How to deploy new version of pcf component?

First of all, read this article:
https://dianabirkelbach.wordpress.com/2020/12/23/all-about-pcf-versioning/

1. Update Solution.xml and ControlManifest.Input.xml files
Increment MAJOR version
2. Delete your solution from the environment
3. Import new version of a Solution in the Power Apps environment
4. Open Canvas app with your component, update your component (should show a confirmation popup when you open the app)


How to use component in a canvas app?

1. In App OnStart - Set global variables for component's properties: copyValue,copyState, showPopUp
2. Bind your pcf component properties to global variables
3. Set Global variables with necessary values (copyState and copyValue). Once the condition is met, CopyFunction() will be triggered
4. Create a timer with a short delay of 500ms and trigger it after you think that copyFunction will run. The Timer gives copyFunction some time to complete.
5. On timerEnd: Set(showPopUp, pcfcomponent.showPopUp)
6. Create a popup, assign the visibility of the popup to your variable - showPopUp

# Contribute
TODO: Explain how other users and developers can contribute to make your code better. 

For some reason in the powerapp itself, UpdateView function will be triggered a few times, where it shouldn't.
It probably happens because of the internal logic, that's not visible to us and out of our control.
Should be tested.

(place to insert screen)

If you want to learn more about creating good readme files then refer the following [guidelines](https://docs.microsoft.com/en-us/azure/devops/repos/git/create-a-readme?view=azure-devops). You can also seek inspiration from the below readme files:
- [ASP.NET Core](https://github.com/aspnet/Home)
- [Visual Studio Code](https://github.com/Microsoft/vscode)
- [Chakra Core](https://github.com/Microsoft/ChakraCore)