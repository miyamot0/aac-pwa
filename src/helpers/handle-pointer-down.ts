import { DragElement } from '../App'
import { windowViewportToSVGViewport } from './viewport'

export function handlePointerDown(
    index1: number,
    e: React.PointerEvent<SVGElement>,
    elements: DragElement[],
    setElements: React.Dispatch<React.SetStateAction<DragElement[]>>
) {
    const newElements = elements.map(function (item, index2): DragElement {
        if (index1 === index2) {
            const el = e.currentTarget as SVGElement
            const elBBox = el.getBoundingClientRect()
            const svgViewbox = (e.target as SVGElement).ownerSVGElement?.viewBox
                .baseVal
            const svgBBox = (
                e.target as SVGElement
            ).ownerSVGElement?.getBoundingClientRect()

            if (!svgViewbox || !svgBBox) return item

            const { x, y } = windowViewportToSVGViewport(
                elBBox,
                svgViewbox,
                svgBBox
            )
            const cursorPosition = { x: e.clientX, y: e.clientY }
            const { x: cursorSvgPositionX, y: cursorSvgPositionY } =
                windowViewportToSVGViewport(
                    DOMRect.fromRect(cursorPosition),
                    svgViewbox,
                    svgBBox
                )

            return {
                ...item,
                xOffset: cursorSvgPositionX - x,
                yOffset: cursorSvgPositionY - y,
                active: true,
                htmlElement: el,
                pointerId: e.pointerId
            }
        }
        return item
    })

    // Move the element to the top of the array
    const el = newElements.splice(index1, 1)[0]
    newElements.push(el)

    setElements(newElements)
}
