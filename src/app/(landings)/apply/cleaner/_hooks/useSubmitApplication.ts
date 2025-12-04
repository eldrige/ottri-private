import { uploadDocument } from "@/utils/uploadDocument";
import { useMutation } from "@tanstack/react-query";
import { ApplyFormType } from "../types/ApplyFormType";
import { axiosInstance } from "@/lib/axios";
import { JobApplicationType } from "@/app/admin/types";

export function useSubmitApplication() {
  return useMutation({
    mutationFn: async (application: ApplyFormType) => {
      const {
        data: { url }
      } = await uploadDocument(application.resume[0]);

      const { data } = await axiosInstance.post<JobApplicationType>(
        "careers/applications",
        {
          email: application.email,
          fullname: application.fullName,
          coverLetter: application.coverLetter,
          phoneNumber: application.phoneNumber,
          cvLink: url,
          jobPositionId: 1
        }
      );

      return data;
    }
  });
}
