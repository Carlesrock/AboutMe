const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#main-menu");
const revealItems = document.querySelectorAll(".reveal");

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

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});
