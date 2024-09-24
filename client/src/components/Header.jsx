import { Triangle } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


export default function Header() {
  const { currentUser, loading, error } = useSelector(state => state.user);
  
  if(error) {
    return <p>Error while loading!</p>;
  }

  if (loading) {
    return <div className='w-full min-h-screen flex items-center justify-center'>
        <Triangle
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    </div>
}

  return (
    <div className='w-full flex flex-row justify-between items-center fixed top-0 left-0 bg-white p-2'>
      <Link to={'/'}>
        <div>Logo</div>
      </Link>
      <input type="text" />
      {currentUser?.avatar ? (
        <Link to={'/profile'}>
          <img className='w-6 h-6 block' src={`http://localhost:3000/static/userAvatar/${currentUser?.avatar}`} alt="avatar" />
        </Link>
      ) : (
        <p>No Avatar</p>
      )}

    </div>
  )
}
