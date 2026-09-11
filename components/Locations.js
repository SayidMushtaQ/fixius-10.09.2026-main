// components/Locations.js
import React, { useState, useEffect } from 'react';

const serviceNames = [
  "maurer", "schreiner", "fensterbauer", 
  "kaminbauer", "pflasterer", "fliesenleger", 
  "treppenbauer", "geruestbauer", "gartenbauer", 
  "poolbauer", "brunnenbauer", "raumausstatter", 
  "elektriker", "erdarbeiten", "stuckateur", 
  "emprsas-de-valores", "abbruchunternehmen", "architekt", 
  "empresas-de-mudanzas", "metallbauer", "bodenleger", 
  "kuechenbauer", "trockenbauer", "betonbohrungen", 
  "planificadora-construccion", "heizungsbauer", "sanitaer", 
  "gebaeudereiniger", "maler", "holzschutz", 
  "moebelmontage", "polsterer", "klimatechniker", 
  "empresas-de-vidriera", "autowerkstatt", "técnicas-climáticas", "dachdecker"
];


const Locations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch('/api/locations');  // Fetch locations from the API
        const data = await res.json();
        setLocations(data);
      } catch (error) {
        console.error('Error fetching locations', error);
      }
    };

    fetchLocations();
  }, []);

  // Function to generate the dynamic URLs
  const generateUrl = (serviceName, city, zipcode) => {
    return `/handwerker-finden/${serviceName}?city=${city}&zipcode=${zipcode}`;
  };

  return (
    <div>
      <h1>Service Links</h1>
      {locations.length > 0 ? (
        <ul>
          {locations.map((location) => {
            const { Place_Name, Postal_Code } = location;
            return serviceNames.map((serviceName) => {
              const url = generateUrl(serviceName, Place_Name, Postal_Code);
              return (
                <li key={`${serviceName}-${Place_Name}`}>
                  <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                </li>
              );
            });
          })}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Locations;
