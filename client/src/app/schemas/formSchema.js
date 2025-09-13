import z from "zod";

export const ticketSchema = z.object({
  shopName: z.string().min(1, "Shop Name is required"),
  safetyIssue: z.string().min(1, "Safety Issue is required"),
  prodTarget: z.string().min(1, "Prod Target is required"),
  prodActual: z.string().min(1, "Prod Actual is required"),
  affectedDnTime: z.string().min(1, "Affected DN Time is required"),
  grossDnTime: z.string().min(1, "Gross DN Time is required"),
  majorBreakdown: z.string().min(1, "Major Breakdown is required"),
  employeeId: z.string().min(1, "Employee ID is required"),
  employeeName: z.string().min(1, "Employee Name is required"),
});
