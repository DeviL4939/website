
// ==UserScript==
// @name         Pop up ui
// @namespace    http://tampermonkey.net/
// @version      1
// @description  gesture based popup
// @author       DeviL4939
// @match        *://*/*
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    
    // Function to add styles safely
    function addStyle(css) {
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }
    
    // Add custom fonts
    const fontImport = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');`;
    setTimeout(() => {
        // Add style after DOM is ready to avoid race conditions
        addStyle(fontImport);
    }, 0);

    // Add global styles
    addStyle(`
        #gesturePopup * {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
        }
        .secret-tabs-list::-webkit-scrollbar {
            width: 6px;
        }
        .secret-tabs-list::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 8px;
        }
        .secret-tabs-list::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 8px;
        }
        .secret-tabs-list::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.4);
        }
        .tab-btn {
            position: relative;
            overflow: hidden;
            transform: translate3d(0, 0, 0);
        }
        .tab-btn::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%);
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
            transition: opacity 0.5s, transform 0.5s;
        }
        .tab-btn:hover::after {
            opacity: 1;
            transform: translate(-50%, -50%) scale(2);
        }
        
        .favicon-container {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            background-color: rgba(255, 255, 255, 0.08);
            border-radius: 8px;
            margin-right: 12px;
            overflow: hidden;
        }
        .favicon-container img {
            width: 22px;
            height: 22px;
            object-fit: contain;
        }
    `);

    // ============ Gesture Detection System ============
    const gestureState = {
        lastPoint: { x: 0, y: 0 },
        directions: [],
        isTracking: false,
        gestureIndicator: null,
        timeoutId: null,
        lastEvent: null,
        startTime: 0,
        lastGestureTime: 0
    };

    // Configuration
    const GESTURE_TIMEOUT = 8000; // 8 seconds
    const MOVEMENT_THRESHOLD = 25; // Minimum movement distance
    const DIRECTION_CHANGE_DELAY = 100; // Minimum delay between direction changes
    
    // Removed gesture indicator functions

    function resetGesture() {
        gestureState.directions = [];
        gestureState.isTracking = false;
        if (gestureState.timeoutId) {
            clearTimeout(gestureState.timeoutId);
            gestureState.timeoutId = null;
        }
    }

    function startGestureTracking(event) {
        if (event.touches.length !== 1) return;
        
        const touch = event.touches[0];
        gestureState.lastPoint = { x: touch.clientX, y: touch.clientY };
        gestureState.directions = [];
        gestureState.isTracking = true;
        gestureState.startTime = Date.now();
        gestureState.lastEvent = Date.now();
        
        // Reset gesture after timeout
        if (gestureState.timeoutId) {
            clearTimeout(gestureState.timeoutId);
        }
        
        gestureState.timeoutId = setTimeout(() => {
            if (gestureState.directions.length > 0) {
                updateGestureIndicator("Gesture timeout");
            }
            resetGesture();
        }, GESTURE_TIMEOUT);
    }

    function trackGestureMovement(event) {
        if (!gestureState.isTracking || event.touches.length !== 1) return;
        
        const touch = event.touches[0];
        const currentPoint = { x: touch.clientX, y: touch.clientY };
        
        // Calculate distance and angle
        const dx = currentPoint.x - gestureState.lastPoint.x;
        const dy = currentPoint.y - gestureState.lastPoint.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Only process if significant movement and enough time passed since last direction change
        const now = Date.now();
        if (distance >= MOVEMENT_THRESHOLD && now - gestureState.lastEvent >= DIRECTION_CHANGE_DELAY) {
            const absX = Math.abs(dx);
            const absY = Math.abs(dy);
            
            // Check if movement is mostly vertical
            if (absY >= absX) {
                const direction = dy < 0 ? 'up' : 'down';
                
                // Only add if it's different from the last direction
                if (gestureState.directions.length === 0 || 
                    gestureState.directions[gestureState.directions.length - 1] !== direction) {
                    
                    gestureState.directions.push(direction);
                    gestureState.lastEvent = now;
                    
                    // Prevent default to stop scrolling when tracking gesture
                    event.preventDefault();
                    
                    // Check for up-down-up-down pattern
                    const pattern = gestureState.directions.join('');
                    if (pattern === 'updownupdown') {
                        // Prevent multiple rapid triggers
                        if (now - gestureState.lastGestureTime > 1500) { // Debounce period
                            gestureState.lastGestureTime = now;
                            showPopup();
                        }
                        resetGesture();
                    }
                }
            }
            
            // Update last point for next movement calculation
            gestureState.lastPoint = currentPoint;
        }
    }

    function endGestureTracking() {
        resetGesture();
    }

    // Predefined favicon map for sites
    const faviconMap = {
        'https://www.pornhub.com': 'https://ei.phncdn.com/www-static/favicon.ico',
        'https://www.pornhub.com/model/creamy-spot/videos?o=mr': 'https://ei.phncdn.com/www-static/favicon.ico',
        'https://www.pornhub.com/model/meehutao/videos?o=mr': 'https://ei.phncdn.com/www-static/favicon.ico',
        'https://www.pornhub.com/model/rosie-and-alena/videos?o=mr': 'https://ei.phncdn.com/www-static/favicon.ico',
        'https://www.pornhub.com/model/miss-tanuki-san/videos?o=mr': 'https://ei.phncdn.com/www-static/favicon.ico',
        'https://www.pornhub.com/model/jane-laneee/videos?o=mr': 'https://ei.phncdn.com/www-static/favicon.ico',
        'https://www.pornhub.com/model/ashmochi69/videos?o=mr': 'https://ei.phncdn.com/www-static/favicon.ico',
        'https://www.pornhub.com/model/eve/videos?o=mr': 'https://ei.phncdn.com/www-static/favicon.ico',
        'https://www.pornhub.com/model/leah-meow?o=mr': 'https://ei.phncdn.com/www-static/favicon.ico',
        'https://www.pornhub.com/model/spiritjoi?o=mr': 'https://ei.phncdn.com/www-static/favicon.ico'
    };
    
    // Get favicon for a URL with special handling for JS_UI site
    function getFaviconUrl(url) {
        // Special handling for JS_UI to get favicon from link tag
        if (url === 'https://devil4939.github.io/website/js_ui.html') {
            // Create a temporary fetch to get the favicon from the HTML's link tag
            return fetch(url)
                .then(response => response.text())
                .then(html => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    const linkTags = doc.querySelectorAll('link[rel*="icon"]');
                    
                    if (linkTags.length > 0) {
                        // Use the href from the first icon link tag
                        const iconHref = linkTags[0].href;
                        return iconHref;
                    }
                    
                    return 'https://devil4939.github.io/favicon.ico'; // Fallback
                })
                .catch(() => 'https://devil4939.github.io/favicon.ico'); // Fallback on error
        }
        
        // Return predefined favicon from our map
        if (faviconMap[url]) {
            return faviconMap[url];
        }
        
        // If not found in our map, use a default favicon
        return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTAgM0g2YTIgMiAwIDAgMC0yIDJ2MTRhMiAyIDAgMCAwIDIgMmgxMmEyIDIgMCAwIDAgMi0ydi00TTEwIDNhMiAyIDAgMCAxIDItMmg2bDQgNHY2YTIgMiAwIDAgMS0yIDJoLTMiLz48cGF0aCBkPSJNMTcgMjF2LThhMiAyIDAgMCAwLTItMkg5YTIgMiAwIDAgMC0yIDJ2OCI+PC9wYXRoPjwvc3ZnPg==';
    }

    function showPopup() {
        if (document.getElementById('gesturePopup')) return;

        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';

        const popupOverlay = document.createElement('div');
        popupOverlay.id = 'gesturePopup';
        Object.assign(popupOverlay.style, {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '10000',
            opacity: '0',
            transition: 'opacity 0.4s ease-in-out'
        });

        const popup = document.createElement('div');
        Object.assign(popup.style, {
            backgroundColor: 'rgba(8, 8, 10, 0.98)',
            width: '320px',
            maxHeight: '520px',
            borderRadius: '24px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(255, 255, 255, 0.06)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            position: 'relative',
            transform: 'scale(0.95) translateY(20px)',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
        });

        // Header
        const header = document.createElement('div');
        Object.assign(header.style, {
            background: 'linear-gradient(135deg, rgba(15, 15, 20, 0.97) 0%, rgba(10, 10, 15, 0.97) 100%)',
            padding: '24px 20px',
            position: 'relative',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            textAlign: 'center'
        });

        const title = document.createElement('h2');
        Object.assign(title.style, {
            color: '#FFF',
            fontSize: '22px',
            fontWeight: '600',
            margin: '0',
            letterSpacing: '0.5px',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
        });
        title.textContent = 'Secret Tabs';

        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        Object.assign(closeBtn.style, {
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255, 255, 255, 0.05)',
            border: 'none',
            color: '#FFF',
            opacity: '0.8',
            cursor: 'pointer',
            padding: '10px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        });

        closeBtn.onmouseover = () => {
            closeBtn.style.opacity = '1';
            closeBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
            closeBtn.style.transform = 'translateY(-50%) scale(1.1)';
        };
        closeBtn.onmouseleave = () => {
            closeBtn.style.opacity = '0.8';
            closeBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            closeBtn.style.transform = 'translateY(-50%) scale(1)';
        };

        const buttonList = document.createElement('div');
        Object.assign(buttonList.style, {
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: '16px',
            maxHeight: '420px'
        });
        buttonList.className = 'secret-tabs-list';

       // buttons

        buttons.forEach(({label, url}) => {
            const btn = document.createElement('button');
            btn.className = 'tab-btn';
            Object.assign(btn.style, {
                width: '100%',
                padding: '14px 16px',
                margin: '6px 0',
                border: '1px solid rgba(255, 255, 255, 0.04)',
                background: 'rgba(255, 255, 255, 0.01)',
                color: '#FFF',
                fontSize: '16px',
                cursor: 'pointer',
                borderRadius: '12px',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                textAlign: 'left',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                fontWeight: '500'
            });

            // Create favicon container
            const iconContainer = document.createElement('div');
            iconContainer.className = 'favicon-container';
            
            // Create and add favicon image
            const favicon = document.createElement('img');
            
            if (url === 'https://devil4939.github.io/website/js_ui.html') {
                // Special handling for JS_UI to get favicon from link tag
                fetch(url)
                    .then(response => response.text())
                    .then(html => {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(html, 'text/html');
                        const linkTags = doc.querySelectorAll('link[rel*="icon"]');
                        
                        if (linkTags.length > 0) {
                            favicon.src = linkTags[0].href;
                        } else {
                            favicon.src = 'https://devil4939.github.io/favicon.ico';
                        }
                    })
                    .catch(() => {
                        favicon.src = 'https://devil4939.github.io/favicon.ico';
                    });
            } else {
                favicon.src = getFaviconUrl(url);
            }
            
            favicon.alt = '';
            favicon.onerror = () => {
                // Use fallback icon if favicon fails to load
                favicon.style.display = 'none';
                iconContainer.textContent = label.charAt(0);
            };
            
            iconContainer.appendChild(favicon);
            
            // Text container
            const textSpan = document.createElement('span');
            textSpan.textContent = label;
            
            btn.appendChild(iconContainer);
            btn.appendChild(textSpan);

            // Add hover and active states
            btn.onmouseover = () => {
                btn.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                btn.style.transform = 'translateY(-2px)';
                btn.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.4)';
            };
            btn.onmouseleave = () => {
                btn.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                btn.style.transform = 'none';
                btn.style.boxShadow = 'none';
            };
            btn.onmousedown = () => {
                btn.style.transform = 'translateY(1px)';
            };
            btn.onclick = () => window.location.href = url;
            buttonList.appendChild(btn);
        });

        header.appendChild(title);
        header.appendChild(closeBtn);
        popup.appendChild(header);
        popup.appendChild(buttonList);
        popupOverlay.appendChild(popup);
        document.body.appendChild(popupOverlay);

        requestAnimationFrame(() => {
            popupOverlay.style.opacity = '1';
            popup.style.transform = 'scale(1) translateY(0)';
        });

        closeBtn.onclick = hidePopup;
        popupOverlay.onclick = hidePopup;
        popup.onclick = e => e.stopPropagation();
        document.addEventListener('keydown', e => e.key === 'Escape' && hidePopup());
    }

    function hidePopup() {
        const overlay = document.getElementById('gesturePopup');
        if (overlay) {
            const popup = overlay.querySelector('div');
            overlay.style.opacity = '0';
            popup.style.transform = 'scale(0.95) translateY(20px)';
            setTimeout(() => {
                document.documentElement.style.overflow = 'auto';
                document.body.style.overflow = 'auto';
                document.body.style.height = 'auto';
                overlay.remove();
            }, 300);
        }
    }

    // Add event listeners
    document.addEventListener('touchstart', startGestureTracking, { passive: true });
    document.addEventListener('touchmove', trackGestureMovement, { passive: false });
    document.addEventListener('touchend', endGestureTracking, { passive: true });
    document.addEventListener('touchcancel', endGestureTracking, { passive: true });

    // Cleanup event listeners on page unload
    window.addEventListener('unload', () => {
        hidePopup();
        document.removeEventListener('touchstart', startGestureTracking);
        document.removeEventListener('touchmove', trackGestureMovement);
        document.removeEventListener('touchend', endGestureTracking);
        document.removeEventListener('touchcancel', endGestureTracking);
        
        if (gestureState.timeoutId) {
            clearTimeout(gestureState.timeoutId);
        }
    });
})();
