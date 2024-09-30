import { BUFFER } from '@/helpers/handle-pointer-move'
import { cn } from '@/lib/utils'
import { IconsContext } from '@/providers/icons-provider'
import SGDIcon from '@/renders/sgd-icon'
import { useContext, useEffect } from 'react'

export const HEIGHT = 600
export const WIDTH = 800

export default function TempHomePage() {
    const context = useContext(IconsContext)

    if (context === null) {
        throw new Error('IconsContext not found')
    }

    const { Icons } = context

    useEffect(() => {
        Icons.forEach((element) => {
            if (
                element.active &&
                element.htmlElement !== undefined &&
                element.pointerId !== undefined
            )
                element.htmlElement.setPointerCapture(element.pointerId)
        })
    }, [Icons])

    return (
        <div className="flex flex-row w-full justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={WIDTH}
                height={HEIGHT}
                viewBox="0 0 800 600"
                className="bg-gray-200"
            >
                <rect
                    x={WIDTH - BUFFER - 100 - 5}
                    y={BUFFER + 5}
                    z={100}
                    className={cn(
                        'text-white fill-current transition-colors ease-in-out duration-250'
                    )}
                    stroke={'gray'}
                    strokeWidth={1}
                    width={100}
                    height={100}
                />
                {Icons.map(function (item, index) {
                    return <SGDIcon key={item.key} Icon={item} Index={index} />
                })}
            </svg>
        </div>
    )
}
