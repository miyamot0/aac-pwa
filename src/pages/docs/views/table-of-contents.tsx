import { cn } from '@/lib/utils'
import { DocumentationEntriesType } from '@/types/documentation-types'

type Props = {
    Documentation: DocumentationEntriesType
    setDocumentation: (entry: DocumentationEntriesType) => void
    DocumentationEntries: DocumentationEntriesType[]
}

export default function TableOfContentsDocs({
    Documentation,
    DocumentationEntries,
    setDocumentation
}: Props) {
    return (
        <div className="col-span-1 flex flex-col gap-4 border-r-1 border-black px-4 pt-4">
            <h1 className="text-2xl font-bold text-center">Documentation</h1>
            <ul className="flex flex-col gap-4">
                {DocumentationEntries.map((entry) => (
                    <li
                        key={entry.matter.index}
                        onClick={() => {
                            setDocumentation(entry)
                        }}
                    >
                        <div
                            className={cn(
                                'bg-white border rounded-lg py-2 cursor-pointer shadow border-gray-300 flex flex-col gap-1 transition-colors duration-300 ease-in-out',
                                {
                                    'cursor-default bg-green-100 shadow-xl':
                                        Documentation.matter.index ===
                                        entry.matter.index
                                }
                            )}
                        >
                            <h2 className={cn('text-md font-semibold px-2')}>
                                {`${entry.matter.title}`}
                            </h2>

                            <hr className="my-1 border-gray-300" />
                            <p className="text-muted-foreground px-2 text-sm">
                                {entry.matter.description}
                            </p>

                            <p className="text-muted-foreground px-2 text-sm text-right">
                                Updated: {entry.matter.date}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
