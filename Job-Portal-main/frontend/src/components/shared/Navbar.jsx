import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Menu, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  const profilePhoto = user?.profile?.profilePhoto || 
    "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg";

  // ✅ Define menus based on role
  const studentMenu = (
    <>
      <Link to="/" >Home</Link>
      <Link to="/jobs" >Jobs</Link>
      <Link to="/browse">Browse</Link>
    </>
  );

  const adminMenu = (
    <>
      <Link to="/admin/companies">Companies</Link>
      <Link to="/admin/jobs">Jobs</Link>
    </>
  );

  const menuLinks = user?.role === "recruiter" ? adminMenu : studentMenu;

  return (
    <div className="bg-white shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-7xl px-4 md:px-8 h-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-blue-700">Rojgaar
            <span className="text-red-400">Nepal</span>
          </h1>
          <div className="w-6 h-6">
            <img
              className="w-full h-full object-center"
              src="https://giwmscdnone.gov.np/static/grapejs/img/Nepal-flag.gif"
              alt="Nepal Flag"
            />
          </div>
        </div>

        {/* Hamburger (Mobile) */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu (Desktop) */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex items-center gap-4">
            {menuLinks}
          </ul>

          {!user ? (
            <div className="flex gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#578e4f] hover:bg-[#4c664e]">Signup</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar>
                    <AvatarImage src={profilePhoto} />
                  </Avatar>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-72">
                <div className="flex gap-4 space-y-2">
                  <Avatar>
                    <AvatarImage src={profilePhoto} />
                  </Avatar>
                  <div>
                    <h1>Hi, {user.fullname}</h1>
                    <h2 className="text-sm text-muted-foreground">{user.role}</h2>
                  </div>
                </div>
                <div className="flex flex-col my-2 gap-3 text-gray-500">
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <User2 />
                    <Button variant="link"><Link to="/profile">View profile</Link></Button> 
                  </div>
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 bg-white shadow-inner">
          <ul className="flex flex-col gap-3">
            {menuLinks}
          </ul>

          {!user ? (
            <div className="flex flex-col gap-2 mt-4">
              <Link to="/login">
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] w-full">Signup</Button>
              </Link>
            </div>
          ) : (
            <div className="mt-4 space-y-2 text-gray-600">
              <div className="flex items-center gap-2">
                <User2 />
                <Button variant="link"><Link to="/profile">View profile</Link></Button>
              </div>
              <div className="flex items-center gap-2">
                <LogOut />
                <Button onClick={logoutHandler} variant="link">Logout</Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
