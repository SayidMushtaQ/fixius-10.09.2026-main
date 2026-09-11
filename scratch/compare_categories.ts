
import { ServiceCards } from './constants/landingPage/index';
import { serviceSchemas } from './lib/serviceSchemas';

const cardSlugs = new Set(ServiceCards.map(c => c.slug));
const schemaKeys = Object.keys(serviceSchemas);

console.log('Categories in schemas but not in cards:');
schemaKeys.forEach(key => {
  if (!cardSlugs.has(key)) {
    console.log(`- ${key}`);
  }
});
