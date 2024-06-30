const contactForm = document.getElementById("contact-form");
const errorMessages = document.querySelectorAll(".error-message");

function showAnounce(event) {
  event.preventDefault();
  // Kiểm tra từng trường nhập liệu
  if (contactForm.checkValidity()) {
    // Nếu dữ liệu hợp lệ, hiển thị thông báo thành công
    alert("Bạn đã gửi liên hệ thành công. Chúng tôi sẽ sớm liên hệ với bạn");
    // Reset form
    contactForm.reset();
  } else {
    // Nếu dữ liệu không hợp lệ, hiển thị thông báo lỗi cho từng trường
    contactForm.querySelectorAll("input").forEach(function (input) {
      if (!input.checkValidity()) {
        const errorMessage = document.getElementById(input.name + "-error");
        errorMessage.style.display = "block";
      }
    });
  }
}

contactForm.addEventListener("submit", showAnounce);

contactForm.addEventListener("input", function () {
  contactForm.querySelectorAll("input").forEach(function (input) {
    const errorMessage = document.getElementById(input.name + "-error");
    if (input.checkValidity()) {
      errorMessage.style.display = "none";
    }
  });
});
