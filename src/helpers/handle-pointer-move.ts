import { DragElement, windowViewportToSVGViewport } from '../App'

export function handlePointerMove(
    index1: number,
    e: React.PointerEvent<SVGElement>,
    elements: DragElement[],
    setElements: React.Dispatch<React.SetStateAction<DragElement[]>>
) {
    const newElements = elements.map(function (item, index2): DragElement {
        if (index1 === index2 && item.active === true) {
            const svgViewbox = (e.target as SVGElement).ownerSVGElement?.viewBox
                .baseVal
            const svgBBox = (
                e.target as SVGElement
            ).ownerSVGElement?.getBoundingClientRect()

            if (!svgViewbox || !svgBBox) return item

            const cursorPosition = { x: e.clientX, y: e.clientY }
            const { x: cursorSvgPositionX, y: cursorSvgPositionY } =
                windowViewportToSVGViewport(
                    DOMRect.fromRect(cursorPosition),
                    svgViewbox,
                    svgBBox
                )

            return {
                ...item,
                x: cursorSvgPositionX - item.xOffset,
                y: cursorSvgPositionY - item.yOffset
            }
        }
        return item
    })
    setElements(newElements)
}
