import { useLiveQuery } from 'dexie-react-hooks'
import { db, SavedFile } from '@/lib/db'
import HeaderBackground from '@/components/layout/header-bg'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

export default function FileSystemPage() {
    const files: SavedFile[] | undefined = useLiveQuery(() =>
        db.files.toArray()
    )

    return (
        <div className="flex flex-col gap-2">
            <HeaderBackground className="grid grid-cols-3">
                <Link
                    to="/"
                    className="flex flex-row gap-2"
                    unstable_viewTransition={true}
                >
                    <ChevronLeft className="h-6 w-6" />
                    Back
                </Link>
                <span className="text-lg text-center">Saved Image Assets</span>
            </HeaderBackground>
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
