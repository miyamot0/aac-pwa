import React, { ReactNode } from 'react'

export type LanguageOption = 'L1' | 'L2'

export type BoardSettings = {
    Locked: boolean
    SheetOpen: boolean
    LanguageContext: LanguageOption
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

interface IconsContextType {
    Settings: BoardSettings
    Speaker: SpeechSynthesis
    Field: IconObject[]
    Frame: IconObject[]
    AddToFrame: (icon: IconObject) => void
    RemoveFromFrame: () => void
    SettingsToggleLocked: () => void
    SettingsDisplaySheet: (status: boolean) => void
    SettingsSwitchLanguage: (language: LanguageOption) => void
}

export const IconsContext = React.createContext<IconsContextType>({
    Settings: {
        Locked: false,
        SheetOpen: false,
        LanguageContext: 'L1'
    },
    Speaker: window.speechSynthesis,
    Field: [],
    Frame: [],
    AddToFrame: () => {},
    RemoveFromFrame: () => {},
    SettingsToggleLocked: () => {},
    SettingsDisplaySheet: () => {},
    SettingsSwitchLanguage: () => {}
})

type Props = {
    children: ReactNode
}

export const IconsProvider: React.FC<Props> = ({ children }) => {
    const speechSynthesis = window.speechSynthesis

    const [settings, setSettings] = React.useState<BoardSettings>({
        Locked: false,
        SheetOpen: false,
        LanguageContext: 'L1'
    })

    const [icons] = React.useState<IconObject[]>([
        {
            id: '1',
            L1: {
                Label: 'Label 1',
                Image: 'https://via.placeholder.com/150',
                Language: 'en-us'
            },
            L2: {
                Label: 'Label 1',
                Image: 'https://via.placeholder.com/150',
                Language: 'en-us'
            },
            Index: 0
        },
        {
            id: '2',
            L1: {
                Label: 'Label 2',
                Image: 'https://via.placeholder.com/150',
                Language: 'en-us'
            },
            L2: {
                Label: 'Label 2',
                Image: 'https://via.placeholder.com/150',
                Language: 'en-us'
            },
            Index: 4
        }
    ])
    const [frame, setFrame] = React.useState<IconObject[]>([])

    return (
        <IconsContext.Provider
            value={{
                Settings: settings,
                Speaker: speechSynthesis,
                Field: icons,
                Frame: frame,
                AddToFrame: (icon: IconObject) => setFrame([...frame, icon]),
                RemoveFromFrame: () => setFrame([...frame.slice(0, -1)]),
                SettingsToggleLocked: () => {
                    setSettings((prev) => {
                        return {
                            ...prev,
                            Locked: !prev.Locked,
                            SheetOpen:
                                !prev.Locked === true ? false : prev.SheetOpen
                        }
                    })
                },
                SettingsDisplaySheet: (status) => {
                    setSettings((prev) => {
                        return {
                            ...prev,
                            SheetOpen: status
                        }
                    })
                },
                SettingsSwitchLanguage: (language) => {
                    setSettings((prev) => {
                        return {
                            ...prev,
                            LanguageContext: language
                        }
                    })
                }
            }}
        >
            {children}
        </IconsContext.Provider>
    )
}
