import { useLiveQuery } from 'dexie-react-hooks'
import { db, SavedFile } from '@/lib/db'
import HeaderBackground from '@/components/layout/header-bg'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CameraIcon, ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export default function FileSystemPage() {
    const { id, slot } = useParams()
    const navigation = useNavigate()

    if (!id || !slot) throw new Error('No ID provided')

    const files: SavedFile[] | undefined = useLiveQuery(() =>
        db.files.toArray()
    )

    return (
        <div className="flex flex-col gap-2 w-full">
            <HeaderBackground className="grid grid-cols-3">
                <Link
                    to={`/icons/${id}`}
                    className="flex flex-row gap-2"
                    unstable_viewTransition={true}
                >
                    <ChevronLeft className="h-6 w-6" />
                    Back
                </Link>
                <span className="text-lg text-center">Saved Image Assets</span>
                <Link
                    className={cn('p-1 rounded justify-self-end')}
                    unstable_viewTransition={true}
                    to={`/icons/${id}/${slot}/camera`}
                >
                    <div className="flex flex-row gap-2">
                        <CameraIcon className="h-6 w-6" />
                        <span className="hidden lg:block">
                            Capture New Image
                        </span>
                    </div>
                </Link>
            </HeaderBackground>
            <div className="flex flex-col w-full px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-screen-xl self-center">
                    {files?.map((entry, index) => {
                        const blob = new Blob([entry.file], {
                            type: 'image/png'
                        })
                        const url = URL.createObjectURL(blob)

                        return (
                            <img
                                key={index}
                                src={url}
                                className="object-cover cursor-pointer aspect-square rounded-lg"
                                onClick={async () => {
                                    const icon = await db.icons.get(Number(id))

                                    if (!icon) return

                                    if (slot === 'L1') {
                                        icon.L1.File = entry.file
                                    } else {
                                        icon.L2 = icon.L2
                                            ? {
                                                  ...icon.L2,
                                                  File: entry.file
                                              }
                                            : {
                                                  File: entry.file,
                                                  Language: 'N/A',
                                                  Label: ''
                                              }
                                    }

                                    db.icons
                                        .where('id')
                                        .equals(icon.id)
                                        .modify(icon)
                                        .then(() => {
                                            toast.success(
                                                'Icon successfully updated!'
                                            )

                                            navigation(`/icons/${id}`)
                                        })
                                }}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
