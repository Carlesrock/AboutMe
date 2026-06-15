const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#main-menu");
const revealItems = document.querySelectorAll(".reveal");
const interactiveCards = document.querySelectorAll(".timeline-item, .hobby-card");
const trackedSections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-center a[href^='#'], .nav-center a[href='aboutMe.html']");

const closeMenu = () => {
    if (!menuButton || !menu) return;

    menuButton.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
};

if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
        const isOpen = menuButton.getAttribute("aria-expanded") === "true";

        menuButton.setAttribute("aria-expanded", String(!isOpen));
        menu.classList.toggle("is-open", !isOpen);
        document.body.classList.toggle("menu-open", !isOpen);
    });

    menu.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            closeMenu();
        }
    });
}

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.18,
        rootMargin: "0px 0px -70px 0px"
    }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            navLinks.forEach((link) => link.classList.remove("active"));

            const activeLink = entry.target.id === "top"
                ? document.querySelector(".nav-center a[href='aboutMe.html']")
                : document.querySelector(`.nav-center a[href="#${entry.target.id}"]`);

            if (activeLink) {
                activeLink.classList.add("active");
            }
        });
    },
    {
        threshold: 0.55
    }
);

trackedSections.forEach((section) => sectionObserver.observe(section));

interactiveCards.forEach((card) => {
    card.addEventListener("pointerenter", () => card.classList.add("is-focused"));
    card.addEventListener("pointerleave", () => card.classList.remove("is-focused"));
    card.addEventListener("focusin", () => card.classList.add("is-focused"));
    card.addEventListener("focusout", () => card.classList.remove("is-focused"));
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});
