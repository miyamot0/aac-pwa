import { db, SGDField } from '@/lib/db'

/**
 * Shuffles the icons in the database and updates their index values.
 */
export async function ShuffleAndUpdateIcons() {
    const current_icons: SGDField[] = await db.icons.toArray()
    const default_array = [0, 1, 2, 3, 4, 5]

    const shuffled = default_array
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

    current_icons.forEach(async (icon, _index) => {
        await db.icons.update(icon, { index: shuffled[_index] })
    })
}
