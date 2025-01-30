type LocationProp = {
  lat: number;
  lng: number;
  address?: string;
};

export interface PlaceProp {
  title: string;
  imageUri: string;
  location: LocationProp;
  address: string;
  id: any;
}

export class Place {
  title: string;
  imageUri: string;
  location: LocationProp;
  address: string;
  id: any;
  constructor(
    title: string,
    imageUri: string,
    location: LocationProp,
    id?: any
  ) {
    this.title = title;
    this.imageUri = imageUri;
    this.location = { lat: location.lat, lng: location.lng };
    this.address = location.address;
    this.id = id;
  }
}
