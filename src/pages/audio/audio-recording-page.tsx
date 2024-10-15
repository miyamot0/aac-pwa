import HeaderBackground from '@/components/layout/header-bg'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { ChevronLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { createRef } from 'react'

export default function AudioRecorderPage() {
    const { id, slot } = useParams()

    /*

    const {
        status,
        startRecording,
        stopRecording,
        clearBlobUrl,
        mediaBlobUrl
    } = useReactMediaRecorder({ audio: true, video: false })

    */

    const recordBtnRef = createRef<HTMLButtonElement>()

    if (!id || !slot) throw new Error('No ID provided')

    const is_recording = status === 'recording'

    /*

    async function saveBufferToDB(blob_url: string) {
        try {
            const blob = await fetch(blob_url).then((r) => r.blob())

            const int_array = new Uint8Array(await blob.arrayBuffer())

            const date = new Date()

            await db.recordings.add({
                label: `Recorded at ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
                timestamp: date.toISOString(),
                file: int_array
            })

            toast.success(`New image added to gallery`)

            clearBlobUrl()
        } catch (e: unknown) {
            toast.error(`Failed to save recording: ${e}`)
        }
    }


    */

    if (!navigator.mediaDevices.getUserMedia) {
        alert('getUserMedia() is not supported in your browser')
    }

    return (
        <div className="flex flex-col gap-2 items">
            <HeaderBackground className="grid grid-cols-3">
                <Link
                    to={`/recordings/${id}/${slot}`}
                    className="flex flex-row gap-2"
                    unstable_viewTransition={true}
                >
                    <ChevronLeft className="h-6 w-6" />
                    Back
                </Link>
                <span className="text-lg text-center">
                    Custom Speech Capture
                </span>
            </HeaderBackground>
            <div className="grid grid-cols-2 p-4 gap-4 max-w-screen-xl w-full mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Recorded Audio Stream</CardTitle>
                        <CardDescription>
                            Preview image before saving
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="object-scale-down aspect-square flex flex-col items-center">
                        {/* 
                            mediaBlobUrl && (
                            <audio
                                src={mediaBlobUrl}
                                controls
                                className="w-full"
                            />)
                        */}
                    </CardContent>
                </Card>

                <div className="flex flex-col gap-4">
                    <span>
                        Recording Status: {is_recording ? 'Recording' : 'Idle'}
                    </span>

                    {/* 
{is_recording && (
                        <Button
                            className={cn('flex flex-row gap-2')}
                            onClick={stopRecording}
                        >
                            Stop Recording
                        </Button>
                    )}

                    {!is_recording && (
                        <Button
                            className={cn('flex flex-row gap-2')}
                            onClick={startRecording}
                        >
                            <AudioLinesIcon className="h-4 w-4" />
                            Record Audio
                        </Button>
                    )}

                    {mediaBlobUrl && (
                        <Button
                            className={cn('flex flex-row gap-2')}
                            variant={'destructive'}
                            onClick={clearBlobUrl}
                        >
                            <TrashIcon className="h-4 w-4" />
                            Delete Recording
                        </Button>
                    )}

                    <Button
                        className={cn(
                            'flex flex-row gap-2 bg-green-500 text-white'
                        )}
                        onClick={async () => {
                            if (!mediaBlobUrl) return

                            await saveBufferToDB(mediaBlobUrl)
                        }}
                    >
                        <SaveIcon className="h-4 w-4" />
                        Save Audio to Database
                    </Button>
                                        
                    */}

                    <button ref={recordBtnRef}>new rec</button>
                </div>
            </div>
        </div>
    )
}
