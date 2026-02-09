// Global input state manager for cross-browser keyboard handling
// This bypasses React Three Fiber's event handling issues

interface InputState {
    forward: boolean;
    left: boolean;
    right: boolean;
    lastTap: number;
}

// Create global input state accessible outside React
const globalInput: InputState = {
    forward: false,
    left: false,
    right: false,
    lastTap: 0,
};

// Export for use in Scene component
export const getInputState = () => globalInput;

// Key detection functions
const isForwardKey = (e: KeyboardEvent): boolean => {
    const code = e.code || '';
    const key = e.key || '';
    return (
        ['Space', 'ArrowUp', 'KeyW'].includes(code) ||
        [' ', 'ArrowUp', 'w', 'W'].includes(key) ||
        e.keyCode === 32 ||
        e.keyCode === 38 ||
        e.keyCode === 87
    );
};

const isLeftKey = (e: KeyboardEvent): boolean => {
    const code = e.code || '';
    const key = e.key || '';
    return (
        ['ArrowLeft', 'KeyA'].includes(code) ||
        ['ArrowLeft', 'a', 'A'].includes(key) ||
        e.keyCode === 37 ||
        e.keyCode === 65
    );
};

const isRightKey = (e: KeyboardEvent): boolean => {
    const code = e.code || '';
    const key = e.key || '';
    return (
        ['ArrowRight', 'KeyD'].includes(code) ||
        ['ArrowRight', 'd', 'D'].includes(key) ||
        e.keyCode === 39 ||
        e.keyCode === 68
    );
};

// Initialize global keyboard listeners immediately when module loads
const handleKeyDown = (e: KeyboardEvent) => {
    // Skip if user is typing in an input field
    const target = e.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
    }

    if (isForwardKey(e)) {
        e.preventDefault();
        e.stopPropagation();
        globalInput.forward = true;
        globalInput.lastTap = Date.now();
    }
    if (isLeftKey(e)) {
        e.preventDefault();
        e.stopPropagation();
        globalInput.left = true;
    }
    if (isRightKey(e)) {
        e.preventDefault();
        e.stopPropagation();
        globalInput.right = true;
    }
};

const handleKeyUp = (e: KeyboardEvent) => {
    if (isForwardKey(e)) {
        globalInput.forward = false;
    }
    if (isLeftKey(e)) {
        globalInput.left = false;
    }
    if (isRightKey(e)) {
        globalInput.right = false;
    }
};

// Attach listeners at module load time (before React even mounts)
if (typeof window !== 'undefined') {
    // Remove any existing listeners first (for HMR)
    window.removeEventListener('keydown', handleKeyDown, true);
    window.removeEventListener('keyup', handleKeyUp, true);

    // Add with capture phase to intercept before any other handler
    window.addEventListener('keydown', handleKeyDown, { capture: true, passive: false });
    window.addEventListener('keyup', handleKeyUp, { capture: true, passive: false });

    // Also listen at document level
    document.removeEventListener('keydown', handleKeyDown, true);
    document.removeEventListener('keyup', handleKeyUp, true);
    document.addEventListener('keydown', handleKeyDown, { capture: true, passive: false });
    document.addEventListener('keyup', handleKeyUp, { capture: true, passive: false });
}

export default globalInput;
