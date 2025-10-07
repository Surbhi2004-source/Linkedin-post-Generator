// Generate Post
function generatePost(): void {
  const topic = (document.getElementById("topic") as HTMLSelectElement).value;
  const length = (document.getElementById("length") as HTMLSelectElement).value;
  const language = (document.getElementById("language") as HTMLSelectElement).value;

  const text = `Generated LinkedIn Post → Topic: ${topic}, Length: ${length}, Language: ${language}.`;
  (document.getElementById("postText") as HTMLElement).innerText = text;
  (document.getElementById("postOutput") as HTMLElement).classList.remove("hidden");
}

// Generate Caption
function generateCaption(): void {
  const company = (document.getElementById("company") as HTMLInputElement).value;
  const date = (document.getElementById("date") as HTMLInputElement).value;
  const certName = (document.getElementById("certName") as HTMLInputElement).value;
  const issuedBy = (document.getElementById("issuedBy") as HTMLInputElement).value;
  const skills = (document.getElementById("skills") as HTMLInputElement).value;
  const hashtags = (document.getElementById("hashtags") as HTMLInputElement).value;
  const url = (document.getElementById("url") as HTMLInputElement).value;

  const caption = `Excited to share that I completed "${certName}" from ${company}, issued by ${issuedBy} on ${date}.
Skills: ${skills}.
${hashtags}
Check it here: ${url}`;

  (document.getElementById("captionText") as HTMLElement).innerText = caption;
  (document.getElementById("copyCaptionBtn") as HTMLElement).classList.remove("hidden");
}

// Copy Function
function copyText(id: string): void {
  const text = (document.getElementById(id) as HTMLElement).innerText;
  navigator.clipboard.writeText(text);
  alert("Copied to clipboard!");
}

// Expose functions globally
(window as any).generatePost = generatePost;
(window as any).generateCaption = generateCaption;
(window as any).copyText = copyText;
