"use client";

import React, { useCallback, useRef, useState, useTransition } from "react";
import { FormElementInstance, FormElements } from "./FormElements";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { ImSpinner2 } from "react-icons/im";
import { SubmitForm } from "@/shared/actions/form";
import { GradientBackground } from "./acernity/GradientBackground";
import { SendHorizontal } from "lucide-react";

function FormSubmitComponent({ formUrl, content }: { content: FormElementInstance[]; formUrl: string }) {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());

  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const validateForm: () => boolean = useCallback(() => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || "";
      const valid = FormElements[field.type].validate(field, actualValue);

      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }

    return true;
  }, [content]);

  const submitValue = useCallback((key: string, value: string) => {
    formValues.current[key] = value;
  }, []);

  const submitForm = async () => {
    formErrors.current = {};
    const validForm = validateForm();
    if (!validForm) {
      setRenderKey(new Date().getTime());
      toast({
        title: "Error",
        description: "please check the form for errors",
        variant: "destructive",
      });
      return;
    }

    try {
      const jsonContent = JSON.stringify(formValues.current);
      await SubmitForm(formUrl, jsonContent);
      setSubmitted(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <GradientBackground className="p-[.6px]">
          <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border rounded-3xl">
            <h1 className="text-2xl font-bold">Form submitted</h1>
            <p className="text-muted-foreground">Thank you for submitting the form, you can close this page now.</p>
          </div>
        </GradientBackground>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <GradientBackground className="p-[.6px]">
        <div key={renderKey} className="w-screen max-w-[650px] flex flex-col gap-4 flex-grow  overflow-y-auto border bg-background rounded-3xl p-8">
          {content.map((element) => {
            const FormElement = FormElements[element.type].formComponent;
            return (
              <FormElement
                key={element.id}
                elementInstance={element}
                submitValue={submitValue}
                isInvalid={formErrors.current[element.id]}
                defaultValue={formValues.current[element.id]}
              />
            );
          })}
          <Button
            className="mt-8 rounded-full"
            onClick={() => {
              startTransition(submitForm);
            }}
            disabled={pending}
          >
            {!pending && (
              <>
                Submit
                <SendHorizontal className="ml-3 w-4 h-4" />
              </>
            )}
            {pending && <ImSpinner2 className="animate-spin" />}
          </Button>
        </div>
      </GradientBackground>
    </div>
  );
}

export default FormSubmitComponent;
