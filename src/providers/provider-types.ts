export type LanguageOption = 'L1' | 'L2'

export type BoardSettings = {
    Locked: boolean
    SheetOpen: boolean
    LanguageContext: LanguageOption
    ResetAfterSpeak: boolean
}

export type LanguageContext = {
    Language: 'en-us' | 'es-us'
    Label: string
    Image: string
}

export type IconObject = {
    id: string
    L1: LanguageContext
    L2: LanguageContext
    Index: number
}
