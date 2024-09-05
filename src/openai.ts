import OpenAI from "openai";
import { ProposalTemplate } from "./lib/constant";

export async function createProposal(jobDetails: string) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const prompt = `Write a proposal for the following job, the proposal template looks like:
  Template:
${ProposalTemplate}

JOB:
  ${jobDetails}`;

  const response = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt,
    max_tokens: 500,
    temperature: 0.7,
  });
  return response.choices[0].text;
}
