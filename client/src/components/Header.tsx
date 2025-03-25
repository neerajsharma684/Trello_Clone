import trello from '../assets/trello.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { IoClose, IoLogOutOutline } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/slices/authSlice';
import Loader from './Loader';

const Header = () => {
  const [search, setSearch] = useState('');
  const { user, loading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (loading) {
    return <Loader />; // Show loading state until the user data is fetched from persisted state
  }

  return (
    <div className="flex justify-between items-center bg-blue-400 text-white p-2 shadow-md">
      <div className="flex items-center gap-3 self-baseline" aria-label="Trello Clone">
        <img src={trello} alt="Trello Logo" className="w-20 h-20" />
        <span className="text-xl font-bold">Trello Clone</span>
      </div>
      <div className="relative bg-white focus:outline-none focus:border-blue-500 flex items-center rounded-full px-4">
        <button className='hover: cursor-pointer'><FaSearch className=" text-gray-700" /></button>
        <input
          className="input rounded-full px-8 py-3 border-2 border-transparent bg-transparent focus:outline-none placeholder-gray-400 text-black transition-all duration-300"
          placeholder="Search..."
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => setSearch('')} className='hover: cursor-pointer'>
          <IoClose className=" text-gray-700" />
        </button>
      </div>
      <div className='flex gap-4 justify-between items-center'>Welcome, {user ? user.Name : 'Guest'}
      <button className="hover: cursor-pointer" onClick={() => {dispatch(logout())
      navigate('/login')
      }}><IoLogOutOutline className=" text-red-700 text-3xl"/></button>
      </div>
    </div>
  );
}

export default Header;
