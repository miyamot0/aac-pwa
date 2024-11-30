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
    const { Settings, MaskedColors } = useContext(IconsContext)
    const { LanguageContext } = Settings

    return (
        <div
            className={cn(
                'flex flex-row justify-between h-14 items-center px-4 text-white border-b-3 font-semibold',
                className,
                {
                    'bg-gray-700': MaskedColors === 'DoNotColorCode',
                    'bg-red-400':
                        LanguageContext === 'L1' &&
                        MaskedColors === 'ColorCode',
                    'bg-blue-400':
                        LanguageContext === 'L2' && MaskedColors === 'ColorCode'
                }
            )}
        >
            {children}
        </div>
    )
}
