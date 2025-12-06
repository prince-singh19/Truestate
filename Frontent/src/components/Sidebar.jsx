
import React, { useState } from 'react';
import { LayoutDashboard, Radio, FileText, Settings, ShieldCheck, FileInput, ChevronDown, ChevronUp } from 'lucide-react';

const NavItem = ({ icon, label, isActive = false }) => (
    <a href="#" 
        className={`w-full flex items-center gap-3 px-6 py-2.5 text-sm font-medium transition-colors ${
            isActive 
                ? 'text-blue-700 bg-blue-50 border-r-4 border-blue-500 font-semibold'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
        }`}
    >
        {icon}
        {label}
    </a>
);


const Sidebar = () => {
    const [isServicesOpen, setIsServicesOpen] = useState(true);
    const [isInvoicesOpen, setIsInvoicesOpen] = useState(true);

    return (
        <div className="w-64 bg-white h-screen border-r border-gray-200 flex flex-col sticky top-0 font-sans z-20 shrink-0">
            {/* Logo Section */}
            <div className="h-16 flex items-center px-5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
                        T
                    </div>
                    <div className="flex flex-col justify-center leading-none">
                        <div className="font-bold text-gray-900 text-[15px]">TrueState</div>
                        <div className="text-[11px] text-gray-500 mt-1">Prince Singh</div>
                    </div>
                </div>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 py-5 space-y-1 overflow-y-auto custom-scrollbar">
                {/* Active Link */}
                <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" isActive={true} />
                <NavItem icon={<Radio size={18} />} label="Nexus" />
                <NavItem icon={<FileInput size={18} />} label="Intake" />
                
                {/* Services Dropdown Header */}
                <button 
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className="w-full flex items-center justify-between px-6 mt-6 mb-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider hover:text-gray-600 focus:outline-none"
                >
                    <span>Services</span>
                    {isServicesOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                
                {/* Services List (Collapsible) */}
                {isServicesOpen && (
                    <div className="space-y-1">
                         {}
                         <NavItem icon={<ShieldCheck size={18} />} label="Pre-active" />
                         <NavItem icon={<Settings size={18} />} label="Active" />
                         <NavItem icon={<FileText size={18} />} label="Blocked" />
                         <NavItem icon={<FileText size={18} />} label="Closed" />
                    </div>
                )}
                
                {/* Invoices Dropdown Header */}
                <button 
                    onClick={() => setIsInvoicesOpen(!isInvoicesOpen)}
                    className="w-full flex items-center justify-between px-6 mt-6 mb-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider hover:text-gray-600 focus:outline-none"
                >
                    <span>Invoices</span>
                    {isInvoicesOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>

                {isInvoicesOpen && (
                    <div className="space-y-1">
                        {/* Highlighting 'Proforma Invoices' as the currently active section based on the screenshot */}
                        <a href="#" className="w-full flex items-center gap-3 px-6 py-2.5 text-sm font-medium bg-gray-100 text-gray-900 border-r-4 border-gray-400">
                             <FileText size={18} /> Proforma Invoices
                        </a>
                        <NavItem icon={<FileText size={18} />} label="Final Invoices" />
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Sidebar;