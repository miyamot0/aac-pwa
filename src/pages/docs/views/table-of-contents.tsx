import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { DocumentationEntriesType } from '@/types/documentation-types'

type Props = {
    Documentation: DocumentationEntriesType
    setDocumentation: (entry: DocumentationEntriesType) => void
    DocumentationEntries: DocumentationEntriesType[]
    ThemedKeywords: {
        keyword: string
        index: number
        color: string
    }[]
}

export default function TableOfContentsDocs({
    Documentation,
    DocumentationEntries,
    setDocumentation,
    ThemedKeywords
}: Props) {
    return (
        <div className="col-span-1 flex flex-col gap-4 border-r-1 border-black px-4 pt-4">
            <h1 className="text-2xl font-bold text-center">Documentation</h1>
            <ul className="flex flex-col gap-4">
                {DocumentationEntries.map((entry) => {
                    const keywords = entry.matter.keywords
                        .split(',')
                        .flatMap((keyword) => keyword.trim())

                    return (
                        <li
                            key={entry.matter.index}
                            onClick={() => {
                                setDocumentation(entry)
                            }}
                        >
                            <div
                                className={cn(
                                    'bg-white border rounded-lg py-2 cursor-pointer shadow border-gray-300 flex flex-col transition-colors duration-300 ease-in-out',
                                    {
                                        'cursor-default bg-gray-100 shadow-xl border-gray-400':
                                            Documentation.matter.index ===
                                            entry.matter.index
                                    }
                                )}
                            >
                                <h2
                                    className={cn('text-md font-semibold px-2')}
                                >
                                    {`${entry.matter.title}`}
                                </h2>

                                <span className="text-muted-foreground px-2 text-sm">
                                    {entry.matter.description}
                                </span>

                                <div className="flex flex-row gap-2 px-2 text-sm py-2">
                                    {keywords.map((keyword, index) => {
                                        const themed_key = ThemedKeywords.find(
                                            (k) =>
                                                k.keyword.trim() ===
                                                keyword.trim()
                                        )

                                        if (!themed_key)
                                            throw new Error('Keyword not found')

                                        return (
                                            <Badge
                                                key={index}
                                                className={cn(
                                                    'rounded-full',
                                                    themed_key.color
                                                )}
                                            >
                                                {keyword}
                                            </Badge>
                                        )
                                    })}
                                </div>

                                <span className="text-muted-foreground px-2 text-sm text-right">
                                    Updated: {entry.matter.date}
                                </span>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
