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
import { Link } from 'react-router-dom'
import { ChevronLeft, TableOfContentsIcon } from 'lucide-react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { BOARD_PAGE } from '@/lib/links'
import {
    ColorMaskingOption,
    ColorMaskingSelectOptions,
    FieldManagementConfigSelectOptions,
    FieldManagementConfiguration,
    FrameLengthConfiguration,
    FrameLengthConfigurationOptions,
    InterfaceVerbosityConfiguration,
    InterfaceVerbosityConfigurationSelectOptions,
    PostSpeechConfigSelectOptions,
    PostSpeechConfiguration
} from '@/types/board-settings'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export default function SettingsPage() {
    const {
        PostSpeechSettings,
        SettingsUpdatePostSpeechConfig,
        IconPositioning,
        SettingsUpdateIconPositioningConfig,
        FrameRestrictions,
        SettingsUpdateFrameRestriction,
        UIVerbosity,
        SettingsUpdateUIVerbosity,
        MaskedColors,
        SettingsToggleColorMask
    } = useContext(IconsContext)

    return (
        <div>
            <div
                className={cn(
                    'justify-between h-14 items-center px-4 text-white border-b-3 font-semibold default-header-bg grid grid-cols-3'
                )}
            >
                <Link
                    replace
                    to={BOARD_PAGE}
                    className="flex flex-row gap-2"
                    unstable_viewTransition={true}
                >
                    <ChevronLeft className="h-6 w-6" />
                    Back
                </Link>
                <span className="text-lg text-center">Program Settings</span>
                <div className="flex flex-row justify-end">
                    <Link
                        replace
                        to={'/docs/settings'}
                        className={cn(
                            buttonVariants({ variant: 'outline' }),
                            'flex flex-row gap-2 bg-transparent items-center border-none'
                        )}
                    >
                        <TableOfContentsIcon className="h-6 w-6" />
                        Documentation
                    </Link>
                </div>
            </div>

            <div className="flex flex-row justify-center my-4 px-2">
                <Card className="max-w-screen-lg w-full">
                    <CardHeader>
                        <CardTitle>Current Program Settings</CardTitle>
                        <CardDescription>
                            Various program settings are available for
                            adjustment
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-8">
                        <div className="flex flex-row gap-4 justify-between items-center h-8">
                            <div>
                                <Label>Post Speech Frame Options</Label>
                                <div className="text-muted-foreground text-sm">
                                    Determine after effects following speech
                                    output
                                </div>
                            </div>
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
                            <div>
                                <Label>
                                    Post Speech Icon Positioning Options
                                </Label>
                                <div className="text-muted-foreground text-sm">
                                    Determine icon positioning following speech
                                    output
                                </div>
                            </div>
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
                            <div>
                                <Label>
                                    Sentence Frame Length Limiting Options
                                </Label>

                                <div className="text-muted-foreground text-sm">
                                    Limitations on sentence frame length
                                </div>
                            </div>

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

                        <div className="flex flex-row gap-4 justify-between items-center h-8">
                            <div>
                                <Label>Interface Verbosity and Detail</Label>

                                <div className="text-muted-foreground text-sm">
                                    Options for adjusting details presented to
                                    therapists
                                </div>
                            </div>

                            <Select
                                value={UIVerbosity}
                                onValueChange={(
                                    setting: InterfaceVerbosityConfiguration
                                ) => {
                                    SettingsUpdateUIVerbosity(setting)
                                }}
                            >
                                <SelectTrigger className="w-full max-w-[300px]">
                                    <SelectValue placeholder="Set Verbosity of UI" />
                                </SelectTrigger>
                                <SelectContent>
                                    {InterfaceVerbosityConfigurationSelectOptions.map(
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
                            <div>
                                <Label>Language Setting Color Masking</Label>

                                <div className="text-muted-foreground text-sm">
                                    Enable/Disable colors signaling L1/L2 in the
                                    Interface
                                </div>
                            </div>

                            <Select
                                value={MaskedColors}
                                onValueChange={(
                                    setting: ColorMaskingOption
                                ) => {
                                    SettingsToggleColorMask(setting)
                                }}
                            >
                                <SelectTrigger className="w-full max-w-[300px]">
                                    <SelectValue placeholder="Set Verbosity of UI" />
                                </SelectTrigger>
                                <SelectContent>
                                    {ColorMaskingSelectOptions.map((option) => (
                                        <SelectItem
                                            value={option.value}
                                            key={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
