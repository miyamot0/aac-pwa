import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom'
import BoardPage from './pages/board/board-page'
import { IconsProvider } from '@/providers/icons-provider'
import IconEditorPage from './pages/icons/icon-editor'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<BoardPage />} />
            <Route path={'/icon/:id'} element={<IconEditorPage />} />
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
