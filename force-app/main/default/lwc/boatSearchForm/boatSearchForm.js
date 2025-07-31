/**
 * @description       : JS File for Boat Search Form UI Page
 * @author            : Souvik Sen
 * @group             : CK
 * @last modified on  : 07-31-2025
 * @last modified by  : Souvik Sen
**/
import { LightningElement, wire } from 'lwc';
import getBoatTypes from '@salesforce/apex/BoatDataService.getBoatTypes';

export default class BoatSearchForm extends LightningElement {

  //components properties
  selectedBoatTypeId = '';    //holds the curently select Boat type's ID (used for filtering)
  error;                      //stores any error from Apex Class( for debugging / display errors)
  boatTypesOptions = [];      //stores the formatted options for lighting-comobox


  @wire(getBoatTypes)
  boatTypes({ error, data }) {
    if (Array.isArray(data)) {
      this.boatTypesOptions = data.map(type => ({
        label: type.Name,
        value: type.Id
      }));
      this.boatTypesOptions.unshift({ label: 'All Types', value: '' });
    } else if (error) {
      this.boatTypesOptions = undefined;
      this.error = error;
      console.error('Error loading boat types:', error);
    }
  }

  
//	Updates selected boat type and dispatches event
  handleOptionChange(event) {
      this.selectedBoatTypeId = event.detail.value;
      const searchEvent = new CustomEvent('search', {
        detail: { boatTypeId: this.selectedBoatTypeId }
      });
      this.dispatchEvent(searchEvent);

      console.log('Dispatching boatTypeId:', this.selectedBoatTypeId);
  }
    
}