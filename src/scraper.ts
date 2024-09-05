export const loadJob = async ({ id }: { id: string }) => {
  const response = await fetch(
    `https://www.upwork.com/ab/proposals/api/v4/check/~${id}?payload=1`
  );
  const job = await response.json();

  if (
    job.passed !== true &&
    job.payload?.jobDetails?.jobDetails === undefined
  ) {
    return null;
  }

  const details = job.payload.jobDetails.jobDetails;

  const title = details.opening?.job?.info?.title;
  const description = details.opening?.job?.description;

  return { title, description };
};
