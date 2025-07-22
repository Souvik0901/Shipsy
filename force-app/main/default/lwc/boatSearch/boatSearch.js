import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class BoatSearch extends NavigationMixin(LightningElement) {
  @track isLoading = false;
  boatTypeId = '';

  handleLoading() {
    this.isLoading = true;
  }

  handleDoneLoading() {
    this.isLoading = false;
  }

  searchBoats(event) {
    this.boatTypeId = event.detail.boatTypeId;
  }

  createNewBoat() {
    this[NavigationMixin.Navigate]({
      type: 'standard__objectPage',
      attributes: {
        objectApiName: 'Boat__c',
        actionName: 'new'
      }
    });
  }
}
