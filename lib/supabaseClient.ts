import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ddnrhqazvwckxjtoevqd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkbnJocWF6dndja3hqdG9ldnFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NzkzMTMsImV4cCI6MjA4NjE1NTMxM30.FFEim-QMUHDFdgDeo70tWtEhyeaS2Q4RXVanq0PrYDI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);