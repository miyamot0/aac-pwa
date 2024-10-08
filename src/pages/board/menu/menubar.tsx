import { CameraIcon, FolderIcon, LockIcon, Settings2Icon } from 'lucide-react'
import { useContext } from 'react'
import { IconsContext } from '@/providers/icons-provider'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'
import HeaderBackground from '@/components/layout/header-bg'

export default function BoardMenuBar() {
    const { Settings, SettingsToggleLocked } = useContext(IconsContext)
    const { Locked } = Settings

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
                        <Link
                            className={cn('p-1 rounded hover:bg-gray-200')}
                            unstable_viewTransition={true}
                            to={'/settings'}
                        >
                            <Settings2Icon className="h-6 w-6" />
                        </Link>
                        <Link
                            className={cn('p-1 rounded hover:bg-gray-200')}
                            unstable_viewTransition={true}
                            to={'/camera'}
                        >
                            <CameraIcon className="h-6 w-6" />
                        </Link>
                        <Link
                            className={cn('p-1 rounded hover:bg-gray-200')}
                            unstable_viewTransition={true}
                            to={'/files'}
                        >
                            <FolderIcon className="h-6 w-6" />
                        </Link>
                    </>
                )}
            </div>
        </HeaderBackground>
    )
}
