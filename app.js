function refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }
}

refreshIcons();

// 1. Live Islamabad (PKT) Clock
function updateIslamabadClock() {
    const clockEl = document.getElementById('live-clock');
    if (!clockEl) return;
    try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat('en-US', {
            timeZone: 'Asia/Karachi',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).format(now);
        clockEl.textContent = `${formatted} PKT`;
    } catch (e) {
        clockEl.textContent = 'PKT (UTC+5)';
    }
}
updateIslamabadClock();
setInterval(updateIslamabadClock, 15000);

// 2. Tactile Cursor Spotlight Tracking
document.querySelectorAll('.spotlight-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// 3. Project Case Study Data & Modal Logic
const caseStudies = {
    taskflow: {
        category: '01 / FULL-STACK APPLICATION ARCHITECTURE',
        title: 'TaskFlow Full-Stack',
        context: 'Teams managing multi-stage engineering tasks often lose momentum in bloated project trackers. TaskFlow was engineered as a low-latency, distraction-free studio workspace combining real-time task state filtering with relational persistence.',
        architecture: 'Decoupled single-page React frontend communicating via RESTful JSON endpoints with a Django REST Framework backend backed by a normalized PostgreSQL database.',
        highlights: [
            'Engineered custom DRF ViewSets and serializers with clean status filtering, priority indexing, and deterministic API routing.',
            'Designed a dark studio UI featuring a live metrics strip, instant status toggles, and zero-reload state transitions.',
            'Structured environment isolation across Python virtual environments and Vite build workflows for clean local and cloud deployment.'
        ],
        tags: ['React', 'Vite', 'Django REST Framework', 'Python', 'PostgreSQL'],
        role: 'Full-Stack Architecture & Implementation',
        repoUrl: 'https://github.com/junaidmusharraf/taskflow-fullstack'
    },
    nexus: {
        category: '02 / OPERATIONS & RESOURCE SUITE · GITHUB',
        title: 'Nexus Management Suite',
        context: 'Coordinating operational workflows, resource allocations, and project milestones across fragmented spreadsheets creates visibility gaps. Nexus Management Suite was built to centralize structured operational tracking.',
        architecture: 'Modular full-stack web architecture combining a responsive client interface with structured REST API endpoints and relational database persistence.',
        highlights: [
            'Designed unified dashboards and CRUD workflows for managing organizational records, task pipelines, and status lifecycles.',
            'Structured clean API contracts and modular frontend components to keep state predictable as data volume scales.',
            'Engineered with maintainability and clear separation of concerns across data, business logic, and UI layers.'
        ],
        tags: ['Full-Stack', 'JavaScript / React', 'REST APIs', 'Relational Database'],
        role: 'Full-Stack Developer',
        repoUrl: 'https://github.com/junaidmusharraf/nexus-management-suite'
    },
    spotify: {
        category: '03 / WEB API INTEGRATION · MUSIC DISCOVERY',
        title: 'Spotify Album Finder',
        context: 'Browsing an artist’s complete catalog and release metadata quickly requires low-latency search and clean visual organization without clutter.',
        architecture: 'Client-side web application authenticating against the Spotify Web API to query artist endpoints, resolve discography catalogs, and render high-resolution album artwork and release details.',
        highlights: [
            'Implemented OAuth token handling and asynchronous API queries against Spotify’s Search and Artist Albums endpoints.',
            'Built responsive album grids displaying release dates, track counts, cover art, and direct Spotify playback links.',
            'Handled empty states, rate-limit resilience, and instant search ergonomics for smooth browsing.'
        ],
        tags: ['React', 'JavaScript (ES6+)', 'Spotify Web API', 'REST / OAuth'],
        role: 'Frontend & API Integration',
        repoUrl: 'https://github.com/junaidmusharraf/Spotify-album-finder'
    },
    sound: {
        category: '04 / COMPUTER SCIENCE CAPSTONE · FUI',
        title: 'AI-Enhanced Wireless Sound System',
        context: 'Conventional wireless audio setups rely on manual device interaction for playback control and environment adaptation. This final-year Computer Science capstone explored hands-free, voice-driven audio management.',
        architecture: 'Embedded Python audio processing pipeline pairing real-time speech command recognition with low-latency wireless audio routing and state feedback.',
        highlights: [
            'Implemented voice-intent parsing to execute playback, volume, and source-switching commands without physical device touch.',
            'Integrated hardware-software communication layers for responsive acoustic control and minimal command latency.',
            'Delivered full system documentation, architecture diagrams, and live hardware demonstration.'
        ],
        tags: ['Python', 'Android Studio', 'Speech Recognition', 'Embedded Systems', 'Wireless Audio'],
        role: 'Lead Developer · BSCS Final-Year Project',
        repoUrl: null
    },
    metro: {
        category: '05 / PROJECT MANAGEMENT CASE STUDY · MS-PM',
        title: 'Islamabad Metro Bus Rapid Transit Organizational Analysis',
        context: 'Large-scale urban transit infrastructure depends on clear lines of authority and rapid inter-departmental escalation. This graduate study analyzed operational bottlenecks across the Islamabad Metro BRT network.',
        architecture: 'Organizational governance framework combining functional hierarchy mapping, cross-unit RACI responsibility matrices, and structured conflict-resolution protocols.',
        highlights: [
            'Constructed detailed RACI matrices clarifying Responsible, Accountable, Consulted, and Informed roles across operations, maintenance, and vendor teams.',
            'Identified structural authority overlaps and proposed streamlined escalation paths to reduce operational response latency.',
            'Applied formal project management conflict-resolution frameworks to real-world public infrastructure coordination scenarios.'
        ],
        tags: ['RACI Matrix', 'Organizational Design', 'Stakeholder Governance', 'Conflict Resolution'],
        role: 'Project Management Analyst · Bahria University',
        repoUrl: null
    }
};

function openCaseStudy(key) {
    const data = caseStudies[key];
    if (!data) return;

    document.getElementById('modal-category').textContent = data.category;
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-context').textContent = data.context;
    document.getElementById('modal-architecture').textContent = data.architecture;
    document.getElementById('modal-role').textContent = data.role;

    const highlightsEl = document.getElementById('modal-highlights');
    highlightsEl.innerHTML = data.highlights.map(item => `<li>${item}</li>`).join('');

    const tagsEl = document.getElementById('modal-tags');
    tagsEl.innerHTML = data.tags.map(tag => `<span class="px-2.5 py-1 rounded text-[11px] font-mono bg-white/[0.04] border border-white/10 text-stone/85">${tag}</span>`).join('');

    const actionsEl = document.getElementById('modal-actions');
    if (data.repoUrl) {
        actionsEl.innerHTML = `
            <a href="${data.repoUrl}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-lg bg-stone text-obsidian text-xs font-mono font-medium hover:bg-white transition flex items-center gap-1.5">
                <i data-lucide="github" class="w-3.5 h-3.5"></i>
                <span>View on GitHub</span>
            </a>
        `;
    } else {
        actionsEl.innerHTML = `
            <a href="#contact" onclick="closeCaseStudy()" class="px-4 py-2 rounded-lg border border-white/15 bg-white/[0.04] hover:bg-white/[0.09] text-stone text-xs font-mono transition flex items-center gap-1.5">
                <span>Request Architecture Brief</span>
                <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i>
            </a>
        `;
    }

    refreshIcons();

    const modal = document.getElementById('case-study-modal');
    const panel = document.getElementById('case-study-panel');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
        modal.classList.remove('opacity-0');
        panel.classList.remove('scale-95', 'opacity-0');
        panel.classList.add('scale-100', 'opacity-100');
    });
}

