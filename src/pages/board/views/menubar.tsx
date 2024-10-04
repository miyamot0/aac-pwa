import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle
} from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { LockIcon, MenuIcon, UnlockIcon } from 'lucide-react'
import { Switch } from '@/components/ui/switch'

export default function BoardMenuBar() {
    return (
        <div className="flex flex-row justify-between">
            <Sheet>
                <SheetTrigger asChild>
                    <div className="border border-black p-1 rounded hover:bg-gray-200">
                        <MenuIcon size={24} />
                    </div>
                </SheetTrigger>
                <SheetContent side={'left'}>
                    <SheetHeader>
                        <SheetTitle>Edit Settings</SheetTitle>
                        <SheetDescription>
                            Editing Board Settings
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex flex-row gap-4 justify-between">
                            <Label htmlFor="secure-mode">Enable Editing?</Label>
                            <Switch id="secure-mode" />
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
            <div className="flex flex-row gap-4">
                <UnlockIcon size={24} />
                <LockIcon size={24} />
            </div>
        </div>
    )
}
