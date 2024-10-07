import { cn } from '@/lib/utils'
import { useContext } from 'react'
import { IconsContext } from '@/providers/icons-provider'
import { IconObject } from '@/providers/provider-types'
import { toast } from 'sonner'
import { PlusIcon } from 'lucide-react'

const COLS: number = 8

function Icon({ Icon }: { Icon: IconObject }) {
    const { AddToFrame, Settings } = useContext(IconsContext)

    return (
        <div
            className="border border-black rounded aspect-square bg-white hover:bg-gray-100 cursor-pointer flex flex-col justify-end items-center select-none relative shadow-md"
            draggable={false}
            onClick={() => {
                if (Settings.Locked === false) {
                    toast.error('Board in Edit Mode: Edit Icon.')

                    return
                }

                AddToFrame(Icon)
            }}
        >
            <div className="object-scale-down p-1">
                <img
                    src={Icon.L1.Image}
                    alt={Icon.L1.Label}
                    draggable={false}
                />
            </div>
            <div className="absolute bg-white px-2 border border-black rounded-sm mb-2">
                {Icon.L1.Label}
            </div>
        </div>
    )
}

const ArrayNumber = Array.from({ length: 32 }, (_, i) => i)

export default function BoardField() {
    const { Field, Settings } = useContext(IconsContext)
    const { Locked } = Settings

    return (
        <div className="flex flex-col flex-1 justify-start grow">
            <div
                className={cn('grid grid-cols-4 gap-4', {
                    'grid-cols-8': COLS === 8,
                    'grid-cols-12': COLS === 12
                })}
            >
                {ArrayNumber.map((_, i) => {
                    const icon = Field.find(
                        (icon: IconObject) => icon.Index === i
                    )

                    if (icon) return <Icon key={i} Icon={icon}></Icon>

                    return (
                        <div className="aspect-square bg-white border border-black rounded shadow-md flex items-center justify-center">
                            {Locked ? null : <PlusIcon size={32} />}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
