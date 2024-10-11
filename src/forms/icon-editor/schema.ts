import { LanguageType } from '@/types/language-types'
import { z } from 'zod'

export const IconEditorSchema = z.object({
    index: z.coerce.number().min(0),
    conditional: z.boolean(),
    L1: z.nativeEnum(LanguageType),
    L1_Label: z.string(),
    L2: z.nativeEnum(LanguageType),
    L2_Label: z.string()
})
