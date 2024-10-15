import { SGDField } from '@/lib/db'
import { cn } from '@/lib/utils'
import { IconsContext } from '@/providers/icons-provider'
import { useContext, useState, useEffect } from 'react'

export function FrameIconAnimated({ icon }: { icon: SGDField }) {
    const { Settings } = useContext(IconsContext)
    const [displayed, setDisplayed] = useState(false)

    useEffect(() => {
        setDisplayed(true)
    }, [])

    const icon_to_reference =
        Settings.LanguageContext === 'L1' ? icon.L1 : icon.L2

    const has_file = icon_to_reference?.File !== undefined

    const url = has_file
        ? URL.createObjectURL(
              new Blob([icon_to_reference!.File!], { type: 'image/png' })
          )
        : icon_to_reference!.Image

    return (
        <div
            className={cn(
                'border border-black rounded aspect-square bg-white flex flex-col justify-end items-center select-none relative shadow-md h-[16dvh] transition-all ease-in-out duration-300',
                {
                    'opacity-100': displayed,
                    'opacity-0': !displayed
                }
            )}
        >
            <img
                src={url}
                draggable={false}
                className="object-cover w-full h-full"
            />
            <div
                className={cn('absolute bg-white px-2 rounded-sm mb-2', {
                    invisible: icon_to_reference.HideText
                })}
            >
                {icon_to_reference?.Label}
            </div>
        </div>
    )
}
