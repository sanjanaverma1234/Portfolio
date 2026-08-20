/* =====================================================
   SANJANA VERMA PORTFOLIO JAVASCRIPT
===================================================== */


/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

if (menuBtn && navbar) {

    menuBtn.addEventListener("click", () => {

        navbar.classList.toggle("show");

        const icon = menuBtn.querySelector("i");

        if (navbar.classList.contains("show")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

    });

}


/* ================= CLOSE MOBILE MENU ================= */

const navLinks = document.querySelectorAll(".navbar a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("show");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* ================= ACTIVE NAVIGATION ================= */

const sections = document.querySelectorAll("section");
const links = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }

    });

    links.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});


/* ================= CONTACT FORM ================= */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {

            formMessage.textContent = "Please fill all fields.";
            formMessage.style.color = "#ff6b6b";

            return;
        }

        const button = contactForm.querySelector("button");

        button.disabled = true;
        button.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> Sending...';

        try {

            const response = await fetch(
                "http://localhost:8081/api/contact",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        message: message
                    })
                }
            );

            if (response.ok) {

                formMessage.textContent =
                    "Message sent successfully!";

                formMessage.style.color = "#00cfff";

                contactForm.reset();

            } else {

                throw new Error("Server error");

            }

        } catch (error) {

            console.error(error);

            formMessage.textContent =
                "Backend is not connected. Please try again later.";

            formMessage.style.color = "#ff6b6b";

        }

        button.disabled = false;

        button.innerHTML =
            '<i class="fas fa-paper-plane"></i> Send Message';

    });

}


/* ================= SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(
    ".project-card, .skill-box, .certificate-card, .education-box, .about-content"
);

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.1
    }
);


revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    revealObserver.observe(element);

});


/* ================= YEAR ================= */

const currentYear = new Date().getFullYear();

const footerText = document.querySelector("footer p");

if (footerText) {

    footerText.innerHTML =
        `© ${currentYear} Sanjana Verma | All Rights Reserved`;

}