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
