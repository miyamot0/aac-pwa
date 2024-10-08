import { cn } from '@/lib/utils'

export default function HeaderBackground({
    children,
    className
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <div
            className={cn(
                'flex flex-row justify-between h-14 items-center bg-red-400 px-4 text-white border-b-3 border-red-500 font-semibold',
                className
            )}
        >
            {children}
        </div>
    )
}
