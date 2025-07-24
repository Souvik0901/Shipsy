import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class BoatSearch extends NavigationMixin(LightningElement) {
 @track boatTypeId;

  // this method is used for creating new boat records 
  createNewBoat() {
    this[NavigationMixin.Navigate]({
      type: 'standard__objectPage',
      attributes: {
        objectApiName: 'Boat__c',
        actionName: 'new'
      }
    });
  }


  // this method is used for handling the search event from the child component
  searchBoats(event) {
    console.log("Received boatTypeId in Parent:", event.detail.boatTypeId);
    this.boatTypeId = event.detail.boatTypeId;
    // console.log('Boat Type ID selected:', this.boatTypeId); 
  }

  handleSearch(event) {
    const boatTypeId = event.detail.boatTypeId;
    try {
      this.template.querySelector('c-boat-search-results').searchBoats(boatTypeId);
    } catch (error) {
      console.error('Error calling searchBoats on child component:', error);
    }
  }


}