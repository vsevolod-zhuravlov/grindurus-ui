(() => {
    "use strict";
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const container = document.querySelector(".animation");
    const logos = container.querySelectorAll(".animation__animated-logo");
    const centerX = container.offsetWidth / 2 - 40;
    const centerY = container.offsetHeight / 2.2;
    const scale = Math.min(centerX, centerY) * 2;
    const numLogos = logos.length;
    const angles = [];
    for (let i = 0; i < numLogos; i++) angles.push(i * (2 * Math.PI / numLogos));
    function calculatePosition(angle) {
        const x = scale * Math.cos(angle) * Math.sqrt(Math.cos(2 * angle));
        const y = scale * Math.sin(angle) * Math.sqrt(Math.cos(2 * angle));
        return {
            x: centerX + x,
            y: centerY + y
        };
    }
    function animate() {
        for (let i = 0; i < numLogos; i++) {
            const pos = calculatePosition(angles[i]);
            logos[i].style.left = pos.x + "px";
            logos[i].style.top = pos.y + "px";
            angles[i] += 5e-4;
        }
        requestAnimationFrame(animate);
    }
    animate();
    const tabsButtons = document.querySelectorAll(".tabs-buttons__button");
    const script_tabs = document.querySelectorAll(".tabs");
    function clearActive() {
        script_tabs.forEach((tab => {
            tab.classList.remove("active");
        }));
        tabsButtons.forEach((button => {
            button.classList.remove("active");
        }));
    }
    tabsButtons.forEach(((button, index) => {
        button.addEventListener("click", (() => {
            clearActive();
            button.classList.add("active");
            script_tabs[index].classList.add("active");
        }));
    }));
    document.querySelector(".marquee-container");
    const marqueeContent = document.querySelector(".marquee-content");
    const protocolElements = document.querySelectorAll(".integrated__protocol");
    let contentWidth = 0;
    protocolElements.forEach((element => {
        contentWidth += element.offsetWidth + parseInt(window.getComputedStyle(element).marginRight);
    }));
    marqueeContent.innerHTML += marqueeContent.innerHTML;
    marqueeContent.style.width = contentWidth * 2 + "px";
    marqueeContent.style.animation = `marquee ${contentWidth / 50}s linear infinite`;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `@keyframes marquee {\n0% { transform: translateX(0%); }\n100% { transform: translateX(-${contentWidth}px); }\n}`;
    document.head.appendChild(styleSheet);
    window["FLS"] = true;
})();