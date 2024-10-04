import { DeleteIcon, Volume2 } from 'lucide-react'

export default function BoardFrame() {
    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-8 h-[15vh] text-center gap-8">
                <div className="col-span-7 bg-white rounded border border-black flex flex-row justify-between items-center px-4">
                    <div className="flex flex-row gap-2">
                        <div>...</div>
                        <div>...</div>
                        <div>...</div>
                    </div>
                    <DeleteIcon size={64} />
                </div>
                <div className="col-span-1 bg-white rounded border border-black flex flex-row justify-center items-center">
                    <Volume2 size={64} />
                </div>
            </div>
        </div>
    )
}
