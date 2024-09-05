import { getJobId, waitForTextArea } from "./lib/common";
import { createProposal } from "./openai";
import { loadJob } from "./scraper";

async function main() {
  if (window.location.href.includes("/apply/")) {
    const jobId = getJobId(window.location.href);

    if (!jobId) {
      return;
    }
    const job = await loadJob({ id: jobId });

    if (!job) {
      return;
    }

    const details = `"""
    Title: ${job.title}

    Description: ${job.description}
    """`;

    const proposal = await createProposal(details);

    const textarea = await waitForTextArea(
      'textarea[aria-labelledby="cover_letter_label"]'
    );

    if (textarea) {
      textarea.value = proposal;

      textarea.dispatchEvent(new Event("input", { bubbles: true }));
    }
  }
}

main();
