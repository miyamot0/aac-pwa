export type LanguageOption = 'L1' | 'L2'

export type BoardSettings = {
    Locked: boolean
    LanguageContext: LanguageOption
}

export type LanguageContext = {
    Language: 'en' | 'es'
    Label: string
    Image: string
}

export type IconObject = {
    id: string
    L1: LanguageContext
    L2: LanguageContext
    Index: number
}
