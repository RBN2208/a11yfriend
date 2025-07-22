"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { createAuditSchema } from "@/utils/validations/zod-schema";
import {Form} from "@/components/ui/form"
import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { createAudit } from '@/actions/audit';
import {
    FormButton,
    InputElement,
    SelectElement,
    TextAreaElement
} from "@/components/form-components/elements/form-elements";

export default function CreateAuditForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm < z.infer < typeof createAuditSchema >> ({
        resolver: zodResolver(createAuditSchema),
        reValidateMode: 'onBlur',
        mode: 'onBlur',
        defaultValues: {
            name: '',
            description: '',
            status: 'draft',
            customer: '',
            project_name: '',
            module: '',
            version: undefined,
            conformance: undefined,
            miscellaneous: ''
        }
    })

    async function onSubmit(values: z.infer < typeof createAuditSchema > ) {
        setLoading(true);
        console.log(form)
        try {
            const response = await createAudit(values);

            if (response.errors) {
                response.errors.forEach(error => {
                    form.setError(error.field, { message: error.errors[0] })
                })
            }

            if (response.ok) {
                router.push('/account/audits');
            }
        } catch (error) {
            form.setError('root', error || "")
        } finally {
            setLoading(false);
        }
    }

    const VERSION_OPTIONS = [
        {label: 'v2.0', value: '2.0'},
        {label: 'v2.1', value: '2.1'},
        {label: 'v2.2', value: '2.2'},
    ]

    const CONFORMANCE_OPTIONS = [
        {label: 'A', value: 'A'},
        {label: 'AA', value: 'AA'},
        {label: 'AAA', value: 'AAA'},
    ]

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap">

                <InputElement label="Audit name"
                              required={true}
                              name="name"
                              type="text"
                              className="w-full sm:w-1/2 p-2"
                />

                <InputElement label="Customer name"
                              required={true}
                              name="customer"
                              type="text"
                              className="w-full sm:w-1/2 p-2"
                />

                <InputElement label="Project name"
                              required={true}
                              name="project_name"
                              type="text"
                              className="w-full sm:w-1/2 p-2"
                />

                <InputElement label="Module name"
                              required={true}
                              name="module"
                              type="text"
                              className="w-full sm:w-1/2 p-2"
                />

                <SelectElement name="version"
                               label="Version"
                               required={true}
                               options={VERSION_OPTIONS}
                               placeholder="Version"
                               className="w-full sm:w-1/4 p-2"
                />

                <SelectElement name="conformance"
                               label="Conformance"
                               required={true}
                               options={CONFORMANCE_OPTIONS}
                               placeholder="Conformance level"
                               className="w-full sm:w-1/4 p-2"
                />

                <div className="w-full sm:w-2/4"></div>


                <TextAreaElement name="description"
                                 label="Description"
                                 className="w-full sm:w-1/2 p-3"
                />


                <TextAreaElement name="miscellaneous"
                                 label="Miscellaneous"
                                 description="Any other information you want to add"
                                 className="w-full sm:w-1/2 p-3"
                />


                <FormButton loading={loading}
                            loadingLabel="Creating audit"
                            label="Create audit"
                />

                {form.formState.errors && form.formState.errors.root &&
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Sorry, we could not create your audit</AlertTitle>
                        <AlertDescription>
                            {form.formState.errors.root.message}
                        </AlertDescription>
                    </Alert>
                }
            </form>
        </Form>
    )
}
