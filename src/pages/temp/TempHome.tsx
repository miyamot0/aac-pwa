import { BUFFER } from '@/helpers/handle-pointer-move'
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
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.0"
                    width="100"
                    height="100"
                    x={WIDTH - BUFFER - 100 - 5}
                    y={BUFFER + 5}
                    viewBox="0 0 75 75"
                >
                    <rect
                        x={0}
                        y={0}
                        z={1000000}
                        rx={5}
                        stroke="black"
                        strokeWidth={2}
                        fill="white"
                        width={75}
                        height={75}
                    />
                    <path
                        d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z"
                        stroke="#111"
                        strokeWidth={5}
                        strokeLinejoin="round"
                        fill="#111"
                    />
                    <path
                        d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6"
                        fill="none"
                        stroke="#111"
                        strokeWidth={5}
                        strokeLinecap="round"
                    />
                </svg>

                {Icons.map(function (item, index) {
                    return <SGDIcon key={item.key} Icon={item} Index={index} />
                })}
            </svg>
        </div>
    )
}
