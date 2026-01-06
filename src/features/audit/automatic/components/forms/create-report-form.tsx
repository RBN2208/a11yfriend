"use client"
import * as z from "zod"
import React, {useState} from 'react';
import {useForm} from "react-hook-form"
import {useTranslations} from "next-intl";
import {AlertCircleIcon} from 'lucide-react';
import {zodResolver} from "@hookform/resolvers/zod"
import {createReportSchema} from "@/features/audit/automatic/zod-schema";
import {Form} from "@/shared/components/shadcn-components/ui/form"
import {
    FormButton,
    InputElement,
    TextAreaElement
} from "@/shared/components/form-components/elements/form-elements";
import AlertWrapper from "@/shared/components/shadn-wrappers/AlertWrapper";
import {createReport, updateReport} from "@/features/audit/automatic/actions/actions";
import {toast} from "sonner";
import {MessageCodes} from "@/shared/i18n/message-codes";
import {AutomaticAudit} from "@/features/audit/automatic/types/types";

type CreateReportFormProps = {
    report: AutomaticAudit | undefined,
    isEditModal: boolean,
    callbackAction?: () => void,
}

export default function CreateReportForm(props: CreateReportFormProps) {
    const [loading, setLoading] = useState(false);
    const t = useTranslations();

    const form = useForm<z.infer<typeof createReportSchema>>({
        resolver: zodResolver(createReportSchema),
        reValidateMode: 'onBlur',
        mode: 'onBlur',
        defaultValues: {
            name: props.report?.name || "",
            description: props.report?.description || ""
        }
    })

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
