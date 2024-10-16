import React, { FC, ReactNode, useEffect, useState } from 'react'
import { BoardSettings, LanguageOption } from '../types/provider-types'
import { Toaster } from '@/components/ui/sonner'
import { SGDField } from '@/lib/db'
import {
    FieldManagementConfiguration,
    FrameLengthConfiguration,
    InterfaceVerbosityConfiguration,
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
    UIVerbosity: InterfaceVerbosityConfiguration
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
    SettingsSwitchLanguage: (language: LanguageOption) => void
    SettingsUpdateFrameRestriction: (setting: FrameLengthConfiguration) => void
    SettingsUpdateUIVerbosity: (
        setting: InterfaceVerbosityConfiguration
    ) => void
}

export const IconsContext = React.createContext<IconsContextType>({
    Settings: {
        Locked: false,
        LanguageContext: 'L1'
    },
    PostSpeechSettings: 'None',
    IconPositioning: 'NoChange',
    FrameRestrictions: 'NoRestrictions',
    UIVerbosity: 'DefaultVerbosity',
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
    SettingsSwitchLanguage: () => {},
    SettingsUpdateFrameRestriction: () => {},
    SettingsUpdateUIVerbosity: () => {}
})

const default_start_settings = {
    Locked: false,
    LanguageContext: 'L1' as LanguageOption
}

type Props = {
    children: ReactNode
}

export const IconsProvider: FC<Props> = ({ children }) => {
    const speechSynthesis = window.speechSynthesis

    const [postSpeechSettings, setPostSpeechSettings] =
        useState<PostSpeechConfiguration>('None')

    const [iconPositioning, setIconPositioning] =
        useState<FieldManagementConfiguration>('NoChange')

    const [frameRestrictions, setFrameRestrictions] =
        useState<FrameLengthConfiguration>('NoRestrictions')

    const [uiVerbosity, setUIVerbosity] =
        useState<InterfaceVerbosityConfiguration>('DefaultVerbosity')

    const [settings, setSettings] = useState<BoardSettings>(
        default_start_settings
    )

    const [frame, setFrame] = useState<SGDField[]>([])

    useEffect(() => {
        const savedPrefs = loadSavedPreferences()

        const {
            Settings,
            PostSpeechSettings,
            IconPositioning,
            FrameRestrictions,
            UIVerbosity
        } = savedPrefs

        setSettings(Settings)
        setPostSpeechSettings(PostSpeechSettings)
        setIconPositioning(IconPositioning)
        setFrameRestrictions(FrameRestrictions)
        setUIVerbosity(UIVerbosity)
    }, [])

    return (
        <IconsContext.Provider
            value={{
                Settings: settings,
                PostSpeechSettings: postSpeechSettings,
                IconPositioning: iconPositioning,
                FrameRestrictions: frameRestrictions,
                UIVerbosity: uiVerbosity,
                Speaker: speechSynthesis,
                Frame: frame,
                FieldSize: FIELD_SIZE_DEFAULT,
                FieldRows: FIELD_ROWS_DEFAULT,
                AddToFrame: (icon: SGDField) => {
                    if (
                        frameRestrictions === 'LimitToOneIcon' &&
                        frame.length > 0
                    ) {
                        return
                    }

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
                        frameRestrictions,
                        uiVerbosity,
                        false
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
                        frameRestrictions,
                        uiVerbosity
                    )
                },
                SettingsUpdateIconPositioningConfig: (
                    setting: FieldManagementConfiguration
                ) => {
                    setIconPositioning(setting)
                    storeSavedPreferences(
                        settings,
                        postSpeechSettings,
                        setting,
                        frameRestrictions,
                        uiVerbosity
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
                        frameRestrictions,
                        uiVerbosity
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
                        setting,
                        uiVerbosity
                    )
                },
                SettingsUpdateUIVerbosity: (
                    setting: InterfaceVerbosityConfiguration
                ) => {
                    setUIVerbosity(setting)
                    storeSavedPreferences(
                        settings,
                        postSpeechSettings,
                        iconPositioning,
                        frameRestrictions,
                        setting
                    )
                }
            }}
        >
            {children}
            <Toaster richColors={true} duration={2000} visibleToasts={1} />
        </IconsContext.Provider>
    )
}
