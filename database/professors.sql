-- Create professors rooms table
CREATE TABLE professor_rooms (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  professor_name VARCHAR(255) NOT NULL,
  room_number VARCHAR(50) NOT NULL,
  floor VARCHAR(50) NOT NULL,
  department VARCHAR(255) NOT NULL,
  office_hours TEXT,
  building_id UUID REFERENCES buildings(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Insert sample professor data
INSERT INTO professor_rooms (professor_name, room_number, floor, department, office_hours, building_id) 
SELECT 
  'Prof. Dr. John Smith', 'A-101', '1st Floor', 'Computer Engineering', 'Monday 10:00-12:00, Wednesday 14:00-16:00',
  id
FROM buildings WHERE name = 'A Block'
UNION ALL
SELECT 
  'Prof. Dr. Sarah Johnson', 'B-205', '2nd Floor', 'Software Engineering', 'Tuesday 13:00-15:00, Thursday 09:00-11:00',
  id
FROM buildings WHERE name = 'B Block'
UNION ALL
SELECT 
  'Dr. Michael Brown', 'A-304', '3rd Floor', 'Artificial Intelligence', 'Monday 13:00-15:00, Friday 10:00-12:00',
  id
FROM buildings WHERE name = 'A Block'
UNION ALL
SELECT 
  'Prof. Dr. Emily Davis', 'C-401', '4th Floor', 'Data Science', 'Wednesday 10:00-12:00, Friday 14:00-16:00',
  id
FROM buildings WHERE name = 'C Block';
