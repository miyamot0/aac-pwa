import { cn } from "@/lib/utils"
import { IconsContext } from "@/providers/icons-provider"
import { useContext } from "react"

export function EmptyIcon() {
    const { Settings } = useContext(IconsContext)

    const { Locked } = Settings

    return (
        <div
            className={cn(
                'aspect-square border border-black rounded shadow-md flex items-center justify-center bg-gray-100 cursor-pointer select-none icon-field-type',
                {
                    'cursor-not-allowed bg-transparent border-0 shadow-none':
                        Locked
                }
            )}
        >
            <p
                className={cn('', {
                    hidden: Locked
                })}
            >
                Empty Icon Slot
            </p>
        </div>
    )
}