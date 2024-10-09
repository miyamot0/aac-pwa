import { LockIcon, PlusIcon, Settings2Icon } from 'lucide-react'
import { useContext } from 'react'
import { IconsContext } from '@/providers/icons-provider'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'
import HeaderBackground from '@/components/layout/header-bg'
import { SETTINGS_PAGE } from '@/lib/links'
import { db, SGDField } from '@/lib/db'
import { toast } from 'sonner'

export default function BoardMenuBar() {
    const { Settings, FieldSize, SettingsToggleLocked } =
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
                conditional: false,
                L1: {
                    Language: 'en',
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
                    <Badge
                        className="bg-green-400 flex flex-row gap-2 items-center rounded-full"
                        onClick={() => SettingsToggleLocked()}
                    >
                        Locked
                        <LockIcon className="h-4 w-4" />
                    </Badge>
                ) : (
                    <>
                        <Badge className="bg-gray-400 flex flex-row gap-2 items-center rounded-full pointer-events-none">
                            Edit Mode
                        </Badge>
                        <div
                            className={cn('p-1 rounded cursor-pointer')}
                            onClick={() => {
                                addIconToField()
                            }}
                        >
                            <PlusIcon className="h-6 w-6" />
                        </div>
                        <Link
                            className={cn('p-1 rounded ')}
                            unstable_viewTransition={true}
                            to={SETTINGS_PAGE}
                        >
                            <Settings2Icon className="h-6 w-6" />
                        </Link>
                    </>
                )}
            </div>
        </HeaderBackground>
    )
}
