import { buttonVariants } from '@/components/ui/button'
import { BOARD_PAGE } from '@/lib/links'
import { cn } from '@/lib/utils'
import { GithubIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
    return (
        <div className="flex flex-col w-full px-4 h-screen max-h-screen-safe">
            <div className="flex flex-row justify-between py-4">
                <span></span>
                <div className="flex flex-col gap-4 w-fit">
                    <Link
                        to={'https://github.com/miyamot0/aac-pwa'}
                        target="_blank"
                        className="border rounded shadow-xl bg-gray-500 flex flex-row items-center px-2"
                    >
                        <GithubIcon className="h-6 w-6 m-2 text-white" />
                        <span className="text-white mr-2">Github Repo</span>
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

            <div className="flex flex-row justify-between">
                <span className="text-lg text-left">
                    Developed/Maintained by Shawn Gilroy <br />
                    Louisiana State University (MIT License)
                </span>
                <span className="text-right">
                    Version {BUILD_VERSION} (alpha) <br /> Build Date{' '}
                    {BUILD_DATE}
                </span>
            </div>
        </div>
    )
}
