import BoardPage from './pages/board/board-page'
import { IconsProvider } from '@/providers/icons-provider'

function App() {
    return (
        <IconsProvider>
            <BoardPage />
        </IconsProvider>
    )
}

export default App
