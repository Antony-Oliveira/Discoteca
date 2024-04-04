import React from 'react'
import ReactDOM from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import App from './App'
import AlbumInfo from './pages/AlbumInfo';
import './index.css'
import { getAlbumInfo } from './lib/axios';

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
    },
    {
        path: "/album/:albumId",
        element: <AlbumInfo />,
        loader: async ({ params }) => {
            const album = await getAlbumInfo(params.albumId);
            console.log(album);

            return album;
        }

    }
  ]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <NextUIProvider>
    <RouterProvider router={router} />

    </NextUIProvider>
)
