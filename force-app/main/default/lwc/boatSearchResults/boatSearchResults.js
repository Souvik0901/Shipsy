import { LightningElement, track, wire } from 'lwc';
import getBoats from '@salesforce/apex/BoatDataService.getBoats';
import { publish, MessageContext } from 'lightning/messageService';
import BOATMC from '@salesforce/messageChannel/BoatMessageChannel__c';
import { refreshApex } from '@salesforce/apex';

export default class BoatSearchResults extends LightningElement {
  @track boats; // now stores only the boat data
  @track error;
  @track selectedBoatId;
  isLoading = false;
  wiredBoatsResult;

  @wire(MessageContext)
  messageContext;

  @wire(getBoats)
  wiredBoats(result) {
    this.wiredBoatsResult = result;
    if (result.data) {
      this.boats = result.data; // Only store the list of boats
      this.error = undefined;
    } else if (result.error) {
      this.error = result.error;
      this.boats = undefined;
    }
  }

  updateSelectedTile(event) {
    this.selectedBoatId = event.detail.boatId;
    publish(this.messageContext, BOATMC, {
      recordId: this.selectedBoatId
    });
  }

  refresh() {
    this.isLoading = true;
    return refreshApex(this.wiredBoatsResult)
      .finally(() => {
        this.isLoading = false;
      });
  }
}
