import { Building, ProfessorRoom } from './supabase';

// Hardcoded mock directions for buildings - shorter implementation
const BUILDING_DIRECTIONS: { [key: string]: string[] } = {
  'acfd1492-7cd8-4de0-bba3-fcfdda9c7402': [ //a block
    'Exit current building through the main entrance',
    'Walk straight ahead for 50 meters to the main courtyard',
    'Main Block will be directly in front of you',
    'Enter through the glass doors at the front entrance'
  ],
  '7e59f0d2-3f1b-4ccd-af6d-17910f64fd4c': [ //c block
    'Exit current building through the main entrance',
    'Turn right and follow the path for 100 meters',
    'At the fountain, turn left and walk 50 meters',
    'Conference Hall will be on your right side'
  ],
  'e128821e-fd27-49c2-8c83-ded7362483cb': [ //e block
    'Exit current building through the main entrance',
    'Walk straight for 100 meters past the main square',
    'Turn right at the signpost and continue for 75 meters',
    'C Block is the three-story building with red brick exterior'
  ],
  'fc7e2425-be54-4737-922b-e8586821d354': [ //k block
    'Exit current building through the main entrance',
    'Turn left and follow the curved path for 150 meters',
    'Cross the small bridge over the pond',
    'D Block is directly ahead past the gardens'
  ],
  '62a8d70c-0caa-4dc0-901c-c15df63a0065': [ //m block
    'Exit current building through the main entrance',
    'Turn right and follow the main road for 200 meters',
    'At the traffic circle, take the second exit',
    'Dormitory Building is the large complex on the right'
  ],
  '30ba4c5d-af4f-474b-bb08-03b214e11d37': [ //tesla
    'Exit current building through the main entrance',
    'Walk straight for 80 meters to the central plaza',
    'Turn right at the statue and walk 40 meters',
    'Dining Hall is the building with large windows on the ground floor'
  ],
  '34b81c85-15c0-4ada-a4c0-8c35157935b0': [ // konferance hall
    'Exit current building through the main entrance',
    'Walk 50 meters and take the path on the left',
    'Follow the path for 30 meters past the gardens',
    'The Canteen is located on the ground floor of the building ahead'
  ],
  '2d7ad5bb-e87d-442a-87d5-b805d790f0ad': [ //library
    'Exit current building through the main entrance',
    'Walk straight for 100 meters to the main square',
    'Turn left and walk 50 meters to the conference hall',
    'Enter through the main doors'
  ],
  'b0c4f3a1-5d2e-4c8e-9f7b-5a2d6f3e1c8d': [ //sports center
    'Exit current building through the main entrance',
    'Walk straight for 50 meters to the main courtyard',
    'D Block will be directly in front of you',
    'Enter through the glass doors at the front entrance'
  ],
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
