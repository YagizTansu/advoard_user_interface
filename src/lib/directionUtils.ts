import { Building, ProfessorRoom } from './supabase';

// Hardcoded mock directions for buildings - shorter implementation
const BUILDING_DIRECTIONS: { [key: string]: string[] } = {
  'acfd1492-7cd8-4de0-bba3-fcfdda9c7402': [ // A Block
    'From your current location, walk straight ahead 20 meters',
    'A Block is directly in front of you',
    'Enter through the main entrance'
  ],
  '7e59f0d2-3f1b-4ccd-af6d-17910f64fd4c': [ // C Block
    'From your current location, head west (left) for about 80 meters',
    'Pass by M Block on your right',
    'C Block will be the blue building on your left side'
  ],
  'e128821e-fd27-49c2-8c83-ded7362483cb': [ // E Block
    'From your current location, head west (left) for about 100 meters',
    'Pass by M Block on your right',
    'Continue past C Block',
    'E Block is the blue building at the far left side of the campus'
  ],
  'fc7e2425-be54-4737-922b-e8586821d354': [ // K Block
    'From your current location, head northwest for about 60 meters',
    'K Block is the red rectangular building on your left'
  ],
  '62a8d70c-0caa-4dc0-901c-c15df63a0065': [ // M Block
    'From your current location, head west (left) for about 50 meters',
    'M Block is the yellow rectangular building on your right'
  ],
  '30ba4c5d-af4f-474b-bb08-03b214e11d37': [ // TESLA
    'From your current location, head west (left) for about 100 meters',
    'Pass by M Block on your right',
    'TESLA is the green building at the bottom left area of the campus'
  ],
  '34b81c85-15c0-4ada-a4c0-8c35157935b0': [ // Konferans Salonu (Conference Hall)
    'From your current location, head northwest for about 50 meters',
    'The Conference Hall is the orange circular building behind A Block'
  ],
  '2d7ad5bb-e87d-442a-87d5-b805d790f0ad': [ // Amfi Tiyatro (Amphitheater)
    'From your current location, head north for about 120 meters',
    'Pass by the Conference Hall',
    'The Amphitheater is the beige oval-shaped area at the top of the campus'
  ],
  'b0c4f3a1-5d2e-4c8e-9f7b-5a2d6f3e1c8d': [ // D Block (not clearly labeled on map but assuming it's the purple building)
    'From your current location, head northeast for about 150 meters',
    'Pass by A Block on your left',
    'D Block is the purple L-shaped building at the top left of the campus'
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
      buildingId = professor?.building_id || '';
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
