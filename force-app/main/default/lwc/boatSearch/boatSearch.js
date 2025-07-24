import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class BoatSearch extends NavigationMixin(LightningElement) {
  // @track isLoading = false;
  boatTypeId = '';

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
    this.boatTypeId = event.detail.boatTypeId;
  }

  handleSearch(event) {
    const boatTypeId = event.detail.boatTypeId;
    this.template.querySelector('c-boat-search-results').searchBoats(boatTypeId);
  }



  // handleLoading() {
  //   this.isLoading = true;
  // }

  // handleDoneLoading() {
  //   this.isLoading = false;
  // }





}