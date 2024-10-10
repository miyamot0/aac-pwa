import { cn } from '@/lib/utils'
import { IconsContext } from '@/providers/icons-provider'
import { useContext } from 'react'

export default function HeaderBackground({
    children,
    className
}: {
    children: React.ReactNode
    className?: string
}) {
    const { Settings } = useContext(IconsContext)
    const { LanguageContext } = Settings

    return (
        <div
            className={cn(
                'flex flex-row justify-between h-14 items-center px-4 text-white border-b-3 font-semibold',
                className,
                {
                    'bg-red-400': LanguageContext === 'L1',
                    'bg-blue-400': LanguageContext === 'L2'
                }
            )}
        >
            {children}
        </div>
    )
}
