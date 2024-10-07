import { CameraIcon, LockIcon } from 'lucide-react'
import { useContext } from 'react'
import { IconsContext } from '@/providers/icons-provider'
import MenuSheet from './views/menu-sheet'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export default function BoardMenuBar() {
    const { Settings, SettingsToggleLocked } = useContext(IconsContext)
    const { Locked } = Settings

    return (
        <div className="flex flex-row justify-between h-12 items-center">
            <MenuSheet />
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
                        <Badge className="bg-orange-400 flex flex-row gap-2 items-center rounded-full pointer-events-none">
                            Edit Mode
                        </Badge>
                        <div className={cn('p-1 rounded hover:bg-gray-200')}>
                            <CameraIcon className="h-6 w-6" />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
