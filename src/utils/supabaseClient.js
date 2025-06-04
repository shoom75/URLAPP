import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://zjfleyijqxqjbwabuucw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpqZmxleWlqcXhxamJ3YWJ1dWN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NTEyNjgsImV4cCI6MjA2NDQyNzI2OH0.e4gQgy43WhCQCgPWssWW-_y3_7VHpizBLb9wD60XwzY";

export const supabase = createClient(supabaseUrl, supabaseKey);