import { cn } from '@/lib/utils'

const COLS: number = 8

function Icon({ Value }: { Value: number }) {
    return (
        <div className="border border-black rounded aspect-w-1 aspect-square bg-white hover:bg-gray-100 cursor-pointer">
            Frame {Value}
        </div>
    )
}

export default function BoardField() {
    return (
        <div
            className={cn('grid grid-cols-4 gap-4', {
                'grid-cols-8': COLS === 8,
                'grid-cols-12': COLS === 12
            })}
        >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, i) => (
                <Icon key={i} Value={i}></Icon>
            ))}
        </div>
    )
}
