import Image from 'next/image';
import Link from 'next/link';
import { CiLogout } from 'react-icons/ci';
import {
  IoBasketOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoListOutline,
  IoPersonOutline,
  IoServer,
} from 'react-icons/io5';
import { SidebarItem } from './SidebarItem';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { LogoutButton } from './LogoutButton';

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
    path: '/dashboard/server-todos',
    icon: <IoListOutline size={30} />,
    title: 'Server Actions',
  },
  {
    path: '/dashboard/cookies',
    icon: <IoServer size={30} />,
    title: 'Cookies Page',
  },
  {
    path: '/dashboard/products',
    icon: <IoBasketOutline size={30} />,
    title: 'Productos',
  },
  {
    path: '/dashboard/profile',
    icon: <IoPersonOutline size={30} />,
    title: 'Perfil',
  },
];
export const Sidebar = async () => {
  const session = await getServerSession(authOptions);
  const userRoles = session?.user?.roles ?? ['client'];

  return (
    <aside className='ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]'>
      <div>
        <div className='-mx-6 px-6 py-4'>
          <Link href='/dashboard' title='home'>
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
            src={`${
              session.user?.image
                ? session.user?.image
                : 'https://images.unsplash.com/photo-1609151354448-c4a53450c6e9?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }`}
            width={112}
            height={112}
            alt='Bunny'
            className='w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28'
          />
          <h5 className='hidden mt-4 text-xl font-semibold text-gray-600 lg:block'>
            {session ? session.user?.name : 'Invitado'}
          </h5>
          <span className='hidden text-gray-400 lg:block capitalize'>
            {userRoles.join(', ')}
          </span>
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
        <LogoutButton />
      </div>
    </aside>
  );
};
