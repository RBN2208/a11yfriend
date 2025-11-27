"use client"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {createReportSchema} from "@/features/audit/automatic/zod-schema";
import {Form} from "@/shared/components/shadcn-components/ui/form"
import React, {useState} from 'react';
import {AlertCircleIcon} from 'lucide-react';
import {
    FormButton,
    InputElement, TextAreaElement
} from "@/shared/components/form-components/elements/form-elements";
import AlertWrapper from "@/shared/components/shadn-wrappers/AlertWrapper";
import {toast} from "sonner";
import {MessageCodes} from "@/shared/message-codes";
import {createReport, initAxeReport} from "@/features/audit/automatic/actions/actions";
import {AxeReportConfig, SupabaseReport} from "@/features/audit/automatic/types/types";

type CreateAuditFormProps = {
    callbackAction?: () => void
}

export default function CreateAxeReportForm(props: CreateAuditFormProps) {
    const [loading, setLoading] = useState(false);
    const [buttonLoadingLabel, setButtonLoadingLabel] = useState("Creating report...");

    const form = useForm<z.infer<typeof createReportSchema>>({
        resolver: zodResolver(createReportSchema),
        reValidateMode: 'onBlur',
        mode: 'onBlur',
        defaultValues: {
            name: "",
            urls: ""
        }
    })

    async function onSubmit(values: z.infer<typeof createReportSchema>) {
        setLoading(true);
        /* TODO maybe switch this to a route so a readable stream can be used to show the progress
         *  but then this function would break the consistency of the other forms and actions..
         */
        try {
            const creationResponse = await createReport(values);

            if (creationResponse.errors) {
                creationResponse.errors.forEach(error => {
                    form.setError(
                        error.field as keyof z.infer<typeof createReportSchema>,
                        {message: error.error}
                    )
                })
                toast.error(creationResponse.message, { description: creationResponse.globalError });
                return;
            }

            if (creationResponse.success) {
                toast.message(creationResponse.message);
                setButtonLoadingLabel("Report created, running axe report...");

                const runConfig: AxeReportConfig = {
                    urls: values.urls,
                }

                const runResponse = await initAxeReport(runConfig, creationResponse.data.id)
                if (!runResponse.success) {
                    toast.error(runResponse.globalError)
                }

                if (runResponse.success) {
                    toast.success(runResponse.message);
                    setButtonLoadingLabel("Report was successfully created!");
                    setLoading(false)
                    setTimeout(() => {
                        props.callbackAction && props.callbackAction();
                    }, 1000)
                }
            }
        } catch (error) {
            form.setError('root', error || MessageCodes.GENERIC_UNEXPECTED_ERROR);
            toast.error(MessageCodes.GENERIC_UNEXPECTED_ERROR)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 flex-wrap">

                <InputElement label="Report name"
                              required={true}
                              name="name"
                              type="text"
                              className="w-full sm:w-1/2"
                />

                <TextAreaElement
                    name="urls"
                    label="URLs to scan"
                    rows={10}
                />

                <FormButton loading={loading}
                            loadingLabel={buttonLoadingLabel}
                            label="Start Report"
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
