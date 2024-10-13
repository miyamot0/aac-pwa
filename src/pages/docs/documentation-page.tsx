import HeaderBackground from '@/components/layout/header-bg'
import { MdViewer } from '@/helpers/md-viewer'
import { DocumentationObjects } from '@/lib/docs'
import { SETTINGS_PAGE } from '@/lib/links'
import { cn } from '@/lib/utils'
import { FrontMatterUniversalType } from '@/types/mdx-types'
import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function DocumentationPage() {
    const FrontMatter = DocumentationObjects.sort(
        (a, b) => a.matter.index - b.matter.index
    ).map((entry) => {
        return {
            ...entry,
            matter: entry.matter as FrontMatterUniversalType
        }
    })

    const [display, setDisplay] = useState(FrontMatter[0])

    return (
        <div className="flex flex-col w-full min-h-svh">
            <HeaderBackground className="grid grid-cols-3">
                <Link
                    to={SETTINGS_PAGE}
                    className="flex flex-row gap-2"
                    unstable_viewTransition={true}
                >
                    <ChevronLeft className="h-6 w-6" />
                    Back
                </Link>
                <span className="text-lg text-center">
                    Program Documentation
                </span>
            </HeaderBackground>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4 mt-2 px-2">
                <div className="col-span-1 flex flex-col gap-4 border-r-1 border-black px-4 pt-4">
                    <h1 className="text-2xl font-bold text-center">
                        Documentation
                    </h1>
                    <ul className="flex flex-col gap-4">
                        {FrontMatter.map((entry) => (
                            <li
                                key={entry.matter.index}
                                onClick={() => {
                                    setDisplay(entry)
                                }}
                            >
                                <div
                                    className={cn(
                                        'bg-white border rounded-lg py-2 px-2 cursor-pointer shadow-xl border-gray-300',
                                        {
                                            'cursor-default bg-gray-200':
                                                display.matter.index ===
                                                entry.matter.index
                                        }
                                    )}
                                >
                                    <h2 className={cn('text-md font-semibold')}>
                                        {`${entry.matter.title}`}
                                    </h2>

                                    <hr className="my-1" />
                                    <p className="text-muted-foreground">
                                        Written by: {entry.matter.author}
                                    </p>
                                    <p className="text-muted-foreground">
                                        Updated: {entry.matter.date}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white col-span-2 lg:col-span-2 xl:col-span-3 flex flex-col h-full border rounded-t-lg">
                    <div className="prose dark:prose-invert !max-w-none py-4 px-4 lg:px-6 override-prose">
                        <MdViewer source={display.value} />
                    </div>
                </div>
            </div>
        </div>
    )
}
