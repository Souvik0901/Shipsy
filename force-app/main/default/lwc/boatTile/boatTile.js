import { LightningElement, api } from 'lwc';

// Define CSS class constants
const TILE_WRAPPER_SELECTED_CLASS = 'tile-wrapper selected';
const TILE_WRAPPER_UNSELECTED_CLASS = 'tile-wrapper';

export default class BoatTile extends LightningElement {
    // Input properties
    @api boat; // The boat record to display
    @api selectedBoatId; // The currently selected boat ID

    // Dynamically apply the CSS class based on whether this boat is selected
    // get tileClass() {
    //     return this.boat.Id === this.selectedBoatId
    //         ? TILE_WRAPPER_SELECTED_CLASS
    //         : TILE_WRAPPER_UNSELECTED_CLASS;
    // }

    // Dynamically set the background image of the tile
    // get backgroundStyle() {
    //     return `background-image:url(${this.boat.Picture__c})`;
    // }

    // Handle click and dispatch boatselect event with boat Id
    // selectBoat() {
    //     const selectedEvent = new CustomEvent('boatselect', {
    //         detail: { boatId: this.boat.Id }
    //     });
    //     this.dispatchEvent(selectedEvent);
    // }
}
