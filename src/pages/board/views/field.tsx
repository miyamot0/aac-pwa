import { cn } from '@/lib/utils'
import { useContext } from 'react'
import { IconsContext } from '@/providers/icons-provider'
import { db, SGDField } from '@/lib/db'
import { useLiveQuery } from 'dexie-react-hooks'
import { IconWrapper } from './icon-wrapper'
import { EmptyIcon } from './icon-empty'
import { Icon } from './icon-field'
import { useNavigate } from 'react-router-dom'
import { EyeOff } from 'lucide-react'

export default function BoardField() {
    const { Settings, FieldSize, FieldRows } = useContext(IconsContext)
    const navigate = useNavigate()
    const icons: SGDField[] | undefined = useLiveQuery(() => db.icons.toArray())

    /* Create indexed array per constants */
    const ArrayNumber = Array.from({ length: FieldSize }, (_, i) => i)

    /* Create columns based per constants */
    const COLS: number = Math.floor(FieldSize / FieldRows)

    return (
        <div className="flex flex-col flex-1 justify-center grow px-2">
            <div
                className={cn('grid grid-cols-4 gap-4 items-center', {
                    'grid-cols-2': COLS === 2,
                    'grid-cols-3': COLS === 3,
                    'grid-cols-4': COLS === 4,
                    'grid-cols-5': COLS === 5,
                    'grid-cols-6': COLS === 6,
                    'grid-cols-8': COLS === 8,
                    'grid-cols-12': COLS === 12
                })}
            >
                {ArrayNumber.map((_, i) => {
                    const icon = icons?.find((icon) => icon.index === i)

                    if (!icon) {
                        return (
                            <IconWrapper key={i}>
                                <EmptyIcon />
                            </IconWrapper>
                        )
                    }

                    const language_context =
                        Settings.LanguageContext === 'L1' ? icon.L1 : icon.L2

                    /* When ACTIVE && Hidden: Hide from view  */
                    if (
                        language_context.Hidden === true &&
                        Settings.Locked === true
                    ) {
                        return (
                            <IconWrapper key={i}>
                                <EmptyIcon />
                            </IconWrapper>
                        )
                    }

                    /* When ACTIVE && No Image Assigned: Hide from view  */
                    if (
                        language_context.Language === 'N/A' &&
                        Settings.Locked === true
                    ) {
                        return (
                            <IconWrapper key={i}>
                                <EmptyIcon />
                            </IconWrapper>
                        )
                    }

                    /* When LOCKED && Hidden: Show shaded  */
                    if (
                        language_context.Hidden === true &&
                        Settings.Locked === false
                    ) {
                        const url = language_context?.File
                            ? URL.createObjectURL(
                                  new Blob([language_context?.File], {
                                      type: 'image/png'
                                  })
                              )
                            : undefined

                        return (
                            <IconWrapper key={i}>
                                <div
                                    className={cn(
                                        'border border-black rounded aspect-square bg-white cursor-pointer flex flex-col justify-end items-center select-none relative shadow-md icon-field-type opacity-50'
                                    )}
                                    draggable={false}
                                    onClick={() => {
                                        if (Settings.Locked === false) {
                                            navigate(`/icons/${icon.id}`, {
                                                unstable_viewTransition: true
                                            })

                                            return
                                        }
                                    }}
                                >
                                    <img
                                        src={url}
                                        className="object-cover w-full h-full"
                                        draggable={false}
                                    />

                                    <div
                                        className={cn(
                                            'absolute top-0 right-0 mr-1 mt-1 p-2 bg-white rounded-full border border-black'
                                        )}
                                    >
                                        <EyeOff className="h-4 w-4" />
                                    </div>
                                    <div
                                        className={cn(
                                            'absolute bg-white px-2 border border-black rounded-sm mb-2'
                                        )}
                                    >
                                        {language_context.Label}
                                    </div>
                                </div>
                            </IconWrapper>
                        )
                    }

                    const has_file = language_context?.File

                    if (!has_file) {
                        return (
                            <IconWrapper key={i}>
                                <div
                                    className={cn(
                                        'aspect-square border border-black rounded shadow-md flex items-center justify-center bg-white cursor-pointer select-none icon-field-type'
                                    )}
                                    onClick={() => {
                                        if (Settings.Locked === false) {
                                            navigate(`/icons/${icon.id}`, {
                                                unstable_viewTransition: true
                                            })

                                            return
                                        }
                                    }}
                                >
                                    <div>{`Image for ${Settings.LanguageContext} Needed`}</div>
                                </div>
                            </IconWrapper>
                        )
                    }

                    return (
                        <IconWrapper key={i}>
                            <Icon key={i} Icon={icon}></Icon>
                        </IconWrapper>
                    )
                })}
            </div>
        </div>
    )
}
