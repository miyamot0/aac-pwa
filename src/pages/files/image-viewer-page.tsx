import { useLiveQuery } from 'dexie-react-hooks'
import { db, SavedFile } from '@/lib/db'
import HeaderBackground from '@/components/layout/header-bg'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CameraIcon, ChevronLeft, TrashIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { Button, buttonVariants } from '@/components/ui/button'

export default function ImageViewerPage() {
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
                    replace
                    to={`/icons/${id}`}
                    className="flex flex-row gap-2"
                    unstable_viewTransition={true}
                >
                    <ChevronLeft className="h-6 w-6" />
                    Back
                </Link>
                <span className="text-lg text-center">Image Asset Gallery</span>
                <div className="flex flex-row justify-end">
                    <Link
                        replace
                        className={cn(
                            buttonVariants({ variant: 'outline' }),
                            'bg-transparent flex flex-row gap-2 items-center cursor-pointer w-fit'
                        )}
                        unstable_viewTransition={true}
                        to={`/icons/${id}/${slot}/camera`}
                    >
                        <CameraIcon className="h-6 w-6" />
                        <span className="hidden lg:block">
                            Capture New Image
                        </span>
                    </Link>
                </div>
            </HeaderBackground>
            <div className="flex flex-col w-full px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-screen-xl self-center">
                    {files?.map((entry, index) => {
                        const blob = new Blob([entry.file], {
                            type: 'image/png'
                        })
                        const url = URL.createObjectURL(blob)

                        return (
                            <div className="relative">
                                <Button
                                    className="absolute top-1 right-1 flex flex-row gap-2 items-center border"
                                    onClick={async (e) => {
                                        e.preventDefault()

                                        if (
                                            confirm(
                                                'Are you sure you want to delete?'
                                            )
                                        ) {
                                            db.files
                                                .delete(entry.id)
                                                .then(() => {
                                                    toast.success(
                                                        'Image successfully deleted!'
                                                    )
                                                })
                                        }
                                    }}
                                    variant={'destructive'}
                                >
                                    <TrashIcon className="h-4 w-4" />
                                    Delete Image
                                </Button>
                                <img
                                    key={index}
                                    src={url}
                                    className="object-cover cursor-pointer aspect-square rounded-lg"
                                    onClick={async () => {
                                        const icon = await db.icons.get(
                                            Number(id)
                                        )

                                        if (!icon) return

                                        if (slot === 'L1') {
                                            icon.L1.File = entry.file
                                        } else {
                                            icon.L2.File = entry.file
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
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
