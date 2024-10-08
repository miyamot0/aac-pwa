import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { db } from '@/lib/db'

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

                            alert('After Set Img')

                            const reader = new FileReader()
                            reader.onload = async function (e) {
                                const arrayBuffer = new Uint8Array(
                                    e.target?.result as ArrayBuffer
                                )
                                console.log(arrayBuffer)

                                const id = await db.files.add({
                                    timestamp: new Date().toISOString(),
                                    file: arrayBuffer
                                })

                                alert(id)
                            }
                            reader.readAsArrayBuffer(e.target.files[0])

                            /*
                            if (!navigator.storage) alert('No Storage API')

                            const opfsRoot =
                                await navigator.storage.getDirectory()

                            alert('After get directory')

                            const fileHandle = await opfsRoot.getFileHandle(
                                'test.png',
                                { create: true }
                            )

                            alert('After File Handle')

                            const writable = await fileHandle.createWritable()
                            const blob = e.target.files[0]
                            await writable.write(blob)
                            await writable.close()

                            alert('Saved to FS')
                            */
                        }
                    }}
                />

                <Button>Save to FS</Button>
            </div>
        </div>
    )
}
