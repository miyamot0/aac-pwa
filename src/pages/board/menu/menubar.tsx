import { LockIcon } from 'lucide-react'
import { useContext } from 'react'
import { IconsContext } from '@/providers/icons-provider'
import MenuSheet from './views/menu-sheet'
import { Badge } from '@/components/ui/badge'

export default function BoardMenuBar() {
    const { Settings, SettingsToggleLocked } = useContext(IconsContext)
    const { Locked } = Settings

    return (
        <div className="flex flex-row justify-between">
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
                    <div className="h-6"></div>
                )}
            </div>
        </div>
    )
}
