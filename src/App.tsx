import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom'
import BoardPage from './pages/board/board-page'
import { IconsProvider } from '@/providers/icons-provider'
import IconEditorPage from './pages/icons/icon-editor'
import SettingsPage from './pages/settings/settings-page'
import CameraPage from './pages/camera/camera-page'
import FileSystemPage from './pages/files/file-system-page'
import LandingPage from './pages/landing/landing-page'
import {
    BOARD_PAGE,
    CAMERA_PAGE,
    IMAGES_PAGE,
    SETTINGS_PAGE
} from './lib/links'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<LandingPage />} />
            <Route path={BOARD_PAGE} element={<BoardPage />} />
            <Route path={SETTINGS_PAGE} element={<SettingsPage />} />
            <Route path={CAMERA_PAGE} element={<CameraPage />} />
            <Route path={IMAGES_PAGE} element={<FileSystemPage />} />
            <Route path={'/icons/:index/:id'} element={<IconEditorPage />} />
        </Route>
    )
)

function App() {
    return (
        <IconsProvider>
            <RouterProvider
                future={{ v7_startTransition: true }}
                router={router}
            />
        </IconsProvider>
    )
}

export default App
