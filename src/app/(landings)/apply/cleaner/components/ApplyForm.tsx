"use client";
import { Button } from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export default function ApplyForm() {
  return (
    <form className="border border-black/25 rounded p-9 flex flex-col items-start gap-6">
      <h1 className="text-heading-3 font-bold">Apply For This Position</h1>
      <Input label="Full Name *" required className="border border-black/10" />
      <Input label="Email *" required className="border border-black/10" />
      <Input label="Phone *" required className="border border-black/10" />
      <Textarea
        label="Cover Letter *"
        required
        rows={6}
        className="border border-black/10"
      />
      <div className="w-full">
        <label htmlFor="resume" className="block text-sm font-medium mb-2">
          Resume/CV *
        </label>
        <input
          id="resume"
          type="file"
          required
          accept=".pdf,.doc,.docx"
          className="w-full border border-black/10 rounded p-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
        />
        <p className="text-sm text-gray-500 mt-1">
          Allowed Type(s): .pdf, .doc, .docx
        </p>
      </div>
      <Checkbox
        required
        label="By using this form you agree with the storage and handling of your data by this website. *"
        className="border border-black/10"
      />
      <Button size={"sm"} type="submit">
        SUBMIT
      </Button>
    </form>
  );
}
