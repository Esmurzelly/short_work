import { useEffect } from 'react';
import { useState } from 'react';
import { Triangle } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsSun } from "react-icons/bs";
import { FaRegMoon } from "react-icons/fa";


export default function Header() {
  const { currentUser, loading, error } = useSelector(state => state.user);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light"
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", 'dark')
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", 'light')
    }
  }, [theme]);

  if (error) {
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

  const handleSwitchTeme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <div className='w-full flex flex-row justify-between items-center fixed top-0 left-0 p-5 text-black bg-white dark:text-white dark:bg-black'>
      <Link to={'/'}>
        <div>Logo</div>
      </Link>

      <button className='flex flex-row items-center gap-2' onClick={handleSwitchTeme}>
        <span>Change Theme</span>
        {theme === 'dark' ? <BsSun className='w-3' /> : <FaRegMoon className='w-3' />}
      </button>

      {currentUser?.avatar ? (
        <Link to={'/profile'}>
          <img className='w-6 h-6 block' src={
            currentUser?.avatar === 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s'
              ? `${currentUser?.avatar}`
              : currentUser?.avatar === null || undefined ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s'
                : `http://localhost:3000/static/userAvatar/${currentUser?.avatar}`
          } alt="avatar" />
        </Link>
      ) : (
        <Link to={'/profile'}>
          <img className='w-6 h-6 block' src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&s'} />
        </Link>
      )}

    </div>
  )
}
