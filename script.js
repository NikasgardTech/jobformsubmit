const form = document.getElementById('jobForm');
const result = document.getElementById('result');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Loading status
    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";
    result.style.opacity = "1";
    result.innerHTML = "Processing...";
    result.className = "";

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let res = await response.json();
            if (response.status == 200) {
                result.className = "success-msg";
                result.innerHTML = "✔ Successfully Sent! We will contact you soon.";
                form.reset();
            } else {
                result.className = "error-msg";
                result.innerHTML = res.message;
            }
        })
        .catch(error => {
            result.className = "error-msg";
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            submitBtn.disabled = false;
            submitBtn.innerText = "Apply Now";
            // Hide message after 5 seconds
            setTimeout(() => {
                result.style.transition = "opacity 0.5s";
                result.style.opacity = "0";
            }, 5000);
        });
});