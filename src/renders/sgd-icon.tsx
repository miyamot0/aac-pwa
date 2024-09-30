import { cn } from '@/lib/utils'
import { handlePointerDown } from '../helpers/handle-pointer-down'
import { handlePointerMove } from '../helpers/handle-pointer-move'
import { handlePointerUp } from '../helpers/handle-pointer-up'
import { IconsContext } from '@/providers/icons-provider'
import { useContext } from 'react'
import { DragElement } from '@/types/drag-element'

type Props = {
    Icon: DragElement
    Index: number
}

export default function SGDIcon({ Icon, Index }: Props) {
    const context = useContext(IconsContext)

    if (context === null) {
        throw new Error('IconsContext not found')
    }

    const { Icons, UpdateContext } = context

    return (
        <rect
            key={Icon.key}
            x={Icon.x}
            y={Icon.y}
            z={-Index}
            rx={5}
            className={cn(
                'text-white fill-current transition-colors ease-in-out duration-250',
                {
                    'text-green-200': Icon.active
                }
            )}
            stroke={'black'}
            strokeWidth={2}
            width={Icon.width}
            height={Icon.height}
            onPointerDown={(evt) =>
                handlePointerDown(Index, evt, Icons, UpdateContext)
            }
            onPointerUp={(evt) =>
                handlePointerUp(Index, evt, Icons, UpdateContext)
            }
            onPointerMove={(evt) =>
                handlePointerMove(Index, evt, Icons, UpdateContext)
            }
        />
    )
}
