import React from 'react';

const imgUrl = {
  naver:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAMAAAAL34HQAAAAbFBMVEUttAD////7/vs0tgm956/I7L2V2X+I1G9TwS/X8c86uA/x+u9nyUdNvyeU2X2F02uw459GvR/k9t+r4Zr2/PWc3Ifn9uJuy0+25ad3zlpbxDmi3o/t+enE6rhjx0GP13fb8tR0zVfP7sXf89g4E0NLAAAFB0lEQVR4nNWc6ZrqIAyG00WrXazWuuu4nPu/x9NF7QZtAyng93Oe0XkHQoAkBCxJJbPtKj6F58gH8KNzeIpX21ki+60g+sH04V7iMHKAKScK44v7SNVi2cvLwWcD1eUfLktVWPZrF45AqqPZ02Ndd5vxTKU2u+vEWLcDlqnU4TYdlr2NxKByRVvMVI7HCnYIi2LJ3wXkWEnMcQUYOd5YhzYOK/XkmUrdx7myUVguevHxtXGJsJI/OqhcfyNmchArXREYVVPOanBRDmHtz9RQuc57OayZpFPgyZ/JYO2mgcq1E8ZKw+moAMI+V9GD9ZDYasYoeohgLScyq0o+/zDGxbqR+4WuHK7h87DW00PlXEcc1lwJVaYLBksZFcB8PNZWHRXAdizWUSUVwHoclquWCoCxHrtYSwWeoSnnNYz1mNyLduV3/H0by16opwJYtA9gbSyyQztOXj+WcnP/yO3D2mswrFJ+wsfSY1ilmubVwFK453Q152HtlXusupw9B0swGkOlAxtL2yr86MbCsglv9GKKbAaWVnsvNe9i/dNq76Uqq/9iadp1mvLaWFcDBisbrmsL666bqNS9iRVo2wyb8oMGlgHLsNS8jmXKYH2Hq8RSc4cepXUNizg6KqO/CivRzVLX9Ys1YdAPr8sXS+OhtKvFB2upm6Sp5RvLiO2w0v2NhZxDx2opbZ3U2jEFG/f9ixIrwH2qi2W9SLEgKLCwh+UuVssMZLHcAgtrWgwsuxErl8XyCixs+J2BZT0osRY5FtrFs7CsFSFWZlyA36aZWPU4gTTWMcNCey0mVv2KIo3lZVjofBMbq7axSmOFGRb61srBqryyNNbGghT7GS5W8plGaSwIAL9P87C+WQZ5rCXgcwNcrM8hVx7rCPg7Dx/r6hNhzeFEiPX2gfJYJ3hSYpXeRh7rCfg0eR9WMY3yWCHgyy/6sIpTkjzWGfDp+14s60SBtQB8aLIfK9gQYEWAjz70Y1kzAiwf8OG2ASwrlsdyKLBa2cD0X/sXBLAIJtG9t38iP4kEJu9Cf4kwHmtD4SBc2PQWIoqsRAJ3mrnQmBbrTLH5sDy7HFYI+LQYE2vTU4ErslUTHGyKaMGJEutEcQwsgxj8Gm+RYyDBobnE8rnTKHJoJrhivEM+BxaSGNYSsNEtPhbwStfwWCnF9fWD5XPeNohcXwku+9+43R8RVkgSGqnCiczKNbHQiHwgqcJymCXUaKw1SditFnw9k2Dt8yAlNofRh8Us2BQKUsqHdOtYTudoKhrSlQ6AN75gIY/l0qQLmv9Xt75VLF0gnVxpDXen/lAsuYItNhjCitr1h0isTyrK0MSdoWlO66Ibpa4qKXzVjVJXlUI3tODA1PIMQ4tZDC39MWa4WoVSppSVfTZUw4rwghaWGTUanZJFI4brW7FofDmsqcXDhpZam1qYbmoZv6GPHkx9ImIl+h7UNKMXP/H8yNTHWqY+bdNiXn6nFUP32eRL/bPJboLNhEemjH4arCe5iu9BrLj5Dz1gVroLsftC6H4cz36ErrmVAPOpdx+WmsYL3GTfr7WpyPz91E09etrs/F4LFMvQhjGWqe11JmtGNNTsbbij1Gr4r2C1Gvyjv9roKteR0MLI2oJlCsiich5hE7VMiUfRci6mbTmXy8gGfbmMbGdYyMTmj4WMbJVZ6PbENBZ9IgdKGCuTeW1Yv3ps45C7BqIw3vY0SZsQq9Q0LX7/A+4hO1TKyqqzAAAAAElFTkSuQmCC',
};
export default function NotLoggedInYet() {
  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
  const NAVER_REDIRECT_URI = "http://localhost:3000/auth"
  const STATE = "flase";
  const NAVER_AUTHORIZATION_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&response_type=code&redirect_uri=${NAVER_REDIRECT_URI}&state=${STATE}`;
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

        <li
          key={'naver'}
          className="border border-gray-300 w-full  my-3 flex justify-center py-2 rounded-lg"
        >
          <a
            href={NAVER_AUTHORIZATION_URL}
            className=" flex w-full  h-full  justify-center items-center"
          >
            <img
              src={imgUrl['naver']}
              alt=""
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="font-medium text-gray-500">Naver</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
