"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { withDatabase } from "@/lib/prisma";

const leadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  travelLocation: z.string().optional(),
  numberOfPeople: z.coerce.number().int().positive().optional().or(z.literal("")),
  travelDate: z.string().optional(),
  interestedPackage: z.string().optional(),
  sourcePage: z.string().min(1),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmTerm: z.string().optional(),
  utmContent: z.string().optional(),
  referrer: z.string().optional(),
  device: z.string().optional(),
  leadType: z.string().min(1),
});

export type LeadFormState = {
  ok: boolean;
  message: string;
};

export async function createLeadAction(
  _state: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const start = Date.now();
  console.log(
    JSON.stringify({
      level: "info",
      message: "lead_submission_start",
      sourcePage: formData.get("sourcePage"),
    }),
  );

  const parsed = leadSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please add your name and a valid phone number.",
    };
  }

  const value = parsed.data;
  await withDatabase((db) =>
    db.lead.create({
      data: {
        name: value.name,
        phone: value.phone,
        travelLocation: value.travelLocation || null,
        numberOfPeople:
          typeof value.numberOfPeople === "number" ? value.numberOfPeople : null,
        travelDate: value.travelDate ? new Date(value.travelDate) : null,
        interestedPackage: value.interestedPackage || null,
        sourcePage: value.sourcePage,
        utmSource: value.utmSource || null,
        utmMedium: value.utmMedium || null,
        utmCampaign: value.utmCampaign || null,
        utmTerm: value.utmTerm || null,
        utmContent: value.utmContent || null,
        referrer: value.referrer || null,
        device: value.device || null,
        leadType: value.leadType,
      },
    }),
  );

  revalidatePath("/admin/leads");
  console.log(
    JSON.stringify({
      level: "info",
      message: "lead_submission_done",
      ms: Date.now() - start,
    }),
  );

  return {
    ok: true,
    message:
      "Thanks. Our Kashmir travel expert will call you shortly. If this was an itinerary request, the download link is now visible below.",
  };
}
