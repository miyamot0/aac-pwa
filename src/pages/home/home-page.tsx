import { buttonVariants } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { PASSWORD } from '@/lib/auth'
import { BOARD_PAGE } from '@/lib/links'
import { cn } from '@/lib/utils'
import { GithubIcon, InfoIcon, LayoutGridIcon, ListIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const title = 'Bilingual AAC Prototype'

export default function HomePage() {
    return (
        <div className="flex flex-col w-full h-screen max-h-screen-safe">
            <div className="flex flex-row text-center default-header-bg gap-4 text-sm justify-between h-14 items-center text-white border-b-3 font-semibold">
                <span className="text-center px-4">
                    Default Password: {PASSWORD}
                </span>

                <div className="flex flex-row icons-center gap-4 px-4">
                    <Link
                        replace
                        to={'https://github.com/miyamot0/aac-pwa'}
                        target="_blank"
                        className="flex flex-row items-center gap-2 py-2"
                    >
                        <GithubIcon className="h-6 w-6" />
                        Github Repository
                    </Link>

                    <Dialog>
                        <DialogTrigger className="flex flex-row items-center gap-2 py-2">
                            <InfoIcon className="h-6 w-6" />
                            Information
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Program Information</DialogTitle>
                                <DialogDescription className="flex flex-col gap-2">
                                    <p>
                                        This prototype is a bilingual AAC
                                        (Augmentative and Alternative
                                        Communication) application developed by
                                        Shawn Gilroy at Louisiana State
                                        University.{' '}
                                        <span className="font-semibold">
                                            It is released under the MIT License
                                        </span>
                                        .
                                    </p>
                                    <p>
                                        The application is designed to be a
                                        basic, easy-to-use instrument for
                                        facilitating AAC research.
                                    </p>
                                    <p>
                                        It is not intended for general
                                        commercial/clinical use at this time.
                                    </p>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="flex flex-row grow items-center justify-center">
                <div className="w-fit flex flex-col gap-4">
                    <h1 className="text-6xl text-center w-full font-black text-stroke text-stroke-black text-stroke-fill-white font-sans">
                        {title}
                    </h1>

                    <span className="text-center">
                        Pre-release beta build ({BUILD_DATE})
                    </span>
                </div>
            </div>

            <div className="flex flex-col justify-center gap-4 mb-4">
                <Link
                    replace
                    to={'/docs/home'}
                    className={cn(
                        buttonVariants({
                            variant: 'default_purple',
                            size: 'sm'
                        }),
                        'max-w-screen-sm self-center w-full p-6 text-md'
                    )}
                >
                    <ListIcon className="h-6 w-6 mr-2" />
                    Read New User Guide
                </Link>

                <Link
                    replace
                    className={cn(
                        buttonVariants({
                            variant: 'default_purple',
                            size: 'lg'
                        }),
                        'max-w-screen-sm self-center w-full p-6 text-md'
                    )}
                    to={BOARD_PAGE}
                >
                    <LayoutGridIcon className="h-6 w-6 mr-2" />
                    Load AAC Board
                </Link>

                <span className="text-center">Version {BUILD_VERSION}</span>
            </div>
        </div>
    )
}
