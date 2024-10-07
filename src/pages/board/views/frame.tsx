import { DeleteIcon, Volume2 } from 'lucide-react'
import { useContext, useEffect } from 'react'
import { IconsContext } from '@/providers/icons-provider'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { IconObject } from '@/providers/provider-types'

function FrameIconAnimated({ icon }: { icon: IconObject }) {
    const [displayed, setDisplayed] = useState(false)

    useEffect(() => {
        setDisplayed(true)
    }, [])

    return (
        <div
            className={cn(
                'aspect-square bg-white rounded border border-black flex flex-col justify-end items-center h-[10vh] transition-all ease-in-out duration-300',
                {
                    'opacity-100': displayed,
                    'opacity-0': !displayed
                }
            )}
        >
            <img
                src={icon.L1.Image}
                alt={icon.L1.Label}
                className="aspect-square object-scale-down w-2/3"
            />
            {icon.L1.Label}
        </div>
    )
}

export default function BoardFrame() {
    const { Frame, RemoveFromFrame, Speaker, Settings, ClearFrame } =
        useContext(IconsContext)
    const { ResetAfterSpeak } = Settings

    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-8 h-[15vh] max-h-[15vh] text-center gap-1 lg:gap-2">
                <div className="col-span-7 bg-white rounded border border-black flex flex-row justify-between items-center px-4">
                    <div className="flex flex-row gap-2">
                        {Frame.map((icon, i) => (
                            <FrameIconAnimated key={i} icon={icon} />
                        ))}
                    </div>
                    <DeleteIcon size={64} onClick={() => RemoveFromFrame()} />
                </div>
                <div
                    className="col-span-1 bg-white rounded flex flex-row justify-center items-center data-[empty=false]:hover:bg-gray-100 data-[empty=false]:cursor-pointer"
                    data-empty={Frame.length === 0}
                    onClick={async () => {
                        const words = [
                            Frame.map((icon: IconObject) => icon.L1.Label).join(
                                ' '
                            )
                        ]

                        async function getNextAudio(sentence: string) {
                            const audio = new SpeechSynthesisUtterance(sentence)
                            audio.lang =
                                Settings.LanguageContext === 'L1' ? 'en' : 'es'

                            Speaker.speak(audio)

                            return new Promise((resolve) => {
                                audio.onend = resolve
                            })
                        }

                        for (let i = 0; i < words.length; i++) {
                            await getNextAudio(words[i])
                        }

                        if (ResetAfterSpeak) {
                            ClearFrame()
                        }
                    }}
                >
                    <Volume2 size={64} />
                </div>
            </div>
        </div>
    )
}
