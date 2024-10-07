import { useEffect } from 'react'
import { useState } from 'react'

export default function FileSystemPage() {
    const [entries, setEntries] = useState([] as string[])

    useEffect(() => {
        async function puller() {
            const origin_fs = await navigator.storage.getDirectory()

            const local_entries: string[] = []

            for await (const handle of origin_fs.values()) {
                local_entries.push(handle.name)
            }

            setEntries(local_entries)
        }

        puller()
    }, [])

    return (
        <div>
            <ul>
                {entries.map((entry, index) => {
                    return <li key={index}>{entry}</li>
                })}
            </ul>
        </div>
    )
}
