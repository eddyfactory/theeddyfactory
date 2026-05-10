    /*
     * ═══════════════════════════════════════════════════════════════
     * EDDY FACTORY // FRONTEND LOGGER
     * ═══════════════════════════════════════════════════════════════
     */
    const Logger = {
      base: "font-family: 'JetBrains Mono', monospace; font-size: 11px; padding: 2px 4px; border-radius: 2px;",
      text: "color: #a89880; font-family: 'JetBrains Mono', monospace; font-size: 11px;",
      bold: "color: #fffbe6; font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: bold;",
      getTime: function() {
        const d = new Date();
        const pad = (n, l=2) => String(n).padStart(l, '0');
        return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${pad(d.getMilliseconds(), 3)}`;
      },
      boot: function() {
        console.log(`%c[${this.getTime()}]%c ==========================================\n` +
                    " THE EDDY FACTORY // LOVE OS INITIALIZED \n" +
                    "==========================================", 
                    this.text,
                    "color: #fffbe6; font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: bold; text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);");
      },
      system: function(msg) {
        console.log(`%c[${this.getTime()}]%c %c[SYSTEM]%c ${msg}`, 
          this.text, "", this.base + "background: #2255ff; color: #fff;", this.text);
      },
      audio: function(state) {
        const color = state === 'PLAYING' ? '#00cc66' : '#ff3355';
        console.log(`%c[${this.getTime()}]%c %c[AUDIO]%c Ambient subsystem state: %c${state}`, 
          this.text, "", this.base + "background: " + color + "; color: #020208; font-weight: bold;", this.text,
          "color: " + color + "; font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: bold;");
      },
      interaction: function(entity, action) {
        console.log(`%c[${this.getTime()}]%c %c[INTERACT]%c %c${entity}%c > ${action}`, 
          this.text, "", this.base + "background: #bb66ee; color: #fff;", this.text, this.bold, this.text);
      },
      click: function(targetInfo, textStr, x, y) {
        if (textStr) {
          console.log(`%c[${this.getTime()}]%c %c[CLICK]%c Element: %c${targetInfo}%c "%c${textStr}%c" at (X:${x}, Y:${y})`, 
            this.text, "", this.base + "background: #ffcc00; color: #020208; font-weight: bold;", this.text, this.bold, this.text, "color: #00cc66; font-style: italic;", this.text);
        } else {
          console.log(`%c[${this.getTime()}]%c %c[CLICK]%c Element: %c${targetInfo}%c at (X:${x}, Y:${y})`, 
            this.text, "", this.base + "background: #ffcc00; color: #020208; font-weight: bold;", this.text, this.bold, this.text);
        }
      },
      screen: function(screenNum, title) {
        console.log(`%c[${this.getTime()}]%c %c[SCREEN]%c Focus active in %cScreen ${screenNum} - ${title}`, 
          this.text, "", this.base + "background: #00cccc; color: #020208; font-weight: bold;", this.text, this.bold);
      },
      temporal: function(key, timeSpent, fullLedger) {
        console.groupCollapsed(`%c[${this.getTime()}]%c %c[TEMPORAL]%c Ledger Updated: %c+${(timeSpent/1000).toFixed(1)}s%c to ${key}`, 
          this.text, "", this.base + "background: #0088cc; color: #fff; font-weight: bold;", this.text, "color: #00cc66; font-weight: bold;", this.text);
        
        // Convert to seconds for a prettier table
        const displayLedger = {};
        for (const [k, v] of Object.entries(fullLedger)) {
          displayLedger[k] = { "Time (Seconds)": (v / 1000).toFixed(1) + "s" };
        }
        console.table(displayLedger);
        console.groupEnd();
      },
      telemetry: async function() {
        console.groupCollapsed(`%c[${this.getTime()}]%c %c[TELEMETRY]%c System & Connection Fingerprint`, 
          this.text, "", this.base + "background: #ff8800; color: #fff;", this.bold);
        
        // System & Display
        console.log(`%cOS/Platform:%c ${navigator.platform}`, this.text, this.bold);
        console.log(`%cCPU Cores:%c ${navigator.hardwareConcurrency || 'Unknown'}`, this.text, this.bold);
        console.log(`%cDevice Memory:%c ${navigator.deviceMemory ? navigator.deviceMemory + 'GB' : 'Unknown'}`, this.text, this.bold);
        console.log(`%cResolution:%c ${window.screen.width}x${window.screen.height} (PixelRatio: ${window.devicePixelRatio})`, this.text, this.bold);
        console.log(`%cLanguage:%c ${navigator.language}`, this.text, this.bold);
        
        // Session & Network
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        console.log(`%cTimezone:%c ${timezone}`, this.text, this.bold);
        
        if (navigator.connection) {
          console.log(`%cConnection Type:%c ${navigator.connection.effectiveType || 'Unknown'}`, this.text, this.bold);
        }
        
        const loadTime = window.performance && window.performance.timing 
            ? window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart 
            : 'Unknown';
        console.log(`%cDOM Load Time:%c ${loadTime}ms`, this.text, this.bold);

        // Fetch IP
        try {
          const res = await fetch('https://api.ipify.org?format=json');
          const data = await res.json();
          console.log(`%cPublic IP:%c ${data.ip}`, this.text, "color: #00cc66; font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: bold;");
        } catch(e) {
          console.log(`%cPublic IP:%c Fetch Blocked/Failed`, this.text, "color: #ff3355; font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: bold;");
        }
        
        console.groupEnd();
      }
    };
    
    // Fire boot sequence and telemetry
    Logger.boot();
    Logger.telemetry();

    // Global Click Logger (Using capturing phase to catch clicks before stopPropagation)
    document.addEventListener('click', function(e) {
      let target = e.target;
      let tag = target.tagName ? target.tagName.toLowerCase() : 'unknown';
      let id = target.id ? `#${target.id}` : '';
      let classes = '';
      
      if (typeof target.className === 'string' && target.className.trim()) {
        classes = `.${target.className.trim().replace(/\s+/g, '.')}`;
      } else if (target.className && target.className.baseVal) {
        // SVG elements use baseVal for className
        classes = `.${target.className.baseVal.trim().replace(/\s+/g, '.')}`;
      }

      let info = `${tag}${id}${classes}`;
      if (info.length > 50) info = info.substring(0, 47) + '...';
      
      let textStr = '';
      if (target.textContent && target.textContent.trim()) {
        textStr = target.textContent.trim().replace(/\s+/g, ' ');
      } else if (target.closest && target.closest('.entity-link')) {
        // If clicking a glowing dot, try to pull the text from its parent entity-link
        let textNode = target.closest('.entity-link').querySelector('text');
        if (textNode && textNode.textContent) {
          textStr = textNode.textContent.trim().replace(/\s+/g, ' ');
        }
      }
      
      if (textStr.length > 30) textStr = textStr.substring(0, 27) + '...';

      Logger.click(info, textStr, e.clientX, e.clientY);
    }, true);

    // Temporal Tracking & Mouse Rest Screen Logger
    let mouseRestTimer;
    let lastLoggedScreen = -1;
    let screenEntryTime = Date.now();
    let lastKnownScreenName = "TOP";
    
    // Initialize or retrieve ledger
    let eddyTemporalData = { "Screen_0_VERIFICATION": 0, "Screen_1_TOP": 0, "Screen_2_FRAMEWORK": 0, "Screen_3_ORGANISM": 0 };
    const savedTemporal = localStorage.getItem('eddyTemporalData');
    if (savedTemporal) {
      try { eddyTemporalData = JSON.parse(savedTemporal); } catch(e) {}
    }

    document.addEventListener('mousemove', function(e) {
      clearTimeout(mouseRestTimer);
      mouseRestTimer = setTimeout(function() {
        const humanModal = document.getElementById('humanModal');
        const frameworkSec = document.getElementById('screen-framework');
        const organismSec = document.getElementById('screen-organism');
        
        let screenNum = 1;
        let screenName = "TOP";
        
        if (humanModal && !humanModal.classList.contains('hidden')) {
          // If the verification modal is open, intercept the screen status
          screenNum = 0;
          screenName = "VERIFICATION";
        } else if (frameworkSec && organismSec) {
          // Determine region based on total page Y coordinates
          if (e.pageY >= organismSec.offsetTop) {
            screenNum = 3;
            screenName = "ORGANISM";
          } else if (e.pageY >= frameworkSec.offsetTop) {
            screenNum = 2;
            screenName = "FRAMEWORK";
          }
        }
        
        // Log whenever the mouse comes to rest in a new screen
        if (lastLoggedScreen !== screenNum) {
          // Record time spent in previous screen
          if (lastLoggedScreen !== -1) {
            const timeSpent = Date.now() - screenEntryTime;
            const key = `Screen_${lastLoggedScreen}_${lastKnownScreenName}`;
            
            if (eddyTemporalData[key] !== undefined) {
              eddyTemporalData[key] += timeSpent;
            } else {
              eddyTemporalData[key] = timeSpent;
            }
            localStorage.setItem('eddyTemporalData', JSON.stringify(eddyTemporalData));
            
            Logger.temporal(key, timeSpent, eddyTemporalData);
          }
          
          Logger.screen(screenNum, screenName);
          lastLoggedScreen = screenNum;
          lastKnownScreenName = screenName;
          screenEntryTime = Date.now(); // reset the stopwatch
        }
      }, 500); // Trigger after 500ms of no movement
    });

    /*
     * ═══════════════════════════════════════════════════════════════
     * AMBIENT AUDIO CONFIGURATION & JUKEBOX ALGORITHM
     * Change the URL below to swap the background audio file.
     * Use any publicly hosted .mp3, .ogg, or .wav URL.
     * Audio autoplays on first user interaction (browser policy
     * requires at least one click/scroll/keypress before playing).
     * ═══════════════════════════════════════════════════════════════
     */
    const JUKEBOX_TRACKS = [
      { file: './chaplin_funk.mp3', band: 'Unknown Band', song: 'Chaplin Funk', album: 'Unknown Album', publisher: 'Unknown Publisher', bandUrl: '#', publisherUrl: '#' },
      { file: './7.mp3', band: 'Unknown Band', song: '7', album: 'Unknown Album', publisher: 'Unknown Publisher', bandUrl: '#', publisherUrl: '#' },
      { file: './aint_got_no.mp3', band: 'Unknown Band', song: 'Ain\'t Got No', album: 'Unknown Album', publisher: 'Unknown Publisher', bandUrl: '#', publisherUrl: '#' },
      { file: './warm_foothills.mp3', band: 'Unknown Band', song: 'Warm Foothills', album: 'Unknown Album', publisher: 'Unknown Publisher', bandUrl: '#', publisherUrl: '#' },
      { file: './high_steppin.mp3', band: 'Unknown Band', song: 'High Steppin', album: 'Unknown Album', publisher: 'Unknown Publisher', bandUrl: '#', publisherUrl: '#' },
      { file: './dont_go_dark.mp3', band: 'Unknown Band', song: 'Don\'t Go Dark', album: 'Unknown Album', publisher: 'Unknown Publisher', bandUrl: '#', publisherUrl: '#' },
      { file: './life_in_a_northern_town.mp3', band: 'Unknown Band', song: 'Life in a Northern Town', album: 'Unknown Album', publisher: 'Unknown Publisher', bandUrl: '#', publisherUrl: '#' },
      { file: './heroes_reprise_version.mp3', band: 'Unknown Band', song: 'Heroes (Reprise Version)', album: 'Unknown Album', publisher: 'Unknown Publisher', bandUrl: '#', publisherUrl: '#' },
      { file: './the_man_comes_around.mp3', band: 'Unknown Band', song: 'The Man Comes Around', album: 'Unknown Album', publisher: 'Unknown Publisher', bandUrl: '#', publisherUrl: '#' },
      { file: './o-o-h_child.mp3', band: 'Unknown Band', song: 'O-o-h Child', album: 'Unknown Album', publisher: 'Unknown Publisher', bandUrl: '#', publisherUrl: '#' }
    ];

    const HOUR_TO_TRACK = {
      0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0,
      7: 1, 8: 0, 9: 2, 10: 0, 11: 3, 12: 0, 13: 4, 14: 0, 15: 5, 16: 0,
      17: 6, 18: 0, 19: 7, 20: 0, 21: 8, 22: 0, 23: 9
    };

    const currentHour = new Date().getUTCHours();
    const trackIndex = HOUR_TO_TRACK[currentHour];
    let currentJukeboxTrack = JUKEBOX_TRACKS[trackIndex];

    const ampm = currentHour >= 12 ? 'PM' : 'AM';
    const displayHour = currentHour % 12 === 0 ? 12 : currentHour % 12;
    const hourLabel = `${displayHour}:00 ${ampm}`;

    console.groupCollapsed(`%c[JUKEBOX]%c Now Playing: ${currentJukeboxTrack.song} by ${currentJukeboxTrack.band} (UTC Hour ${currentHour}, ${hourLabel})`, "background: #ff00ff; color: #fff; padding: 2px 4px; border-radius: 2px; font-weight: bold;", "");
    console.log(`%cUTC Hour:%c ${currentHour}`, "color: #a89880; font-weight: bold;", "");
    console.log(`%cArray Index:%c ${trackIndex}`, "color: #a89880; font-weight: bold;", "");
    console.table({
      "File": currentJukeboxTrack.file,
      "Song": currentJukeboxTrack.song,
      "Band": currentJukeboxTrack.band,
      "Album": currentJukeboxTrack.album,
      "Publisher": currentJukeboxTrack.publisher
    });
    console.groupEnd();

    /* ═══════════════════════════════════════════════════════════════ */

    var audio = new Audio(currentJukeboxTrack.file);
    audio.loop = true;
    audio.volume = 0.3;
    var silenced = false;
    var started = false;

    function startAudio() {
      if (started) return;
      audio.play().then(function () {
        started = true;
        Logger.audio('PLAYING');
      }).catch(function (e) {
        Logger.system('Audio playback rejected: ' + e.message);
      });
    }

    /* Audio strictly waits for the 'Are you human?' modal interaction now. */

    document.getElementById("audioBtn").addEventListener("click", function (e) {
      e.stopPropagation();
      if (!started) {
        startAudio();
        return;
      }
      if (silenced) {
        audio.play();
        silenced = false;
        this.textContent = "silence";
        Logger.audio('PLAYING');
      } else {
        audio.pause();
        silenced = true;
        this.textContent = "unsilence";
        Logger.audio('SILENCED');
      }
    });

    /* Human Modal Logic */
    document.querySelectorAll('#humanModal .human-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation(); // prevent document click listener from double firing
        Logger.system('Human verification confirmed. Bypassing browser sandbox.');
        startAudio();
        document.getElementById('humanModal').classList.add('hidden');
      });
    });

    /* Credits Modal Logic */
    document.getElementById('creditsBtn').addEventListener('click', function (e) {
      e.stopPropagation();
      Logger.system('Credits modal accessed.');
      
      // Populate metadata from the Jukebox
      document.getElementById('creditSong').textContent = currentJukeboxTrack.song;
      
      const bandLink = document.getElementById('creditBand');
      bandLink.textContent = currentJukeboxTrack.band;
      bandLink.href = currentJukeboxTrack.bandUrl;
      
      document.getElementById('creditAlbum').textContent = currentJukeboxTrack.album;
      
      const pubLink = document.getElementById('creditPublisher');
      pubLink.textContent = currentJukeboxTrack.publisher;
      pubLink.href = currentJukeboxTrack.publisherUrl;
      
      document.getElementById('creditsModal').classList.remove('hidden');
    });

    document.getElementById('closeCreditsBtn').addEventListener('click', function (e) {
      e.stopPropagation();
      document.getElementById('creditsModal').classList.add('hidden');
    });

    /* Entity Link Click/Tap Toggle Logic */
    document.querySelectorAll('.entity-link').forEach(function (link) {
      const entityName = link.querySelector('text').textContent;

      link.addEventListener('click', function (e) {
        e.preventDefault(); // Stop the page from jumping to top
        if (this.classList.contains('active')) {
          Logger.interaction(entityName, 'Orbit locked OFF');
          this.classList.remove('active');
          this.classList.add('cooldown');
          var self = this;
          setTimeout(function() {
            self.classList.remove('cooldown');
          }, 1000);
        } else {
          Logger.interaction(entityName, 'Orbit locked ON');
          this.classList.add('active');
          this.classList.remove('cooldown');
          this.classList.remove('fade-out');
        }
      });

      link.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
          this.classList.add('fade-out');
          var self = this;
          setTimeout(function() {
            self.classList.remove('fade-out');
          }, 300);
        }
      });
      
      link.addEventListener('mouseenter', function() {
        if (!this.classList.contains('active')) {
          Logger.interaction(entityName, 'Hover engaged');
        }
        this.classList.remove('fade-out');
      });
    });

    /* Action Panel Logic */
    const actionPanel = document.getElementById('actionPanel');
    const actionMessageLabel = document.getElementById('actionMessageLabel');
    const actionMoneyLabel = document.getElementById('actionMoneyLabel');
    const actionCloseBtn = document.getElementById('actionCloseBtn');
    const actionSaveBtn = document.getElementById('actionSaveBtn');
    const actionTrashBtn = document.getElementById('actionTrashBtn');
    const actionMessageInput = document.getElementById('actionMessageInput');
    
    let currentActionContext = '';

    document.querySelectorAll('.action-trigger').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const actionType = this.textContent.trim();
        currentActionContext = actionType;
        
        if (actionType === 'SHOW LOVE') {
          actionMessageLabel.textContent = 'MESSAGE OF LOVE';
          actionMoneyLabel.textContent = 'LOVE AS AWARENESS';
        } else if (actionType === 'INVEST USD') {
          actionMessageLabel.textContent = 'INVESTMENT MESSAGE';
          actionMoneyLabel.textContent = 'INVESTMENT AS MONEY';
        }
        
        if (actionPanel.classList.contains('hidden')) {
          actionPanel.classList.remove('hidden');
          Logger.interaction('ActionPanel', `Opened via ${actionType}`);
        } else {
          Logger.interaction('ActionPanel', `Switched context to ${actionType}`);
        }
      });
    });

    actionTrashBtn.addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.removeItem('eddyActionMessage');
      localStorage.removeItem('eddyActionContext');
      actionMessageInput.value = '';
      actionMessageInput.disabled = false;
      actionMessageInput.classList.remove('frozen');
      actionSaveBtn.textContent = 'SEND';
      actionSaveBtn.disabled = false;
      actionSaveBtn.style.opacity = '1';
      actionTrashBtn.disabled = true;
      Logger.interaction('ActionPanel', 'Message cleared and unfrozen');
    });

    actionCloseBtn.addEventListener('click', function(e) {
      e.preventDefault();
      actionPanel.classList.add('hidden');
      Logger.interaction('ActionPanel', 'Closed');
    });

    actionSaveBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const messageText = actionMessageInput.value.trim();
      
      // Easter Egg Check
      const easterEggMatch = messageText.match(/^Hour\s+(\d+)$/i);
      if (easterEggMatch) {
        const h = parseInt(easterEggMatch[1], 10);
        if (h >= 0 && h <= 23) {
          Logger.interaction('EasterEgg', `Jukebox Override Triggered: ${messageText}`);
          
          const trackIdx = HOUR_TO_TRACK[h];
          const track = JUKEBOX_TRACKS[trackIdx];
          
          console.groupCollapsed(`%c[JUKEBOX]%c Jukebox Override: Simulating UTC Hour ${h}`, "background: #ffaa00; color: #000; padding: 2px 4px; border-radius: 2px; font-weight: bold;", "");
          console.table(track);
          console.groupEnd();
          
          if (audio) {
            const wasPlaying = !audio.paused && started;
            audio.src = track.file;
            currentJukeboxTrack = track; // Update global state for Credits modal
            if (wasPlaying && !silenced) {
              audio.play();
            }
          }
        }
      }

      const payload = {
        context: currentActionContext,
        message: messageText,
        timestamp: new Date().toISOString()
      };
      
      console.log(`%c[${Logger.getTime()}]%c %c[SUBMIT]%c Payload: \n` + JSON.stringify(payload, null, 2), 
        Logger.text, "", Logger.base + "background: #22dd88; color: #020208; font-weight: bold;", Logger.text);
      
      if (messageText) {
        localStorage.setItem('eddyActionMessage', messageText);
        localStorage.setItem('eddyActionContext', currentActionContext);
        
        // Gray-over the message
        actionMessageInput.disabled = true;
        actionMessageInput.classList.add('frozen');
        actionSaveBtn.textContent = 'SENT';
        actionSaveBtn.disabled = true;
        actionSaveBtn.style.opacity = '0.5';
        actionTrashBtn.disabled = false;
        
        Logger.interaction('ActionPanel', 'Message frozen in carbonite');
      }
    });

    // Restore frozen state on load
    const savedMsg = localStorage.getItem('eddyActionMessage');
    const savedCtx = localStorage.getItem('eddyActionContext');
    if (savedMsg) {
      actionMessageInput.value = savedMsg;
      actionMessageInput.disabled = true;
      actionMessageInput.classList.add('frozen');
      actionSaveBtn.textContent = 'SENT';
      actionSaveBtn.disabled = true;
      actionSaveBtn.style.opacity = '0.5';
      actionTrashBtn.disabled = false;
      
      if (savedCtx) {
        currentActionContext = savedCtx;
        if (savedCtx === 'SHOW LOVE') {
          actionMessageLabel.textContent = 'MESSAGE OF LOVE';
          actionMoneyLabel.textContent = 'LOVE AS AWARENESS';
        } else if (savedCtx === 'INVEST USD') {
          actionMessageLabel.textContent = 'INVESTMENT MESSAGE';
          actionMoneyLabel.textContent = 'INVESTMENT AS MONEY';
        }
      }
    }

    const exitModal = document.getElementById('exitModal');
    const exitEmailInput = document.getElementById('exitEmailInput');
    const exitGoodbyeBtn = document.getElementById('exitGoodbyeBtn');
    let exitTargetUrl = '';

    document.querySelectorAll('.tier-link').forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        Logger.interaction('ActionPanel', `Clicked ${this.textContent.trim()} - Initiating Exit Sequence`);
        exitTargetUrl = this.href;
        exitModal.classList.remove('hidden');
      });
    });

    exitGoodbyeBtn.addEventListener('click', function() {
      const email = exitEmailInput.value.trim();
      if (email.length > 0) {
        // Basic validation: contains @, min 1 char before and after, contains dot
        if (email.includes('@') && email.includes('.') && email.length >= 5) {
          Logger.interaction('ExitModal', `Collected email: ${email}`);
          localStorage.setItem('eddyVisitorEmail', email);
        } else {
          Logger.interaction('ExitModal', 'Invalid email entered, proceeding anyway');
        }
      } else {
        Logger.interaction('ExitModal', 'No email entered, proceeding');
      }
      
      Logger.interaction('ExitModal', 'Departing to ' + exitTargetUrl + ' (New Tab)');
      window.open(exitTargetUrl, '_blank');
      exitModal.classList.add('hidden');
    });
  