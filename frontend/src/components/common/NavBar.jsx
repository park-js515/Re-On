import { Fragment, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { searchMypageMemberInfo } from 'apiList/member';

const navigation = [
  { name: '같이하기', to: '/rank', current: false },
  { name: '혼자하기', to: '/normallist', current: false },
  { name: '투표해줘', to: '/feed', current: false },
  { name: 'FAQ', to: '/faq', current: false },
  { name: '팀문화', to: '/team', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const userIsLogin = useSelector((state) => state.user.isLogin);
  const [profileImg, setProfileImg] = useState(null);
  // const id = localStorage.getItem('id');

  useEffect(() => {
    if (userIsLogin) {
      setProfileImg('/image/login/LoginDefaultImg.png');

      // 프로필 이미지를 받아올 수 있으면 이렇게 하겠슴둥.
      // searchMypageMemberInfo(
      //   1,
      //   (res) => {
      //     if (res.data.response.profileImg) {
      //       setProfileImg(res.data.response.profileImg);
      //     }
      //   },
      //   (error) => {
      //     console.error(error);
      //   },
      // );
    } 
  }, [userIsLogin]);

  return (
    <div className="sticky top-0 z-50">
      <Disclosure as="nav" className="bg-white">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Link to="/">
                      <img
                        className="h-10 w-auto"
                        src="/image/logo/logo.png"
                        alt="Your Company"
                      />
                    </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.to}
                          className={classNames(
                            item.current
                              ? 'bg-gray-900 text-lightBlue'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-lightBlue',
                            'rounded-md px-3 py-2 text-sm font-medium',
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <Menu as="div" className="relative ml-3">
                    <div>
                      {userIsLogin ? (
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-lightBlue focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={profileImg}
                            alt="profileImg"
                          />
                        </Menu.Button>
                      ) : (
                        <Link
                          to="/login"
                          className="hover:text-lightBlue cursor-pointer"
                        >로그인</Link>
                      )}
                    </div>
                    <Transition as={Fragment}>
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userIsLogin ? (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/mypage"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700',
                                )}
                              >
                                마이페이지
                              </Link>
                            )}
                          </Menu.Item>
                        ) : null}
                        {userIsLogin ? (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/logout"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700',
                                )}
                              >
                                로그아웃
                              </Link>
                            )}
                          </Menu.Item>
                        ) : null}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      as={Link}
                      key={item.name}
                      to={item.to}
                      className={classNames(
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium',
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </div>
          </>
        )}
      </Disclosure>
    </div>
  );
}
