import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function CameraPage() {
    const [img, setImg] = useState<string | null>(null)

    return (
        <div className="grid grid-cols-2 p-4 gap-4">
            <div className="object-scale-down">{img && <img src={img} />}</div>
            <div className="flex flex-col gap-4">
                <input
                    type="file"
                    name="picture"
                    accept="image/*"
                    width="720"
                    height="480"
                    capture="environment"
                    onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                            setImg(URL.createObjectURL(e.target.files[0]))

                            const opfsRoot =
                                await navigator.storage.getDirectory()

                            const fileHandle = await opfsRoot.getFileHandle(
                                'test.png',
                                { create: true }
                            )
                            const writable = await fileHandle.createWritable()
                            const blob = e.target.files[0]
                            await writable.write(blob)
                            await writable.close()

                            alert('Saved to FS')
                        }
                    }}
                />

                <Button>Save to FS</Button>
            </div>
        </div>
    )
}
