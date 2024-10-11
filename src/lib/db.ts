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

export type IconStateType = {
    Language: 'en' | 'es' | 'N/A'
    Label: string
    Hidden: boolean
    Image?: string
    File?: Uint8Array
}

export interface SGDField {
    id: number
    index: number
    L1: IconStateType
    L2: IconStateType
}

const db = new Dexie('FriendsDatabase') as Dexie & {
    files: EntityTable<SavedFile, 'id'>
    icons: EntityTable<SGDField, 'id'>
}

db.version(4).stores({
    files: '++id, timestamp, file',
    icons: '++id, index, conditional, L1, L2, file'
})

export type { SavedFile }
export { db }
