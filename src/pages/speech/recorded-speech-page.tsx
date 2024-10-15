import HeaderBackground from '@/components/layout/header-bg'
import { Button } from '@/components/ui/button'
import { db, SavedAudioFile } from '@/lib/db'
import { useLiveQuery } from 'dexie-react-hooks'
import { AudioLinesIcon, ChevronLeft, TrashIcon } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'

export default function RecordedSpeechPage() {
    const { id, slot } = useParams()

    if (!id || !slot) throw new Error('No ID provided')

    const files: SavedAudioFile[] | undefined = useLiveQuery(() =>
        db.recordings.toArray()
    )

    async function removeRecordingFromIcon() {
        if (!id) return

        const id_n = parseInt(id)

        if (!id_n) return

        const icon_in_db = await db.icons.get(id_n)

        if (!icon_in_db) return

        if (slot === 'L1') {
            const L1 = {
                ...icon_in_db.L1,
                Recording: undefined
            }

            db.icons.update(icon_in_db, { L1 }).then(() => {
                toast.success('Recording removed from icon')
            })
        } else if (slot === 'L2') {
            const L2 = {
                ...icon_in_db.L2,
                Recording: undefined
            }

            db.icons.update(icon_in_db, { L2 }).then(() => {
                toast.success('Recording removed from icon')
            })
        }
    }

    async function addRecordingToIcon(file: SavedAudioFile) {
        if (!id) return

        const id_n = parseInt(id)

        if (!id_n) return

        const icon_in_db = await db.icons.get(id_n)

        if (!icon_in_db) return

        if (slot === 'L1') {
            const L1 = {
                ...icon_in_db.L1,
                Recording: file.file.buffer
            }

            db.icons
                // @ts-expect-error type error?
                .update(icon_in_db, { L1 })
                .then(() => {
                    toast.success('Recording added to icon')
                })
        } else if (slot === 'L2') {
            const L2 = {
                ...icon_in_db.L2,
                Recording: file.file.buffer
            }

            db.icons
                // @ts-expect-error type error?
                .update(icon_in_db, { L2 })
                .then(() => {
                    toast.success('Recording added to icon')
                })
        }
    }

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
                    <div
                        className="flex flex-row gap-2 items-center justify-end cursor-pointer w-full"
                        onClick={() => removeRecordingFromIcon()}
                    >
                        <TrashIcon className="h-6 w-6" />
                        <span className="text-sm hidden md:block">Delete</span>
                    </div>

                    <Link
                        to={`/recordings/${id}/${slot}/microphone`}
                        className="flex flex-row gap-2 items-center justify-end cursor-pointer w-full"
                    >
                        <AudioLinesIcon className="h-6 w-6" />
                        <span className="text-sm hidden md:block">Create</span>
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
                                <Button
                                    onClick={() => {
                                        addRecordingToIcon(file)
                                    }}
                                >
                                    Select
                                </Button>
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