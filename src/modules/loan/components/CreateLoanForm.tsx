import { Form } from "@/components/ui/form";
import { useCreateLoanForm } from "../hooks/useCreateLoanForm";
import CustomInput from "@/components/common/custom-input";
import CustomTextArea from "@/components/common/custom-textarea";
import CustomSelect from "@/components/common/custom-select";
import { Button } from "@/components/ui/button";
import type { CreateLoanFormType } from "../utils/validation";
import { FileText, Percent, Calendar, PiggyBank } from "lucide-react";

const CreateLoanForm = () => {
  const { form, mutation } = useCreateLoanForm();

  const onSubmit = (data: CreateLoanFormType) => {
    const payload = {
      ...data,
      amountRequested: Number(data.amountRequested),
      interestRate: Number(data.interestRate),
      duration: Number(data.duration),
    };
    mutation.mutate(payload);
  };

  const isSubmitting = mutation.isLoading;

  return (
    <section
      className="w-full max-w-2xl mx-auto shadow-sm max-sm:p-5 sm:py-8 bg-white rounded-xl"
      role="main"
      aria-labelledby="create-loan-heading"
    >
      <div className="text-center mb-8">
        <h1 id="create-loan-heading" className="text-black font-bold text-3xl">
          Create Loan Request
        </h1>
        <p className="text-text-secondary mt-2 text-base">
          Fill out the details below to create your loan request
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 mt-6 w-full mx-auto max-w-xl"
          role="form"
          aria-label="Create loan form"
          noValidate
        >
          {/* Loan Title */}
          <CustomInput
            name="title"
            label="Loan Title"
            placeholder="e.g., Small Business Expansion"
            control={form.control}
            containerClassName="rounded-lg"
            formLabelClassName="text-brand-primary font-medium"
            append={
              <FileText
                size={20}
                color="var(--color-text-secondary)"
                aria-hidden="true"
              />
            }
            aria-label="Loan title"
            aria-required="true"
            aria-invalid={!!form.formState.errors.title}
            aria-describedby={
              form.formState.errors.title ? "title-error" : undefined
            }
          />

          {/* Description */}
          <CustomTextArea
            name="description"
            label="Description"
            placeholder="Describe what you need the loan for and how you plan to use the funds..."
            control={form.control}
            textareaClassName="min-h-24 rounded-lg border-gray-300 focus:border-brand-primary focus:ring-brand-primary"
            formLabelClassName="text-brand-primary font-medium"
            aria-label="Loan description"
            aria-required="true"
            aria-invalid={!!form.formState.errors.description}
          />

          {/* Amount Requested */}
          <CustomInput
            name="amountRequested"
            label="Amount Requested (₦)"
            placeholder="50000"
            control={form.control}
            containerClassName="rounded-lg border-gray-300 focus-within:border-brand-primary"
            formLabelClassName="text-brand-primary font-medium"
            append={"₦"}
            aria-label="Amount requested in Naira"
            aria-required="true"
            aria-invalid={!!form.formState.errors.amountRequested}
          />

          {/* Interest Rate */}
          <CustomInput
            name="interestRate"
            label="Interest Rate (%)"
            placeholder="12.5"
            control={form.control}
            containerClassName="rounded-lg border-gray-300 focus-within:border-brand-primary"
            formLabelClassName="text-brand-primary font-medium"
            append={
              <Percent
                size={20}
                color="var(--color-text-secondary)"
                aria-hidden="true"
              />
            }
            aria-label="Interest rate percentage"
            aria-required="true"
            aria-invalid={!!form.formState.errors.interestRate}
          />

          {/* Duration and Duration Unit in a row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Duration */}
            <CustomInput
              name="duration"
              label="Duration"
              placeholder="12"
              control={form.control}
              containerClassName="rounded-lg border-gray-300 focus-within:border-brand-primary"
              formLabelClassName="text-brand-primary font-medium"
              append={
                <Calendar
                  size={20}
                  color="var(--color-text-secondary)"
                  aria-hidden="true"
                />
              }
              aria-label="Loan duration"
              aria-required="true"
              aria-invalid={!!form.formState.errors.duration}
            />

            {/* Duration Unit */}
            <CustomSelect
              name="durationUnit"
              label="Duration Unit"
              control={form.control}
              placeholder="Select unit"
              selectTriggerClassName="rounded-lg border-gray-300 focus:border-brand-primary"
              labelClassName="text-brand-primary font-medium"
              options={[
                { value: "DAYS", label: "Days" },
                { value: "WEEKS", label: "Weeks" },
                { value: "MONTHS", label: "Months" },
                { value: "YEARS", label: "Years" },
              ]}
              aria-label="Select duration unit"
              aria-required="true"
              aria-invalid={!!form.formState.errors.durationUnit}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="mt-8 bg-brand-primary hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 rounded-xl py-6 h-14 w-full text-white text-lg font-semibold flex justify-center items-center gap-2 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
            aria-label={
              isSubmitting ? "Creating loan request..." : "Create loan request"
            }
          >
            {isSubmitting ? (
              "Creating Loan Request..."
            ) : (
              <>
                <PiggyBank size={20} aria-hidden="true" />
                Create Loan Request
              </>
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default CreateLoanForm;
