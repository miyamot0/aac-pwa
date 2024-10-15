import {
    LockIcon,
    PlusIcon,
    RefreshCwIcon,
    Settings2Icon,
    UnlockIcon
} from 'lucide-react'
import { useContext } from 'react'
import { IconsContext } from '@/providers/icons-provider'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'
import HeaderBackground from '@/components/layout/header-bg'
import { SETTINGS_PAGE } from '@/lib/links'
import { db, SGDField } from '@/lib/db'
import { toast } from 'sonner'
import { APP_TITLE } from '@/lib/strings'
import { PASSWORD } from '@/lib/auth'

export default function BoardMenuBar() {
    const {
        Settings,
        FieldSize,
        SettingsToggleLocked,
        SettingsSwitchLanguage,
        ClearFrame
    } = useContext(IconsContext)
    const { Locked } = Settings

    const is_L1 = Settings.LanguageContext === 'L1'

    async function addIconToField() {
        try {
            const icons: SGDField[] = await db.icons.toArray()
            const indices = icons.map((icon) => icon.index)
            const spaces = Array.from({ length: FieldSize }, (_, i) => i)

            const available = spaces.filter((space) => !indices.includes(space))

            if (available.length === 0) {
                toast.error(`No more space available in field`)
                return
            }

            const index = Math.min(...available)

            const new_icon = {
                index,
                comment: '',
                L1: {
                    Language: 'en',
                    Hidden: false,
                    HideText: false,
                    Label: 'Blank'
                },
                L2: {
                    Language: 'es',
                    Hidden: false,
                    HideText: false,
                    Label: 'Blank'
                }
            } as SGDField

            await db.icons.add({
                ...new_icon
            })
        } catch (err: unknown) {
            toast.error(`Failed to add new icon to field: ${err}`)
        }
    }

    return (
        <HeaderBackground>
            <div className="flex flex-row gap-2">
                <span className="text-lg">{`${APP_TITLE} - ${
                    is_L1 ? 'L1 Mode' : 'L2 Mode'
                }`}</span>
            </div>
            <div className="flex flex-row gap-4 items-center">
                {Locked ? (
                    <div
                        className={cn('p-1 rounded cursor-pointer')}
                        onClick={() => {
                            toast.info('Board is locked', {
                                description: 'Unlock by entering PIN',
                                action: {
                                    label: 'Unlock',
                                    onClick: (e) => {
                                        e.preventDefault()

                                        if (
                                            prompt(
                                                'Enter Pin to Unlock'
                                            )?.trim() === PASSWORD
                                        ) {
                                            SettingsToggleLocked()
                                            ClearFrame()
                                        }
                                    }
                                }
                            })
                        }}
                    >
                        <LockIcon className="h-6 w-6" />
                    </div>
                ) : (
                    <div className="flex flex-row gap-4">
                        <div
                            className={
                                'p-1 rounded cursor-pointer flex flex-row gap-2 items-center'
                            }
                            onClick={() => {
                                SettingsToggleLocked()
                                ClearFrame()
                            }}
                        >
                            <UnlockIcon className="h-6 w-6" />
                            <span className="text-sm hidden md:block">
                                Lock
                            </span>
                        </div>
                        <div
                            className={
                                'p-1 rounded cursor-pointer flex flex-row gap-2 items-center'
                            }
                            onClick={() => {
                                addIconToField()
                            }}
                        >
                            <PlusIcon className="h-6 w-6" />
                            <span className="text-sm hidden md:block">
                                Add Icon
                            </span>
                        </div>
                        <div
                            className={
                                'p-1 rounded cursor-pointer flex flex-row gap-2 items-center'
                            }
                            onClick={() => {
                                SettingsSwitchLanguage(is_L1 ? 'L2' : 'L1')
                            }}
                        >
                            <RefreshCwIcon className="h-6 w-6" />
                            <span className="text-sm hidden md:block">
                                Language
                            </span>
                        </div>
                        <Link
                            replace
                            className={
                                'p-1 rounded cursor-pointer flex flex-row gap-2 items-center'
                            }
                            unstable_viewTransition={true}
                            to={SETTINGS_PAGE}
                        >
                            <Settings2Icon className="h-6 w-6" />
                            <span className="text-sm hidden md:block">
                                Settings
                            </span>
                        </Link>
                    </div>
                )}
            </div>
        </HeaderBackground>
    )
}
