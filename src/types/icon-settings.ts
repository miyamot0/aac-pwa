// ----------------- Icon Setting Options -----------------

import { LanguageType } from './language-types'

type IconSettingsSelectOption = {
    value: LanguageType
    label: string
}

export const IconSettingsSelectOptions: IconSettingsSelectOption[] = [
    {
        value: LanguageType.English,
        label: 'English'
    },
    {
        value: LanguageType.Spanish,
        label: 'Spanish'
    },
    {
        value: LanguageType.NA,
        label: 'N/A (Disabled)'
    }
]
