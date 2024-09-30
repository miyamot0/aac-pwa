import { DragElement } from '@/types/drag-element'

export function handlePointerUp(
    index1: number,
    _e: React.PointerEvent<SVGElement>,
    elements: DragElement[],
    setElements: (icons: DragElement[]) => void
) {
    const newElements = elements.map(function (item, index2): DragElement {
        if (index1 === index2) {
            return { ...item, active: false }
        }
        return item
    })

    setElements(newElements)
}
