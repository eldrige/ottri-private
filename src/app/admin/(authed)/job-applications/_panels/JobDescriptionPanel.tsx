"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Save, Edit } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function JobDescriptionPanel() {
  const [isEditing, setIsEditing] = useState(false);
  const [jobDescription, setJobDescription] = useState(`
# Cleaning Technicians in Louisville, Ky

OTTRI Cleaning Services is looking for self-motivated Cleaner to work $13.00/hour, up to 20 hours per week.

**YOU MUST HAVE A RELIABLE TRANSPORTATION** and willing to drive to site in LOUISVILLE, KY (if applicable).

Duties include general and detail cleaning of houses, warehouses, offices, restrooms and break rooms (dusting, vacuuming, mopping, emptying trash and various other cleaning responsibilities).
  `);

  const handleSave = () => {
    // TODO: Save to API
    setIsEditing(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Job Description Editor</h2>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                size="xs"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button
                size="xs"
                onClick={handleSave}
                className="flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button
              size="xs"
              onClick={() => setIsEditing(true)}
              className="flex items-center"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          )}
        </div>
      </div>

      {isEditing ? (
        <div>
          <Textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={20}
            className="w-full font-mono text-sm"
            placeholder="Enter job description in Markdown format..."
          />
          <p className="text-sm text-gray-500 mt-2">
            Use Markdown syntax to format the job description. This will be
            displayed on the /apply/cleaner page.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="prose max-w-none prose-headings:text-gray-800 prose-strong:text-gray-800">
            <ReactMarkdown>{jobDescription}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
