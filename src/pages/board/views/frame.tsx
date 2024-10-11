import { DeleteIcon, Volume2 } from 'lucide-react'
import { useContext } from 'react'
import { IconsContext } from '@/providers/icons-provider'
import { cn } from '@/lib/utils'
import { SGDField } from '@/lib/db'
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

    return (
        <div className="flex flex-col px-2">
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
                        if (Frame.length === 0) return

                        const words = [
                            Frame.map((icon: SGDField) =>
                                Settings.LanguageContext === 'L1'
                                    ? icon.L1.Label
                                    : icon.L2?.Label ?? ''
                            ).join(' ')
                        ]

                        const lang =
                            Settings.LanguageContext === 'L1' ? 'en' : 'es'

                        async function getNextAudio(sentence: string) {
                            const audio = new SpeechSynthesisUtterance(sentence)
                            audio.lang = lang

                            Speaker.speak(audio)

                            return new Promise((resolve) => {
                                audio.onend = resolve
                            })
                        }

                        for (let i = 0; i < words.length; i++) {
                            await getNextAudio(words[i])
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
        </div>
    )
}
