import { db } from '@/lib/db'
import { LoaderFunctionArgs } from 'react-router-dom'

type Props = LoaderFunctionArgs<{ id: string }>

export async function IconEditorLoader({ params }: Props) {
    const str_id = params.id

    if (!str_id) throw new Error('id is required')

    const id = parseInt(str_id)

    if (!id) throw new Error('id must be a number')

    const icon = await db.icons.get(id)

    const icons = await db.icons.toArray()
    const filled_indices = icons.map((icon) => icon.index)

    return { icon, filled_indices }
}
