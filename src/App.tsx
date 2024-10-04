import BoardPage from './pages/board/board-page'
import { IconsProvider } from '@/providers/icons-provider'

export const HEIGHT = 600
export const WIDTH = 800

function App() {
    return (
        <IconsProvider>
            <BoardPage />
        </IconsProvider>
    )
}

export default App
