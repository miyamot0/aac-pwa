import React, { ReactNode } from 'react'
import { BoardSettings, LanguageOption } from './provider-types'
import { Toaster } from '@/components/ui/sonner'
import { db, SGDField } from '@/lib/db'
import {
    FieldManagementConfiguration,
    PostSpeechConfiguration
} from '@/types/board-settings'

const FIELD_SIZE_DEFAULT = 6

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
    FieldRows: 2,
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

export const IconsProvider: React.FC<Props> = ({ children }) => {
    const speechSynthesis = window.speechSynthesis

    const [postSpeechSettings, setPostSpeechSettings] =
        React.useState<PostSpeechConfiguration>('None')

    const [iconPositioning, setIconPositioning] =
        React.useState<FieldManagementConfiguration>('NoChange')

    const [settings, setSettings] = React.useState<BoardSettings>({
        Locked: false,
        LanguageContext: 'L1'
    })

    const [frame, setFrame] = React.useState<SGDField[]>([])

    async function shuffleIndices() {
        const current_icons: SGDField[] = await db.icons.toArray()
        const default_array = [0, 1, 2, 3, 4, 5]

        const shuffled = default_array
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)

        current_icons.forEach(async (icon, _index) => {
            await db.icons.update(icon, { index: shuffled[_index] })
        })
    }

    return (
        <IconsContext.Provider
            value={{
                Settings: settings,
                PostSpeechSettings: postSpeechSettings,
                IconPositioning: iconPositioning,
                Speaker: speechSynthesis,
                Frame: frame,
                FieldSize: FIELD_SIZE_DEFAULT,
                FieldRows: 2,
                AddToFrame: (icon: SGDField) => setFrame([...frame, icon]),
                RemoveFromFrame: () => setFrame([...frame.slice(0, -1)]),
                ClearFrame: () => setFrame([]),
                ShuffleField: async () => await shuffleIndices(),
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
