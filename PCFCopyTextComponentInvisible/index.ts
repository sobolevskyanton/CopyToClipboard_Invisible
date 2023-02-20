import {IInputs, IOutputs} from "./generated/ManifestTypes";
import * as copy from 'copy-to-clipboard';

export class PCFCopyTextComponentInvisible implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    // Value of the field is stored and used inside the control 
    private _value: string;

    private _showPopUp: boolean;

    // PCF framework delegate which will be assigned to this object which would be called whenever any update happens. 
    private _notifyOutputChanged: () => void;

    // This element contains all elements of our custom control example
    private _container: HTMLDivElement;

    private _rootContainer: HTMLDivElement;

    constructor()
    {

    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {
        // Add control initialization code
        // get root container before child controls are appended
		this._rootContainer = this.getRootContainer(container)!;
		
		// Adding the textInput and button created to the container DIV.
		this._container = document.createElement("div");

		// Creating the textInput for the control and setting the relevant values.

		this._notifyOutputChanged = notifyOutputChanged;

		container.appendChild(this._container);
    }

    private getRootContainer(container: HTMLDivElement) {
		let node : HTMLDivElement | null = container;
		
		// lookup the first parent node which has a height set
		while (node && !node.style.height) {
			node = node.parentNode as HTMLDivElement | null;
		}

		return node;
	}


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        this.CopyFunction(context,context.parameters.copyState.raw,context.parameters?.Value?.raw || "")
    }

    private CopyFunction(context: ComponentFramework.Context<IInputs>, copyState: boolean, copyValue: string) {
        if (copyState && copyValue) {
			this._value = context.parameters.Value.raw!;
            const isCopied = copy(this._value.toString());
            if(isCopied) {
                context.parameters.showPopUp.raw = true;
                this._showPopUp = context.parameters.showPopUp.raw;
                context.parameters.copyState.raw = false;
                this._notifyOutputChanged();
            }
		} 
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs
    {
        let result: IOutputs = {
			Value: this._value,
            showPopUp: this._showPopUp

		};
        
		return result;
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void
    {
        // Add code to cleanup control if necessary
    }
}
