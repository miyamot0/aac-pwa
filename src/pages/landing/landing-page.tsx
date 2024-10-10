import { buttonVariants } from '@/components/ui/button'
import { BOARD_PAGE } from '@/lib/links'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

export default function LandingPage() {
    return (
        <div className="flex flex-col w-full h-full justify-end px-4 py-[10%]">
            <div className="flex flex-row grow items-center justify-center">
                <div className="w-fit flex flex-col">
                    <h1 className="text-4xl font-bold text-center w-full">
                        Otsu PWA Prototype
                    </h1>
                    <span className="text-lg text-center w-full font-semibold">
                        A prototype for the Otsu PWA
                    </span>
                    <span className="text-lg text-center w-full">
                        Version {BUILD_VERSION}
                    </span>
                    <span className="text-lg text-center w-full">
                        Built {BUILD_DATE}
                    </span>
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
        </div>
    )
}
