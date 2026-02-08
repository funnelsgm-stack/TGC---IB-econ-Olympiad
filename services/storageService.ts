import { supabase } from '../lib/supabaseClient';
import { Team } from '../types';

/**
 * DATABASE SCHEMA ASSUMPTION:
 * 
 * Table: teams
 * - id: text/uuid
 * - school: text
 * - team_name: text
 * - members: jsonb
 * - registered_at: text/timestamp
 * 
 * Table: settings
 * - key: text (primary key)
 * - value: text
 */

export const getTeams = async (): Promise<Team[]> => {
  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .order('registered_at', { ascending: true });

  if (error) {
    console.error('Error fetching teams:', error);
    return [];
  }

  // Map database snake_case columns to application CamelCase model
  return data.map((t: any) => ({
    id: t.id,
    school: t.school,
    teamName: t.team_name,
    members: t.members, // Supabase handles JSON parsing automatically
    registeredAt: t.registered_at
  }));
};

export const registerTeam = async (team: Team): Promise<void> => {
  const { error } = await supabase
    .from('teams')
    .insert([{
        id: team.id,
        school: team.school,
        team_name: team.teamName,
        members: team.members,
        registered_at: team.registeredAt
    }]);

  if (error) {
      console.error("Supabase Error:", error);
      throw new Error(error.message);
  }
};

export const clearTeams = async (): Promise<void> => {
  // Deletes all rows where ID is not empty (effectively all)
  const { error } = await supabase
    .from('teams')
    .delete()
    .neq('id', 'placeholder_impossible_id'); 
    
  if (error) throw error;
};

export const getRegistrationStatus = async (): Promise<boolean> => {
  const { data, error } = await supabase
    .from('settings')
    .select('value')
    .eq('key', 'registration_status')
    .maybeSingle(); // Use maybeSingle to avoid 406 if not found

  if (error) {
    console.error('Error fetching status:', error);
    return true; // Default to open on error
  }
  
  // If row doesn't exist, default to true, otherwise check value
  if (!data) return true;
  return data.value !== 'closed';
};

export const setRegistrationStatus = async (isOpen: boolean): Promise<void> => {
  const { error } = await supabase
    .from('settings')
    .upsert({ 
        key: 'registration_status', 
        value: isOpen ? 'open' : 'closed' 
    });

  if (error) throw error;
};