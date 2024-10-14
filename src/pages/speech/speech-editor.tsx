import HeaderBackground from '@/components/layout/header-bg'
import { db, SavedAudioFile } from '@/lib/db'
import { useLiveQuery } from 'dexie-react-hooks'
import { ChevronLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

export default function SpeechEditor() {
    const { id, slot } = useParams()
    //const navigation = useNavigate()

    if (!id || !slot) throw new Error('No ID provided')

    const files: SavedAudioFile[] | undefined = useLiveQuery(() =>
        db.recordings.toArray()
    )

    return (
        <div className="flex flex-col gap-2">
            <HeaderBackground className="grid grid-cols-3">
                <Link
                    to={`/icons/${id}`}
                    className="flex flex-row gap-2"
                    unstable_viewTransition={true}
                >
                    <ChevronLeft className="h-6 w-6" />
                    Back
                </Link>
                <span className="text-lg text-center">Speech Entry Editor</span>
                <div className="w-full flex flex-row gap-4 items-center justify-between">
                    <div
                        className="flex flex-row gap-2 items-center justify-end cursor-pointer"
                        onClick={() => {}}
                    >
                        ...icon...
                        <span className="text-sm hidden md:block">Save</span>
                    </div>
                </div>
            </HeaderBackground>
            <div className="flex flex-row justify-center px-2">
                {files?.map((file) => (
                    <div key={file.id} className="flex flex-col gap-2">
                        <span>{file.label}</span>
                        <span>{file.language}</span>
                        <span>{file.timestamp}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
