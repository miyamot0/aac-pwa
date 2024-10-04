import BoardMenuBar from './views/menubar'
import BoardFrame from './views/frame'
import BoardField from './views/field'

export default function BoardPage() {
    return (
        <div className="flex flex-col w-full min-h-screen px-2 gap-2 pt-2">
            <BoardMenuBar />
            <BoardFrame />
            <BoardField />
        </div>
    )
}
