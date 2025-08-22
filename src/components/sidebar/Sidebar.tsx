import Image from 'next/image';
import Link from 'next/link';
import { CiLogout } from 'react-icons/ci';
import {
  IoCalendarOutline,
  IoCheckboxOutline,
  IoListOutline,
} from 'react-icons/io5';
import { SidebarItem } from './SidebarItem';

const menuItems = [
  {
    path: '/dashboard',
    icon: <IoCalendarOutline size={30} />,
    title: 'Dashboard',
  },
  {
    path: '/dashboard/rest-todos',
    icon: <IoCheckboxOutline size={30} />,
    title: 'Rest TODOS',
  },
  {
    path: '/dashboard/server-tools',
    icon: <IoListOutline size={30} />,
    title: 'Server Actions',
  },
];
export const Sidebar = () => {
  return (
    <aside className='ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]'>
      <div>
        <div className='-mx-6 px-6 py-4'>
          {/* TODO: Next/Link hacia dashboard */}
          <Link href='/dashboard' title='home'>
            {/* Next/Image */}
            <Image
              src='https://be4writing.com/img/b4wver3.876c1fae.png'
              width={128}
              height={32}
              className='w-32'
              alt='be4writing logo'
            />
          </Link>
        </div>

        <div className='mt-8 text-center'>
          {/* Next/Image */}
          <Image
            src='https://images.unsplash.com/photo-1609151354448-c4a53450c6e9?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            width={112}
            height={112}
            alt='Bunny'
            className='w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28'
          />
          <h5 className='hidden mt-4 text-xl font-semibold text-gray-600 lg:block'>
            Ms. Bunny
          </h5>
          <span className='hidden text-gray-400 lg:block'>Admin</span>
        </div>

        <ul className='space-y-2 tracking-wide mt-8'>
          {/* TODO: src/components <SidebarItem /> */}
          {/* Active className: text-white bg-gradient-to-r from-sky-600 to-cyan-400 */}
          {menuItems.map((item) => (
            <SidebarItem key={item.path} {...item} />
          ))}
        </ul>
      </div>

      <div className='px-6 -mx-6 pt-4 flex justify-between items-center border-t'>
        <button className='px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group'>
          <CiLogout />
          <span className='group-hover:text-gray-700'>Logout</span>
        </button>
      </div>
    </aside>
  );
};
