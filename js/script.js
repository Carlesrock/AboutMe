const fondo = document.querySelector(".container");

document.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;

    fondo.style.background = `
        radial-gradient(circle at ${x}px ${y}px,
        rgba(255,255,255,0.3),
        rgba(0,0,0,0.9))
    `;
});
