import { useContext } from 'react'
import { IconsContext } from '@/providers/icons-provider'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { LanguageOption } from '@/types/provider-types'
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
import { BOARD_PAGE } from '@/lib/links'
import {
    FieldManagementConfigSelectOptions,
    FieldManagementConfiguration,
    PostSpeechConfigSelectOptions,
    PostSpeechConfiguration
} from '@/types/board-settings'

export default function SettingsPage() {
    const {
        Settings,
        SettingsSwitchLanguage,
        PostSpeechSettings,
        SettingsUpdatePostSpeechConfig,
        IconPositioning,
        SettingsUpdateIconPositioningConfig
    } = useContext(IconsContext)

    const { LanguageContext } = Settings

    return (
        <div>
            <HeaderBackground className="grid grid-cols-3">
                <Link
                    to={BOARD_PAGE}
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

                        <div className="flex flex-row gap-4 justify-between items-center h-8">
                            <Label>Post Speech Configuration</Label>
                            <Select
                                value={PostSpeechSettings}
                                onValueChange={(
                                    setting: PostSpeechConfiguration
                                ) => {
                                    SettingsUpdatePostSpeechConfig(setting)
                                }}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Set Post-speech Behavior" />
                                </SelectTrigger>
                                <SelectContent>
                                    {PostSpeechConfigSelectOptions.map(
                                        (option) => (
                                            <SelectItem
                                                value={option.value}
                                                key={option.value}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        )
                                    )}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-row gap-4 justify-between items-center h-8">
                            <Label>Icon Positioning Behavior</Label>
                            <Select
                                value={IconPositioning}
                                onValueChange={(
                                    setting: FieldManagementConfiguration
                                ) => {
                                    SettingsUpdateIconPositioningConfig(setting)
                                }}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Set Post-speech Behavior" />
                                </SelectTrigger>
                                <SelectContent>
                                    {FieldManagementConfigSelectOptions.map(
                                        (option) => (
                                            <SelectItem
                                                value={option.value}
                                                key={option.value}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        )
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
