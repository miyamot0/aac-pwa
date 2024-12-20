import BoardMenuBar from './menu/menubar'
import BoardFrame from './views/frame'
import BoardField from './views/field'

export default function BoardPage() {
    return (
        <div className="flex flex-col w-full h-full gap-2 select-none">
            <BoardMenuBar />
            <BoardFrame />
            <BoardField />
        </div>
    )
}
