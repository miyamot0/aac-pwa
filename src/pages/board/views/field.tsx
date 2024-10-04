import { cn } from '@/lib/utils'
import { useContext } from 'react'
import { IconsContext, IconObject } from '@/providers/icons-provider'

const COLS: number = 8

function Icon({ Icon }: { Icon: IconObject }) {
    const { AddToFrame, Settings } = useContext(IconsContext)

    return (
        <div
            className="border border-black rounded aspect-square bg-white hover:bg-gray-100 cursor-pointer flex flex-col justify-end items-center select-none"
            draggable={false}
            onClick={() => {
                if (Settings.Locked === false) {
                    alert('Board in Edit Mode: Edit Icon')

                    return
                }

                AddToFrame(Icon)
            }}
        >
            <div className="aspect-square">
                <img
                    src={Icon.L1.Image}
                    alt={Icon.L1.Label}
                    draggable={false}
                />
            </div>
            {Icon.L1.Label}
        </div>
    )
}

const ArrayNumber = Array.from({ length: 24 }, (_, i) => i)

export default function BoardField() {
    const { Field } = useContext(IconsContext)

    return (
        <div
            className={cn('grid grid-cols-4 gap-4 h-fit', {
                'grid-cols-8': COLS === 8,
                'grid-cols-12': COLS === 12
            })}
        >
            {ArrayNumber.map((_, i) => {
                const icon = Field.find((icon: IconObject) => icon.Index === i)

                if (icon) return <Icon key={i} Icon={icon}></Icon>

                return <div className="aspect-square bg-white"></div>
            })}
        </div>
    )
}
