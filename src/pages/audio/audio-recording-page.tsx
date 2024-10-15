import HeaderBackground from '@/components/layout/header-bg'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { CassetteTapeIcon, ChevronLeft, FileMusicIcon } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { db } from '@/lib/db'

const constraints = { audio: true }

export default function AudioRecorderPage() {
    const { id, slot } = useParams()
    const chunks = useRef<Blob[]>([])
    const mediaRecorder = useRef<MediaRecorder | null>(null)
    const [currentBlob, setCurrentBlob] = useState<Blob>()
    const [is_recording, setRecording] = useState(false)

    if (!id || !slot) throw new Error('No ID or Slot provided')

    async function saveBufferToDB() {
        if (!currentBlob) return

        try {
            const int_array = new Uint8Array(await currentBlob.arrayBuffer())

            const date = new Date()

            await db.recordings.add({
                label: `Recorded at ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
                timestamp: date.toISOString(),
                file: int_array
            })

            toast.success(`New recording added to database.`)

            chunks.current = []
            setCurrentBlob(undefined)
        } catch (e: unknown) {
            toast.error(`Failed to save recording: ${e}`)
        }
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
                <span className="text-lg text-center">Capture New Audio</span>
            </HeaderBackground>
            <div className="flex flex-col max-w-screen-md w-full mx-auto">
                <Card>
                    <CardHeader>
                        <div className="flex flex-row gap-4 justify-between items-start">
                            <div className="flex flex-col gap-1">
                                <CardTitle>Recorded Audio Stream</CardTitle>
                                <CardDescription>
                                    Preview your audio here before saving
                                </CardDescription>
                            </div>

                            <p className="leading-none tracking-tight">
                                Recording State:
                                {is_recording ? ' Recording...' : ' Paused'}
                            </p>
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <audio
                            src={
                                !currentBlob
                                    ? undefined
                                    : URL.createObjectURL(currentBlob!)
                            }
                            controls
                            className="w-full"
                        />

                        {is_recording === false && (
                            <Button
                                onClick={() => {
                                    chunks.current = []
                                    setCurrentBlob(undefined)

                                    navigator.mediaDevices
                                        .getUserMedia(constraints)
                                        .then(
                                            (stream: MediaStream) => {
                                                mediaRecorder.current =
                                                    new MediaRecorder(stream)

                                                mediaRecorder.current.ondataavailable =
                                                    (e) => {
                                                        chunks.current.push(
                                                            e.data
                                                        )
                                                    }
                                                mediaRecorder.current.onstop =
                                                    () => {
                                                        const blob = new Blob(
                                                            chunks.current,
                                                            {
                                                                type: mediaRecorder.current!
                                                                    .mimeType
                                                            }
                                                        )
                                                        setCurrentBlob(blob)

                                                        stream
                                                            .getTracks()
                                                            .forEach(
                                                                (track) => {
                                                                    track.stop()
                                                                }
                                                            )
                                                    }
                                                mediaRecorder.current.start()

                                                setRecording(true)
                                            },
                                            (err: unknown) => {
                                                toast.error(
                                                    `Failed to start recording: ${err}`
                                                )
                                            }
                                        )
                                }}
                            >
                                <CassetteTapeIcon className="h-4 w-4 mr-2" />
                                Begin Recording
                            </Button>
                        )}

                        {is_recording && (
                            <Button
                                variant={'destructive'}
                                onClick={() => {
                                    mediaRecorder.current?.stop()
                                    setRecording(false)
                                }}
                            >
                                Recording... Click to End
                            </Button>
                        )}

                        {currentBlob && (
                            <Button
                                className="bg-green-600 hover:bg-green-500"
                                onClick={saveBufferToDB}
                            >
                                <FileMusicIcon className="h-4 w-4 mr-2" />
                                Save to Asset Gallery
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
