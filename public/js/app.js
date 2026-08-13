const themeToggleBtn = document.getElementById('theme-toggle');

// Swaps emoji based on current selection status
function updateToggleEmoji(activeTheme) {
    if (activeTheme === 'dark') {
        themeToggleBtn.innerHTML = '<i class="far fa-moon"></i>'; // Sun shows when mode is dark
    } else {
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>'; // Crescent moon shows when light
    }
}

// Check local storage setting memory on fresh page load 
const currentSystemTheme = localStorage.getItem('custom-site-theme') || 'light';
if (currentSystemTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
}
updateToggleEmoji(currentSystemTheme);

// Watch for manual click toggles
themeToggleBtn.addEventListener('click', () => {
    const currentActiveState = document.documentElement.getAttribute('data-theme');
    let targetedTheme = 'light';
    
    if (currentActiveState !== 'dark') {
        targetedTheme = 'dark';
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
    
    // Save selection parameter to system cache profile memory
    localStorage.setItem('custom-site-theme', targetedTheme);
    updateToggleEmoji(targetedTheme);
});

