import { LockIcon, PlusIcon } from 'lucide-react'
import { useContext } from 'react'
import { IconsContext } from '@/providers/icons-provider'
import { Button } from '@/components/ui/button'
import MenuSheet from './views/menu-sheet'

export default function BoardMenuBar() {
    const { Settings, SettingsToggleLocked } = useContext(IconsContext)
    const { Locked } = Settings

    return (
        <div className="flex flex-row justify-between">
            <MenuSheet />
            <div className="flex flex-row gap-4 items-center">
                {Locked ? (
                    <>
                        <LockIcon
                            size={24}
                            onClick={() => SettingsToggleLocked()}
                        />
                    </>
                ) : (
                    <>
                        <Button
                            className="flex flex-row gap-2 items-center bg-green-500 text-white"
                            variant={'outline'}
                            size={'sm'}
                            onClick={() => alert('Add Icon')}
                        >
                            <PlusIcon size={16} />
                            Add Icon
                        </Button>
                    </>
                )}
            </div>
        </div>
    )
}
