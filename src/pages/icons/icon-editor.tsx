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
import { Button } from '@/components/ui/button'
import { ChevronLeft, DeleteIcon } from 'lucide-react'
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
            L1:
                relevantIcon?.L1 === undefined
                    ? ('en' as LanguageType)
                    : (relevantIcon.L1.Language as unknown as LanguageType),
            L1_Hidden: relevantIcon.L1.Hidden,
            L1_Label: relevantIcon.L1.Label,
            L2:
                relevantIcon.L2 === undefined
                    ? ('N/A' as LanguageType)
                    : (relevantIcon.L2.Language as unknown as LanguageType),
            L2_Hidden: relevantIcon.L2.Hidden,
            L2_Label: relevantIcon.L2.Label ?? ''
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
                    Image: relevantIcon.L1.Image,
                    File: relevantIcon.L1.File
                },
                L2: {
                    Language: values.L2 as 'en' | 'es' | 'N/A',
                    Label: values.L2_Label,
                    Hidden: values.L2_Hidden,
                    Image: relevantIcon.L2?.Image,
                    File: relevantIcon.L2?.File
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
                navigate(BOARD_PAGE)
            })
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
        <div className="flex flex-col gap-2">
            <HeaderBackground className="grid grid-cols-3">
                <Link
                    to={BOARD_PAGE}
                    className="flex flex-row gap-2"
                    unstable_viewTransition={true}
                >
                    <ChevronLeft className="h-6 w-6" />
                    Back
                </Link>
                <span className="text-lg text-center">Icon Entry Editor</span>
                <div
                    className="w-full flex flex-row gap-2 items-center justify-end cursor-pointer"
                    onClick={() => {
                        if (
                            window.confirm(
                                'Are you sure you want to delete this icon?'
                            )
                        ) {
                            deleteIcon()
                        }
                    }}
                >
                    <DeleteIcon className="h-6 w-6" />
                    <span className="text-sm hidden md:block">Delete Icon</span>
                </div>
            </HeaderBackground>
            <div className="flex flex-row justify-center">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid grid-cols-1 lg:grid-cols-2 max-w-screen-lg w-full gap-4 h-auto py-4"
                    >
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
                                        name="L1_Hidden"
                                        render={({ field }) => (
                                            <FormItem>
                                                <EntryFieldWrapper>
                                                    <div className="col-span-2">
                                                        <FormLabel>
                                                            Hide Icon
                                                        </FormLabel>

                                                        <FormDescription>
                                                            Should this be
                                                            hidden?
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </div>
                                                    <div className="flex justify-end">
                                                        <FormControl>
                                                            <Switch
                                                                name={
                                                                    field.name
                                                                }
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
                                        name="L1_Label"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Label for L1 Icon
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
                                            className="flex flex-col justify-start gap-4 mr-4"
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
                                                                true
                                                        }
                                                    )
                                                }
                                            }}
                                        >
                                            <FormLabel>
                                                Image for L1 Icon
                                            </FormLabel>

                                            <img
                                                className="p-4 w-full aspect-square border rounded object-cover "
                                                src={l1_asset}
                                                alt={'L1 Asset'}
                                                draggable={false}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <Button type="submit" className="w-full">
                                    Update Icon
                                </Button>
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
                                        name="L2_Hidden"
                                        render={({ field }) => (
                                            <FormItem>
                                                <EntryFieldWrapper>
                                                    <div className="col-span-2">
                                                        <FormLabel>
                                                            Hide Icon
                                                        </FormLabel>

                                                        <FormDescription>
                                                            Should this be
                                                            hidden?
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </div>
                                                    <div className="flex justify-end">
                                                        <FormControl>
                                                            <Switch
                                                                name={
                                                                    field.name
                                                                }
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
                                        name="L2_Label"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Label for L2 Icon
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
                                            className="flex flex-col justify-start gap-4 mr-4"
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
                                                                true
                                                        }
                                                    )
                                                }
                                            }}
                                        >
                                            <FormLabel>
                                                Image for L2 Icon
                                            </FormLabel>

                                            <img
                                                className="p-4 w-full aspect-square border rounded object-cover "
                                                src={l2_asset}
                                                draggable={false}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <Button type="submit" className="w-full">
                                    Update Icon
                                </Button>
                            </CardContent>
                        </Card>
                    </form>
                </Form>
            </div>
        </div>
    )
}
