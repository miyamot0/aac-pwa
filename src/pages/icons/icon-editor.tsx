import { IconsContext } from '@/providers/icons-provider'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'

export default function IconEditorPage() {
    const { Field } = useContext(IconsContext)
    const { id } = useParams()

    const relevantIcon = Field.find((icon) => icon.id === id)

    return <div>{relevantIcon ? JSON.stringify(relevantIcon) : undefined}</div>
}
