/**
 * @description       : JS file for boat tile UI page
 * @author            : Souvik Sen
 * @group             : CK
 * @last modified on  : 08-04-2025
 * @last modified by  : Souvik Sen
**/
import { LightningElement, api } from 'lwc';
import defaultBoatImage from '@salesforce/resourceUrl/defaultBoatImage';


export default class boatTile extends LightningElement {
    @api boat; // The boat record to display

    // Used to geeting the boat image url
    get boatImageUrl() {
        const imageUrl = this.boat?.Picture__c;

        if (imageUrl && (imageUrl.startsWith('/') || imageUrl.startsWith('http'))) {
            return imageUrl.startsWith('http') ? imageUrl : `${window.location.origin}${imageUrl}`;
        }
        return defaultBoatImage;
    }

}