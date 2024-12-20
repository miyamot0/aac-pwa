import { SGDField } from '@/lib/db'
import { cn } from '@/lib/utils'
import { IconsContext } from '@/providers/icons-provider'
import { InterfaceVerbosityConfiguration } from '@/types/board-settings'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

type Props = { Icon: SGDField }

export function Icon({ Icon }: Props) {
    const { AddToFrame, Settings, UIVerbosity } = useContext(IconsContext)
    const navigate = useNavigate()

    const icon_to_reference =
        Settings.LanguageContext === 'L1' ? Icon.L1 : Icon.L2

    const has_file = icon_to_reference?.File !== undefined
    const has_label = (icon_to_reference?.Label ?? '').trim().length > 0

    const url = has_file
        ? URL.createObjectURL(
              new Blob([icon_to_reference!.File!], { type: 'image/png' })
          )
        : undefined

    return (
        <div
            className={cn(
                'border border-black rounded aspect-square bg-white cursor-pointer flex flex-col justify-end items-center select-none relative shadow-md icon-field-type',
                {
                    'bg-gray-100': !has_label
                }
            )}
            draggable={false}
            onClick={() => {
                if (Settings.Locked === false) {
                    navigate(`/icons/${Icon.id}`, {
                        unstable_viewTransition: true,
                        replace: true
                    })

                    return
                }

                if (!has_label) {
                    toast.error(
                        'Note: This icon has no label and cannot be added to frame'
                    )

                    return
                }

                AddToFrame(Icon)
            }}
        >
            <img
                src={url}
                className="object-cover w-full h-full"
                draggable={false}
            />

            <div
                className={cn(
                    'absolute top-1 left-1 p-1 bg-white rounded border border-black',
                    {
                        invisible:
                            Settings.Locked ||
                            UIVerbosity ===
                                ('MinimalInformation' as InterfaceVerbosityConfiguration)
                    }
                )}
            >
                ID: {Icon.id}
            </div>
            <div
                className={cn(
                    'absolute bg-white px-2 border border-black rounded-sm mb-2',
                    {
                        'hidden ': !has_label || icon_to_reference?.HideText
                    }
                )}
            >
                {icon_to_reference?.Label}
            </div>
        </div>
    )
}
