import { DragElement } from '@/types/drag-element'
import { HEIGHT, WIDTH } from '../App'
import { windowViewportToSVGViewport } from './viewport'

export const BUFFER = 1

const GRID_SIZE = 100

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

            /*
            const ratio = {
                x: svgViewbox.width / svgBBox.width,
                y: svgViewbox.height / svgBBox.height
            }

            const GRID_SIZE_RATIO_X = GRID_SIZE * ratio.x
            const GRID_SIZE_RATIO_Y = GRID_SIZE * ratio.y

            const gx =
                Math.round(cursorSvgPositionX / GRID_SIZE_RATIO_X) *
                GRID_SIZE_RATIO_X
            const gy =
                Math.round(cursorSvgPositionY / GRID_SIZE_RATIO_Y) *
                GRID_SIZE_RATIO_Y
                */

            const x = Math.min(
                Math.max(cursorSvgPositionX - item.xOffset, BUFFER),
                WIDTH - item.width - BUFFER
            )

            const y = Math.min(
                Math.max(cursorSvgPositionY - item.yOffset, BUFFER),
                HEIGHT - item.height - BUFFER
            )

            return {
                ...item,
                x,
                y
            }
        }
        return item
    })
    setElements(newElements)
}
