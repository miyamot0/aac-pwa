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
import { Button, buttonVariants } from '@/components/ui/button'
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

enum LanguageType {
    English = 'en',
    Spanish = 'es',
    NA = 'N/A'
}

const iconSchema = z.object({
    index: z.coerce.number().min(0),
    conditional: z.boolean(),
    L1: z.nativeEnum(LanguageType),
    L1_Label: z.string(),
    L2: z.nativeEnum(LanguageType),
    L2_Label: z.string()
})

type LoaderReturn = {
    icon: SGDField
    filled_indices: number[]
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }: { params: { id: string } }) {
    const id = parseInt(params.id)

    if (!id) throw new Error('id is required')

    const icon = await db.icons.get(id)

    const icons = await db.icons.toArray()
    const filled_indices = icons.map((icon) => icon.index)

    return { icon, filled_indices }
}

export default function IconEditorPage() {
    const { FieldSize } = useContext(IconsContext)
    const loaderData = useLoaderData() as LoaderReturn | undefined
    const navigate = useNavigate()

    if (!loaderData) throw new Error('No icon found')

    const relevantIcon = loaderData.icon

    const form = useForm<z.infer<typeof iconSchema>>({
        resolver: zodResolver(iconSchema),
        values: {
            index: relevantIcon.index,
            conditional: relevantIcon.conditional,
            L1:
                relevantIcon?.L1 === undefined
                    ? ('en' as LanguageType)
                    : (relevantIcon.L1.Language as unknown as LanguageType),
            L1_Label: relevantIcon.L1.Label,
            L2:
                relevantIcon?.L2 === undefined
                    ? ('N/A' as LanguageType)
                    : (relevantIcon.L2.Language as unknown as LanguageType),
            L2_Label: relevantIcon.L2?.Label ?? ''
        }
    })

    async function onSubmit(values: z.infer<typeof iconSchema>) {
        db.icons
            .where('id')
            .equals(relevantIcon.id)
            .modify({
                index: values.index,
                conditional: values.conditional,
                L1: {
                    Language: values.L1 as 'en' | 'es',
                    Label: values.L1_Label,
                    Image: relevantIcon.L1.Image,
                    File: relevantIcon.L1.File
                },
                L2: {
                    Language: values.L2 as 'en' | 'es' | 'N/A',
                    Label: values.L2_Label,
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

    const l1_asset = relevantIcon.L1.File
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
                    onClick={() => deleteIcon()}
                >
                    <DeleteIcon className="h-6 w-6" />
                    <span className="text-sm hidden md:block">Delete Icon</span>
                </div>
            </HeaderBackground>
            <div className="flex flex-row justify-center">
                <Card className="max-w-screen-md">
                    <CardHeader>
                        <CardTitle>Icon Editor</CardTitle>
                        <CardDescription>Edit Icon Slot</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8"
                            >
                                <FormField
                                    control={form.control}
                                    name="index"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="grid grid-cols-2 items-center">
                                                <FormLabel>
                                                    Icon Location (Index)
                                                </FormLabel>
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
                                                <FormDescription>
                                                    This is the number slot in
                                                    the field
                                                </FormDescription>
                                                <FormMessage />
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="conditional"
                                    render={({ field }) => (
                                        <FormItem className="mt-2 flex flex-row items-center w-full">
                                            <div className="flex flex-row justify-between items-center w-full">
                                                <FormLabel>
                                                    Conditional on Language Mode
                                                </FormLabel>
                                                <FormControl>
                                                    <Switch
                                                        name={field.name}
                                                        id={field.name}
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="L1"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="grid grid-cols-2 items-center">
                                                <FormLabel>
                                                    L1 Language Setting
                                                </FormLabel>
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
                                                        <SelectItem value="en">
                                                            English
                                                        </SelectItem>
                                                        <SelectItem value="es">
                                                            Spanish
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>
                                                    This is the language output
                                                    setting for L1
                                                </FormDescription>
                                                <FormMessage />
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="L1_Label"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>L1 Label</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder=""
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                This is the word associated with
                                                the L1 icon
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid">
                                    <div className="flex flex-col justify-start gap-4 mr-4">
                                        <FormLabel>Current L1 Asset</FormLabel>

                                        <img
                                            className="p-4 w-full aspect-square border rounded object-cover "
                                            src={l1_asset}
                                            alt={'L1 Asset'}
                                            draggable={false}
                                        />

                                        <Link
                                            to={`/icons/${relevantIcon.id}/L1`}
                                            className={cn(
                                                buttonVariants({
                                                    variant: 'outline'
                                                }),
                                                'w-full'
                                            )}
                                        >
                                            Edit L1 Asset
                                        </Link>
                                    </div>
                                </div>

                                <FormField
                                    control={form.control}
                                    name="L2"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="grid grid-cols-2 items-center">
                                                <FormLabel>
                                                    L2 Language Setting
                                                </FormLabel>
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
                                                        <SelectItem value="en">
                                                            English
                                                        </SelectItem>
                                                        <SelectItem value="es">
                                                            Spanish
                                                        </SelectItem>
                                                        <SelectItem value="N/A">
                                                            Disabled
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormDescription>
                                                    This is the language output
                                                    setting for L2
                                                </FormDescription>
                                                <FormMessage />
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="L2_Label"
                                    render={({ field }) => (
                                        <FormItem
                                            className={cn('', {
                                                hidden:
                                                    form.getValues('L2') ===
                                                    'N/A'
                                            })}
                                        >
                                            <FormLabel>L2 Label</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder=""
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                This is the word associated with
                                                the L2 icon
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div
                                    className={cn('grid', {
                                        hidden: form.getValues('L2') === 'N/A'
                                    })}
                                >
                                    <div className="flex flex-col justify-start gap-4 mr-4">
                                        <FormLabel>Current L2 Asset</FormLabel>

                                        <img
                                            className="p-4 w-full aspect-square border rounded object-cover "
                                            src={l2_asset}
                                            alt={'L2 Asset'}
                                            draggable={false}
                                        />

                                        <Link
                                            to={`/icons/${relevantIcon.id}/L2`}
                                            className={cn(
                                                buttonVariants({
                                                    variant: 'outline'
                                                }),
                                                'w-full'
                                            )}
                                        >
                                            Edit L2 Asset
                                        </Link>
                                    </div>
                                </div>

                                <Button type="submit" className="w-full">
                                    Update Icon
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
