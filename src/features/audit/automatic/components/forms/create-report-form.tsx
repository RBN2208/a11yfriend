"use client"
import * as z from "zod"
import React, {useState} from 'react';
import {useForm, useFieldArray} from "react-hook-form"
import {useTranslations} from "next-intl";
import {AlertCircleIcon, Plus, X, Edit, Check} from 'lucide-react';
import {zodResolver} from "@hookform/resolvers/zod"
import {createReportSchema} from "@/features/audit/automatic/zod-schema";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/shared/components/shadcn-components/ui/form"
import {Input} from "@/shared/components/shadcn-components/ui/input"
import {Button} from "@/shared/components/shadcn-components/ui/button"
import {
    FormButton,
    InputElement,
    TextAreaElement
} from "@/shared/components/form-components/elements/form-elements";
import AlertWrapper from "@/shared/components/shadn-wrappers/AlertWrapper";
import { createReport, updateReport } from "@/features/audit/automatic/actions/actions";
import { toast } from "sonner";
import { MessageCodes } from "@/shared/i18n/message-codes";
import { AutomaticAudit } from "@/features/audit/automatic/types/types";

type CreateReportFormProps = {
    report: AutomaticAudit | undefined,
    isEditModal: boolean,
    callbackAction?: () => void,
}

export default function CreateReportForm(props: CreateReportFormProps) {
    const [loading, setLoading] = useState(false);
    const [urlInput, setUrlInput] = useState("");
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const t = useTranslations();

    const form = useForm<z.infer<typeof createReportSchema>>({
        resolver: zodResolver(createReportSchema),
        reValidateMode: 'onBlur',
        mode: 'onBlur',
        defaultValues: {
            name: props.report?.name || "",
            description: props.report?.description || "",
            urls: props.report?.urls?.map(url => (url)) || []
        }
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "urls"
    });

    const handleAddUrl = () => {
        if (urlInput.trim()) {
            append({ url: urlInput.trim() });
            setUrlInput("");
        }
    };

    const toggleEdit = async (index: number) => {
        if (editingIndex === index) {
            const isValid = await form.trigger(`urls.${index}.url`);
            if (isValid) {
                setEditingIndex(null);
            }
        } else {
            setEditingIndex(index);
        }
    };

    async function onSubmit(values: z.infer<typeof createReportSchema>) {
        setLoading(true);
        try {
            const { success, data, message, globalError, errors } = props.isEditModal ?
                await updateReport(values, props.report?.id || "") :
                await createReport(values);

            if (success) {
                toast.success(message);
                props.callbackAction && props.callbackAction();
                return;
            }

            if (errors) {
                errors.forEach(error => {
                    form.setError(
                        error.field as keyof z.infer<typeof createReportSchema>,
                        {message: error.error}
                    )
                })
                toast.error(message, { description: globalError });
            }
        } catch (error) {
            form.setError('root', error || MessageCodes.GENERIC_UNEXPECTED_ERROR);
            toast.error(MessageCodes.GENERIC_UNEXPECTED_ERROR)
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap">

                <InputElement label={t("report.name")}
                              required={true}
                              name="name"
                              type="text"
                              className="w-full sm:w-1/2 md:w-1/2 p-2"
                />

                <div className="w-full sm:w-2/4"></div>


                <TextAreaElement name="description"
                                 label={t("labels.description")}
                                 className="w-full sm:w-1/2 md:w-full p-3"
                />

                <div className="w-full p-2">
                    <FormLabel className="text-sm font-medium">
                        URLs <span className="text-destructive">*</span>
                    </FormLabel>
                    <div className="flex gap-2 mt-2">
                        <Input
                            type="text"
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddUrl();
                                }
                            }}
                            placeholder="https://example.com"
                            className="flex-1"
                        />
                        <Button
                            type="button"
                            onClick={handleAddUrl}
                            variant="outline"
                            size="icon"
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>

                    {fields.length > 0 && (
                        <div className="mt-4 space-y-2">
                            {fields.map((field, index) => (
                                <FormField
                                    key={field.id}
                                    control={form.control}
                                    name={`urls.${index}.url`}
                                    render={({ field: formField, fieldState }) => (
                                        <FormItem>
                                            <div className="flex items-start gap-2">
                                                <div className="flex-1">
                                                    <FormControl>
                                                        <Input
                                                            {...formField}
                                                            readOnly={editingIndex !== index}
                                                            className={editingIndex !== index ? "bg-muted" : ""}
                                                        />
                                                    </FormControl>
                                                    {fieldState.error && (
                                                        <FormMessage>{fieldState.error.message}</FormMessage>
                                                    )}
                                                </div>
                                                <Button
                                                    type="button"
                                                    onClick={() => toggleEdit(index)}
                                                    variant="outline"
                                                    size="icon"
                                                >
                                                    {editingIndex === index ? (
                                                        <Check className="h-4 w-4" />
                                                    ) : (
                                                        <Edit className="h-4 w-4" />
                                                    )}
                                                </Button>
                                                <Button
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                    variant="destructive"
                                                    size="icon"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            ))}
                        </div>
                    )}

                    {form.formState.errors.urls && !Array.isArray(form.formState.errors.urls) && (
                        <p className="text-sm font-medium text-destructive mt-2">
                            {form.formState.errors.urls.message}
                        </p>
                    )}
                </div>

                <FormButton loading={loading}
                            loadingLabel={t("states.creating")}
                            label={props.report ? t('actions.save') : t('actions.create')}
                />

                {form.formState.errors && form.formState.errors.root &&
                    <AlertWrapper
                        title="Sorry, we could not create your report"
                        variant="destructive"
                        icon={<AlertCircleIcon/>}
                    >
                        {form.formState.errors.root.message}
                    </AlertWrapper>
                }
            </form>
        </Form>
    )
}
