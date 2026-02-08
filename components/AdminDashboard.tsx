import React, { useState, useEffect } from 'react';
import { Lock, LogOut, Download, Trash2, Copy, Check, Search, Mail, Terminal, Power, AlertTriangle, Loader2 } from 'lucide-react';
import { getTeams, clearTeams, getRegistrationStatus, setRegistrationStatus } from '../services/storageService';
import { Team } from '../types';
import { MANAGER_PASSWORD } from '../constants';
import { motion } from 'framer-motion';

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [teams, setTeams] = useState<Team[]>([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedEmails, setCopiedEmails] = useState(false);
  const [isRegOpen, setIsRegOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = async () => {
      setIsLoading(true);
      try {
        const [data, status] = await Promise.all([
            getTeams(),
            getRegistrationStatus()
        ]);
        setTeams(data);
        setIsRegOpen(status);
      } catch (err) {
          console.error("Error loading admin data", err);
      } finally {
          setIsLoading(false);
      }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === MANAGER_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('ACCESS_DENIED');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleClearData = async () => {
    if (confirm("CONFIRM DELETION OF ALL DATA? THIS CANNOT BE UNDONE.")) {
        setIsLoading(true);
        try {
            await clearTeams();
            await loadData();
        } catch (err) {
            alert("Failed to clear data");
        } finally {
            setIsLoading(false);
        }
    }
  }

  const toggleRegistration = async () => {
      setIsLoading(true);
      try {
        const newState = !isRegOpen;
        await setRegistrationStatus(newState);
        setIsRegOpen(newState);
      } catch (err) {
          alert("Failed to update status");
      } finally {
          setIsLoading(false);
      }
  }

  const exportToCSV = () => {
      const headers = ['Team Name', 'School', 'Registered At', 'Member 1', 'Email 1', 'Member 2', 'Email 2', 'Member 3', 'Email 3', 'Member 4', 'Email 4', 'Member 5', 'Email 5'];
      const rows = teams.map(t => {
          const membersData = t.members.flatMap(m => [m.name, m.email]);
          while (membersData.length < 10) membersData.push('');
          return [t.teamName, t.school, t.registeredAt, ...membersData];
      });

      const csvContent = "data:text/csv;charset=utf-8," 
          + [headers, ...rows].map(e => e.join(",")).join("\n");
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "econ_summit_registrations.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  }

  const copyAllEmails = () => {
    const allEmails = teams.flatMap(t => t.members.map(m => m.email)).filter(e => e).join('; ');
    navigator.clipboard.writeText(allEmails);
    setCopiedEmails(true);
    setTimeout(() => setCopiedEmails(false), 2000);
  }

  const handleSendToGmail = () => {
    const allEmails = teams.flatMap(t => t.members.map(m => m.email)).filter(e => e).join(',');
    window.open(`mailto:henry.gold@theglobalcollege.com?bcc=${allEmails}&subject=TGC IB-Econ Summit Update`);
  }

  const filteredTeams = teams.filter(team => 
    team.teamName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    team.school.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-black px-4">
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black border border-white/20 p-8 max-w-sm w-full"
        >
          <div className="flex justify-center mb-8">
            <Terminal className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-xl font-bold text-center text-white mb-2 font-mono">ADMIN LOGIN</h2>
          <p className="text-center text-gray-500 mb-8 text-xs font-mono">Authorized access only.</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
                {/* Visual Layer for Asterisks */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none border border-white/30 py-3 bg-black">
                    <span className="font-mono tracking-[0.5em] text-white">
                        {password.split('').map(() => '*').join('') || <span className="opacity-0">*</span>}
                    </span>
                    {password.length === 0 && <span className="absolute text-gray-700 font-mono text-sm tracking-normal">ENTER PASSWORD</span>}
                </div>

                {/* Invisible Actual Input */}
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 opacity-0 cursor-text relative z-10"
                    autoFocus
                />
            </div>

            {error && <p className="text-red-500 text-xs font-mono text-center">ERROR: {error}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-white text-black font-mono font-bold hover:bg-gray-200 transition-colors uppercase"
            >
              Authenticate
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-black px-4 border-t border-white/10">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-3xl font-bold text-white font-mono flex items-center gap-4">
                ADMIN DASHBOARD
                {isLoading && <Loader2 className="w-5 h-5 animate-spin text-gray-500" />}
            </h1>
            <p className="text-gray-500 mt-2 font-mono text-sm">Participant Database Overview</p>
          </div>
          <div className="flex flex-wrap gap-4">
             <button onClick={handleSendToGmail} className="flex items-center px-4 py-2 border border-white/20 text-gray-300 hover:border-white hover:text-white transition-all font-mono text-xs uppercase">
                <Mail className="h-3 w-3 mr-2" /> Email_All
             </button>
             <button onClick={copyAllEmails} className="flex items-center px-4 py-2 border border-white/20 text-gray-300 hover:border-white hover:text-white transition-all font-mono text-xs uppercase">
                {copiedEmails ? <Check className="h-3 w-3 mr-2" /> : <Copy className="h-3 w-3 mr-2" />} 
                {copiedEmails ? "Copied" : "Copy_Emails"}
             </button>
             <button onClick={exportToCSV} className="flex items-center px-4 py-2 bg-white text-black hover:bg-gray-200 transition-colors font-mono text-xs uppercase font-bold">
                <Download className="h-3 w-3 mr-2" /> Export_CSV
             </button>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 border border-red-900 text-red-700 hover:border-red-500 hover:text-red-500 transition-colors font-mono text-xs uppercase">
              <LogOut className="h-3 w-3 mr-2" /> Logout
            </button>
          </div>
        </div>

        {/* Control Panel & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
            
            {/* Control Switch */}
            <div className="lg:col-span-1 border border-white/10 p-6 bg-zinc-950/50 flex flex-col justify-between">
                <div>
                    <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Registration Control</h3>
                    <p className="text-white font-mono text-sm mb-4">Manual control of public registration access.</p>
                </div>
                <button 
                    onClick={toggleRegistration}
                    disabled={isLoading}
                    className={`flex items-center justify-center w-full py-3 font-mono font-bold text-sm uppercase transition-all
                        ${isRegOpen 
                            ? 'bg-red-900/20 text-red-500 border border-red-500/50 hover:bg-red-900/40' 
                            : 'bg-green-900/20 text-green-500 border border-green-500/50 hover:bg-green-900/40'}
                        ${isLoading ? 'opacity-50 cursor-wait' : ''}
                    `}
                >
                    <Power className="h-4 w-4 mr-2" />
                    {isRegOpen ? 'CLOSE REGISTRATION' : 'OPEN REGISTRATION'}
                </button>
            </div>

            {/* Stats */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-white/10 p-6">
                    <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Registered Teams</h3>
                    <p className="text-4xl font-bold text-white font-mono">{teams.length} <span className="text-gray-600 text-lg">/ 8</span></p>
                </div>
                <div className="border border-white/10 p-6">
                    <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Total Participants</h3>
                    <p className="text-4xl font-bold text-white font-mono">{teams.reduce((acc, curr) => acc + curr.members.length, 0)}</p>
                </div>
                <div className="border border-white/10 p-6">
                    <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">Registration Status</h3>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isRegOpen && teams.length < 8 ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                        <p className={`text-xl font-bold font-mono ${isRegOpen && teams.length < 8 ? 'text-white' : 'text-red-500'}`}>
                            {isRegOpen ? (teams.length >= 8 ? 'FULL' : 'ACTIVE') : 'CLOSED'}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* Search */}
        <div className="mb-8 relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input 
                type="text" 
                placeholder="Search teams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-black border border-white/20 text-white placeholder-gray-600 focus:border-white outline-none font-mono text-sm"
            />
        </div>

        {/* Data Table */}
        <div className="border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="px-6 py-4 text-xs font-bold text-white uppercase tracking-widest font-mono">Team ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-white uppercase tracking-widest font-mono">Affiliation</th>
                  <th className="px-6 py-4 text-xs font-bold text-white uppercase tracking-widest font-mono">Members</th>
                  <th className="px-6 py-4 text-xs font-bold text-white uppercase tracking-widest font-mono">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredTeams.length === 0 ? (
                    <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-gray-600 font-mono text-sm">
                            NO DATA FOUND
                        </td>
                    </tr>
                ) : (
                    filteredTeams.map((team) => (
                    <tr key={team.id} className="group hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 align-top">
                            <span className="font-bold text-white font-mono block mb-1">{team.teamName}</span>
                            <span className="text-xs text-gray-600 font-mono">ID: {team.id.slice(0,8)}</span>
                        </td>
                        <td className="px-6 py-4 align-top">
                            <span className="text-sm text-gray-300 font-mono">
                                {team.school}
                            </span>
                        </td>
                        <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                            {team.members.map((m, i) => (
                            <div key={i} className="flex flex-col sm:flex-row sm:items-center text-sm font-mono border-b border-white/5 pb-1 last:border-0">
                                <span className="text-gray-300 mr-2 w-32 truncate">{m.name}</span>
                                <span className="text-gray-600 text-xs">{m.email}</span>
                            </div>
                            ))}
                        </div>
                        </td>
                        <td className="px-6 py-4 text-xs text-gray-500 font-mono align-top">
                        {new Date(team.registeredAt).toISOString().split('T')[0]}
                        </td>
                    </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Actions */}
        {teams.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/10 flex justify-end">
                <div className="flex items-center gap-4">
                     <div className="flex items-center text-red-500/50 text-xs font-mono uppercase">
                         <AlertTriangle className="h-3 w-3 mr-2" />
                         Critical Actions
                     </div>
                    <button onClick={handleClearData} disabled={isLoading} className="flex items-center px-4 py-2 border border-red-900/50 text-red-800 hover:border-red-500 hover:text-red-500 transition-colors font-mono text-xs uppercase disabled:opacity-50">
                        <Trash2 className="h-3 w-3 mr-2" /> CLEAR DATABASE
                    </button>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;