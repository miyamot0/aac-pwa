import HeaderBackground from '@/components/layout/header-bg'
import { Button, buttonVariants } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { db, SavedAudioFile } from '@/lib/db'
import { cn } from '@/lib/utils'
import { useLiveQuery } from 'dexie-react-hooks'
import {
    AudioLinesIcon,
    ChevronLeft,
    Edit2Icon,
    HeadphonesIcon,
    TrashIcon
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'

export default function RecordedSpeechPage() {
    const { id, slot } = useParams()

    if (!id || !slot) throw new Error('No ID provided')

    const files: SavedAudioFile[] | undefined = useLiveQuery(() =>
        db.recordings.toArray()
    )

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
                    replace
                    to={`/icons/${id}`}
                    className="flex flex-row gap-2"
                    unstable_viewTransition={true}
                >
                    <ChevronLeft className="h-6 w-6" />
                    Back
                </Link>
                <span className="text-lg text-center">Audio Asset Gallery</span>
                <div className="w-full flex flex-row justify-end">
                    <Link
                        replace
                        to={`/recordings/${id}/${slot}/microphone`}
                        className={cn(
                            buttonVariants({ variant: 'outline' }),
                            'flex flex-row gap-2 items-center justify-end bg-transparent border-none'
                        )}
                    >
                        <AudioLinesIcon className="h-6 w-6" />
                        <span className="text-sm hidden md:block">
                            Capture New Audio
                        </span>
                    </Link>
                </div>
            </HeaderBackground>
            <div className="flex flex-col px-2 gap-4 max-w-screen-md w-full mx-auto">
                {files?.map((file) => (
                    <Card key={file.id}>
                        <CardHeader>
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-col gap-1">
                                    <CardTitle>
                                        Audio Name: {file.label}
                                    </CardTitle>
                                    <CardDescription>
                                        Recording Date:{' '}
                                        {new Date(
                                            file.timestamp
                                        ).toLocaleString()}
                                    </CardDescription>
                                </div>

                                <Button
                                    variant={'default_purple'}
                                    onClick={() => {
                                        addRecordingToIcon(file)
                                    }}
                                >
                                    <HeadphonesIcon className="h-4 w-4 mr-2" />
                                    Select Audio
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <audio
                                className="w-full"
                                controls
                                src={URL.createObjectURL(
                                    new Blob([file.file.buffer], {
                                        type: 'audio/mp4'
                                    })
                                )}
                            />
                            <div className="flex flex-row justify-between">
                                <Button
                                    variant={'default_purple'}
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
                                    <Edit2Icon className="h-4 w-4 mr-2" />
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
                                    <TrashIcon className="h-4 w-4 mr-2" />
                                    Delete Recording
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
