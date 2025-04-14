import { Building, ProfessorRoom } from './supabase';

// Hardcoded mock directions for buildings - shorter implementation
const BUILDING_DIRECTIONS: { [key: string]: string[] } = {
  'acfd1492-7cd8-4de0-bba3-fcfdda9c7402': [
    'Exit current building through the main entrance',
    'Walk straight ahead for 50 meters to the main courtyard',
    'Main Block will be directly in front of you',
    'Enter through the glass doors at the front entrance'
  ],
  '12bc7064-7eb2-43d4-9e5c-f2f372a17f85': [
    'Exit current building through the main entrance',
    'Turn right and follow the path for 100 meters',
    'At the fountain, turn left and walk 50 meters',
    'Conference Hall will be on your right side'
  ],
  '7e59f0d2-3f1b-4ccd-af6d-17910f64fd4c': [
    'Exit current building through the main entrance',
    'Turn left and walk 75 meters along the main walkway',
    'At the intersection, turn right and continue for 50 meters',
    'The Library is the large building with columns at the entrance'
  ],
  '4f972c6c-36f5-47c6-97ca-1df7992f1f53': [
    'Exit current building through the main entrance',
    'Walk straight for 100 meters past the main square',
    'Turn right at the signpost and continue for 75 meters',
    'C Block is the three-story building with red brick exterior'
  ],
  '2d7ad5bb-e87d-442a-87d5-b805d790f0ad': [
    'Exit current building through the main entrance',
    'Turn left and follow the curved path for 150 meters',
    'Cross the small bridge over the pond',
    'D Block is directly ahead past the gardens'
  ],
  'b4a23e1c-5df2-4fbd-8c5a-d26e912e9c7d': [
    'Exit current building through the main entrance',
    'Turn right and follow the main road for 200 meters',
    'At the traffic circle, take the second exit',
    'Dormitory Building is the large complex on the right'
  ],
  'c8e7f90a-39b1-48de-9561-77c5e2cc5fb2': [
    'Exit current building through the main entrance',
    'Walk straight for 80 meters to the central plaza',
    'Turn right at the statue and walk 40 meters',
    'Dining Hall is the building with large windows on the ground floor'
  ],
  '62d47e5b-5838-4c1a-b735-fd218c9f6a48': [
    'Exit current building through the main entrance',
    'Walk 50 meters and take the path on the left',
    'Follow the path for 30 meters past the gardens',
    'The Canteen is located on the ground floor of the building ahead'
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
