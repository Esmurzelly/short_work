import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../assets/hard-work.png';
import { unfacedAvatar } from '../utils/expvars';
import Loader from './Loader';


export default function Header() {
  const { currentUser, loading, error } = useSelector(state => state.user);

  if (error) {
    return <p>Error while loading!</p>;
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className='w-full flex flex-row justify-between items-center fixed top-0 left-0 py-3 px-4 bg-beige'>
      <Link to={'/'}>
        <img className='w-8' src={Logo} alt="hard-work" />
      </Link>

      {currentUser?.avatar ? (
        <Link to={'/profile'}>
          <img className='w-6 h-6 block' src={
            currentUser?.avatar === unfacedAvatar
              ? `${currentUser?.avatar}`
              : currentUser?.avatar === null || undefined ? unfacedAvatar
                : `${import.meta.env.VITE_HOST}/static/userAvatar/${currentUser?.avatar}`
          } alt="avatar" />
        </Link>
      ) : (
        <Link to={'/profile'}>
          <img className='w-6 h-6 block' src={unfacedAvatar} />
        </Link>
      )}

    </div>
  )
}
