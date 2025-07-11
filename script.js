let shareClicks = 0;
const maxShares = 5;
const shareBtn = document.getElementById("shareBtn");
const shareCount = document.getElementById("shareCount");
const shareMsg = document.getElementById("shareMsg");
const form = document.getElementById("registrationForm");
const thankYou = document.getElementById("thankYou");
const submitBtn = document.getElementById("submitBtn");

const submitted = localStorage.getItem("submitted");
if (submitted === "true") {
  form.classList.add("hidden");
  thankYou.classList.remove("hidden");
}

shareBtn.addEventListener("click", () => {
  if (shareClicks < maxShares) {
    shareClicks++;
    shareCount.innerText = `Click count: ${shareClicks}/5`;

    const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community!");
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, '_blank');

    if (shareClicks === maxShares) {
      shareMsg.classList.remove("hidden");
    }
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (shareClicks < maxShares) {
    alert("Please complete sharing 5 times before submitting!");
    return;
  }

  submitBtn.disabled = true;

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const college = document.getElementById("college").value;
  const file = document.getElementById("screenshot").files[0];

  const reader = new FileReader();
  reader.onload = async function () {
    const base64 = reader.result.split(',')[1];

    const formData = {
      name,
      phone,
      email,
      college,
      fileName: file.name,
      fileData: base64,
    };

    const response = await fetch('https://script.google.com/macros/s/AKfycbwqMumob5q0ARRkj4cmH2krotiRGKpNAT65GS5s5XDtbb2luNMkYayEe6vAvNXlgdr1/exec', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
    "Content-Type": "application/json"
    },
    });

    if (response.ok) {
      localStorage.setItem("submitted", "true");
      form.classList.add("hidden");
      thankYou.classList.remove("hidden");
    } else {
      alert("Error submitting form. Please try again.");
      submitBtn.disabled = false;
    }
  };

  reader.readAsDataURL(file);
});
