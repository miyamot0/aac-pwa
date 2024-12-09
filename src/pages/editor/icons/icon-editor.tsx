import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { ChevronLeft, SaveIcon, Trash2Icon } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import HeaderBackground from '@/components/layout/header-bg'
import { BOARD_PAGE } from '@/lib/links'
import { db, SGDField } from '@/lib/db'
import { toast } from 'sonner'
import { Switch } from '@/components/ui/switch'
import { IconsContext } from '@/providers/icons-provider'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { IconEditorSchema } from '@/forms/icon-editor/schema'
import { LanguageType } from '@/types/language-types'
import { IconSettingsSelectOptions } from '@/types/icon-settings'
import { Button } from '@/components/ui/button'

type LoaderReturn = {
    icon: SGDField
    filled_indices: number[]
}

function EntryFieldWrapper({ children }: { children: React.ReactNode }) {
    return <div className="grid grid-cols-3 items-center">{children}</div>
}

export default function IconEditorPage() {
    const { FieldSize } = useContext(IconsContext)
    const loaderData = useLoaderData() as LoaderReturn | undefined
    const navigate = useNavigate()

    if (!loaderData) throw new Error('No icon found')

    const relevantIcon = loaderData.icon

    const form = useForm<z.infer<typeof IconEditorSchema>>({
        resolver: zodResolver(IconEditorSchema),
        values: {
            index: relevantIcon.index,
            L1: relevantIcon.L1.Language as unknown as LanguageType,
            L1_Hidden: relevantIcon.L1.Hidden ?? false,
            L1_Hidden_Label: relevantIcon.L1.HideText ?? false,
            L1_Label: relevantIcon.L1.Label,
            L1_Recording: relevantIcon.L1.Recording,
            L2: relevantIcon.L2.Language as unknown as LanguageType,
            L2_Hidden: relevantIcon.L2.Hidden ?? false,
            L2_Hidden_Label: relevantIcon.L2.HideText ?? false,
            L2_Label: relevantIcon.L2.Label,
            L2_Recording: relevantIcon.L2.Recording
        }
    })

    async function onSubmit(values: z.infer<typeof IconEditorSchema>) {
        db.icons
            .where('id')
            .equals(relevantIcon.id)
            .modify({
                index: values.index,
                L1: {
                    Language: values.L1 as 'en' | 'es',
                    Label: values.L1_Label,
                    Hidden: values.L1_Hidden,
                    HideText: values.L1_Hidden_Label,
                    Image: relevantIcon.L1.Image,
                    File: relevantIcon.L1.File,
                    Recording: values.L1_Recording
                },
                L2: {
                    Language: values.L2 as 'en' | 'es' | 'N/A',
                    Label: values.L2_Label,
                    Hidden: values.L2_Hidden,
                    HideText: values.L2_Hidden_Label,
                    Image: relevantIcon.L2.Image,
                    File: relevantIcon.L2.File,
                    Recording: values.L2_Recording
                }
            })
            .then(() => {
                toast.success('Icon successfully updated!')
            })
    }

    async function deleteIcon() {
        if (!relevantIcon) return

        db.icons
            .where('id')
            .equals(relevantIcon.id)
            .delete()
            .then(() => {
                toast.success('Icon deleted')
            })
            .finally(() => {
                navigate(BOARD_PAGE, {
                    unstable_viewTransition: true,
                    replace: true
                })
            })
    }

    async function saveIcon() {
        if (!relevantIcon) return

        form.handleSubmit(onSubmit)()
    }

    useEffect(() => {
        form.trigger()
    }, [form, relevantIcon])

    const spaces = Array.from({ length: FieldSize }, (_, i) => i)

    const available_indices = spaces.filter(
        (space) => !loaderData.filled_indices.includes(space)
    )

    available_indices.push(relevantIcon.index)

    const l1_asset = relevantIcon.L1?.File
        ? URL.createObjectURL(
              new Blob([relevantIcon.L1.File], { type: 'image/png' })
          )
        : undefined

    const l2_asset = relevantIcon.L2?.File
        ? URL.createObjectURL(
              new Blob([relevantIcon.L2.File], { type: 'image/png' })
          )
        : undefined

    return (
        <div className="flex flex-col">
            <HeaderBackground className="grid grid-cols-3">
                <Link
                    replace
                    to={BOARD_PAGE}
                    className="flex flex-row gap-2"
                    unstable_viewTransition={true}
                >
                    <ChevronLeft className="h-6 w-6" />
                    Back
                </Link>
                <span className="text-lg text-center">Icon Entry Editor</span>
                <div className="flex flex-row justify-end">
                    <Button
                        variant={'outline'}
                        className="flex flex-row gap-2 items-center cursor-pointer w-fit bg-transparent border-none"
                        onClick={(e) => {
                            e.preventDefault()

                            saveIcon()
                        }}
                    >
                        <SaveIcon className="h-6 w-6" />
                        <span className="text-sm hidden md:block">
                            Save Icon
                        </span>
                    </Button>
                </div>
            </HeaderBackground>
            <div className="flex flex-row justify-center px-2">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid grid-cols-1 lg:grid-cols-2 max-w-screen-lg w-full gap-4 h-auto py-2"
                    >
                        <Card className="w-full col-span-1 lg:col-span-2">
                            <CardHeader>
                                <CardTitle>
                                    Shared Icon Settings{' '}
                                    {`(ID = ${relevantIcon.id})`}
                                </CardTitle>
                                <CardDescription>
                                    Settings for the entry regardless of
                                    language context (L1/L2)
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-8">
                                <FormField
                                    control={form.control}
                                    name="index"
                                    render={({ field }) => (
                                        <FormItem>
                                            <EntryFieldWrapper>
                                                <div className="col-span-2">
                                                    <FormLabel>
                                                        Icon Location (Index)
                                                    </FormLabel>
                                                    <FormDescription>
                                                        This is the number slot
                                                        in the field
                                                    </FormDescription>
                                                    <FormMessage />
                                                </div>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value.toString()}
                                                    value={field.value.toString()}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Index in field" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {available_indices
                                                            .sort(
                                                                (a, b) => a - b
                                                            )
                                                            .map((index) => (
                                                                <SelectItem
                                                                    key={index.toString()}
                                                                    value={index.toString()}
                                                                >
                                                                    {index.toString()}
                                                                </SelectItem>
                                                            ))}
                                                    </SelectContent>
                                                </Select>
                                            </EntryFieldWrapper>
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    variant={'destructive'}
                                    className="w-full flex flex-row gap-2 items-center cursor-pointer"
                                    onClick={(e) => {
                                        e.preventDefault()

                                        if (
                                            window.confirm(
                                                'Are you sure you want to delete this icon?'
                                            )
                                        ) {
                                            deleteIcon()
                                        }
                                    }}
                                >
                                    <Trash2Icon className="h-4 w-4" />
                                    Delete Icon
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="h-fit">
                            <CardHeader>
                                <CardTitle>L1 Icon Settings</CardTitle>
                                <CardDescription>
                                    Manage Settings for L1 Icon
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-6">
                                <FormField
                                    control={form.control}
                                    name="L1_Hidden"
                                    render={({ field }) => (
                                        <FormItem>
                                            <EntryFieldWrapper>
                                                <div className="col-span-2">
                                                    <FormLabel>
                                                        L1 Hide Settings
                                                    </FormLabel>

                                                    <FormDescription>
                                                        Should the whole icon be
                                                        hidden?
                                                    </FormDescription>
                                                    <FormMessage />
                                                </div>
                                                <div className="flex justify-end">
                                                    <FormControl>
                                                        <Switch
                                                            name={field.name}
                                                            id={field.name}
                                                            checked={
                                                                field.value
                                                            }
                                                            onCheckedChange={
                                                                field.onChange
                                                            }
                                                        />
                                                    </FormControl>
                                                </div>
                                            </EntryFieldWrapper>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="L1_Hidden_Label"
                                    render={({ field }) => (
                                        <FormItem>
                                            <EntryFieldWrapper>
                                                <div className="col-span-2">
                                                    <FormLabel>
                                                        L1 Hide Label Settings
                                                    </FormLabel>

                                                    <FormDescription>
                                                        Should the label be
                                                        hidden?
                                                    </FormDescription>
                                                    <FormMessage />
                                                </div>
                                                <div className="flex justify-end">
                                                    <FormControl>
                                                        <Switch
                                                            name={field.name}
                                                            id={field.name}
                                                            checked={
                                                                field.value
                                                            }
                                                            onCheckedChange={
                                                                field.onChange
                                                            }
                                                        />
                                                    </FormControl>
                                                </div>
                                            </EntryFieldWrapper>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="L1"
                                    render={({ field }) => (
                                        <FormItem>
                                            <EntryFieldWrapper>
                                                <div className="col-span-2">
                                                    <FormLabel>
                                                        L1 Language Setting
                                                    </FormLabel>
                                                    <FormDescription>
                                                        This is the language
                                                        output setting for L1
                                                    </FormDescription>
                                                    <FormMessage />
                                                </div>
                                                <Select
                                                    disabled
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Language Type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {IconSettingsSelectOptions.map(
                                                            (option) => (
                                                                <SelectItem
                                                                    key={
                                                                        option.value
                                                                    }
                                                                    value={
                                                                        option.value
                                                                    }
                                                                >
                                                                    {
                                                                        option.label
                                                                    }
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </EntryFieldWrapper>
                                        </FormItem>
                                    )}
                                />

                                <div
                                    className={cn('flex flex-col gap-6', {
                                        hidden: form.getValues('L1') === 'N/A'
                                    })}
                                >
                                    <FormField
                                        control={form.control}
                                        name="L1_Label"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    L1 Icon Label
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder=""
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    This is the text that will
                                                    be emitted (Default Setting)
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid">
                                        <div
                                            className="flex flex-col justify-start gap-1 mr-4"
                                            onClick={() => {
                                                try {
                                                    form.handleSubmit(
                                                        onSubmit
                                                    )()
                                                } finally {
                                                    navigate(
                                                        `/icons/${relevantIcon.id}/L1`,
                                                        {
                                                            unstable_viewTransition:
                                                                true,
                                                            replace: true
                                                        }
                                                    )
                                                }
                                            }}
                                        >
                                            <FormLabel>L1 Icon Image</FormLabel>

                                            <FormDescription>
                                                This is the image displayed on
                                                the board
                                            </FormDescription>

                                            <img
                                                className="p-4 w-full aspect-square border rounded object-cover "
                                                src={l1_asset}
                                                draggable={false}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid">
                                        <div className="flex flex-col justify-start gap-2 mr-4">
                                            <div className="flex flex-row justify-between items-center">
                                                <FormLabel>
                                                    L1 Custom Speech
                                                </FormLabel>

                                                <div className="flex flex-row gap-4 items-center">
                                                    <Button
                                                        variant={'destructive'}
                                                        className="border"
                                                        disabled={
                                                            !form.getValues(
                                                                'L1_Recording'
                                                            )
                                                        }
                                                        onClick={() => {
                                                            form.setValue(
                                                                'L1_Recording',
                                                                undefined
                                                            )

                                                            saveIcon()
                                                        }}
                                                    >
                                                        Clear
                                                    </Button>

                                                    <Button
                                                        variant={
                                                            'default_purple'
                                                        }
                                                        onClick={() => {
                                                            try {
                                                                form.handleSubmit(
                                                                    onSubmit
                                                                )()
                                                            } finally {
                                                                navigate(
                                                                    `/recordings/${relevantIcon.id}/L1`,
                                                                    {
                                                                        unstable_viewTransition:
                                                                            true,
                                                                        replace:
                                                                            true
                                                                    }
                                                                )
                                                            }
                                                        }}
                                                    >
                                                        Select
                                                    </Button>
                                                </div>
                                            </div>

                                            <FormDescription>
                                                If selected, the icon will emit
                                                the selected recording
                                            </FormDescription>

                                            <div className="w-full">
                                                {form.getValues(
                                                    'L1_Recording'
                                                ) && (
                                                    <audio
                                                        className="w-full mt-2"
                                                        controls
                                                        src={URL.createObjectURL(
                                                            new Blob(
                                                                [
                                                                    form.getValues(
                                                                        'L1_Recording'
                                                                    )
                                                                ],
                                                                {
                                                                    type: 'audio/mp4'
                                                                }
                                                            )
                                                        )}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="h-fit">
                            <CardHeader>
                                <CardTitle>L2 Icon Settings</CardTitle>
                                <CardDescription>
                                    Manage Settings for L2 Icon
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-6">
                                <FormField
                                    control={form.control}
                                    name="L2_Hidden"
                                    render={({ field }) => (
                                        <FormItem>
                                            <EntryFieldWrapper>
                                                <div className="col-span-2">
                                                    <FormLabel>
                                                        L2 Hide Settings
                                                    </FormLabel>

                                                    <FormDescription>
                                                        Should the whole icon be
                                                        hidden?
                                                    </FormDescription>
                                                    <FormMessage />
                                                </div>
                                                <div className="flex justify-end">
                                                    <FormControl>
                                                        <Switch
                                                            name={field.name}
                                                            id={field.name}
                                                            checked={
                                                                field.value
                                                            }
                                                            onCheckedChange={
                                                                field.onChange
                                                            }
                                                        />
                                                    </FormControl>
                                                </div>
                                            </EntryFieldWrapper>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="L2_Hidden_Label"
                                    render={({ field }) => (
                                        <FormItem>
                                            <EntryFieldWrapper>
                                                <div className="col-span-2">
                                                    <FormLabel>
                                                        L2 Hide Label Settings
                                                    </FormLabel>

                                                    <FormDescription>
                                                        Should the label be
                                                        hidden?
                                                    </FormDescription>
                                                    <FormMessage />
                                                </div>
                                                <div className="flex justify-end">
                                                    <FormControl>
                                                        <Switch
                                                            name={field.name}
                                                            id={field.name}
                                                            checked={
                                                                field.value
                                                            }
                                                            onCheckedChange={
                                                                field.onChange
                                                            }
                                                        />
                                                    </FormControl>
                                                </div>
                                            </EntryFieldWrapper>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="L2"
                                    render={({ field }) => (
                                        <FormItem>
                                            <EntryFieldWrapper>
                                                <div className="col-span-2">
                                                    <FormLabel>
                                                        L2 Language Setting
                                                    </FormLabel>
                                                    <FormDescription>
                                                        This is the language
                                                        output setting for L2
                                                    </FormDescription>
                                                    <FormMessage />
                                                </div>
                                                <Select
                                                    disabled
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Language Type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {IconSettingsSelectOptions.map(
                                                            (option) => (
                                                                <SelectItem
                                                                    key={
                                                                        option.value
                                                                    }
                                                                    value={
                                                                        option.value
                                                                    }
                                                                >
                                                                    {
                                                                        option.label
                                                                    }
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </EntryFieldWrapper>
                                        </FormItem>
                                    )}
                                />

                                <div
                                    className={cn('flex flex-col gap-6', {
                                        hidden: form.getValues('L2') === 'N/A'
                                    })}
                                >
                                    <FormField
                                        control={form.control}
                                        name="L2_Label"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    L2 Icon Label
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder=""
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    This is the text that will
                                                    be emitted (Default Setting)
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid">
                                        <div
                                            className="flex flex-col justify-start gap-1 mr-4"
                                            onClick={() => {
                                                try {
                                                    form.handleSubmit(
                                                        onSubmit
                                                    )()
                                                } finally {
                                                    navigate(
                                                        `/icons/${relevantIcon.id}/L2`,
                                                        {
                                                            unstable_viewTransition:
                                                                true,
                                                            replace: true
                                                        }
                                                    )
                                                }
                                            }}
                                        >
                                            <FormLabel>L2 Icon Image</FormLabel>
                                            <FormDescription>
                                                This is the image displayed on
                                                the board
                                            </FormDescription>

                                            <img
                                                className="p-4 w-full aspect-square border rounded object-cover "
                                                src={l2_asset}
                                                draggable={false}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid">
                                        <div className="flex flex-col justify-start gap-2 mr-4">
                                            <div className="flex flex-row justify-between items-center">
                                                <FormLabel>
                                                    L2 Custom Speech
                                                </FormLabel>

                                                <div className="flex flex-row gap-4 items-center">
                                                    <Button
                                                        variant={'destructive'}
                                                        className="border"
                                                        disabled={
                                                            !form.getValues(
                                                                'L2_Recording'
                                                            )
                                                        }
                                                        onClick={() => {
                                                            form.setValue(
                                                                'L2_Recording',
                                                                undefined
                                                            )

                                                            saveIcon()
                                                        }}
                                                    >
                                                        Clear
                                                    </Button>

                                                    <Button
                                                        variant={
                                                            'default_purple'
                                                        }
                                                        onClick={() => {
                                                            try {
                                                                form.handleSubmit(
                                                                    onSubmit
                                                                )()
                                                            } finally {
                                                                navigate(
                                                                    `/recordings/${relevantIcon.id}/L2`,
                                                                    {
                                                                        unstable_viewTransition:
                                                                            true,
                                                                        replace:
                                                                            true
                                                                    }
                                                                )
                                                            }
                                                        }}
                                                    >
                                                        Select
                                                    </Button>
                                                </div>
                                            </div>

                                            <FormDescription>
                                                If selected, the icon will emit
                                                the selected recording
                                            </FormDescription>

                                            <div className="w-full">
                                                {form.getValues(
                                                    'L2_Recording'
                                                ) && (
                                                    <audio
                                                        className="w-full mt-2"
                                                        controls
                                                        src={URL.createObjectURL(
                                                            new Blob(
                                                                [
                                                                    form.getValues(
                                                                        'L2_Recording'
                                                                    )
                                                                ],
                                                                {
                                                                    type: 'audio/mp4'
                                                                }
                                                            )
                                                        )}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </form>
                </Form>
            </div>
        </div>
    )
}
