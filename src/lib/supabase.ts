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
    .select('*');
  
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
