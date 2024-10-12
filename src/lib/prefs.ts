import {
    FieldManagementConfiguration,
    FrameLengthConfiguration,
    PostSpeechConfiguration
} from '@/types/board-settings'
import { BoardSettings } from '@/types/provider-types'

const STORAGE_KEY = 'aac_pwa_prefs'

export type SavedPrefsType = {
    Settings: BoardSettings
    PostSpeechSettings: PostSpeechConfiguration
    IconPositioning: FieldManagementConfiguration
    FrameRestrictions: FrameLengthConfiguration
}

const DEFAULT_PREFS: SavedPrefsType = {
    Settings: {
        Locked: false,
        LanguageContext: 'L1'
    },
    PostSpeechSettings: 'None',
    IconPositioning: 'NoChange',
    FrameRestrictions: 'NoRestrictions'
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
    frame: FrameLengthConfiguration
) {
    const prefs = {
        Settings: settings,
        PostSpeechSettings: postSpeechSettings,
        IconPositioning: iconPositioning,
        FrameRestrictions: frame
    } satisfies SavedPrefsType

    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
}
