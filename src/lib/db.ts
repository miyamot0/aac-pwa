import Dexie, { type EntityTable } from 'dexie'

interface SavedFile {
    id: number
    timestamp: string
    file: Uint8Array
}

export type LanguageContext = {
    Language: 'en' | 'es'
    Label: string
    Image: string
}

export interface SGDField {
    id: number
    index: number
    conditional: boolean
    L1: {
        Language: 'en' | 'es'
        Label: string
        Image?: string
        File?: Uint8Array
    }
    L2?: {
        Language: 'en' | 'es' | 'N/A'
        Label: string
        Image?: string
        File?: Uint8Array
    }
}

const db = new Dexie('FriendsDatabase') as Dexie & {
    files: EntityTable<
        SavedFile,
        'id' // primary key "id" (for the typings only)
    >
    icons: EntityTable<SGDField, 'id'>
}

db.version(4).stores({
    files: '++id, timestamp, file', // primary key "id" (for the runtime!),
    icons: '++id, index, conditional, L1, L2, file'
})

export type { SavedFile }
export { db }
