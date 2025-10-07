// Function to handle LinkedIn post generation
async function generatePost() {
  const topic = document.getElementById("topic").value;
  const length = document.getElementById("length").value;
  const language = document.getElementById("language").value;

  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = "Generating your LinkedIn post...";

  try {
    const response = await fetch("http://localhost:5000/generate-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic, length, language }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch response from backend");
    }

    const data = await response.json();
    const generatedText = data.text;

    // ✅ Use <br> for new lines and wrap long URLs nicely
    outputDiv.innerHTML = `
      <div style="
        white-space: pre-wrap; 
        word-wrap: break-word; 
        overflow-wrap: anywhere; 
        background-color: #f8fafc;
        padding: 1rem;
        border-radius: 0.5rem;
        border: 1px solid #d1d5db;
        font-family: 'Inter', sans-serif;
        line-height: 1.6;
      ">
        ${generatedText}
      </div>
    `;
  } catch (error) {
    console.error("Error:", error);
    outputDiv.innerHTML = `<span style="color: red;">Error generating post.</span>`;
  }
}

// Function to handle LinkedIn caption generation
async function generateCaption() {
  const company = document.getElementById("company").value;
  const completionDate = document.getElementById("completionDate").value;
  const certificateName = document.getElementById("certificateName").value;
  const issuedBy = document.getElementById("issuedBy").value;
  const skills = document.getElementById("skills").value;
  const hashtags = document.getElementById("hashtags").value;
  const certificateUrl = document.getElementById("certificateUrl").value;

  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = "Generating your LinkedIn caption...";

  try {
    const response = await fetch("http://localhost:5000/generate-caption", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company,
        completionDate,
        certificateName,
        issuedBy,
        skills,
        hashtags,
        certificateUrl,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch response from backend");
    }

    const data = await response.json();
    const generatedText = data.text;

    // ✅ Properly formatted output
    outputDiv.innerHTML = `
      <div style="
        white-space: pre-wrap; 
        word-wrap: break-word; 
        overflow-wrap: anywhere; 
        background-color: #f8fafc;
        padding: 1rem;
        border-radius: 0.5rem;
        border: 1px solid #d1d5db;
        font-family: 'Inter', sans-serif;
        line-height: 1.6;
      ">
        ${generatedText}
      </div>
    `;
  } catch (error) {
    console.error("Error:", error);
    outputDiv.innerHTML = `<span style="color: red;">Error generating caption.</span>`;
  }
}
