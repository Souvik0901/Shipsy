import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getBoatsByLocation from '@salesforce/apex/BoatDataService.getBoatsByLocation';

const LABEL_YOU_ARE_HERE = 'You are here!';
const ICON_STANDARD_USER = 'standard:user';
const ERROR_TITLE = 'Error loading Boats Near Me';
const ERROR_VARIANT = 'error';

export default class BoatsNearMe extends LightningElement {
  @api boatTypeId;
  mapMarkers = [];
  boatList = [];
  isLoading = true;
  isRendered = false;
  latitude;
  longitude;

  renderedCallback() {
    if (this.isRendered) return;
    this.isRendered = true;
    this.getLocationFromBrowser();
  }

  getLocationFromBrowser() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.getBoats();
        },
        (error) => {
          this.showErrorToast(error.message);
        }
      );
    }
  }

  getBoats() {
    console.log('Calling Apex getBoatsByLocation with:', {
        latitude: this.latitude,
        longitude: this.longitude,
        boatTypeId: this.boatTypeId
      });
    
    getBoatsByLocation({
      latitude: this.latitude,
      longitude: this.longitude,
      boatTypeId: this.boatTypeId
    })
      .then((data) => {
        console.log('Boats data received from Apex:', data);
        this.boatList = data; // Save for sidebar
        this.createMapMarkers(data);
        this.isLoading = false;
      })
      .catch((error) => {
        this.showErrorToast(error.body?.message || 'Unknown error');
        this.isLoading = false;
      });
  }

  createMapMarkers(boats) {
    const markers = boats.map((boat) => ({
      location: {
        Latitude: boat.Geolocation__Latitude__s,
        Longitude: boat.Geolocation__Longitude__s
      },
      title: boat.Name
    }));

    // Add user's location at the top
    markers.unshift({
      location: {
        Latitude: this.latitude,
        Longitude: this.longitude
      },
      title: LABEL_YOU_ARE_HERE,
      icon: ICON_STANDARD_USER
    });

    this.mapMarkers = markers;
  }

  showErrorToast(message) {
    this.dispatchEvent(
      new ShowToastEvent({
        title: ERROR_TITLE,
        message,
        variant: ERROR_VARIANT
      })
    );
  }
}
