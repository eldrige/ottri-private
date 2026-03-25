import { uploadDocument } from "@/utils/uploadDocument";
import { useMutation } from "@tanstack/react-query";
import { ApplyFormType } from "../types/ApplyFormType";
import { clientAxios } from "@/lib/axios";
import { JobApplicationType } from "@/app/admin/types";

export function useSubmitApplication() {
  return useMutation({
    mutationFn: async (
      application: ApplyFormType & { jobPositionId: number }
    ) => {
      const {
        data: { url }
      } = await uploadDocument(application.resume[0]);

      const { data } = await clientAxios.post<JobApplicationType>(
        "careers/applications",
        {
          email: application.email,
          fullName: application.fullName,
          coverLetter: application.coverLetter,
          phoneNumber: application.phoneNumber,
          cvLink: url,
          jobPositionId: application.jobPositionId || 1
        }
      );

      return data;
    }
  });
}
