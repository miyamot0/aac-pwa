import { useEffect, useState } from 'react'
import SGDIcon from './renders/sgd-icon'

export interface DragElement {
    x: number
    y: number
    width: number
    height: number
    active: boolean
    xOffset: number
    yOffset: number
    key: string
    htmlElement?: SVGElement
    pointerId?: number
}



const generateDragElementDefault = (
    x: number,
    y: number,
    index: number
): DragElement => {
    return {
        x,
        y,
        width: 100,
        height: 100,
        active: false,
        xOffset: 0,
        yOffset: 0,
        key: index.toString()
    }
}

export const HEIGHT = 600
export const WIDTH = 800

function App() {
    const [elements, setElements] = useState<DragElement[]>([
        generateDragElementDefault(0, 0, 1),
        generateDragElementDefault(50, 50, 2),
        generateDragElementDefault(100, 100, 3)
    ])

    useEffect(() => {
        elements.forEach((element) => {
            if (
                element.active &&
                element.htmlElement !== undefined &&
                element.pointerId !== undefined
            )
                element.htmlElement.setPointerCapture(element.pointerId)
        })
    }, [elements])

    const rectElements = elements.map(function (item, index) {
        return (
            <SGDIcon
                key={item.key}
                Icon={item}
                Index={index}
                Elements={elements}
                SetElements={setElements}
            />
        )
    })

    return (
        <div className="flex flex-row w-full justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={WIDTH}
                height={HEIGHT}
                viewBox="0 0 800 600"
                className="bg-gray-500"
            >
                {rectElements}
            </svg>
        </div>
    )
}

export default App
