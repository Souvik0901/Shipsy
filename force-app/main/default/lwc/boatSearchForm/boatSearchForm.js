import { LightningElement, wire } from 'lwc';
import getBoatTypes from '@salesforce/apex/BoatDataService.getBoatTypes';

export default class BoatSearchForm extends LightningElement {
selectedBoatTypeId = '';
  error;
  searchOptions = [];

  @wire(getBoatTypes)
  boatTypes({ error, data }) {
    if (Array.isArray(data)) {
      this.searchOptions = data.map(type => ({
        label: type.Name,
        value: type.Id
      }));
      this.searchOptions.unshift({ label: 'All Types', value: '' });
    } else if (error) {
      this.searchOptions = undefined;
      this.error = error;
      console.error('Error loading boat types:', error);
    }
  }


    handleSearchOptionChange(event) {
        this.selectedBoatTypeId = event.detail.value;
        const searchEvent = new CustomEvent('search', {
          detail: { boatTypeId: this.selectedBoatTypeId }
        });
        this.dispatchEvent(searchEvent);
      }
    
}