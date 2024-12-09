import { MdViewer } from '@/helpers/md-viewer'
import { DocumentationObjects } from '@/lib/docs'
import { SETTINGS_PAGE } from '@/lib/links'
import { FrontMatterUniversalType } from '@/types/mdx-types'
import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import TableOfContentsDocs from './views/table-of-contents'
import { removeDuplicates } from '@/lib/arrays'
import { COLOR_LIST } from '@/lib/colors'
import { cn } from '@/lib/utils'

const FrontMatter = DocumentationObjects.sort(
    (a, b) => a.matter.index - b.matter.index
).map((entry) => {
    return {
        ...entry,
        matter: entry.matter as FrontMatterUniversalType
    }
})

const all_keywords = FrontMatter.flatMap((matter) =>
    matter.matter.keywords.split(',').flatMap((keyword) => keyword.trim())
)

const filtered_keywords = removeDuplicates(all_keywords).map(
    (keyword, index) => {
        return {
            keyword,
            index,
            color: COLOR_LIST[index % COLOR_LIST.length]
        }
    }
)

export default function DocumentationPage() {
    const [display, setDisplay] = useState(FrontMatter[0])
    const params = useParams()

    const path_for_back = params.ref === 'home' ? `/` : SETTINGS_PAGE

    return (
        <div className="flex flex-col w-full min-h-svh">
            <div
                className={cn(
                    'justify-between h-14 items-center px-4 text-white border-b-3 font-semibold default-header-bg grid grid-cols-3'
                )}
            >
                <Link
                    replace
                    to={path_for_back}
                    className="flex flex-row gap-2"
                    unstable_viewTransition={true}
                >
                    <ChevronLeft className="h-6 w-6" />
                    Back
                </Link>
                <span className="text-lg text-center">
                    Program Documentation
                </span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-2 my-2 px-2">
                <TableOfContentsDocs
                    DocumentationEntries={FrontMatter}
                    setDocumentation={setDisplay}
                    Documentation={display}
                    ThemedKeywords={filtered_keywords}
                />
                <div className="bg-white col-span-2 lg:col-span-2 xl:col-span-3 flex flex-col h-full border rounded-lg shadow-md">
                    <div className="prose dark:prose-invert !max-w-none py-4 px-4 lg:px-6 override-prose">
                        <MdViewer source={display.value} />
                    </div>
                </div>
            </div>
        </div>
    )
}
