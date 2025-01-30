

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export const getMapPreview = (lat: any, lng: any) => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
};

// export const getOpenStreetMapPreview = (lat: any, lng: any) => {
//     // OpenStreetMap Embed URL
//     const imagePreviewUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01}%2C${lat - 0.01}%2C${lng + 0.01}%2C${lat + 0.01}&layer=mapnik`;
//     return imagePreviewUrl;
//   };

export const getOpenStreetMapPreview = (lat: any, lng: any) => {
  // OpenStreetMap Static API endpoint
  const imagePreviewUrl = `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lng}&zoom=14&size=400x200&markers=${lat},${lng}&format=png`;
  return imagePreviewUrl;
};

export async function getAddress(lat: number, lng: number) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch address!");
  }

  const data = await response.json();
  const address = data.results[0].formatted_address;
  return address;
}
