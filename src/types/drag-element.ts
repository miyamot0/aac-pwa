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
