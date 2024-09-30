import { IconsProvider } from './providers/icons-provider'
import TempHomePage from './pages/temp/TempHome'

// TODO: will need to cast these on initial load

export const HEIGHT = 600
export const WIDTH = 800

function App() {
    return (
        <div className="flex flex-row w-full justify-center">
            <IconsProvider>
                <TempHomePage />
            </IconsProvider>
        </div>
    )
}

export default App
