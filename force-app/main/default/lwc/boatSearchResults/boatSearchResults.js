import { LightningElement, track, wire, api } from 'lwc';
import getBoats from '@salesforce/apex/BoatDataService.getBoats';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import updateBoatList from '@salesforce/apex/BoatDataService.updateBoatList';

const SUCCESS_VARIANT = 'success';
const SUCCESS_TITLE = 'Success';
const MESSAGE_SHIP_IT = 'Ship It!';
const ERROR_TITLE = 'Error';
const ERROR_VARIANT = 'error';


export default class BoatSearchResults extends LightningElement {
  @track boats; // now stores only the boat data
  @track error;
  @track draftValues = [];
  isLoading = false;
  wiredBoatsResult;  // stores the result for refresh Apex

  //private backing field
  _boatTypeId;


  columns = [
    { label: 'Name', fieldName: 'Name', type: 'text', editable: true },
    { label: 'Length', fieldName: 'Length__c', type: 'number', editable: true },
    { label: 'Price', fieldName: 'Price__c', type: 'currency', editable: true },
    { label: 'Description', fieldName: 'Description__c', type: 'text', editable: true }
    // Add more columns as needed
  ];


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
    return refreshApex(this.wiredBoatsResult).finally(() => {
        this.isLoading = false;
      });
  }


async handleSave(event){
  const updatedFields = event.detail.draftValues;
  try {
    this.isLoading = true;
    await updateBoatList({ data: updatedFields });
    this.dispatchEvent(
      new ShowToastEvent({
        title: SUCCESS_TITLE,
        message: MESSAGE_SHIP_IT,
        variant: SUCCESS_VARIANT
      })
    );
    this.draftValues = [];
    await this.refresh(); // refresh data and stop spinner

  } catch (error) {
    this.dispatchEvent(
      new ShowToastEvent({
        title: ERROR_TITLE,
        message: error.body?.message || error.message,
        variant: ERROR_VARIANT
      })
    );
  }
}





}