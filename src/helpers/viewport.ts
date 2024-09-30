export const windowViewportToSVGViewport = (
    elBBox: DOMRect,
    svgViewbox: DOMRect,
    svgBBox: DOMRect
): DOMRect => {
    const ratio = {
        x: svgViewbox.width / svgBBox.width,
        y: svgViewbox.height / svgBBox.height
    }
    const x = svgViewbox.x + (elBBox.x - svgBBox.x) * ratio.x
    const y = svgViewbox.y + (elBBox.y - svgBBox.y) * ratio.y
    const width = elBBox.width * ratio.x
    const height = elBBox.height * ratio.y

    return DOMRect.fromRect({ x, y, width, height })
}
