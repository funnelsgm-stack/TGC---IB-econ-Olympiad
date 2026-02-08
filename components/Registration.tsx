import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Check, AlertTriangle, ArrowRight, Lock, User, School as SchoolIcon, Mail, Loader2 } from 'lucide-react';
import { MAX_MEMBERS, MAX_TEAMS } from '../constants';
import { Team, Student, SCHOOL_LIST } from '../types';
import { getTeams, registerTeam, getRegistrationStatus } from '../services/storageService';

const Registration: React.FC = () => {
  const [teamName, setTeamName] = useState('');
  const [affiliationType, setAffiliationType] = useState<'school' | 'individual'>('school');
  const [selectedSchool, setSelectedSchool] = useState<string>(SCHOOL_LIST[0]);
  const [customSchool, setCustomSchool] = useState('');
  const [members, setMembers] = useState<Student[]>([{ name: '', email: '' }]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for check during render
  const [registrationState, setRegistrationState] = useState({
      isFull: false,
      isOpen: true,
      count: 0
  });

  const fetchData = async () => {
    try {
        const teams = await getTeams();
        const status = await getRegistrationStatus();
        setRegistrationState({
            isFull: teams.length >= MAX_TEAMS,
            isOpen: status,
            count: teams.length
        });
        setIsLoading(false);
    } catch (err) {
        console.error("Failed to fetch registration data", err);
        setIsLoading(false);
    }
  };

  useEffect(() => {
      fetchData();
      
      // Poll less frequently for network performance (every 10s)
      const interval = setInterval(() => {
          fetchData();
      }, 10000);

      return () => clearInterval(interval);
  }, []);

  // Handle affiliation switch logic
  useEffect(() => {
      if (affiliationType === 'individual') {
          setSelectedSchool('Individual');
      } else {
          // If switching back to school, reset to first option if it was set to Individual
          if (selectedSchool === 'Individual') {
              setSelectedSchool(SCHOOL_LIST[0]);
          }
      }
  }, [affiliationType]);


  const handleMemberChange = (index: number, field: keyof Student, value: string) => {
    const newMembers = [...members];
    newMembers[index][field] = value;
    setMembers(newMembers);
  };

  const addMember = () => {
    if (members.length < MAX_MEMBERS) {
      setMembers([...members, { name: '', email: '' }]);
    }
  };

  const removeMember = (index: number) => {
    if (members.length > 1) {
      const newMembers = members.filter((_, i) => i !== index);
      setMembers(newMembers);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
        // Re-check status on submit (network check)
        const currentTeams = await getTeams();
        const currentStatus = await getRegistrationStatus();
        
        if (currentTeams.length >= MAX_TEAMS) {
            setRegistrationState(prev => ({ ...prev, isFull: true, count: currentTeams.length }));
            setError("REGISTRY_FULL");
            setIsSubmitting(false);
            return;
        }
        if (!currentStatus) {
            setRegistrationState(prev => ({ ...prev, isOpen: false }));
            setError("REGISTRY_CLOSED");
            setIsSubmitting(false);
            return;
        }

        if (!teamName.trim()) {
            setError("TEAM_NAME_REQUIRED");
            setIsSubmitting(false);
            return;
        }

        if (affiliationType === 'school' && selectedSchool === 'Other' && !customSchool.trim()) {
            setError("SCHOOL_NAME_REQUIRED");
            setIsSubmitting(false);
            return;
        }

        const hasEmptyMember = members.some(m => !m.name.trim() || !m.email.trim());
        if (hasEmptyMember) {
            setError("MEMBER_DATA_INCOMPLETE");
            setIsSubmitting(false);
            return;
        }

        const finalSchoolName = selectedSchool === 'Other' ? customSchool : selectedSchool;
        
        // Generate ID safely
        const generateId = () => {
            if (typeof crypto !== 'undefined' && crypto.randomUUID) {
                return crypto.randomUUID();
            }
            return Date.now().toString(36) + Math.random().toString(36).substring(2);
        };

        const newTeam: Team = {
          id: generateId(),
          school: finalSchoolName,
          teamName,
          members,
          registeredAt: new Date().toISOString(),
        };

        await registerTeam(newTeam);
        setSubmitted(true);
        setRegistrationState(prev => ({ ...prev, count: currentTeams.length + 1 }));
    } catch (err: any) {
        setError(err.message || "SUBMISSION_FAILED");
    } finally {
        setIsSubmitting(false);
    }
  };

  if (isLoading) {
      return (
        <section id="register" className="py-32 bg-black border-t border-white/10 flex justify-center">
            <Loader2 className="h-8 w-8 text-white animate-spin" />
        </section>
      )
  }

  if (!registrationState.isOpen && !submitted) {
    return (
        <section id="register" className="py-32 bg-black border-t border-white/10">
             <div className="max-w-2xl mx-auto px-4 text-center">
                <div className="border border-white/20 p-12 bg-white/5">
                    <Lock className="h-12 w-12 text-white mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-white mb-2 font-mono">REGISTRATION CLOSED</h2>
                    <p className="text-gray-400 font-mono">Registration has been manually closed by administration.</p>
                </div>
             </div>
        </section>
     )
  }

  if (registrationState.isFull && !submitted) {
     return (
        <section id="register" className="py-32 bg-black border-t border-white/10">
             <div className="max-w-2xl mx-auto px-4 text-center">
                <div className="border border-white/20 p-12 bg-white/5">
                    <AlertTriangle className="h-12 w-12 text-white mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-white mb-2 font-mono">MAXIMUM CAPACITY REACHED</h2>
                    <p className="text-gray-400 font-mono">MAX_TEAMS ({MAX_TEAMS}) registered.</p>
                </div>
             </div>
        </section>
     )
  }

  if (submitted) {
    return (
      <section id="register" className="py-32 bg-black min-h-[60vh] flex items-center border-t border-white/10">
        <div className="max-w-xl mx-auto px-4 w-full">
          <div className="border border-white p-12 bg-black relative">
            <div className="absolute top-0 right-0 p-4">
                <Check className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-6 font-mono tracking-tighter">CONFIRMED</h2>
            <div className="w-full h-[1px] bg-white/20 mb-6"></div>
            <div className="mb-8">
                <p className="text-gray-400 font-mono mb-2">
                TEAM: <span className="text-white">{teamName.toUpperCase()}</span>
                </p>
                <p className="text-gray-400 font-mono mb-6">
                STATUS: <span className="text-white">REGISTERED</span>
                </p>
                <div className="bg-white/5 border border-white/10 p-4 flex items-start gap-3">
                    <Mail className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-300 font-mono text-xs leading-relaxed">
                        Please keep in touch with your email. All further notices, case materials, and schedule updates will be sent there.
                    </p>
                </div>
            </div>
            <button 
                onClick={() => setSubmitted(false)}
                className="text-white underline underline-offset-4 font-mono text-sm hover:text-gray-400"
            >
                REGISTER ANOTHER TEAM
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="register" className="pt-32 pb-12 bg-black border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-16 border-b border-white/20 pb-4">
          <div>
            <h2 className="text-4xl font-bold text-white font-mono">REGISTRATION</h2>
            <p className="text-gray-500 font-mono text-xs mt-2 uppercase tracking-widest">
                Secure your team's spot
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
            
            {error && (
                <div className="p-4 border border-red-500 bg-red-900/10 text-red-500 font-mono text-sm">
                    ERROR: {error}
                </div>
            )}

            {/* Affiliation Tabs */}
            <div className="flex w-full border-b border-white/10">
                <button
                    type="button"
                    onClick={() => setAffiliationType('school')}
                    className={`flex-1 py-4 text-center font-mono text-sm tracking-widest uppercase transition-all relative ${
                        affiliationType === 'school' ? 'text-white' : 'text-gray-500 hover:bg-white/5'
                    }`}
                >
                    School Registration
                    {affiliationType === 'school' && (
                        <motion.div 
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" 
                        />
                    )}
                </button>
                <button
                    type="button"
                    onClick={() => setAffiliationType('individual')}
                    className={`flex-1 py-4 text-center font-mono text-sm tracking-widest uppercase transition-all relative ${
                        affiliationType === 'individual' ? 'text-white' : 'text-gray-500 hover:bg-white/5'
                    }`}
                >
                    Individual Registration
                    {affiliationType === 'individual' && (
                        <motion.div 
                            layoutId="activeTab"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" 
                        />
                    )}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="space-y-4">
                <label className="block text-xs uppercase tracking-widest font-mono text-gray-500">School / Institution</label>
                <div className="relative overflow-hidden min-h-[50px] flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                        {affiliationType === 'school' ? (
                            <motion.div
                                key="school-select"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.2 }}
                                className="w-full relative space-y-4"
                            >
                                <div className="relative">
                                    <select
                                        value={selectedSchool}
                                        onChange={(e) => setSelectedSchool(e.target.value)}
                                        className="w-full bg-black border-b border-white/30 py-3 text-white focus:border-white focus:outline-none transition-colors rounded-none font-mono appearance-none cursor-pointer hover:border-white/50 pr-8"
                                    >
                                        {SCHOOL_LIST.map((school) => (
                                            <option key={school} value={school} className="bg-zinc-900">
                                                {school}
                                            </option>
                                        ))}
                                        <option value="Other" className="bg-zinc-900">Other / Not Listed</option>
                                    </select>
                                    <div className="absolute right-0 top-3 pointer-events-none text-gray-500">
                                        <SchoolIcon className="w-4 h-4" />
                                    </div>
                                </div>
                                
                                {selectedSchool === 'Other' && (
                                     <input
                                        type="text"
                                        value={customSchool}
                                        onChange={(e) => setCustomSchool(e.target.value)}
                                        placeholder="ENTER SCHOOL NAME"
                                        className="w-full bg-black border-b border-white/30 py-3 text-white focus:border-white focus:outline-none transition-colors rounded-none placeholder-zinc-800 font-mono text-sm animate-fadeIn"
                                        autoFocus
                                    />
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="individual-label"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="w-full border-b border-white/10 py-3 text-gray-500 font-mono text-sm italic cursor-not-allowed flex items-center justify-between"
                            >
                                <span>Independent Entry</span>
                                <div className="flex items-center text-[10px] uppercase border border-white/10 px-2 py-0.5 rounded-full text-gray-600">
                                    <User className="w-3 h-3 mr-1" />
                                    No Affiliation
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-xs uppercase tracking-widest font-mono text-gray-500">Team Name</label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="TEAM NAME"
                  className="w-full bg-black border-b border-white/30 py-3 text-white focus:border-white focus:outline-none transition-colors rounded-none placeholder-zinc-800 font-mono"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <label className="block text-xs uppercase tracking-widest font-mono text-gray-500">Team Members</label>
                {members.length < MAX_MEMBERS && (
                  <button
                    type="button"
                    onClick={addMember}
                    className="text-xs font-mono uppercase text-white hover:underline flex items-center"
                  >
                    <Plus className="h-3 w-3 mr-1" /> Add Member
                  </button>
                )}
              </div>
              
              <div className="space-y-4">
                {members.map((member, index) => (
                  <div key={index} className="flex gap-4 items-end animate-fadeIn">
                    <span className="font-mono text-gray-600 py-3 text-sm">0{index + 1}</span>
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="NAME"
                        value={member.name}
                        onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                        className="w-full bg-black border-b border-white/20 py-3 text-white focus:border-white focus:outline-none transition-colors rounded-none placeholder-zinc-800 text-sm font-mono"
                      />
                      <input
                        type="email"
                        placeholder="EMAIL"
                        value={member.email}
                        onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                        className="w-full bg-black border-b border-white/20 py-3 text-white focus:border-white focus:outline-none transition-colors rounded-none placeholder-zinc-800 text-sm font-mono"
                      />
                    </div>
                    {members.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMember(index)}
                        className="text-gray-600 hover:text-white py-3 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-6 bg-white text-black font-mono font-bold text-lg hover:bg-gray-200 transition-colors uppercase tracking-widest flex items-center justify-center group ${isSubmitting ? 'opacity-50 cursor-wait' : ''}`}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-3 h-5 w-5 animate-spin" /> Processing...
                        </>
                    ) : (
                        <>
                            Submit Application
                            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>

                <div className="mt-12 flex justify-center items-center opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
                    <img 
                        src="https://i.postimg.cc/FK2HRmrv/b242c7f2-2b6b-4d1d-9511-3e3221d27893-md.jpg" 
                        alt="The Global College" 
                        className="h-32 md:h-48 w-auto object-contain"
                    />
                </div>
            </div>

        </form>
      </div>
    </section>
  );
};

export default Registration;