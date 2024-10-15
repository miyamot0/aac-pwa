import { LanguageType } from '@/types/language-types'
import { z } from 'zod'

export const IconEditorSchema = z.object({
    index: z.coerce.number().min(0),
    L1: z.nativeEnum(LanguageType),
    L1_Label: z.string(),
    L1_Hidden: z.boolean(),
    L1_Recording: z.any(),
    L2: z.nativeEnum(LanguageType),
    L2_Label: z.string(),
    L2_Hidden: z.boolean(),
    L2_Recording: z.any()
})
