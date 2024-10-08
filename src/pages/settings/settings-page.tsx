import { useContext } from 'react'
import { IconsContext } from '@/providers/icons-provider'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { LanguageOption } from '@/providers/provider-types'
import HeaderBackground from '@/components/layout/header-bg'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

export default function SettingsPage() {
    const {
        SettingsToggleLocked,
        SettingsToggleFrameReset,
        SettingsSwitchLanguage,
        Settings
    } = useContext(IconsContext)
    const { Locked, LanguageContext, ResetAfterSpeak } = Settings

    return (
        <div>
            <HeaderBackground className="grid grid-cols-3">
                <Link
                    to="/"
                    className="flex flex-row gap-2"
                    unstable_viewTransition={true}
                >
                    <ChevronLeft className="h-6 w-6" />
                    Back
                </Link>
                <span className="text-lg text-center">Program Settings</span>
            </HeaderBackground>
            <div className="flex flex-row justify-center my-4">
                <Card className="max-w-screen-lg w-full">
                    <CardHeader>
                        <CardTitle>AAC Settings</CardTitle>
                        <CardDescription>
                            Settings for the AAC board
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-6 py-4 grow">
                        <div className="flex flex-row gap-4 justify-between items-center h-8">
                            <Label htmlFor="secure-mode">
                                Lock Board Setting
                            </Label>
                            <Switch
                                id="secure-mode"
                                checked={Locked}
                                onCheckedChange={() => SettingsToggleLocked()}
                            />
                        </div>
                        <div className="flex flex-row gap-4 justify-between items-center h-8">
                            <Label htmlFor="frame-mode">Frame Reset</Label>
                            <Switch
                                id="frame-mode"
                                checked={ResetAfterSpeak}
                                onCheckedChange={() =>
                                    SettingsToggleFrameReset()
                                }
                            />
                        </div>
                        <div className="flex flex-row gap-4 justify-between items-center h-8">
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
                                    <SelectItem value="L1">
                                        Language #1
                                    </SelectItem>
                                    <SelectItem value="L2">
                                        Language #2
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
