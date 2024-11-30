// ----------------- Frame Options -----------------

/* No additional steps */
const _none = 'None'

/* Reset the frame to blank after speaking */
const _reset = 'ResetFrameAfterSpeech'

export type PostSpeechConfiguration = typeof _none | typeof _reset

export const PostSpeechConfigSelectOptions = [
    {
        value: _none,
        label: 'None (Default)'
    },
    {
        value: _reset,
        label: 'Reset Frame After Speech'
    }
]

/* No additional steps */
const _free = 'NoRestrictions'

/* Reset the frame to blank after speaking */
const _limited = 'LimitToOneIcon'

export type FrameLengthConfiguration = typeof _free | typeof _limited

export const FrameLengthConfigurationOptions = [
    {
        value: _free,
        label: 'No Restrictions (Default)'
    },
    {
        value: _limited,
        label: 'Limit To One Icon'
    }
]

// ----------------- Field Options -----------------

/* DO NOT alter positions */
const _no_change = 'NoChange'

const _shuffle_positions = 'ShufflePosition'

export type FieldManagementConfiguration =
    | typeof _no_change
    | typeof _shuffle_positions

export const FieldManagementConfigSelectOptions = [
    {
        value: _no_change,
        label: 'No Change'
    },
    {
        value: _shuffle_positions,
        label: 'Shuffle Positions'
    }
]

// ----------------- Verbosity Options -----------------

/* DO NOT alter positions */
const _default = 'DefaultVerbosity'

const _minimized_display = 'MinimalInformation'

export type InterfaceVerbosityConfiguration =
    | typeof _default
    | typeof _minimized_display

export const InterfaceVerbosityConfigurationSelectOptions = [
    {
        value: _default,
        label: 'Display All Information (Default)'
    },
    {
        value: _minimized_display,
        label: 'Display Minimal Information'
    }
]

// ----------------- Color Masking -----------------

// ----------------- Frame Options -----------------

/* No additional steps */
const _colors_no_mask = 'ColorCode'

/* Reset the frame to blank after speaking */
const _colors_masked = 'DoNotColorCode'

export type ColorMaskingOption = typeof _colors_no_mask | typeof _colors_masked

export const ColorMaskingSelectOptions = [
    {
        value: _colors_no_mask,
        label: 'Color Code L1/L2'
    },
    {
        value: _colors_masked,
        label: 'Do Not Color Code L1/L2'
    }
]
