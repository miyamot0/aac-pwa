import { DragElement } from '@/types/drag-element'
import React, { ReactNode } from 'react'

interface IconsContextType {
    Icons: DragElement[]
    UpdateContext: (updated: DragElement[]) => void
}

export const IconsContext = React.createContext<IconsContextType | null>(null)

type Props = {
    children: ReactNode
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

export const IconsProvider: React.FC<Props> = ({ children }) => {
    const [icons, setIcons] = React.useState<IconsContextType>({
        Icons: [
            generateDragElementDefault(1, 1, 1),
            generateDragElementDefault(50, 50, 2),
            generateDragElementDefault(100, 100, 3)
        ],
        UpdateContext: (updated: DragElement[]) => {
            setIcons({
                ...icons,
                Icons: updated
            })
        }
    })

    return (
        <IconsContext.Provider value={icons}>{children}</IconsContext.Provider>
    )
}
