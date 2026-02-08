import { supabase } from '../lib/supabaseClient';
import { Team } from '../types';

/**
 * DATABASE SCHEMA:
 * Table: teams
 * - id: text (primary key)
 * - school: text
 * - team_name: text
 * - members: jsonb
 * - registered_at: timestamptz
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

  return data.map((t: any) => ({
    id: t.id,
    school: t.school,
    teamName: t.team_name,
    members: t.members,
    registeredAt: t.registered_at
  }));
};

// Efficiently get count without downloading all data
export const getTeamsCount = async (): Promise<number> => {
  const { count, error } = await supabase
    .from('teams')
    .select('*', { count: 'exact', head: true });
  
  if (error) {
    console.error('Error fetching count:', error);
    return 0;
  }
  return count || 0;
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
    .maybeSingle();

  if (error) {
    // If error (e.g., connection), default to open to avoid locking out users inadvertently,
    // or handle as closed depending on preference. Defaulting to true for now.
    console.error('Error fetching status:', error);
    return true; 
  }
  
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