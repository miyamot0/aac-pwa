import { buttonVariants } from '@/components/ui/button'
import { BOARD_PAGE } from '@/lib/links'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

export default function LandingPage() {
    return (
        <div className="flex flex-col w-full px-4 min-h-screen-safe">
            <div className="flex flex-row grow items-center justify-center">
                <div className="w-fit flex flex-col">
                    <h1 className="text-4xl font-bold text-center w-full py-8">
                        Bilingual PWA Prototype
                    </h1>
                    <span className="text-lg text-center w-full font-semibold">
                        Behavioral Engineering Lab
                    </span>
                    <span className="text-lg text-center w-full">
                        Version {BUILD_VERSION} ({BUILD_DATE})
                    </span>
                    <span className="text-lg text-center w-full"></span>
                </div>
            </div>
            <Link
                className={cn(
                    buttonVariants({ variant: 'default', size: 'lg' }),
                    'max-w-screen-sm self-center w-full'
                )}
                to={BOARD_PAGE}
            >
                Load Board
            </Link>
            <span className="text-lg text-center w-full pt-4">
                MIT - Licensed
            </span>
        </div>
    )
}
