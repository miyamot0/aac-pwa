import { DeleteIcon, Volume2 } from 'lucide-react'
import { createRef, useContext } from 'react'
import { IconsContext } from '@/providers/icons-provider'
import { cn } from '@/lib/utils'
import { FrameIconAnimated } from './frame-icon-animated'

export default function BoardFrame() {
    const {
        Frame,
        RemoveFromFrame,
        Speaker,
        Settings,
        ClearFrame,
        PostSpeechSettings,
        ShuffleField,
        IconPositioning
    } = useContext(IconsContext)

    const audioRef = createRef<HTMLAudioElement>()

    return (
        <div className="flex flex-col w-full px-2">
            <div className="grid grid-cols-8 h-[20dvh] max-h-[20dvh] text-center gap-1 lg:gap-2">
                <div className="col-span-7 bg-white rounded border border-black flex flex-row justify-between items-center px-4">
                    <div className="flex flex-row overflow-x-hidden">
                        <div className="flex flex-row gap-2">
                            {Frame.map((icon, i) => (
                                <FrameIconAnimated key={i} icon={icon} />
                            ))}
                        </div>
                    </div>
                    <DeleteIcon
                        size={64}
                        className={cn(
                            'transition-all ease-in-out duration-300 flex-shrink-0',
                            {
                                'opacity-25': Frame.length === 0,
                                'opacity-100': Frame.length > 0
                            }
                        )}
                        onClick={() => RemoveFromFrame()}
                    />
                </div>
                <div
                    className="col-span-1 rounded flex flex-row justify-center items-center data-[empty=false]:cursor-pointer"
                    data-empty={Frame.length === 0}
                    onClick={async () => {
                        // If the frame is empty, return
                        if (Frame.length === 0) return

                        // If the audio element does not exist, return
                        if (!audioRef.current) return

                        // If the audio element is speaking, return
                        if (
                            Speaker.speaking ||
                            (audioRef.current.currentTime > 0 &&
                                !audioRef.current.ended)
                        )
                            return

                        async function getNextAudio(sentence: string) {
                            const audio = new SpeechSynthesisUtterance(sentence)
                            audio.lang =
                                Settings.LanguageContext === 'L1' ? 'en' : 'es'

                            Speaker.speak(audio)

                            return new Promise((resolve) => {
                                audio.onend = resolve
                            })
                        }

                        async function getNextAudioChunk(
                            sound_file: Uint8Array
                        ) {
                            if (!audioRef.current) return

                            const blob = new Blob([sound_file], {
                                type: 'audio/wav'
                            })
                            const url = URL.createObjectURL(blob)

                            audioRef.current.src = ''
                            audioRef.current.src = url
                            audioRef.current.onended = () => {
                                URL.revokeObjectURL(url)
                            }
                            audioRef.current.play()

                            return new Promise((resolve) => {
                                audioRef.current!.onended = resolve
                            })
                        }

                        for (let i = 0; i < Frame.length; i++) {
                            if (Settings.LanguageContext === 'L1') {
                                if (Frame[i].L1.Recording) {
                                    await getNextAudioChunk(
                                        Frame[i].L1.Recording!
                                    )
                                } else {
                                    await getNextAudio(Frame[i].L1.Label)
                                }
                            } else if (Settings.LanguageContext === 'L2') {
                                if (Frame[i].L2.Recording) {
                                    await getNextAudioChunk(
                                        Frame[i].L2.Recording!
                                    )
                                } else {
                                    await getNextAudio(Frame[i].L2.Label)
                                }
                            }
                        }

                        if (PostSpeechSettings === 'ResetFrameAfterSpeech') {
                            ClearFrame()
                        }

                        if (IconPositioning === 'ShufflePosition') {
                            await ShuffleField()
                        }
                    }}
                >
                    <Volume2
                        size={64}
                        className={cn(
                            'transition-all ease-in-out duration-300',
                            {
                                'opacity-25': Frame.length === 0,
                                'opacity-100': Frame.length > 0
                            }
                        )}
                    />
                </div>
            </div>

            <audio ref={audioRef} id="audio" className="hidden" />
        </div>
    )
}
