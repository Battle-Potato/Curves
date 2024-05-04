function startDrag(e, id) {
    e.preventDefault();

    const windowElement = document.getElementById(id);
    const offsetX = e.clientX - windowElement.getBoundingClientRect().left;
    const offsetY = e.clientY - windowElement.getBoundingClientRect().top;

    function dragMove(e) {
      let x = e.clientX - offsetX;
      let y = e.clientY - offsetY;

      // Ensure the window stays within the viewport bounds
      x = Math.max(0, Math.min(window.innerWidth - windowElement.clientWidth, x));
      y = Math.max(0, Math.min(window.innerHeight - windowElement.clientHeight, y));

      windowElement.style.left = `${x}px`;
      windowElement.style.top = `${y}px`;
    }

    function dragEnd() {
      document.removeEventListener('mousemove', dragMove);
      document.removeEventListener('mouseup', dragEnd);
    }

    document.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', dragEnd);

    // Bring the window to the front when dragging starts
    bringToFront(id);
}

function bringToFront(id) {
    const windowElement = document.getElementById(id);
    const windows = document.querySelectorAll('.window');
    let maxZIndex = 0;

    // Find the maximum z-index among all windows
    windows.forEach((win) => {
      const zIndex = parseInt(window.getComputedStyle(win).zIndex, 10);
      maxZIndex = Math.max(maxZIndex, zIndex);
    });

    // Set a higher z-index for the clicked window
    windowElement.style.zIndex = maxZIndex + 1;
}