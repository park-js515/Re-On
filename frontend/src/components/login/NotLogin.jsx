import NaverLogin from './NaverLogin';

export default function NotLoggedInYet() {
  return (
    <div className="w-full flex justify-center items-center flex-col  h-3/5">
      <ul className="w-3/5 ">
        <div className=" flex w-full  items-center pb-4">
          <div className="flex-grow h-px bg-gray-400"></div>
          <span className="flex-shrink  text-gray-500 px-4 italic font-light text-sm">
            Login
          </span>
          <div className="flex-grow h-px bg-gray-400"></div>
        </div>

        <li key={'naver'} className="w-full my-3 flex justify-center py-2">
          <NaverLogin />
        </li>
      </ul>
    </div>
  );
}
