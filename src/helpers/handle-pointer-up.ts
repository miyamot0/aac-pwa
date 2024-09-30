import { DragElement } from '../App'

export function handlePointerUp(
    index1: number,
    _e: React.PointerEvent<SVGElement>,
    elements: DragElement[],
    setElements: React.Dispatch<React.SetStateAction<DragElement[]>>
) {
    const newElements = elements.map(function (item, index2): DragElement {
        if (index1 === index2) {
            return { ...item, active: false }
        }
        return item
    })

    setElements(newElements)
}
