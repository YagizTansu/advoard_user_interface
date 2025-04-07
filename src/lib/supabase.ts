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

// Helper functions for information content
export async function getInformationCategories() {
  const { data, error } = await supabase
    .from('information_categories')
    .select('*')
    .order('id');
  
  if (error) throw error;
  console.log('Categories fetched:', data); // Debug log
  return data;
}

export async function getInformationItems(categoryId?: string) {
  let query = supabase
    .from('information_items')
    .select('*')
    .order('display_order');
  
  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  console.log('Items fetched:', data); // Debug log
  return data;
}

export async function getInformationSubitems(itemId?: number) {
  let query = supabase
    .from('information_subitems')
    .select('*')
    .order('display_order');
  
  if (itemId) {
    query = query.eq('item_id', itemId);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getAllInformationContent() {
  try {
    // First, get categories with their items using direct join
    const { data: categoriesWithItems, error: categoriesError } = await supabase
      .from('information_categories')
      .select(`
        *,
        items:information_items(*)
      `)
      .order('id');
    
    if (categoriesError) throw categoriesError;
    
    // Check if the direct join worked as expected
    if (categoriesWithItems && categoriesWithItems.length > 0 && Array.isArray(categoriesWithItems[0].items)) {
      // Get all subitems in a single query for better performance
      const { data: allSubitems, error: subitemsError } = await supabase
        .from('information_subitems')
        .select('*')
        .order('display_order');
      
      if (subitemsError) throw subitemsError;
      
      // Associate subitems with their parent items
      const result = categoriesWithItems.map(category => {
        // Ensure category.items is an array
        if (Array.isArray(category.items)) {
          // Assign subitems to each item
          category.items = category.items.map((item: InformationItem) => {
            const itemSubitems = allSubitems?.filter((subitem: InformationSubitem) => 
              subitem.item_id === item.id
            ) || [];
            
            return {
              ...item,
              subitems: itemSubitems
            };
          });
        } else {
          category.items = [];
        }
        
        return category;
      });
      
      return result;
    }
    
    // Fallback approach with manual joins if the direct join didn't work
    console.log('Falling back to manual join approach');
    const categories = await getInformationCategories();
    
    if (!categories || categories.length === 0) {
      console.error('No categories found');
      return [];
    }
    
    const allItems = await getInformationItems();
    const allSubitems = await getInformationSubitems();
    
    // Build the complete nested structure
    const result = categories.map(category => {
      const categoryItems = allItems?.filter(item => 
        item.category_id === category.id
      ) || [];
      
      // Associate subitems with their parent items
      const itemsWithSubitems = categoryItems.map((item: InformationItem) => {
        const itemSubitems = allSubitems?.filter((subitem: InformationSubitem) => 
          subitem.item_id === item.id
        ) || [];
        
        return {
          ...item,
          subitems: itemSubitems
        };
      });
      
      return {
        ...category,
        items: itemsWithSubitems
      };
    });
    
    return result;
  } catch (error) {
    console.error('Error in getAllInformationContent:', error);
    // Return empty array instead of throwing to prevent page crashes
    return [];
  }
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
  code: any;
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
  email: any;
  id: string;
  professor_name: string;
  room_number: string;
  floor: string;
  department: string;
  office_hours: string;
  building_id: string;
}

// Types for information content
export interface InformationCategory {
  id: string;
  title_en: string;
  title_tr: string;
  description_en: string;
  description_tr: string;
  icon_name: string;
  color_code: string;
}

export interface InformationItem {
  id: number;
  category_id: string;
  title_en: string;
  title_tr: string;
  content_en: string;
  content_tr: string;
  display_order: number;
  subitems?: InformationSubitem[];
}

export interface InformationSubitem {
  id: number;
  item_id: number;
  title_en: string;
  title_tr: string;
  content_en: string;
  content_tr: string;
  display_order: number;
}

export interface InformationContentFull extends InformationCategory {
  items: InformationItem[];
}