function closeCaseStudy() {
    const modal = document.getElementById('case-study-modal');
    const panel = document.getElementById('case-study-panel');
    modal.classList.add('opacity-0');
    panel.classList.remove('scale-100', 'opacity-100');
    panel.classList.add('scale-95', 'opacity-0');

    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }, 250);
}

function handleModalBackdropClick(event) {
    if (event.target.id === 'case-study-modal') {
        closeCaseStudy();
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCaseStudy();
    }
});

// 4. Toast Notification System
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    toastMsg.textContent = message;

    toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
    toast.classList.add('translate-y-0', 'opacity-100');

    clearTimeout(window.toastTimeout);
    window.toastTimeout = setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
        toast.classList.remove('translate-y-0', 'opacity-100');
    }, 3400);
}

// 5. Mobile Menu Toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// 6. Copy Email to Clipboard
function finishCopySuccess(emailText, btnLabel) {
    btnLabel.textContent = 'Copied';
    showToast(`Copied ${emailText} to clipboard`);
    setTimeout(() => {
        btnLabel.textContent = 'Copy';
    }, 2000);
}

function copyEmail() {
    const emailText = document.getElementById('contact-email-text').innerText.trim();
    const btnLabel = document.getElementById('copy-btn-label');

    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        navigator.clipboard.writeText(emailText)
            .then(() => finishCopySuccess(emailText, btnLabel))
            .catch(() => fallbackCopyText(emailText, btnLabel));
        return;
    }

    fallbackCopyText(emailText, btnLabel);
}

function fallbackCopyText(emailText, btnLabel) {
    const textArea = document.createElement('textarea');
    textArea.value = emailText;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
        document.execCommand('copy');
        finishCopySuccess(emailText, btnLabel);
    } catch (err) {
        showToast('Unable to copy email automatically.');
    } finally {
        document.body.removeChild(textArea);
    }
}

// 7. Contact Form Submission Handler (Direct Mail Handoff)
function handleContactSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    const recipient = 'jmush2018@gmail.com';
    const formattedSubject = encodeURIComponent(`[Portfolio] ${subject} — from ${name}`);
    const formattedBody = encodeURIComponent(
        `Name: ${name}\nReply-To: ${email}\n\n${message}`
    );

    window.location.href = `mailto:${recipient}?subject=${formattedSubject}&body=${formattedBody}`;
    showToast('Opening your email client with your drafted message.');
    event.target.reset();
}

// 8. Scroll Reveal & Active Navigation Highlighting
document.addEventListener('DOMContentLoaded', () => {
    refreshIcons();

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(section => {
        revealObserver.observe(section);
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { rootMargin: '-35% 0px -55% 0px' });

    sections.forEach(section => navObserver.observe(section));
});

// Ambient Spotlight Cursor
(function initSpotlightCursor() {
    const isFinePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const glow = document.getElementById('cursor-glow');
    if (!isFinePointer || !glow) return;

    let targetX = -200;
    let targetY = -200;
    let currentX = -200;
    let currentY = -200;
    let visible = false;

    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
        if (!visible) {
            currentX = targetX;
            currentY = targetY;
            glow.style.opacity = '1';
            visible = true;
        }
    });

    document.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
        visible = false;
    });

    const interactiveSelector = 'a, button, article[onclick], [role="button"]';
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactiveSelector)) {
            document.body.classList.add('cursor-hover');
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(interactiveSelector) && !e.relatedTarget?.closest(interactiveSelector)) {
            document.body.classList.remove('cursor-hover');
        }
    });

    function tick() {
        currentX += (targetX - currentX) * 0.14;
        currentY += (targetY - currentY) * 0.14;
        glow.style.left = `${currentX}px`;
        glow.style.top = `${currentY}px`;
        requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
})();