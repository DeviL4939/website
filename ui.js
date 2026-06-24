(function() {
   if (typeof document === 'undefined') return;

   // ====== Data (at the top for easy editing) ======  
   const mainButtons = [{
         label: 'Js_UI',
         url: 'https://devil4939.github.io/website/js_ui.html'
      },
      {
         label: 'Pornhub',
         url: 'https://www.pornhub.com'
      },
      {
         label: 'SimpTown',
         url: 'https://simptown.su'
      },
      {
         label: 'CreamySpot',
         url: 'https://www.pornhub.com/model/creamy-spot/videos?o=mr'
      },
      {
         label: 'YourShyCrush',
         url: 'https://www.pornhub.org/model/yourshycrush'
      },
      {
         label: 'LiiMewls',
         url: 'https://www.pornhub.com/model/liimewls/videos'
      },

      {
         label: 'ThePerfectStorm14',
         url: 'https://www.pornhub.org/model/theperfectstorm14'
      },
      {
         label: 'WowMarie',
         url: 'https://www.pornhub.com/model/wowmarie/videos'
      },
      {
         label: 'MeeHutao',
         url: 'https://www.pornhub.com/model/meehutao/videos?o=mr'
      },
      {
         label: 'Rosie and Alena',
         url: 'https://www.pornhub.com/model/rosie-and-alena/videos?o=mr'
      },
      {
         label: '20Lesbian25',
         url: 'https://www.pornhub.com/model/20lesbian25'
      },
      {
         label: 'Jane Laneee',
         url: 'https://www.pornhub.com/model/jane-laneee/videos?o=mr'
      },
      {
         label: 'Lane217',
         url: 'https://www.pornhub.com/model/lane217/videos?o=mr'
      },
      {
         label: 'AshMochi69',
         url: 'https://www.pornhub.com/model/ashmochi69/videos?o=mr'
      },
      {
         label: 'Eve',
         url: 'https://www.pornhub.com/model/eve/videos?o=mr'
      },
      {
         label: 'Leah Meow',
         url: 'https://www.pornhub.com/model/leah-meow?o=mr'
      },
      {
         label: 'SpiritJOI',
         url: 'https://www.pornhub.com/model/spiritjoi?o=mr'
      }
   ]

   const altButtons = [

      {
         label: 'Hazelnut Latte',
         url: 'https://radlord.itch.io/hazelnut-latte'
      },

      {
         label: 'Midnight Shifts with Femboy',
         url: 'https://icanfixthatgames.itch.io/midnight-shifts-with-femboy'
      },

      {
         label: 'Haunted by Femboy',
         url: 'https://nuteku.itch.io/haunted-by-femboy'
      },

      {
         label: 'Femboy Futa House',
         url: 'https://tophouse.itch.io/femboy-futa-house'
      },

      {
         label: 'Honey Kingdom',
         url: 'https://phantomzz-7.itch.io/honey-kingdom'
      },

      {
         label: 'Bunkered With Femboy',
         url: 'https://pinktwilight.itch.io/bunkered-with-femboy'
      },

      {
         label: 'LockDownDom',
         url: 'https://down-bad-smut-games.itch.io/lockdown-dom-improved'
      },

      {
         label: 'Space Rescue Code Pink',
         url: 'https://moonfishgames.itch.io/spacerescuecodepink'
      },

      {
         label: 'Another Chance',
         url: 'https://timewizardstudios.itch.io/anotherchance'
      }
   ]

   const footerButtons = [{
         label: 'Kemono',
         url: 'https://kemono.cr/account/favorites/artists'
      },
      {
         label: 'PH',
         url: 'https://www.pornhub.com'
      },
      {
         label: 'Coomer',
         url: 'https://coomer.st/account/favorites/artists'
      },
      {
         label: 'Rule34',
         url: 'https://rule34.xxx/index.php?page=post&s=list&tags=+%28+yuri+%7e+futa_on_female+%7e+solo_female+%7e+lesbian+%29+animated+-male+sound&pid=0'
      }
   ]

   // ====== CSS Injection ======  
   if (!document.getElementById('cg-popup-styles')) {
      const style = document.createElement('style');
      style.id = 'cg-popup-styles';
      style.textContent = `  
    .cg-popup-overlay {  
    position: fixed; inset: 0;  
    display: flex; align-items: center; justify-content: center;  
    background: rgba(0,0,0,0.75);  
    z-index: 2147483647;  
    }  
    .cg-popup {  
    position: relative;  
    background: #0e0e0e;  
    border-radius: 10px;  
    width: 300px;  
    max-width: 92vw;  
    max-height: 60vh;  
    color: #EEE;  
    box-shadow: 0 6px 18px rgba(0,0,0,.7);  
    overflow: hidden;  
    font-family: Arial, Helvetica, sans-serif;  
    display: flex;  
    flex-direction: column;  
    }  
    .cg-header {  
    position: relative;  
    padding: 10px 14px;  
    background: #151515;  
    border-bottom: 1px solid #222;  
    display: flex;  
    align-items: center;  
    justify-content: flex-end;  
    }  
    .cg-title {  
    position: absolute;  
    left: 50%;  
    transform: translateX(-50%);  
    margin: 0;  
    font-size: 17px;  
    color: #FFF;  
    font-weight: 500;  
    text-align: center;  
    pointer-events: none;  
    }  
    .cg-close-btn {  
    background: none; border: none;  
    color: #AAA; font-size: 18px;  
    cursor: pointer;  
    }  
    .cg-close-btn:hover { color: #FFF; }  
    .cg-list {  
    flex: 1;  
    padding: 10px 12px;  
    overflow-y: auto;  
    }  
    .cg-main-btn {  
    width: 100%;  
    padding: 9px;  
    margin: 5px 0;  
    border: none;  
    border-radius: 6px;  
    background: #222;  
    color: #EEE;  
    text-align: left;  
    font-size: 14px;  
    cursor: pointer;  
    transition: background .15s, transform .12s;  
    }  
    .cg-main-btn:hover { background: #333; transform: translateY(-1px); }  
    .cg-footer {  
    position: relative;  
    padding: 8px 14px;  
    background: #151515;  
    border-top: 1px solid #222;  
    display: flex;  
    justify-content: center;  
    align-items: center;  
    gap: 10px;  
    }  
    .cg-footer-btn {  
    width: 36px;  
    height: 36px;  
    border: none;  
    border-radius: 8px;  
    background: #222;  
    cursor: pointer;  
    display: flex;  
    align-items: center;  
    justify-content: center;  
    transition: background .12s, transform .12s;  
    font-size: 18px;  
    color: white;  
    }  
    .cg-footer-btn:hover { background: #333; transform: translateY(-1px); }  
    `;
      document.head.appendChild(style);
   }

   let scrollY = 0;
   let currentList = 'main';

   // ====== Helper for long press ======  
   function addLongPress(btn, url) {
      let timer;
      const duration = 500;

      function handleLongPress() {
         window.open(url, '_blank');
      }
      btn.addEventListener('touchstart', () => {
         timer = setTimeout(handleLongPress, duration);
      });
      btn.addEventListener('touchend', () => clearTimeout(timer));
      btn.addEventListener('touchcancel', () => clearTimeout(timer));
   }

   // ====== Popup functions ======  
   function openPopup() {
      if (document.getElementById('cg-popup-overlay')) return;

      scrollY = window.scrollY || 0;
      document.body.style.overflow = 'hidden';

      const overlay = document.createElement('div');
      overlay.id = 'cg-popup-overlay';
      overlay.className = 'cg-popup-overlay';

      const popup = document.createElement('div');
      popup.className = 'cg-popup';

      // Header  
      const header = document.createElement('div');
      header.className = 'cg-header';
      const title = document.createElement('h2');
      title.className = 'cg-title';
      title.textContent = 'Secret Tabs';
      const closeBtn = document.createElement('button');
      closeBtn.className = 'cg-close-btn';
      closeBtn.textContent = '✕';
      closeBtn.onclick = closePopup;
      header.appendChild(title);
      header.appendChild(closeBtn);

      // List  
      const list = document.createElement('div');
      list.className = 'cg-list';

      function renderList(items, newTitle) {
         list.innerHTML = '';
         if (newTitle) title.textContent = newTitle;
         items.forEach(item => {
            const btn = document.createElement('button');
            btn.className = 'cg-main-btn';
            btn.textContent = item.label;
            btn.onclick = () => window.location.href = item.url;
            addLongPress(btn, item.url);
            list.appendChild(btn);
         });
      }

      // initial render  
      renderList(mainButtons, 'Secret Tabs');

      // Footer  
      const footer = document.createElement('div');
      footer.className = 'cg-footer';

      // Switch button (bottom-left)  
      const switchBtn = document.createElement('button');
      switchBtn.className = 'cg-footer-btn';
      switchBtn.style.position = 'absolute';
      switchBtn.style.left = '14px';
      switchBtn.style.bottom = '8px';
      switchBtn.textContent = '⇆';
      switchBtn.onclick = () => {
         if (currentList === 'main') {
            renderList(altButtons, 'Itch IO');
            currentList = 'alt';
         } else {
            renderList(mainButtons, 'Secret Tabs');
            currentList = 'main';
         }
      };
      footer.appendChild(switchBtn);

      // Footer link buttons (centered)  
      footerButtons.slice(0, 4).forEach(item => {
         const fb = document.createElement('button');
         fb.className = 'cg-footer-btn';
         fb.textContent = item.label.charAt(0);
         fb.onclick = () => window.location.href = item.url;
         addLongPress(fb, item.url);
         footer.appendChild(fb);
      });

      popup.appendChild(header);
      popup.appendChild(list);
      popup.appendChild(footer);
      overlay.appendChild(popup);
      document.body.appendChild(overlay);

      overlay.onclick = closePopup;
      popup.onclick = e => e.stopPropagation();
      document.addEventListener('keydown', escClose);
   }

   function closePopup() {
      const overlay = document.getElementById('cg-popup-overlay');
      if (overlay) overlay.remove();
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
      document.removeEventListener('keydown', escClose);
   }

   function escClose(e) {
      if (e.key === 'Escape') closePopup();
   }

   window.openPopup = openPopup;
   window.closePopup = closePopup;

   // Auto-open  
   openPopup();

})();