import { useEffect } from 'react';
import { useState } from 'react';
import { Triangle } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsSun } from "react-icons/bs";
import { FaRegMoon } from "react-icons/fa";
import Logo from '../assets/hard-work.png';
import ChangeLanguage from './ChangeLanguage';
import { useTranslation } from 'react-i18next';
import { unfacedAvatar } from '../utils/expvars';


export default function Header() {
  const { currentUser, loading, error } = useSelector(state => state.user);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light"
  });
  const { t } = useTranslation();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", 'dark')
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", 'light');
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
    <div className='w-full flex flex-row justify-between items-center fixed top-0 left-0 p-4 text-black bg-white dark:text-white dark:bg-black'>
      <Link to={'/'}>
        <img className='w-8' src={Logo} alt="hard-work" />
      </Link>

      <button className='flex flex-row items-center gap-2' onClick={handleSwitchTeme}>
        <span>{t('change_theme')}</span>
        {theme === 'dark' ? <BsSun className='w-3' /> : <FaRegMoon className='w-3' />}
      </button>

      <ChangeLanguage />

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
