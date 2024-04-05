import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import {
    createBrowserRouter,
    redirect,
    RouterProvider,
} from "react-router-dom";

import App from './App'
import AlbumInfo from './pages/AlbumInfo';
import './index.css'
import { getAlbumInfo } from './lib/axios';
import AlbumNotFound from './errs/AlbumNotFound';
import PageNotFound from './errs/PageNotFound';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/album/:albumId",
        element: <AlbumInfo />,
        loader: async ({ params }) => {
            try {
                const album = await getAlbumInfo(params.albumId);
                return album;
            } catch (error) {
                window.location.href = '/';
            }
        },
        errorElement: <AlbumNotFound />
    },
    {
        path: "*",
        element: <PageNotFound />
    }

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <NextUIProvider>
        <RouterProvider router={router} />

    </NextUIProvider>
)
