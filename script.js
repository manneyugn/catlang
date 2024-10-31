const zeroRepresentation = "meo";
const oneRepresentation = "mеo";

function convertToBinary() {
  const normalText = document.getElementById("normalText").value;
  let binaryResult = "";

  for (let char of normalText) {
    const binaryChar = char.charCodeAt(0).toString(2).padStart(8, "0");
    for (let bit of binaryChar) {
      binaryResult += bit === "0" ? zeroRepresentation : oneRepresentation;
    }
    binaryResult += " ";
  }

  document.getElementById("result").innerText = binaryResult.trim();
  document.getElementById("result").style.display = "block";
  document.getElementById("copyButton").style.display = "block";
}

function convertToNormal() {
  const binaryInput = document.getElementById("binaryInput").value;
  const binaryChars = binaryInput.trim().split(" ");
  let normalText = "";

  for (let binaryChar of binaryChars) {
    let binaryString = "";
    for (let i = 0; i < binaryChar.length; i += zeroRepresentation.length) {
      const chunk = binaryChar.slice(i, i + zeroRepresentation.length);
      if (chunk === zeroRepresentation) {
        binaryString += "0";
      } else if (chunk === oneRepresentation) {
        binaryString += "1";
      }
    }
    // Chuyển đổi nhị phân về ký tự
    normalText += String.fromCharCode(parseInt(binaryString, 2));
  }

  document.getElementById("result").innerText = normalText;
  document.getElementById("result").style.display = "block";
  document.getElementById("copyButton").style.display = "block";
}

function copyResult() {
  const resultElement = document.getElementById("result");
  const resultText = resultElement.innerText;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(resultText)
      .then(() => {
        document.getElementById("notification").style.display = "block";
        setTimeout(() => {
          document.getElementById("notification").style.display = "none";
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  } else {
    // Fallback method for copying text
    const textArea = document.createElement("textarea");
    textArea.value = resultText;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      document.getElementById("notification").style.display = "block";
      setTimeout(() => {
        document.getElementById("notification").style.display = "none";
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
    document.body.removeChild(textArea);
  }
}

function showNotification() {
  const notification = document.getElementById("notification");
  notification.style.display = "block";
  setTimeout(() => {
    notification.style.display = "none";
  }, 2000);
}
