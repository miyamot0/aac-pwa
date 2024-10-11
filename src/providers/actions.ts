import { db, SGDField } from '@/lib/db'
import { FIELD_SIZE_DEFAULT } from './icons-provider'

/**
 * Shuffles the icons in the database and updates their index values.
 */
export async function ShuffleAndUpdateIcons() {
    const current_icons: SGDField[] = await db.icons.toArray()
    const default_array = Array.from(
        { length: FIELD_SIZE_DEFAULT },
        (_, i) => i
    )

    const shuffled = default_array
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

    const updates = current_icons.map((icon, index) => ({
        key: icon.id,
        changes: {
            index: shuffled[index]
        }
    }))

    await db.icons.bulkUpdate(updates)
}
