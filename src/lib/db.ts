import Dexie, { type EntityTable } from 'dexie'

interface SavedFile {
    id: number
    timestamp: string
    file: Uint8Array
}

const db = new Dexie('FriendsDatabase') as Dexie & {
    files: EntityTable<
        SavedFile,
        'id' // primary key "id" (for the typings only)
    >
}

// Schema declaration:
db.version(2).stores({
    files: '++id, timestamp, file' // primary key "id" (for the runtime!)
})

export type { SavedFile }
export { db }
