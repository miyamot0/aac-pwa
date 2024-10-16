import { Button } from '@/components/ui/button'
import { createRef, useState } from 'react'
import { db } from '@/lib/db'
import { Link, useParams } from 'react-router-dom'
import { CameraIcon, ChevronLeft, FileImageIcon, SaveIcon } from 'lucide-react'
import HeaderBackground from '@/components/layout/header-bg'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function CameraPage() {
    const { id, slot } = useParams()

    if (!id || !slot) throw new Error('No ID provided')

    const [img, setImg] = useState<string | null>(null)
    const [buffer, setBuffer] = useState<Uint8Array | null>(null)

    const fileInputCaptureRef = createRef<HTMLInputElement>()
    const fileInputImportRef = createRef<HTMLInputElement>()

    async function saveImageToDB() {
        if (!buffer) return

        await db.files.add({
            timestamp: new Date().toISOString(),
            file: buffer
        })

        toast.success(`New image added to gallery`)
    }

    return (
        <div className="flex flex-col gap-2 items">
            <HeaderBackground className="grid grid-cols-3">
                <Link
                    replace
                    to={`/icons/${id}/${slot}`}
                    className="flex flex-row gap-2"
                    unstable_viewTransition={true}
                >
                    <ChevronLeft className="h-6 w-6" />
                    Back
                </Link>
                <span className="text-lg text-center">Capture New Image</span>
            </HeaderBackground>
            <div className="flex flex-col max-w-screen-md w-full mx-auto mb-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Preview of New Image</CardTitle>
                        <CardDescription>
                            Capture/import an image and inspect before saving
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-4">
                        {img && <img className="object-contain " src={img} />}

                        <input
                            ref={fileInputCaptureRef}
                            style={{ display: 'none' }}
                            type="file"
                            name="picture"
                            accept="image/*"
                            capture="environment"
                            onChange={async (e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setImg(
                                        URL.createObjectURL(e.target.files[0])
                                    )

                                    const reader = new FileReader()
                                    reader.onload = async function (e) {
                                        setBuffer(
                                            new Uint8Array(
                                                e.target?.result as ArrayBuffer
                                            )
                                        )
                                    }
                                    reader.readAsArrayBuffer(e.target.files[0])
                                }
                            }}
                        />

                        <input
                            ref={fileInputImportRef}
                            style={{ display: 'none' }}
                            type="file"
                            name="picture2"
                            accept="image/*"
                            onChange={async (e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setImg(
                                        URL.createObjectURL(e.target.files[0])
                                    )

                                    const reader = new FileReader()
                                    reader.onload = async function (e) {
                                        setBuffer(
                                            new Uint8Array(
                                                e.target?.result as ArrayBuffer
                                            )
                                        )
                                    }
                                    reader.readAsArrayBuffer(e.target.files[0])
                                }
                            }}
                        />

                        <Button
                            className={cn('flex flex-row gap-2 w-full')}
                            onClick={() => {
                                if (fileInputCaptureRef.current) {
                                    fileInputCaptureRef.current.click()
                                }
                            }}
                        >
                            <CameraIcon className="h-4 w-4" />
                            Capture Image from Camera
                        </Button>

                        <Button
                            className={cn('flex flex-row gap-2 w-full')}
                            onClick={() => {
                                if (fileInputImportRef.current) {
                                    fileInputImportRef.current.click()
                                }
                            }}
                        >
                            <FileImageIcon className="h-4 w-4" />
                            Import Image File from Device
                        </Button>

                        <Button
                            disabled={!buffer}
                            className={cn(
                                'flex flex-row gap-2 w-full bg-green-500 hover:bg-green-400 text-white'
                            )}
                            onClick={() => saveImageToDB()}
                        >
                            <SaveIcon className="h-4 w-4" />
                            Save to Asset Gallery
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
