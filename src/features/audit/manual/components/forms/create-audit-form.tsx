"use client"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {createAuditSchema} from "@/features/audit/manual/zod-schema";
import {Form} from "@/shared/components/shadcn-components/ui/form"
import React, {useState} from 'react';
import {AlertCircleIcon} from 'lucide-react';
import {
    FormButton,
    InputElement,
    SelectElement,
    TextAreaElement
} from "@/shared/components/form-components/elements/form-elements";
import AlertWrapper from "@/shared/components/shadn-wrappers/AlertWrapper";
import {ManualAudit} from "@/features/audit/manual/types/types";
import {createAudit, updateAudit} from "@/features/audit/manual/actions/actions";
import {toast} from "sonner";
import {MessageCodes} from "@/shared/i18n/message-codes";
import {useTranslations} from "next-intl";

type CreateAuditFormProps = {
    auditData: ManualAudit | undefined,
    isEditModal: boolean,
    callbackAction?: () => void,
}

const CONFORMANCE_OPTIONS = [
    {label: 'A', value: 'A'},
    {label: 'AA', value: 'AA'},
    {label: 'AAA', value: 'AAA'},
]

export default function CreateAuditForm(props: CreateAuditFormProps) {
    const [loading, setLoading] = useState(false);
    const t = useTranslations();

    const form = useForm<z.infer<typeof createAuditSchema>>({
        resolver: zodResolver(createAuditSchema),
        reValidateMode: 'onBlur',
        mode: 'onBlur',
        defaultValues: {
            name: props.auditData?.name || "",
            description: props.auditData?.description || "",
            status: props.auditData?.status || "draft",
            conformance: props.auditData?.conformance || undefined
        }
    })

    async function onSubmit(values: z.infer<typeof createAuditSchema>) {
        setLoading(true);
        try {
            const { success, data, message, globalError, errors } = props.isEditModal ?
                await updateAudit(values, props.auditData?.id || "") :
                await createAudit(values);

            if (success) {
                toast.success(message);
                props.callbackAction && props.callbackAction();
                return;
            }

            if (errors) {
                errors.forEach(error => {
                    form.setError(
                        error.field as keyof z.infer<typeof createAuditSchema>,
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

                <InputElement label={t("audit.name")}
                              required={true}
                              name="name"
                              type="text"
                              className="w-full sm:w-1/2 md:w-1/2 p-2"
                />

                <SelectElement name="conformance"
                               label={t("audit.conformance")}
                               required={true}
                               options={CONFORMANCE_OPTIONS}
                               className="w-full sm:w-1/4 md:w-1/2 p-2"
                />

                <div className="w-full sm:w-2/4"></div>


                <TextAreaElement name="description"
                                 label={t("labels.description")}
                                 className="w-full sm:w-1/2 md:w-full p-3"
                />

                <FormButton loading={loading}
                            loadingLabel={t("states.creating")}
                            label={props.auditData ? t('actions.save') : t('actions.create')}
                />

                {form.formState.errors && form.formState.errors.root &&
                    <AlertWrapper
                        title="Sorry, we could not create your audit"
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
