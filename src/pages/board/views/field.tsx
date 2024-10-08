import { cn } from '@/lib/utils'
import { useContext } from 'react'
import { IconsContext } from '@/providers/icons-provider'
import { IconObject } from '@/providers/provider-types'
import { PlusIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const COLS: number = 8

function Icon({ Icon }: { Icon: IconObject }) {
    const { AddToFrame, Settings } = useContext(IconsContext)
    const navigate = useNavigate()

    return (
        <div
            className="border border-black rounded aspect-square bg-white hover:bg-gray-100 cursor-pointer flex flex-col justify-end items-center select-none relative shadow-md"
            draggable={false}
            onClick={() => {
                if (Settings.Locked === false) {
                    navigate(`/icons/${Icon.Index}/${Icon.id}`, {
                        unstable_viewTransition: true
                    })

                    return
                }

                AddToFrame(Icon)
            }}
        >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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

const ArrayNumber = Array.from({ length: 24 }, (_, i) => i)

export default function BoardField() {
    const { Field, Settings } = useContext(IconsContext)
    const navigate = useNavigate()

    const { Locked } = Settings

    return (
        <div className="flex flex-col flex-1 justify-start grow px-2">
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
                        <div
                            className="aspect-square border border-black rounded shadow-md flex items-center justify-center bg-gray-100 hover:bg-gray-200 cursor-pointer select-none"
                            onClick={() => {
                                navigate(`/icons/${i}/undefined`, {
                                    unstable_viewTransition: true
                                })
                            }}
                        >
                            {Locked ? null : <PlusIcon size={24} />}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
