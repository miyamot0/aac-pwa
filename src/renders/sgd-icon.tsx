import { cn } from '@/lib/utils'
import { DragElement } from '../App'
import { handlePointerDown } from '../helpers/handle-pointer-down'
import { handlePointerMove } from '../helpers/handle-pointer-move'
import { handlePointerUp } from '../helpers/handle-pointer-up'

type Props = {
    Icon: DragElement
    Index: number
    Elements: DragElement[]
    SetElements: React.Dispatch<React.SetStateAction<DragElement[]>>
}

export default function SGDIcon({ Icon, Index, Elements, SetElements }: Props) {
    return (
        <rect
            key={Icon.key}
            x={Icon.x}
            y={Icon.y}
            z={-Icon}
            rx={5}
            className={cn(
                'text-yellow-300 fill-current transition-colors ease-in-out duration-250',
                {
                    'text-orange-400': Icon.active
                }
            )}
            stroke={'black'}
            strokeWidth={2}
            width={Icon.width}
            height={Icon.height}
            onPointerDown={(evt) =>
                handlePointerDown(Index, evt, Elements, SetElements)
            }
            onPointerUp={(evt) =>
                handlePointerUp(Index, evt, Elements, SetElements)
            }
            onPointerMove={(evt) =>
                handlePointerMove(Index, evt, Elements, SetElements)
            }
        />
    )
}
