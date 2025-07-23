import { LightningElement, api } from 'lwc';
const TILE_WRAPPER_SELECTED_CLASS = 'tile-wrapper selected';
const TILE_WRAPPER_UNSELECTED_CLASS = 'tile-wrapper';


export default class BoatTile extends LightningElement {
    // Input properties
    @api boat; // The boat record to display
    @api selectedBoatId; // The currently selected boat ID

    get tileClass() {
        return this.boat.Id === this.selectedBoatId
          ? TILE_WRAPPER_SELECTED_CLASS
          : TILE_WRAPPER_UNSELECTED_CLASS;
      }
      
      get backgroundImageUrl() {
        // Construct full URL from relative Picture__c path
        if (this.boat?.Picture__c) {
          const baseUrl = window.location.origin;
          return `${baseUrl}${this.boat.Picture__c}`;
        }
        return ''; // or return a default fallback image URL
      }

    selectBoat(){
        const boatselect = new CustomEvent('boatselect', {
            detail: {boatId: this.boat.Id}
        });
    }

}
