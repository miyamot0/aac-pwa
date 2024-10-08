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

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<BoardPage />} />
            <Route path={'/settings'} element={<SettingsPage />} />
            <Route path={'/camera'} element={<CameraPage />} />
            <Route path={'/files'} element={<FileSystemPage />} />
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
