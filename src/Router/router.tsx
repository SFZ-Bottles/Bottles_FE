import { createBrowserRouter } from "react-router-dom";
import LogInPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignupPage";
import PrivateRouter from "./PrivateRouter";
import FeedPage from "../pages/FeedPage";
import SearchPage from "../pages/SearchPage";
import MessagePage from "../pages/MessagePage";
import AlbumPage from "../pages/AlbumsPage/AlbumsPage";
import SettingPage from "../pages/SettingPage";
import Pinpage from "../pages/PinPage";
import MainPage from "../pages/MainPage";
import NotFoundPage from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LogInPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    element: <PrivateRouter />,
    children: [
      {
        path: "/home",
        element: <MainPage />,
        children: [
          {
            path: "/home/feed",
            element: <FeedPage />,
          },
          {
            path: "/home/search",
            element: <SearchPage />,
          },
          {
            path: "/home/message",
            element: <MessagePage />,
          },
          {
            path: "/home/message/:targetId",
            element: <MessagePage />,
          },
          {
            path: "/home/album/:id",
            element: <AlbumPage />,
          },
          {
            path: "/home/setting",
            element: <SettingPage />,
          },
          {
            path: "/home/feed",
            element: <FeedPage />,
          },
          {
            path: "/home/pin",
            element: <Pinpage />,
          },
        ],
      },
    ],
  },
  {
    path: "/*",
    element: <NotFoundPage />,
  },
]);
