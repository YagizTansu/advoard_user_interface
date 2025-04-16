import { Building, ProfessorRoom } from './supabase';

// Hardcoded mock directions for buildings - shorter implementation
const BUILDING_DIRECTIONS: { [key: string]: string[] } = {
  "acfd1492-7cd8-4de0-bba3-fcfdda9c7402": [ // A Block
    "Bulunduğunuz noktadan 20 metre düz ilerleyin",
    "A Blok tam önünüzde olacak",
    "Ana girişten içeri girin"
  ],
  "7e59f0d2-3f1b-4ccd-af6d-17910f64fd4c": [ // C Block
    "Bulunduğunuz noktadan sola dönün ve yaklaşık 80 metre ilerleyin",
    "M Bloku sağınızda geçeceksiniz",
    "C Blok solunuzda kalacak"
  ],
  "e128821e-fd27-49c2-8c83-ded7362483cb": [ // E Block
    "Bulunduğunuz noktadan sola dönün ve yaklaşık 100 metre ilerleyin",
    "M Bloku sağınızda geçin",
    "C Bloku geçtikten sonra devam edin",
    "E Blok kampüsün sol tarafında olacak"
  ],
  "fc7e2425-be54-4737-922b-e8586821d354": [ // K Block
    "Bulunduğunuz noktadan sol çapraz yönde yaklaşık 60 metre ilerleyin",
    "K Blok solunuzda kalacak"
  ],
  "62a8d70c-0caa-4dc0-901c-c15df63a0065": [ // M Block
    "Bulunduğunuz noktadan sola dönün ve yaklaşık 50 metre ilerleyin",
    "M Blok sağınızda kalacak"
  ],
  "30ba4c5d-af4f-474b-bb08-03b214e11d37": [ // TESLA
    "Bulunduğunuz noktadan sola dönün ve yaklaşık 100 metre ilerleyin",
    "M Bloku sağınızda geçin",
    "TESLA binası kampüsün sol alt köşesinde yer alacak"
  ],
  "34b81c85-15c0-4ada-a4c0-8c35157935b0": [ // Konferans Salonu
    "Bulunduğunuz noktadan sol çapraz yönde yaklaşık 50 metre ilerleyin",
    "Konferans Salonu A Blokun arkasında yer alacak"
  ],
  "2d7ad5bb-e87d-442a-87d5-b805d790f0ad": [ // Amfi Tiyatro
    "Bulunduğunuz noktadan düz kuzeye doğru yaklaşık 120 metre yürüyün",
    "Konferans Salonunu geçin",
    "Amfi Tiyatro kampüsün üst kısmında yer alacak"
  ],
  "b0c4f3a1-5d2e-4c8e-9f7b-5a2d6f3e1c8d": [ // D Block
    "Bulunduğunuz noktadan sağ çapraz yönde yaklaşık 150 metre ilerleyin",
    "A Bloku solunuzda geçin",
    "D Blok kampüsün sol üst köşesinde yer alacak L şeklindeki bina"
  ]
};

// Simplified function with better type safety and fewer redundant operations
const generateDirections = (
  startPointId: string | null, 
  destinationId: string,
  destinationType: 'building' | 'professor',
  buildings: Building[],
  professors?: ProfessorRoom[]
) => {
  // Find the destination details
  let buildingId = destinationId;
  let destinationName = "Unknown Destination";
  
  if (destinationType === 'building') {
    const building = buildings.find(b => b.id === destinationId);
    if (building) destinationName = building.name;
  } else {
    const professor = professors?.find(p => p.id === destinationId);
    if (professor) {
      destinationName = `${professor.professor_name}'s Office`;
      buildingId = professor?.block || '';
    }
  }
  
  // Get directions for the building
  const steps = BUILDING_DIRECTIONS[buildingId] || ["Could not generate directions to this destination"];
  
  return {
    destination: {
      name: destinationName,
      id: destinationId
    },
    steps
  };
};

export { generateDirections };
