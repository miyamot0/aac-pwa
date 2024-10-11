import { buttonVariants } from '@/components/ui/button'
import { BOARD_PAGE } from '@/lib/links'
import { cn } from '@/lib/utils'
import { GithubIcon, HomeIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
    return (
        <div className="flex flex-col w-full px-4 min-h-screen-safe">
            <div className="flex flex-row justify-between py-4">
                <div></div>
                <div className="flex flex-row gap-4 w-fit">
                    <Link
                        to={'https://github.com/miyamot0/aac-pwa'}
                        target="_blank"
                        className="border rounded shadow-xl bg-gray-400"
                    >
                        <GithubIcon className="h-6 w-6 m-2 text-white" />
                    </Link>

                    <Link
                        to={'https://github.com/miyamot0/aac-pwa'}
                        target="_blank"
                        className="border rounded shadow-xl bg-gray-400"
                    >
                        <HomeIcon className="h-6 w-6 m-2 text-white" />
                    </Link>
                </div>
            </div>

            <div className="flex flex-row grow items-center justify-center">
                <div className="w-fit flex flex-col">
                    <h1 className="text-4xl font-bold text-center w-full py-8">
                        Bilingual PWA Prototype
                    </h1>

                    <Link
                        className={cn(
                            buttonVariants({ variant: 'default', size: 'lg' }),
                            'max-w-screen-sm self-center w-full p-6 text-lg'
                        )}
                        to={BOARD_PAGE}
                    >
                        Load Application
                    </Link>
                </div>
            </div>

            <div className="flex flex-row justify-between py-4">
                <div>
                    <span className="text-lg text-center w-full pt-4">
                        Shawn Gilroy, Louisiana State University (MIT License)
                    </span>
                </div>
                <div className="flex flex-row gap-6 w-fit">
                    <span>
                        Version {BUILD_VERSION} ({BUILD_DATE})
                    </span>
                </div>
            </div>
        </div>
    )
}
