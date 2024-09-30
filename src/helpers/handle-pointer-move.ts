import { DragElement } from '@/types/drag-element'
import { HEIGHT, WIDTH } from '../App'
import { windowViewportToSVGViewport } from './viewport'

export const BUFFER = 1

export function handlePointerMove(
    index1: number,
    e: React.PointerEvent<SVGElement>,
    elements: DragElement[],
    setElements: (icons: DragElement[]) => void
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
                x: Math.min(
                    Math.max(cursorSvgPositionX - item.xOffset, BUFFER),
                    WIDTH - item.width - BUFFER
                ),
                y: Math.min(
                    Math.max(cursorSvgPositionY - item.yOffset, BUFFER),
                    HEIGHT - item.height - BUFFER
                )
            }
        }
        return item
    })
    setElements(newElements)
}
