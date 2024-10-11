import { LockIcon, PlusIcon, Settings2Icon, UnlockIcon } from 'lucide-react'
import { useContext } from 'react'
import { IconsContext } from '@/providers/icons-provider'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'
import HeaderBackground from '@/components/layout/header-bg'
import { SETTINGS_PAGE } from '@/lib/links'
import { db, SGDField } from '@/lib/db'
import { toast } from 'sonner'

export default function BoardMenuBar() {
    const { Settings, FieldSize, SettingsToggleLocked, ClearFrame } =
        useContext(IconsContext)
    const { Locked } = Settings

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
                L1: {
                    Language: 'en',
                    Hidden: false,
                    Label: 'Blank'
                },
                L2: {
                    Language: 'es',
                    Hidden: false,
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
            <span className="text-lg">Otsu (PWA)</span>
            <div className="flex flex-row gap-4 items-center">
                {Locked ? (
                    <div
                        className={cn('p-1 rounded cursor-pointer')}
                        onClick={() => {
                            SettingsToggleLocked()
                            ClearFrame()
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
                        <Link
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
