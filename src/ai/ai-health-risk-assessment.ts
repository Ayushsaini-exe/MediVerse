'use server';
/**
 * @fileOverview This file contains the AI health risk assessment flow.
 *
 * - assessHealthRisks - A function that takes user data and returns risk assessments for diabetes, heart health, and stress.
 * - HealthRiskAssessmentInput - The input type for the assessHealthRisks function.
 * - HealthRiskAssessmentOutput - The output type for the assessHealthRisks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HealthRiskAssessmentInputSchema = z.object({
  age: z.number().describe('The age of the user.'),
  gender: z.enum(['male', 'female']).describe('The gender of the user.'),
  heightCm: z.number().describe('The height of the user in centimeters.'),
  weightKg: z.number().describe('The weight of the user in kilograms.'),
  smoking: z.boolean().describe('Whether the user is a smoker.'),
  exerciseMinutesPerWeek: z
    .number()
    .describe('The number of minutes the user exercises per week.'),
  bloodPressureSystolic: z
    .number()
    .describe('The systolic blood pressure of the user.'),
  bloodPressureDiastolic: z
    .number()
    .describe('The diastolic blood pressure of the user.'),
  cholesterol: z.number().describe('The cholesterol level of the user.'),
  familyHistoryDiabetes: z
    .boolean()
    .describe('Whether the user has a family history of diabetes.'),
});
export type HealthRiskAssessmentInput = z.infer<
  typeof HealthRiskAssessmentInputSchema
>;

const HealthRiskAssessmentOutputSchema = z.object({
  diabetesRisk: z
    .string()
    .describe('The risk assessment for diabetes, as a string.'),
  heartHealthAssessment: z
    .string()
    .describe('The assessment of heart health, as a string.'),
  stressLevelAssessment: z
    .string()
    .describe('The assessment of stress levels, as a string.'),
});
export type HealthRiskAssessmentOutput = z.infer<
  typeof HealthRiskAssessmentOutputSchema
>;

export async function assessHealthRisks(
  input: HealthRiskAssessmentInput
): Promise<HealthRiskAssessmentOutput> {
  return assessHealthRisksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'healthRiskAssessmentPrompt',
  input: {schema: HealthRiskAssessmentInputSchema},
  output: {schema: HealthRiskAssessmentOutputSchema},
  prompt: `You are an AI health assistant. You will assess the user's health risks based on the data provided.

  Provide a risk assessment for diabetes.
  Provide an assessment of heart health.
  Provide an assessment of stress levels.

  Here is the user's data:
  Age: {{{age}}}
  Gender: {{{gender}}}
  Height (cm): {{{heightCm}}}
  Weight (kg): {{{weightKg}}}
  Smoking: {{{smoking}}}
  Exercise (minutes per week): {{{exerciseMinutesPerWeek}}}
  Systolic Blood Pressure: {{{bloodPressureSystolic}}}
  Diastolic Blood Pressure: {{{bloodPressureDiastolic}}}
  Cholesterol: {{{cholesterol}}}
  Family History of Diabetes: {{{familyHistoryDiabetes}}}
  `,
});

const assessHealthRisksFlow = ai.defineFlow(
  {
    name: 'assessHealthRisksFlow',
    inputSchema: HealthRiskAssessmentInputSchema,
    outputSchema: HealthRiskAssessmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
