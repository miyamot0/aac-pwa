import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { useEffect } from 'react'
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
import { Input } from '@/components/ui/input'
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

enum LanguageType {
    English = 'en',
    Spanish = 'es'
}

const iconSchema = z.object({
    index: z.coerce.number().min(0),
    L1: z.nativeEnum(LanguageType),
    L2: z.nativeEnum(LanguageType)
})

export async function loader({ params }: { params: { id: string } }) {
    const id = parseInt(params.id)

    if (!id) throw new Error('id is required')

    const icon = await db.icons.get(id)

    return icon
}

export default function IconEditorPage() {
    const relevantIcon = useLoaderData() as SGDField | undefined
    const navigate = useNavigate()

    if (!relevantIcon) throw new Error('No icon found')

    const form = useForm<z.infer<typeof iconSchema>>({
        resolver: zodResolver(iconSchema),
        values: {
            index: parseInt(
                relevantIcon ? relevantIcon.index.toString() : '-1'
            ),
            L1:
                relevantIcon?.L1 === undefined
                    ? ('en' as LanguageType)
                    : (relevantIcon.L1.Language as unknown as LanguageType),
            L2:
                relevantIcon?.L2 === undefined
                    ? ('es' as LanguageType)
                    : (relevantIcon.L2.Language as unknown as LanguageType)
        }
    })

    function onSubmit(values: z.infer<typeof iconSchema>) {
        console.log(values)
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
                    className="w-full flex flex-row gap-2 justify-end cursor-pointer"
                    onClick={() => deleteIcon()}
                >
                    Delete
                    <DeleteIcon />
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
                                                    Icon Index
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled
                                                        {...field}
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
                                <Button type="submit">Submit</Button>
                            </form>
                            {relevantIcon
                                ? JSON.stringify(relevantIcon)
                                : undefined}
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
