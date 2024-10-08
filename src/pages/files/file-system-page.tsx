import { useLiveQuery } from 'dexie-react-hooks'
import { db, SavedFile } from '@/lib/db'

export default function FileSystemPage() {
    const files: SavedFile[] | undefined = useLiveQuery(() =>
        db.files.toArray()
    )

    return (
        <div className="w-full px-2">
            <div>Header TODO</div>
            <div className="flex flex-col w-full max-w-screen-lg">
                <h1>File System</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {files?.map((entry, index) => {
                        const blob = new Blob([entry.file], {
                            type: 'image/png'
                        })
                        const url = URL.createObjectURL(blob)

                        return (
                            <img
                                key={index}
                                src={url}
                                className="object-scale-down max-sm:"
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
