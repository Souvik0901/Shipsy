import { LightningElement, track, wire, api } from 'lwc';
import getBoats from '@salesforce/apex/BoatDataService.getBoats';
import { refreshApex } from '@salesforce/apex';

export default class BoatSearchResults extends LightningElement {
  @track boats; // now stores only the boat data
  @track error;
  isLoading = false;
  wiredBoatsResult;  // stores the result for refresh Apex

// @track selectedBoatId;
// @wire(MessageContext)
// messageContext;

  //private backing field
  _boatTypeId;

  @wire(getBoats, { boatTypeId: '$_boatTypeId' })
  wiredBoats(result) {
    console.log('Wired getBoats called with:', this._boatTypeId);
    this.wiredBoatsResult = result;
    if (result.data) {
      this.boats = result.data; // Only store the list of boats
      this.error = undefined;
    } else if (result.error) {
      this.error = result.error;
      this.boats = undefined;
    }
  }

  @api
  set boatTypeId(value) {
    this._boatTypeId = value;
    console.log('boatSearchResults received boatTypeId:', value);
  }

  get boatTypeId() {
    return this._boatTypeId;
  }

  refresh() {
    this.isLoading = true;
    return refreshApex(this.wiredBoatsResult)
      .finally(() => {
        this.isLoading = false;
      });
  }

  // updateSelectedTile(event) {
  //   this.selectedBoatId = event.detail.boatId;
  //   publish(this.messageContext, BOATMC, {
  //     recordId: this.selectedBoatId
  //   });
  // }
}