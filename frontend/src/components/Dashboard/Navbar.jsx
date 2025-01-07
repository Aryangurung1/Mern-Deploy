import { useAuth } from '../../context/authContext'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    
 
    const [currentSection, setCurrentSection] = useState('admin')

    useEffect(() => {
        // Check if we are on the employee-dashboard or admin-dashboard
        const currentPath = window.location.pathname;
        if (currentPath === '/employee-dashboard') {
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

    return (
        <div className='flex items-center text-white justify-between h-12 bg-blue-300 px-5'>
            <p>Welcome {user.name}</p>
            <div className='flex items-center gap-8'>
                {(user.roles.includes("hr") || user.roles.includes("accountant")) && (
                    <button
                        className='px-4 py-1 bg-blue-600 hover:bg-blue-800'
                        onClick={toggleSection}
                    >
                        {currentSection === 'employee' ? 'Admin section' : 'Employee section'}
                    </button>
                )}
                <button className='px-4 py-1 bg-blue-600 hover:bg-blue-800' onClick={logout}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar
