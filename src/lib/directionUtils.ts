import { Building, ProfessorRoom } from './supabase';

// Define map coordinates and routing points
interface MapPoint {
  id: string;
  x: number;
  y: number;
  name: string;
  isLandmark?: boolean;
}

// Collection of known points on the map (buildings and landmarks)
const knownPoints: { [key: string]: MapPoint } = {
  'entrance': { id: 'entrance', x: 150, y: 450, name: 'Main Entrance', isLandmark: true },
  'plaza': { id: 'plaza', x: 200, y: 350, name: 'Central Plaza', isLandmark: true },
  'fountain': { id: 'fountain', x: 250, y: 300, name: 'Fountain', isLandmark: true },
  'cafeteria': { id: 'cafeteria', x: 300, y: 280, name: 'Cafeteria', isLandmark: true },
  'library': { id: 'library', x: 150, y: 200, name: 'Library', isLandmark: true },
  // Add more landmarks as needed
};

// Building positions should match what we use in the map
const buildingPositions: { [key: string]: { x: number, y: number } } = {
  'acfd1492-7cd8-4de0-bba3-fcfdda9c7402': { x: 230, y: 280 },
  '12bc7064-7eb2-43d4-9e5c-f2f372a17f85': { x: 270, y: 380 },
  '7e59f0d2-3f1b-4ccd-af6d-17910f64fd4c': { x: 80, y: 300 },
  '4f972c6c-36f5-47c6-97ca-1df7992f1f53': { x: 380, y: 160 },
  '2d7ad5bb-e87d-442a-87d5-b805d790f0ad': { x: 200, y: 100 },
  // Add more building positions as needed
};

// Calculate distance between two points
const calculateDistance = (p1: {x: number, y: number}, p2: {x: number, y: number}): number => {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

// Find the nearest landmark to a point
const findNearestLandmark = (point: {x: number, y: number}, excludeIds: string[] = []): MapPoint => {
  let nearest: MapPoint | null = null;
  let minDistance = Infinity;
  
  Object.values(knownPoints).forEach(landmark => {
    if (landmark.isLandmark && !excludeIds.includes(landmark.id)) {
      const distance = calculateDistance(point, landmark);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = landmark;
      }
    }
  });
  
  return nearest!;
};

// Get orientation instruction (left, right, straight)
const getOrientation = (from: MapPoint, via: MapPoint, to: MapPoint): string => {
  // Calculate vectors
  const v1 = { x: via.x - from.x, y: via.y - from.y };
  const v2 = { x: to.x - via.x, y: to.y - via.y };
  
  // Calculate the cross product to determine left/right
  const cross = v1.x * v2.y - v1.y * v2.x;
  
  // Calculate the dot product to determine straight
  const dot = v1.x * v2.x + v1.y * v2.y;
  const magV1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
  const magV2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);
  
  // Calculate the angle between vectors
  const angle = Math.acos(dot / (magV1 * magV2)) * 180 / Math.PI;
  
  if (angle < 30) return 'straight';
  if (cross > 0) return 'left';
  return 'right';
};

// Calculate estimated time based on distance (assuming 1.4 meters/second walking speed)
const calculateTime = (distance: number): string => {
  // Assume 1 unit in our coordinates = 1 meter
  const speedMetersPerSecond = 1.4;
  const timeSeconds = distance / speedMetersPerSecond;
  
  if (timeSeconds < 60) {
    return 'less than a minute';
  } else {
    const minutes = Math.ceil(timeSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  }
};

// Generate directions between two points
const generateDirections = (
  startPointId: string | null, 
  destinationId: string,
  destinationType: 'building' | 'professor',
  buildings: Building[],
  professors?: ProfessorRoom[]
) => {
  // Default to entrance if no start point specified
  const startCoord = startPointId && buildingPositions[startPointId] 
    ? buildingPositions[startPointId] 
    : knownPoints['entrance'];
  
  let destination;
  let destinationDetails;
  
  if (destinationType === 'building') {
    destinationDetails = buildings.find(b => b.id === destinationId);
    destination = buildingPositions[destinationId] || { x: 0, y: 0 };
  } else {
    destinationDetails = professors?.find(p => p.id === destinationId);
    // For professors, we need to find their building first
    const professorBuilding = destinationDetails?.building_id;
    destination = professorBuilding ? buildingPositions[professorBuilding] : { x: 0, y: 0 };
  }
  
  if (!destinationDetails) {
    return {
      destination: {
        name: "Unknown Destination",
        id: destinationId
      },
      distance: "Unknown",
      duration: "Unknown",
      steps: ["Could not generate directions to this destination"]
    };
  }
  
  // Find intermediate landmarks for navigation
  const startPoint = { ...startCoord, id: 'start', name: 'Current Location' };
  const endPoint = { 
    ...destination, 
    id: destinationId,
    name: destinationType === 'building' ? destinationDetails.name : `${destinationDetails.professor_name}'s Office`
  };
  
  // Find landmark points along the way
  const landmark1 = findNearestLandmark(startPoint);
  const landmark2 = findNearestLandmark(endPoint, [landmark1.id]);
  
  // Calculate total distance
  const distance1 = calculateDistance(startPoint, landmark1);
  const distance2 = calculateDistance(landmark1, landmark2);
  const distance3 = calculateDistance(landmark2, endPoint);
  const totalDistance = distance1 + distance2 + distance3;
  
  // Round to nearest 10m
  const roundedDistance = Math.round(totalDistance / 10) * 10;
  
  // Generate steps
  const steps = [];
  
  // Step 1: Exit building
  steps.push(`Exit current building through the main entrance`);
  
  // Step 2: First landmark
  const distanceToLandmark1 = Math.round(distance1);
  steps.push(`Walk ${distanceToLandmark1}m towards ${landmark1.name}`);
  
  // Step 3: Navigation between landmarks
  const orientation = getOrientation(startPoint, landmark1, landmark2);
  steps.push(`Turn ${orientation} at ${landmark1.name} towards ${landmark2.name}`);
  
  // Step 4: Second landmark to destination
  if (destinationType === 'building') {
    steps.push(`Continue for ${Math.round(distance3)}m and enter ${destinationDetails.name}`);
  } else {
    // For professors
    steps.push(`Enter building containing ${destinationDetails.department || 'the department'}`);
    steps.push(`Take ${destinationDetails.floor.includes('floor') ? '' : 'the '} ${destinationDetails.floor} to find room ${destinationDetails.room_number}`);
  }
  
  return {
    destination: {
      name: endPoint.name,
      id: destinationId
    },
    distance: `${roundedDistance}m`,
    duration: `${calculateTime(totalDistance)} walk`,
    steps: steps
  };
};

export { generateDirections };
