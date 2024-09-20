import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


export default function Header() {
  const { currentUser, loading, error } = useSelector(state => state.user);
  

  if (loading) {
    return <p>Loading...</p>;
  };
  
  if(error) {
    return <p>Error while loading!</p>;
  }

  return (
    <div className='w-full flex flex-row justify-between items-center fixed top-0 left-0 bg-white p-2'>
      <Link to={'/'}>
        <div>Logo</div>
      </Link>
      <input type="text" />
      {currentUser?.avatar ? (
        <Link to={'/profile'}>
          <img className='w-6 h-6 block' src={currentUser.avatar} alt="avatar" />
        </Link>
      ) : (
        <p>No Avatar</p>
      )}

    </div>

  )
}
