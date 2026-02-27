const buildVersion = '2026.02.26-1';

const jobs = {
  'Incident / Break-Fix': [
    'Network Outage – Wired',
    'Network Outage – Wireless',
    'Single User Connectivity Failure',
    'IDF/MDF Link Down',
    'Access Point Offline',
    'Switch Port Failure',
    'Circuit Down (Carrier)',
    'Phone Not Registering',
    'VoIP Call Quality Issue',
    'Power Failure – Rack/Device',
    'Hardware Replacement – Failed Device',
    'Cabling Fault – Suspected Physical Layer Issue'
  ],
  'MAC (Move, Add, Changes)': [
    'User Move (Workstation Relocation)',
    'New User Setup',
    'Patch / Repatch (IDF/MDF)',
    'VLAN Change / Port Reconfiguration',
    'Phone Relocation',
    'AP Relocation',
    'Rack Reorganization',
    'Labeling & Documentation Update',
    'Equipment Decommission'
  ],
  Installation: [
    'Access Point Installation',
    'Switch Installation',
    'Firewall Installation',
    'Router Installation',
    'Structured Cabling – New Run',
    'Fiber Install – Single Mode',
    'Fiber Install – Multi Mode',
    'Rack & Stack',
    'Camera Installation (IP Surveillance)',
    'Cellular Modem Installation (LTE/5G)',
    'ISP Circuit Turn-Up Support'
  ],
  Migration: [
    'Circuit Turn-Up',
    'Carrier Demarc Extension',
    'WAN Cutover',
    'Voice Platform Migration',
    'Device Migration to New Controller',
    'Site Network Migration',
    'SD-WAN Deployment',
    'Equipment Swap During Maintenance Window'
  ],
  Testing: [
    'Cable Certification (Fluke)',
    'Fiber Light Level Testing',
    'Loopback Testing',
    'AP Signal Survey',
    'Post-Install Validation',
    'Failover Testing',
    'Redundancy Verification',
    'Patch Panel Audit'
  ],
  Survey: [
    'Pre-Install Survey',
    '5G/LTE Survey',
    'Power & Pathway Validation',
    'Rack Capacity Assessment',
    'Wireless Heat Mapping',
    'Infrastructure Documentation Audit',
    'ISP Availability Survey'
  ],
  'Remote (Smart) Hands': [
    'Console Access Session',
    'Device Factory Reset',
    'USB Image Install',
    'Power Cycle / Smart Hands Reboot',
    'Patch Directed by NOC',
    'Cross-Connect Verification',
    'Label Confirmation & Photo Documentation'
  ],
  Decommission: [
    'Equipment Removal',
    'Circuit Disconnect',
    'Rack Teardown',
    'Asset Recovery & Packaging',
    'Site Closure Support'
  ],
  'Emergency / After-Hours': [
    'Emergency Outage Response',
    'After-Hours Maintenance',
    'Disaster Recovery Support',
    'Temporary Network Deployment'
  ]
};

const jobTypeEl = document.getElementById('jobType');
const loadBtn = document.getElementById('loadBtn');
const resetBtn = document.getElementById('resetBtn');
const checklistEl = document.getElementById('checklist');
const placeholderEl = document.getElementById('placeholder');
const progressTextEl = document.getElementById('progressText');
const statusPillEl = document.getElementById('statusPill');
const progressFillEl = document.getElementById('progressFill');
const progressTrackEl = document.querySelector('.progress-track');
const buildTagEl = document.getElementById('buildTag');

buildTagEl.textContent = `v${buildVersion}`;

Object.keys(jobs).forEach((job) => {
  const opt = document.createElement('option');
  opt.value = job;
  opt.textContent = job;
  jobTypeEl.appendChild(opt);
});

function renderChecklist(type) {
  checklistEl.innerHTML = '';
  const tasks = jobs[type] || [];

  if (tasks.length === 0) {
    placeholderEl.hidden = false;
    updateProgress();
    return;
  }

  placeholderEl.hidden = true;

  tasks.forEach((task, idx) => {
    const li = document.createElement('li');
    li.className = 'task';

    const id = `task-${idx}`;
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.id = id;
    cb.addEventListener('change', () => {
      li.classList.toggle('done', cb.checked);
      updateProgress();
    });

    const label = document.createElement('label');
    label.setAttribute('for', id);
    label.textContent = task;

    li.appendChild(cb);
    li.appendChild(label);
    checklistEl.appendChild(li);
  });

  updateProgress();
}

function updateProgress() {
  const items = Array.from(checklistEl.querySelectorAll('.task'));
  const total = items.length;
  const done = items.filter((item) => item.querySelector('input').checked).length;
  const percent = total ? Math.round((done / total) * 100) : 0;

  progressTextEl.textContent = `Completion: ${done} of ${total} tasks (${percent}%)`;
  progressFillEl.style.width = `${percent}%`;
  progressTrackEl.setAttribute('aria-valuenow', String(percent));

  if (total === 0 || done === 0) {
    statusPillEl.textContent = 'Not Started';
  } else if (done === total) {
    statusPillEl.textContent = 'Complete';
  } else {
    statusPillEl.textContent = 'In Progress';
  }
}

loadBtn.addEventListener('click', () => {
  renderChecklist(jobTypeEl.value);
});

resetBtn.addEventListener('click', () => {
  jobTypeEl.value = '';
  checklistEl.innerHTML = '';
  placeholderEl.hidden = false;
  updateProgress();
});

updateProgress();
