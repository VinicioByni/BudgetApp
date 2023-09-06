import { tilesSmallScreenLayout, tilesWideScreenLayout, tablesSmallScreenLayout, tablesWideScreenLayout } from './Responsiveness.js';
// Initial Screen Size
window.addEventListener('DOMContentLoaded', checkInitialScreenSize);
function checkInitialScreenSize() {
    var width = window.innerWidth;
    window.removeEventListener('DOMContentLoaded', checkInitialScreenSize);
    return width;
}
if (checkInitialScreenSize() < 992) {
    tilesSmallScreenLayout();
    tablesSmallScreenLayout();
}
else {
    tilesWideScreenLayout();
    tablesWideScreenLayout();
}
//# sourceMappingURL=InitialScreenSize.js.map