import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom'
import BoardPage from './pages/board/board-page'
import { IconsProvider } from '@/providers/icons-provider'
import IconEditorPage from './pages/editor/icons/icon-editor'
import { IconEditorLoader } from './pages/editor/icons/icon-editor-loader'
import SettingsPage from './pages/editor/settings/settings-page'
import CameraPage from './pages/capture/camera/camera-page'
import FileSystemPage from './pages/gallery/images/image-viewer-page'
import HomePage from './pages/home/home-page'
import {
    AUDIO_CAPTURE_PAGE,
    BOARD_PAGE,
    CAMERA_CAPTURE_PAGE,
    DOCS_PAGE,
    ICON_EDITOR_AUDIO_GALLERY_PAGE,
    ICON_EDITOR_GALLERY_PAGE,
    ICON_EDITOR_PAGE,
    SETTINGS_PAGE
} from './lib/links'
import DocumentationPage from './pages/docs/documentation-page'
import RecordedSpeechPage from './pages/gallery/speech/recorded-speech-page'
import AudioRecorderPage from './pages/capture/audio/audio-recording-page'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<HomePage />} />
            <Route path={BOARD_PAGE} element={<BoardPage />} />
            <Route path={SETTINGS_PAGE} element={<SettingsPage />} />
            <Route path={DOCS_PAGE} element={<DocumentationPage />} />
            <Route
                path={ICON_EDITOR_PAGE}
                element={<IconEditorPage />}
                loader={IconEditorLoader}
            />
            <Route
                path={ICON_EDITOR_GALLERY_PAGE}
                element={<FileSystemPage />}
            />
            <Route path={CAMERA_CAPTURE_PAGE} element={<CameraPage />} />
            <Route
                path={ICON_EDITOR_AUDIO_GALLERY_PAGE}
                element={<RecordedSpeechPage />}
            />
            <Route path={AUDIO_CAPTURE_PAGE} element={<AudioRecorderPage />} />
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
