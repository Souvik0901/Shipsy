import { LightningElement, track } from 'lwc';

export default class BoatSearchResults extends LightningElement {
    @track boats = [];
    @track error;
    isLoading = false;
}
