import React, { FC, ReactNode, useEffect, useState } from 'react'
import { BoardSettings, LanguageOption } from '../types/provider-types'
import { Toaster } from '@/components/ui/sonner'
import { SGDField } from '@/lib/db'
import {
    FieldManagementConfiguration,
    FrameLengthConfiguration,
    PostSpeechConfiguration
} from '@/types/board-settings'
import { ShuffleAndUpdateIcons } from './actions'
import { loadSavedPreferences, storeSavedPreferences } from '@/lib/prefs'

export const FIELD_SIZE_DEFAULT = 18
export const FIELD_ROWS_DEFAULT = 3

interface IconsContextType {
    Settings: BoardSettings
    PostSpeechSettings: PostSpeechConfiguration
    IconPositioning: FieldManagementConfiguration
    FrameRestrictions: FrameLengthConfiguration
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
    SettingsUpdateFrameRestriction: (setting: FrameLengthConfiguration) => void
}

export const IconsContext = React.createContext<IconsContextType>({
    Settings: {
        Locked: false,
        LanguageContext: 'L1'
    },
    PostSpeechSettings: 'None',
    IconPositioning: 'NoChange',
    FrameRestrictions: 'NoRestrictions',
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
    SettingsSwitchLanguage: () => {},
    SettingsUpdateFrameRestriction: () => {}
})

type Props = {
    children: ReactNode
}

export const IconsProvider: FC<Props> = ({ children }) => {
    const speechSynthesis = window.speechSynthesis
    const screenOrientation = window.screen.orientation

    const [postSpeechSettings, setPostSpeechSettings] =
        useState<PostSpeechConfiguration>('None')

    const [iconPositioning, setIconPositioning] =
        useState<FieldManagementConfiguration>('NoChange')

    const [frameRestrictions, setFrameRestrictions] =
        useState<FrameLengthConfiguration>('NoRestrictions')

    const [settings, setSettings] = useState<BoardSettings>({
        Locked: false,
        LanguageContext: 'L1'
    })

    const [frame, setFrame] = useState<SGDField[]>([])

    useEffect(() => {
        const savedPrefs = loadSavedPreferences()

        const {
            Settings,
            PostSpeechSettings,
            IconPositioning,
            FrameRestrictions
        } = savedPrefs

        setSettings(Settings)
        setPostSpeechSettings(PostSpeechSettings)
        setIconPositioning(IconPositioning)
        setFrameRestrictions(FrameRestrictions)

        screenOrientation.lock('landscape-primary')
    }, [screenOrientation])

    return (
        <IconsContext.Provider
            value={{
                Settings: settings,
                PostSpeechSettings: postSpeechSettings,
                IconPositioning: iconPositioning,
                FrameRestrictions: frameRestrictions,
                Speaker: speechSynthesis,
                Frame: frame,
                FieldSize: FIELD_SIZE_DEFAULT,
                FieldRows: FIELD_ROWS_DEFAULT,
                AddToFrame: (icon: SGDField) => {
                    if (
                        frameRestrictions === 'LimitToOneIcon' &&
                        frame.length > 0
                    )
                        return

                    setFrame([...frame, icon])
                },
                RemoveFromFrame: () => setFrame([...frame.slice(0, -1)]),
                ClearFrame: () => setFrame([]),
                ShuffleField: async () => await ShuffleAndUpdateIcons(),
                SettingsToggleLocked: () => {
                    const new_settings = {
                        ...settings,
                        Locked: !settings.Locked
                    }

                    setSettings(new_settings)
                    storeSavedPreferences(
                        new_settings,
                        postSpeechSettings,
                        iconPositioning,
                        frameRestrictions
                    )
                },
                SettingsUpdatePostSpeechConfig: (
                    setting: PostSpeechConfiguration
                ) => {
                    setPostSpeechSettings(setting)
                    storeSavedPreferences(
                        settings,
                        setting,
                        iconPositioning,
                        frameRestrictions
                    )
                },
                SettingsUpdateIconPositioningConfig: (
                    setting: FieldManagementConfiguration
                ) => {
                    setIconPositioning(setting)
                },
                SettingsDisplaySheet: (status) => {
                    const new_settings = {
                        ...settings,
                        SheetOpen: status
                    }

                    setSettings(new_settings)
                    storeSavedPreferences(
                        new_settings,
                        postSpeechSettings,
                        iconPositioning,
                        frameRestrictions
                    )
                },
                SettingsSwitchLanguage: (language) => {
                    const new_settings = {
                        ...settings,
                        LanguageContext: language
                    }

                    setSettings(new_settings)
                    storeSavedPreferences(
                        new_settings,
                        postSpeechSettings,
                        iconPositioning,
                        frameRestrictions
                    )
                },
                SettingsUpdateFrameRestriction: (
                    setting: FrameLengthConfiguration
                ) => {
                    setFrameRestrictions(setting)
                    storeSavedPreferences(
                        settings,
                        postSpeechSettings,
                        iconPositioning,
                        setting
                    )
                }
            }}
        >
            {children}
            <Toaster />
        </IconsContext.Provider>
    )
}
