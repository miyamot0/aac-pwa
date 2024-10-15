import {
    FieldManagementConfiguration,
    FrameLengthConfiguration,
    InterfaceVerbosityConfiguration,
    PostSpeechConfiguration
} from '@/types/board-settings'
import { BoardSettings } from '@/types/provider-types'
import { toast } from 'sonner'

const STORAGE_KEY = 'aac_pwa_prefs'

export type SavedPrefsType = {
    Settings: BoardSettings
    PostSpeechSettings: PostSpeechConfiguration
    IconPositioning: FieldManagementConfiguration
    FrameRestrictions: FrameLengthConfiguration
    UIVerbosity: InterfaceVerbosityConfiguration
}

const DEFAULT_PREFS: SavedPrefsType = {
    Settings: {
        Locked: false,
        LanguageContext: 'L1'
    },
    PostSpeechSettings: 'None',
    IconPositioning: 'NoChange',
    FrameRestrictions: 'NoRestrictions',
    UIVerbosity: 'DefaultVerbosity'
}

export function loadSavedPreferences(): SavedPrefsType {
    const savedPrefs = localStorage.getItem(STORAGE_KEY)
    if (savedPrefs) {
        return JSON.parse(savedPrefs)
    }
    return DEFAULT_PREFS
}

export function storeSavedPreferences(
    settings: BoardSettings,
    postSpeechSettings: PostSpeechConfiguration,
    iconPositioning: FieldManagementConfiguration,
    frame: FrameLengthConfiguration,
    uiVerbosity: InterfaceVerbosityConfiguration,
    displayToast = true
) {
    const prefs = {
        Settings: settings,
        PostSpeechSettings: postSpeechSettings,
        IconPositioning: iconPositioning,
        FrameRestrictions: frame,
        UIVerbosity: uiVerbosity
    } satisfies SavedPrefsType

    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))

    if (displayToast) {
        toast.success('Preferences saved')
    }
}
