import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetFooter
} from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { MenuIcon } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { useContext } from 'react'
import { IconsContext } from '@/providers/icons-provider'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { LanguageOption } from '@/providers/provider-types'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export default function MenuSheet() {
    const {
        SettingsToggleLocked,
        SettingsToggleFrameReset,
        SettingsDisplaySheet,
        SettingsSwitchLanguage,
        Settings
    } = useContext(IconsContext)
    const { Locked, SheetOpen, LanguageContext, ResetAfterSpeak } = Settings

    return (
        <Sheet
            open={SheetOpen}
            onOpenChange={(open) => SettingsDisplaySheet(open)}
        >
            <div className="flex flex-row gap-2 items-center h-6">
                <div
                    className={cn('p-1 rounded hover:bg-gray-200', {
                        hidden: Locked === true
                    })}
                    onClick={() => {
                        if (Locked === true) return

                        SettingsDisplaySheet(!SheetOpen)
                    }}
                >
                    <MenuIcon className="h-6 w-6" />
                </div>

                <Badge
                    className={cn('rounded-full pointer-events-none', {
                        'bg-blue-400': LanguageContext === 'L1',
                        'bg-purple-400': LanguageContext === 'L2'
                    })}
                >
                    {LanguageContext === 'L1' ? 'English' : 'Spanish'}
                </Badge>
            </div>
            <SheetContent side={'left'} className="flex flex-col">
                <SheetHeader>
                    <SheetTitle>Edit Settings</SheetTitle>
                    <SheetDescription>Editing Board Settings</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-6 py-4 grow">
                    <div className="flex flex-row gap-4 justify-between items-center">
                        <Label htmlFor="secure-mode">Lock Board Setting</Label>
                        <Switch
                            id="secure-mode"
                            checked={Locked}
                            onCheckedChange={() => SettingsToggleLocked()}
                        />
                    </div>
                    <div className="flex flex-row gap-4 justify-between items-center">
                        <Label htmlFor="frame-mode">Frame Reset</Label>
                        <Switch
                            id="frame-mode"
                            checked={ResetAfterSpeak}
                            onCheckedChange={() => SettingsToggleFrameReset()}
                        />
                    </div>
                    <div className="flex flex-row gap-4 justify-between items-center">
                        <Label>Language Setting</Label>
                        <Select
                            value={LanguageContext}
                            onValueChange={(lang: LanguageOption) => {
                                SettingsSwitchLanguage(lang)
                            }}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Language Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="L1">Language #1</SelectItem>
                                <SelectItem value="L2">Language #2</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <SheetFooter className="flex flex-col justify-end w-full">
                    <Button className="w-full">...</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
