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
