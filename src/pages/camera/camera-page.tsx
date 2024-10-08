import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { db } from '@/lib/db'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import HeaderBackground from '@/components/layout/header-bg'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { toast } from 'sonner'

export default function CameraPage() {
    const [img, setImg] = useState<string | null>(null)
    const [buffer, setBuffer] = useState<Uint8Array | null>(null)

    async function saveImageToDB() {
        if (!buffer) return

        const id = await db.files.add({
            timestamp: new Date().toISOString(),
            file: buffer
        })

        toast.success(`Saved image to DB with ID: ${id}`)
    }

    return (
        <div className="flex flex-col gap-2 items">
            <HeaderBackground className="grid grid-cols-3">
                <Link
                    to="/"
                    className="flex flex-row gap-2"
                    unstable_viewTransition={true}
                >
                    <ChevronLeft className="h-6 w-6" />
                    Back
                </Link>
                <span className="text-lg text-center">Icon Image Capture</span>
            </HeaderBackground>
            <div className="grid grid-cols-2 p-4 gap-4 max-w-screen-xl w-full mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Image Preview</CardTitle>
                        <CardDescription>
                            Preview image before saving
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="object-scale-down aspect-square flex flex-col items-center">
                        {img && <img src={img} />}
                    </CardContent>
                </Card>

                <div className="flex flex-col gap-4">
                    <input
                        type="file"
                        name="picture"
                        accept="image/*"
                        capture="environment"
                        onChange={async (e) => {
                            if (e.target.files && e.target.files[0]) {
                                setImg(URL.createObjectURL(e.target.files[0]))

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

                    <Button onClick={() => saveImageToDB()}>Save to FS</Button>
                </div>
            </div>
        </div>
    )
}
