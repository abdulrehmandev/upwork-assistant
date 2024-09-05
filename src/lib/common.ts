export const getJobId = (url: string) => {
  const regex = /job\/~([a-zA-Z0-9]+)\//;
  const match = url.match(regex);

  if (match && match[1]) {
    return match[1];
  } else {
    return null;
  }
};

export async function waitForTextArea(
  selector: string,
  timeout = 5000
): Promise<HTMLTextAreaElement> {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    function check() {
      const textArea: HTMLTextAreaElement | null =
        document.querySelector(selector);
      if (textArea) {
        resolve(textArea);
      } else if (Date.now() - startTime > timeout) {
        reject(new Error("Textarea not found within timeout"));
      } else {
        setTimeout(check, 100);
      }
    }

    check();
  });
}
