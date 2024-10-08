import { useEffect } from 'react'
import { useState } from 'react'

export default function FileSystemPage() {
    const [entries, setEntries] = useState([] as string[])

    useEffect(() => {
        async function puller() {
            const origin_fs = await navigator.storage.getDirectory()

            if (origin_fs) {
                const local_entries: string[] = []

                for await (const handle of origin_fs.values()) {
                    alert(handle.name)
                    local_entries.push(handle.name)
                }

                setEntries(local_entries)
            } else {
                alert('Err')
            }
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
