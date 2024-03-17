"use client";
import { formSchema, formSchemaType } from "@/shared/schemas/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { Button } from "@/shared/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shared/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { toast } from "@/shared/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Plus } from "lucide-react";
import { CreateForm } from "@/shared/actions/form";

const CreateFormDailog = ({ showBigButton }: { showBigButton?: boolean }) => {

    const [open, setOpen] = useState(false)
    const router = useRouter();
    const form = useForm<formSchemaType>({
        resolver: zodResolver(formSchema),
    });

    const toggle = () => {
        setOpen(!open)
    }

    async function onSubmit(values: formSchemaType) {
        try {
            const formId = await CreateForm(values);
            toast({
                title: "Success",
                description: "Form created successfully",
            });
            toggle()
            router.push(`/builder/${formId}`);
            router.refresh()
        } catch (error) {
            console.log("Error while creating form", error)
            toast({
                title: "Error",
                description: "Something went wrong, please try again later",
                variant: "destructive",
            });
        }
    }

    return (
        <>
            {
                showBigButton ? (
                    <div onClick={() => setOpen(true)} className="h-full w-full flex flex-col items-center justify-center space-y-3 border-2 border-dashed border-primary rounded-xl text-primary hover:bg-primary hover:text-white duration-300 transition-all hover:border-white cursor-pointer">
                        <Plus className="size-6" />
                        <span className="flex-5xl font-bold">
                            Create Form
                        </span>
                    </div>
                ) : (
                    <Button onClick={() => setOpen(true)} className="rounded-full">
                        <Plus className="mr-3" />
                        Create Form
                    </Button >
                )
            }
            <Dialog open={open} onOpenChange={toggle}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Form</DialogTitle>
                        <DialogDescription>
                            Please fill out below details to get started!
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea rows={5} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                    <DialogFooter>
                        <Button onClick={form.handleSubmit(onSubmit)} disabled={form.formState.isSubmitting} className="w-full mt-4">
                            {!form.formState.isSubmitting && <span>Save</span>}
                            {form.formState.isSubmitting && <ImSpinner2 className="animate-spin" />}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CreateFormDailog