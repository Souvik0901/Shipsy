import { LightningElement, api } from 'lwc';

export default class boatTile extends LightningElement {
    @api boat; // The boat record to display

    // Used to geeting the boat image url
    get boatImageUrl() {
        if (this.boat?.Picture__c) {
            const baseUrl = window.location.origin;
            return `${baseUrl}${this.boat.Picture__c}`;
        }
    return ''; 
    }

}