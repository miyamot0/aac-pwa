import React, { ReactNode } from 'react'
import { BoardSettings, LanguageOption } from './provider-types'
import { Toaster } from '@/components/ui/sonner'
import { SGDField } from '@/lib/db'
import { PostSpeechConfiguration } from '@/types/board-settings'

interface IconsContextType {
    Settings: BoardSettings
    PostSpeechSettings: PostSpeechConfiguration
    Speaker: SpeechSynthesis
    Frame: SGDField[]
    FieldSize: number
    FieldRows: number
    AddToFrame: (icon: SGDField) => void
    RemoveFromFrame: () => void
    ClearFrame: () => void
    SettingsToggleLocked: () => void
    SettingsUpdatePostSpeechConfig: (setting: PostSpeechConfiguration) => void
    SettingsDisplaySheet: (status: boolean) => void
    SettingsSwitchLanguage: (language: LanguageOption) => void
}

export const IconsContext = React.createContext<IconsContextType>({
    Settings: {
        Locked: false,
        LanguageContext: 'L1'
    },
    PostSpeechSettings: 'None',
    Speaker: window.speechSynthesis,
    Frame: [],
    FieldSize: 5,
    FieldRows: 1,
    AddToFrame: () => {},
    RemoveFromFrame: () => {},
    ClearFrame: () => {},
    SettingsToggleLocked: () => {},
    SettingsUpdatePostSpeechConfig: () => {},
    SettingsDisplaySheet: () => {},
    SettingsSwitchLanguage: () => {}
})

type Props = {
    children: ReactNode
}

export const IconsProvider: React.FC<Props> = ({ children }) => {
    const speechSynthesis = window.speechSynthesis

    const [postSpeechSettings, setPostSpeechSettings] =
        React.useState<PostSpeechConfiguration>('None')

    const [settings, setSettings] = React.useState<BoardSettings>({
        Locked: false,
        LanguageContext: 'L1'
    })

    const [frame, setFrame] = React.useState<SGDField[]>([])

    return (
        <IconsContext.Provider
            value={{
                Settings: settings,
                PostSpeechSettings: postSpeechSettings,
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
                            Locked: !prev.Locked
                        }
                    })
                },
                SettingsUpdatePostSpeechConfig: (
                    setting: PostSpeechConfiguration
                ) => {
                    setPostSpeechSettings(setting)
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
