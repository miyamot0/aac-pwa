import React, { ReactNode } from 'react'
import { BoardSettings, LanguageOption } from './provider-types'
import { Toaster } from '@/components/ui/sonner'
import { SGDField } from '@/lib/db'

interface IconsContextType {
    Settings: BoardSettings
    Speaker: SpeechSynthesis
    Frame: SGDField[]
    FieldSize: number
    FieldRows: number
    AddToFrame: (icon: SGDField) => void
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
    Frame: [],
    FieldSize: 5,
    FieldRows: 1,
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

    const [frame, setFrame] = React.useState<SGDField[]>([])

    return (
        <IconsContext.Provider
            value={{
                Settings: settings,
                Speaker: speechSynthesis,
                Frame: frame,
                FieldSize: 5,
                FieldRows: 1,
                AddToFrame: (icon: SGDField) => setFrame([...frame, icon]),
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
            <Toaster />
        </IconsContext.Provider>
    )
}
