/* docReady() from https://github.com/jfriend00/docReady */
(function(funcName, baseObj) {
    funcName = funcName || "documentReady";
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;

    function ready() {
        if (!readyFired) {
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            readyList = [];
        }
    }

    function readyStateChange() {
        if ( document.readyState === "complete" ) {
            ready();
        }
    }

    /* docReady(fn, context); the context argument is optional */
    baseObj[funcName] = function(callback, context) {
        if (typeof callback !== "function") {
            throw new TypeError("callback for documentReady(fn) must be a function");
        }

        if (readyFired) {
            setTimeout(function() {callback(context);}, 1);
            return;
        } else {
            readyList.push({fn: callback, ctx: context});
        }
        if (document.readyState === "complete") {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", ready, false);
                window.addEventListener("load", ready, false);
            } else {
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    }
})("documentReady", window);

/* Utility function to calculate the current theme setting */
function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
    if (localStorageTheme !== null) {
        return localStorageTheme;
    }

    if (systemSettingDark.matches) {
        return "dark";
    }

    return "light";
}
   
/* Utility function to update the theme setting on the html tag */
function updateThemeOnHtmlEl({ theme }) {
    document.querySelector("html").setAttribute("data-theme", theme);
}
  
/* Utility function to update the button text and aria-label */
function updateButton({ buttonEl, isDark }) {
    const newCta = isDark ? "◑" : "◐";
    buttonEl.setAttribute("aria-label", newCta);
    buttonEl.innerText = newCta;
}


/* On page load: */
documentReady(function() {
    /* Grab what we need from the DOM and system settings on page load */
    const button = document.querySelector("[data-theme-toggle]");
    const localStorageTheme = localStorage.getItem("theme");
    const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
    const htmlElement = document.querySelector("html");
    htmlElement.setAttribute('data-theme','light');
    
    /* Work out the current site settings */
    let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });
    
    /* Update the theme setting and button text accoridng to current settings */
    updateButton({ buttonEl: button, isDark: currentThemeSetting === "dark" });
    updateThemeOnHtmlEl({ theme: currentThemeSetting });
    
    /** Add an event listener to toggle the theme through button */
    button.addEventListener("click", (event) => {
        event.preventDefault();
        const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
        localStorage.setItem("theme", newTheme);
        updateButton({ buttonEl: button, isDark: newTheme === "dark" });
        updateThemeOnHtmlEl({ theme: newTheme });
        currentThemeSetting = newTheme;
    }); 

    /** Add an event listener to toggle the theme key pressed combination */
    document.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.key == 't') {
            event.preventDefault();
            const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
            localStorage.setItem("theme", newTheme);
            updateButton({ buttonEl: button, isDark: newTheme === "dark" });
            updateThemeOnHtmlEl({ theme: newTheme });
            currentThemeSetting = newTheme;
        } 
    });
});