import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for fetching data
export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .in('id', ['coffee', 'cafeteria']); // Example filter, adjust as needed
  
  if (error) throw error;
  return data;
}

export async function getMenuItems(categoryId?: string) {
  let query = supabase
    .from('menu_items')
    .select('*');
  
  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

// Helper functions for buildings
export async function getBuildings(type?: 'academic' | 'administrative') {
  let query = supabase
    .from('buildings')
    .select('*');
  
  if (type) {
    query = query.eq('type', type);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getCommonDestinations() {
  const { data, error } = await supabase
    .from('common_destinations')
    .select('*');
  
  if (error) throw error;
  return data;
}

export async function getProfessorRooms(buildingId?: string) {
  let query = supabase
    .from('professor_rooms')
    .select(`
      *,
      buildings:building_id (
        name
      )
    `);
  
  if (buildingId) {
    query = query.eq('building_id', buildingId);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

// Types
export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface MenuItemType {
  id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

// Types for buildings
export interface Building {
  id: string;
  name: string;
  floor: string;
  type: 'academic' | 'administrative';
  description: string;
}

export interface CommonDestination {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface ProfessorRoom {
  id: string;
  professor_name: string;
  room_number: string;
  floor: string;
  department: string;
  office_hours: string;
  building_id: string;
}
