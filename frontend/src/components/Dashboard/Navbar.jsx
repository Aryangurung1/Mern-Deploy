import { useAuth } from '../../context/authContext'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, SwitchCamera } from 'lucide-react'

const Navbar = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    
    const [currentSection, setCurrentSection] = useState('admin')

    useEffect(() => {
        // Check if we are on the employee-dashboard or admin-dashboard
        const currentPath = window.location.pathname;
        if (currentPath.includes('employee-dashboard')) {
            setCurrentSection('employee')
        } else {
            setCurrentSection('admin')
        }
    }, [])

    const toggleSection = () => {
        if (currentSection === 'admin') {
            setCurrentSection('employee') 
            navigate('/employee-dashboard') 
        } else {
            setCurrentSection('admin') 
            navigate('/admin-dashboard')
        }
    }

    // Ensure roles is always an array
    const userRoles = user?.roles || [user?.role] || [];

    return (
        <>
            <div className='h-16'></div> {/* Spacer div to prevent content overlap */}
            <div className='flex items-center justify-between h-16 bg-white border-b border-gray-200 px-4 fixed top-0 right-0 left-64 z-10'>
                <div className='flex items-center gap-2'>
                    <span className='text-gray-500'>Welcome,</span>
                    <span className='font-medium text-gray-700'>{user?.name}</span>
                </div>
                <div className='flex items-center gap-3'>
                    {userRoles.some(role => ["hr", "accountant"].includes(role)) && (
                        <button
                            className='inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors duration-200'
                            onClick={toggleSection}
                        >
                            <SwitchCamera className="w-4 h-4" />
                            <span>{currentSection === 'employee' ? 'Switch to Admin' : 'Switch to Employee'}</span>
                        </button>
                    )}
                    <button 
                        className='inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-200' 
                        onClick={logout}
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Navbar
