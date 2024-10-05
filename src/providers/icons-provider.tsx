import React, { ReactNode } from 'react'
import { BoardSettings, IconObject, LanguageOption } from './provider-types'

interface IconsContextType {
    Settings: BoardSettings
    Speaker: SpeechSynthesis
    Field: IconObject[]
    Frame: IconObject[]
    AddToFrame: (icon: IconObject) => void
    RemoveFromFrame: () => void
    ClearFrame: () => void
    SettingsToggleLocked: () => void
    SettingsToggleFrameReset: () => void
    SettingsDisplaySheet: (status: boolean) => void
    SettingsSwitchLanguage: (language: LanguageOption) => void
}

export const IconsContext = React.createContext<IconsContextType>({
    Settings: {
        Locked: false,
        SheetOpen: false,
        ResetAfterSpeak: false,
        LanguageContext: 'L1'
    },
    Speaker: window.speechSynthesis,
    Field: [],
    Frame: [],
    AddToFrame: () => {},
    RemoveFromFrame: () => {},
    ClearFrame: () => {},
    SettingsToggleLocked: () => {},
    SettingsToggleFrameReset: () => {},
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
        ResetAfterSpeak: false,
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
                ClearFrame: () => setFrame([]),
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
                SettingsToggleFrameReset: () => {
                    setSettings((prev) => {
                        return {
                            ...prev,
                            ResetAfterSpeak: !prev.ResetAfterSpeak
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
