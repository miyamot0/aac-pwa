import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom'
import BoardPage from './pages/board/board-page'
import { IconsProvider } from '@/providers/icons-provider'
import IconEditorPage from './pages/icons/icon-editor'
import { IconEditorLoader } from './pages/icons/icon-editor-loader'
import SettingsPage from './pages/settings/settings-page'
import CameraPage from './pages/camera/camera-page'
import FileSystemPage from './pages/files/image-viewer-page'
import LandingPage from './pages/landing/landing-page'
import { BOARD_PAGE, DOCS_PAGE, SETTINGS_PAGE } from './lib/links'
import DocumentationPage from './pages/docs/documentation-page'
import RecordedSpeechPage from './pages/speech/recorded-speech-page'
import AudioRecorderPage from './pages/audio/audio-recording-page'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<LandingPage />} />
            <Route path={BOARD_PAGE} element={<BoardPage />} />
            <Route path={SETTINGS_PAGE} element={<SettingsPage />} />
            <Route path={DOCS_PAGE} element={<DocumentationPage />} />
            <Route
                path={'/icons/:id'}
                element={<IconEditorPage />}
                loader={IconEditorLoader}
            />
            <Route path={'/icons/:id/:slot'} element={<FileSystemPage />} />
            <Route path={'/icons/:id/:slot/camera'} element={<CameraPage />} />
            <Route
                path={'/recordings/:id/:slot'}
                element={<RecordedSpeechPage />}
            />
            <Route
                path={'/recordings/:id/:slot/microphone'}
                element={<AudioRecorderPage />}
            />
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
