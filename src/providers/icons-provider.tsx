import React, { FC, ReactNode, useState } from 'react'
import { BoardSettings, LanguageOption } from '../types/provider-types'
import { Toaster } from '@/components/ui/sonner'
import { SGDField } from '@/lib/db'
import {
    FieldManagementConfiguration,
    PostSpeechConfiguration
} from '@/types/board-settings'
import { ShuffleAndUpdateIcons } from './actions'

export const FIELD_SIZE_DEFAULT = 18
export const FIELD_ROWS_DEFAULT = 3

interface IconsContextType {
    Settings: BoardSettings
    PostSpeechSettings: PostSpeechConfiguration
    IconPositioning: FieldManagementConfiguration
    Speaker: SpeechSynthesis
    Frame: SGDField[]
    FieldSize: number
    FieldRows: number
    ShuffleField: () => Promise<void>
    AddToFrame: (icon: SGDField) => void
    RemoveFromFrame: () => void
    ClearFrame: () => void
    SettingsToggleLocked: () => void
    SettingsUpdatePostSpeechConfig: (setting: PostSpeechConfiguration) => void
    SettingsUpdateIconPositioningConfig: (
        setting: FieldManagementConfiguration
    ) => void
    SettingsDisplaySheet: (status: boolean) => void
    SettingsSwitchLanguage: (language: LanguageOption) => void
}

export const IconsContext = React.createContext<IconsContextType>({
    Settings: {
        Locked: false,
        LanguageContext: 'L1'
    },
    PostSpeechSettings: 'None',
    IconPositioning: 'NoChange',
    Speaker: window.speechSynthesis,
    Frame: [],
    FieldSize: FIELD_SIZE_DEFAULT,
    FieldRows: FIELD_ROWS_DEFAULT,
    ShuffleField: async () => {},
    AddToFrame: () => {},
    RemoveFromFrame: () => {},
    ClearFrame: () => {},
    SettingsToggleLocked: () => {},
    SettingsUpdatePostSpeechConfig: () => {},
    SettingsUpdateIconPositioningConfig: () => {},
    SettingsDisplaySheet: () => {},
    SettingsSwitchLanguage: () => {}
})

type Props = {
    children: ReactNode
}

export const IconsProvider: FC<Props> = ({ children }) => {
    const speechSynthesis = window.speechSynthesis

    const [postSpeechSettings, setPostSpeechSettings] =
        useState<PostSpeechConfiguration>('None')

    const [iconPositioning, setIconPositioning] =
        useState<FieldManagementConfiguration>('NoChange')

    const [settings, setSettings] = useState<BoardSettings>({
        Locked: false,
        LanguageContext: 'L1'
    })

    const [frame, setFrame] = useState<SGDField[]>([])

    return (
        <IconsContext.Provider
            value={{
                Settings: settings,
                PostSpeechSettings: postSpeechSettings,
                IconPositioning: iconPositioning,
                Speaker: speechSynthesis,
                Frame: frame,
                FieldSize: FIELD_SIZE_DEFAULT,
                FieldRows: FIELD_ROWS_DEFAULT,
                AddToFrame: (icon: SGDField) => setFrame([...frame, icon]),
                RemoveFromFrame: () => setFrame([...frame.slice(0, -1)]),
                ClearFrame: () => setFrame([]),
                ShuffleField: async () => await ShuffleAndUpdateIcons(),
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
                SettingsUpdateIconPositioningConfig: (
                    setting: FieldManagementConfiguration
                ) => {
                    setIconPositioning(setting)
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
