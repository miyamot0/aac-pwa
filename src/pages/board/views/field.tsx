import { cn } from '@/lib/utils'
import { useContext } from 'react'
import { IconsContext } from '@/providers/icons-provider'
import { useNavigate } from 'react-router-dom'
import { db, SGDField } from '@/lib/db'
import { useLiveQuery } from 'dexie-react-hooks'

function Icon({ Icon }: { Icon: SGDField }) {
    const { AddToFrame, Settings } = useContext(IconsContext)
    const navigate = useNavigate()

    const icon_to_reference =
        Settings.LanguageContext === 'L1' ? Icon.L1 : Icon.L2

    const has_file = icon_to_reference?.File !== undefined
    const has_label = (icon_to_reference?.Label ?? '').trim().length > 0

    const url = has_file
        ? URL.createObjectURL(
              new Blob([icon_to_reference!.File!], { type: 'image/png' })
          )
        : undefined

    return (
        <div
            className={cn(
                'border border-black rounded aspect-square bg-white cursor-pointer flex flex-col justify-end items-center select-none relative shadow-md',
                {
                    'bg-gray-100': !has_label
                }
            )}
            draggable={false}
            onClick={() => {
                if (Settings.Locked === false) {
                    navigate(`/icons/${Icon.id}`, {
                        unstable_viewTransition: true
                    })

                    return
                }

                if (!has_label) return

                AddToFrame(Icon)
            }}
        >
            <img
                src={url}
                className="object-cover w-full h-full"
                draggable={false}
            />
            <div
                className={cn(
                    'absolute bg-white px-2 border border-black rounded-sm mb-2',
                    {
                        'hidden ': !has_label
                    }
                )}
            >
                {icon_to_reference?.Label}
            </div>
        </div>
    )
}

export default function BoardField() {
    const { Settings, FieldSize, FieldRows } = useContext(IconsContext)

    const ArrayNumber = Array.from({ length: FieldSize }, (_, i) => i)
    const icons: SGDField[] | undefined = useLiveQuery(() => db.icons.toArray())

    const COLS: number = Math.floor(FieldSize / FieldRows)

    return (
        <div className="flex flex-col flex-1 justify-start grow px-2">
            <div
                className={cn('grid grid-cols-4 gap-4', {
                    'grid-cols-2': COLS === 2,
                    'grid-cols-3': COLS === 3,
                    'grid-cols-4': COLS === 4,
                    'grid-cols-5': COLS === 5,
                    'grid-cols-6': COLS === 6,
                    'grid-cols-8': COLS === 8,
                    'grid-cols-12': COLS === 12
                })}
            >
                {ArrayNumber.map((_, i) => {
                    const icon = icons?.find((icon) => icon.index === i)

                    if (icon) {
                        if (
                            Settings.LanguageContext === 'L2' &&
                            !icon.L2?.File
                        ) {
                            return (
                                <div className="aspect-square border border-black rounded shadow-md flex items-center justify-center bg-gray-100 cursor-pointer select-none">
                                    <div key={i}>No Image</div>
                                </div>
                            )
                        }

                        return <Icon key={i} Icon={icon}></Icon>
                    }

                    return (
                        <div className="aspect-square border border-black rounded shadow-md flex items-center justify-center bg-gray-100 cursor-pointer select-none">
                            <div key={i}></div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
