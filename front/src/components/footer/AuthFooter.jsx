import { Link, useLocation } from 'react-router-dom'

const AuthFooter = () => {
  const location = useLocation();

  return (
    <div className='containers auth-footer border-t-[1px] border-white/30 py-6 md:flex md:justify-between w-full'>
      <ul className='flex items-center justify-center md:justify-start'>
        <li className='mx-3'>
            <Link to="/" className='text-custom opacity-80 hover:opacity-100 default-transition font-bold'>Foto Idol</Link>
        </li>
        <li className={`mx-3 ${location.pathname === "/auth/login" ? "hidden" : ""}`}>
            <Link to="/auth/login" className='text-custom opacity-80 hover:opacity-100 default-transition font-medium'>Back to Login</Link>
        </li>
        <li className={`mx-3 ${location.pathname === "/auth/register" ? "hidden" : ""}`}>
            <Link to="/auth/register" className='text-custom opacity-80 hover:opacity-100 default-transition font-medium'>Register Here</Link>
        </li>
      </ul>
      <div className="text-sm text-custom font-medium text-center mt-4 md:mt-0 opacity-80 md:text-end">
        &copy; Design and Developed by{" "}
        <span className="font-bold">Faith Tech.</span>
        </div>
    </div>
  )
}

export default AuthFooter
