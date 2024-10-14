import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../assets/hard-work.png';
import { unfacedAvatar } from '../utils/expvars';
import Loader from './Loader';


export default function Header({ isAuth }) {
  const { currentUser } = useSelector(state => state.user);

  if (!isAuth) return <div className='hidden'></div>;

  return (
    <div className='w-full flex flex-row justify-between items-center fixed top-0 left-0 py-3 px-4 bg-[#2A4BA0] shadow-xl rounded-b-lg z-50'>
      <Link to={'/'}>
        <img className='w-8' src={Logo} alt="hard-work" />
      </Link>

      {currentUser?.avatar ? (
        <Link to={'/profile'}>
          <img className='w-6 h-6 object-cover block'
            src={(currentUser?.avatar === null || currentUser?.avatar === undefined || !currentUser?.avatar) ? unfacedAvatar
              : (currentUser?.avatar.includes('https://lh3.googleusercontent.com') || currentUser?.avatar.includes('https://encrypted-tbn0.gstatic.com')) ? `${currentUser?.avatar}`
                : `${import.meta.env.VITE_HOST}/static/userAvatar/${currentUser?.avatar}`}

            alt="avatar" />
        </Link>
      ) : (
        <Link to={'/profile'}>
          <img className='w-6 h-6 block' src={unfacedAvatar} />
        </Link>
      )}

    </div>
  )
}
