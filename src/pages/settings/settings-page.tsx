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
import HeaderBackground from '@/components/layout/header-bg'
import { Link } from 'react-router-dom'
import { ChevronLeft, TableOfContentsIcon } from 'lucide-react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { BOARD_PAGE, DOCS_PAGE } from '@/lib/links'
import {
    FieldManagementConfigSelectOptions,
    FieldManagementConfiguration,
    FrameLengthConfiguration,
    FrameLengthConfigurationOptions,
    PostSpeechConfigSelectOptions,
    PostSpeechConfiguration
} from '@/types/board-settings'

export default function SettingsPage() {
    const {
        PostSpeechSettings,
        SettingsUpdatePostSpeechConfig,
        IconPositioning,
        SettingsUpdateIconPositioningConfig,
        FrameRestrictions,
        SettingsUpdateFrameRestriction
    } = useContext(IconsContext)

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
                <div className="flex flex-row justify-end">
                    <Link to={DOCS_PAGE} className="flex flex-row gap-2">
                        <TableOfContentsIcon className="h-6 w-6" />
                        Documentation
                    </Link>
                </div>
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
                            <Label>Post Speech Configuration</Label>
                            <Select
                                value={PostSpeechSettings}
                                onValueChange={(
                                    setting: PostSpeechConfiguration
                                ) => {
                                    SettingsUpdatePostSpeechConfig(setting)
                                }}
                            >
                                <SelectTrigger className="w-full max-w-[300px]">
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
                                <SelectTrigger className="w-full max-w-[300px]">
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

                        <div className="flex flex-row gap-4 justify-between items-center h-8">
                            <Label>Length of Response Restrictions</Label>
                            <Select
                                value={FrameRestrictions}
                                onValueChange={(
                                    setting: FrameLengthConfiguration
                                ) => {
                                    SettingsUpdateFrameRestriction(setting)
                                }}
                            >
                                <SelectTrigger className="w-full max-w-[300px]">
                                    <SelectValue placeholder="Set Frame Restrictions" />
                                </SelectTrigger>
                                <SelectContent>
                                    {FrameLengthConfigurationOptions.map(
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
