import HeaderBackground from '@/components/layout/header-bg'
import { Button } from '@/components/ui/button'
import { db, SavedAudioFile } from '@/lib/db'
import { useLiveQuery } from 'dexie-react-hooks'
import { AudioLinesIcon, ChevronLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'

export default function RecordedSpeechPage() {
    const { id, slot } = useParams()

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
                <span className="text-lg text-center">
                    Recorded Speech Viewer
                </span>
                <div className="w-full flex flex-row gap-4 items-center justify-between">
                    <Link
                        to={`/recordings/${id}/${slot}/microphone`}
                        className="flex flex-row gap-2 items-center justify-end cursor-pointer w-full"
                    >
                        <AudioLinesIcon className="h-6 w-6" />
                        <span className="text-sm hidden md:block">
                            Create Recording
                        </span>
                    </Link>
                </div>
            </HeaderBackground>
            <div className="flex flex-col px-2">
                {files?.map((file) => (
                    <div
                        key={file.id}
                        className="grid grid-cols-1 lg:grid-cols-2 items-center gap-2 bg-white rounded p-4"
                    >
                        <div className="flex flex-col gap-2 w-full">
                            <span>{file.label}</span>
                            <span>{file.timestamp}</span>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <audio
                                className="w-full"
                                controls
                                src={URL.createObjectURL(
                                    new Blob([file.file.buffer])
                                )}
                            />
                            <div className="flex flex-row justify-between">
                                <Button>Select</Button>
                                <Button
                                    onClick={() => {
                                        const new_name = prompt(
                                            'Enter label for recording',
                                            file.label
                                        )

                                        if (new_name) {
                                            db.recordings.update(file.id, {
                                                label: new_name
                                            })
                                        }
                                    }}
                                >
                                    Edit Name
                                </Button>
                                <Button
                                    variant={'destructive'}
                                    onClick={() => {
                                        db.recordings
                                            .delete(file.id)
                                            .then(() => {
                                                toast.success(
                                                    'Recording deleted'
                                                )
                                            })
                                    }}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
