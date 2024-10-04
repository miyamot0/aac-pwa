import BoardMenuBar from './menu/menubar'
import BoardFrame from './views/frame'
import BoardField from './views/field'

export default function BoardPage() {
    return (
        <div className="flex flex-col w-full min-h-screen px-2 gap-2 pt-2 select-none">
            <BoardMenuBar />
            <BoardFrame />
            <BoardField />
        </div>
    )
}
