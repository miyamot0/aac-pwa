import { cn } from '@/lib/utils'
import { useContext } from 'react'
import { IconsContext } from '@/providers/icons-provider'
import { useNavigate } from 'react-router-dom'
import { db, SGDField } from '@/lib/db'
import { useLiveQuery } from 'dexie-react-hooks'

const COLS: number = 8

function Icon({ Icon }: { Icon: SGDField }) {
    const { AddToFrame, Settings } = useContext(IconsContext)
    const navigate = useNavigate()

    const icon_to_reference =
        Settings.LanguageContext === 'L1' ? Icon.L1 : Icon.L2

    const has_file = icon_to_reference?.File !== undefined

    const url = has_file
        ? URL.createObjectURL(
              new Blob([icon_to_reference!.File!], { type: 'image/png' })
          )
        : icon_to_reference!.Image

    return (
        <div
            className="border border-black rounded aspect-square bg-white hover:bg-gray-100 cursor-pointer flex flex-col justify-end items-center select-none relative shadow-md"
            draggable={false}
            onClick={() => {
                if (Settings.Locked === false) {
                    navigate(`/icons/${Icon.id}`, {
                        unstable_viewTransition: true
                    })

                    return
                }

                AddToFrame(Icon)
            }}
        >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img
                    src={url}
                    alt={icon_to_reference?.Label ?? 'Blank Icon'}
                    draggable={false}
                />
            </div>
            <div className="absolute bg-white px-2 border border-black rounded-sm mb-2">
                {Icon.L1.Label}
            </div>
        </div>
    )
}

const ArrayNumber = Array.from({ length: 24 }, (_, i) => i)

export default function BoardField() {
    const icons: SGDField[] | undefined = useLiveQuery(() => db.icons.toArray())

    return (
        <div className="flex flex-col flex-1 justify-start grow px-2">
            <div
                className={cn('grid grid-cols-4 gap-4', {
                    'grid-cols-8': COLS === 8,
                    'grid-cols-12': COLS === 12
                })}
            >
                {ArrayNumber.map((_, i) => {
                    const icon = icons?.find((icon) => icon.index === i)

                    if (icon) return <Icon key={i} Icon={icon}></Icon>

                    return (
                        <div className="aspect-square border border-black rounded shadow-md flex items-center justify-center bg-gray-100 hover:bg-gray-200 cursor-pointer select-none">
                            <div key={i}></div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
