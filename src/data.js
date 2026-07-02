// ── All site content lives here. Edit freely. ──────────────────────────────

export const profile = {
  name: 'Adesh Singh',
  firstName: 'Adesh',
  role: 'Qt QML Engineer',
  tagline: 'Crafting pixel-perfect interfaces for devices that live beyond the browser.',
  email: 'adeshworkmail@gmail.com',
  companyEmail: 'contact@techcoderhub.com',
  phone: '+91 99710 35504',
  location: 'Gurugram, India',
  resumeUrl: '/resume.pdf',
  links: {
    github: 'https://github.com/cppqtdev',
    linkedin: 'https://in.linkedin.com/in/adesh-singh-9a882316a',
    youtube: 'https://www.youtube.com/@techcoderhub',
    company: 'https://techcoderhub.com',
    twitter: 'https://twitter.com/divyadesh_777',
  },
}

export const about = {
  kicker: 'est. 2021 — present',
  heading: 'Building interfaces smooth enough to forget the hardware.',
  paragraphs: [
    `I'm a <strong>Qt QML Engineer</strong> and founder of <strong>TechCoderHub</strong> — a Qt/QML
     engineering studio serving clients worldwide. Before that, I built desktop UIs at
     <strong>Enpass</strong> for a password manager trusted by millions, and embedded HMI
     systems at <strong>VVDN Technologies</strong>.`,
    `My favourite problems live at the intersection of <strong>C++, QML and hardware</strong>.
     Think automotive instrument clusters, medical device consoles, Qt for MCU on bare-metal
     ARM, Yocto layers that actually build, and 60&nbsp;fps interfaces on hardware that has
     no business running them.`,
    `Outside client work I publish Qt/QML projects on
     <a href="https://github.com/cppqtdev" target="_blank" rel="noreferrer">GitHub</a> and
     tutorials on <a href="https://www.youtube.com/@techcoderhub" target="_blank" rel="noreferrer">YouTube</a>.
     If your UI stutters, <a href="#contact">let's chat</a>.`,
  ],
}

export const experience = {
  kicker: '2021 → now',
  heading: 'Five years making pixels behave.',
  jobs: [
    {
      period: '2024 — Present',
      badge: '● Now',
      title: 'Founder & Qt/QML Consultant @ TechCoderHub',
      meta: 'Gurugram · Remote · Founder',
      summary:
        'Running a Qt/QML engineering studio delivering embedded HMI, Qt for MCU, and desktop software for clients worldwide.',
      points: [
        'Shipped automotive infotainment, ICU ventilator, and home-automation HMIs end-to-end.',
        'Qt Quick Ultralite (QUL) interfaces on ARM Cortex-M — STM32, NXP i.MX RT targets.',
        'Yocto/Buildroot Qt layers, EGLFS bring-up, and cross-compilation pipelines.',
        'QWidget → QML migrations preserving existing C++ business logic.',
        'Architecture consulting: performance audits, migration planning, technical roadmaps.',
      ],
      tags: ['Qt 6', 'QML', 'C++', 'Qt for MCU', 'Yocto', 'Boot2Qt', 'CMake'],
    },
    {
      period: 'Jun 2022 — 2024',
      badge: 'Full-time',
      title: 'Senior Software Developer @ Enpass',
      meta: 'Gurugram · Full-time',
      summary:
        'Built visually rich, responsive desktop interfaces for a password manager serving millions of users.',
      points: [
        'Owned Qt/QML UI features across Windows, macOS and Linux from one codebase.',
        'C++ backend integration for secure credential storage and sync workflows.',
        'Performance profiling and QML optimization for smooth 60 fps interactions.',
        'Shipped in a security-first codebase with strict code review and release discipline.',
      ],
      tags: ['Qt / QML', 'C++', 'Qt Creator', 'Git', 'Windows', 'Linux', 'macOS'],
    },
    {
      period: 'Jun 2021 — Jun 2022',
      badge: 'Full-time',
      title: 'Embedded Software Developer @ VVDN Technologies',
      meta: 'Manesar, Gurugram · Full-time',
      summary:
        'Built embedded HMI and IoT firmware for scoreboard controllers and smart building systems.',
      points: [
        'Multi-sport OES Scoreboard Controller in C++/QML with SQLite3 — real-time updates.',
        'Smart Building Management System: Zigbee 3.0, MQTT, UART/I2C sensor integration.',
        'Ran on NovasomM7 and VAR-SOM-MX8M-MINI boards under embedded Linux.',
        'MySQL, InfluxDB and Redis pipelines for telemetry and energy optimization.',
      ],
      tags: ['Embedded C', 'C++', 'Qt / QML', 'Zigbee', 'MQTT', 'SQLite3', 'Embedded Linux'],
    },
  ],
}

export const projects = {
  kicker: 'work & side projects',
  heading: "Things I've shipped.",
  allUrl: 'https://techcoderhub.com/projects',
  items: [
    {
      num: '01',
      title: 'Professional Vehicle Infotainment UI',
      description:
        'Full-featured car infotainment system with dual light/dark themes, navigation, media, climate control, EV battery management, voice assistant and a theme studio for cabin personalization.',
      tags: ['Qt QML', 'C++', 'Automotive HMI'],
      url: 'https://techcoderhub.com/projects/smart-car-info',
    },
    {
      num: '02',
      title: 'ICU Smart Ventilator UI',
      description:
        'Clinical ventilator operator console for patient setup, live waveform monitoring, alarms, trends, therapy controls and service workflows.',
      tags: ['Qt QML', 'C++', 'Medical HMI'],
      url: 'https://techcoderhub.com/projects/smart-ventilator',
    },
    {
      num: '03',
      title: 'HE1MA Home Automation UI',
      description:
        'Smart home control interface for centralized device management — real-time status, scenes, and device control on embedded Linux touch panels.',
      tags: ['Qt QML', 'C++', 'Home Automation'],
      url: 'https://techcoderhub.com/projects/he1ma',
    },
  ],
}

export const skills = {
  kicker: '30+ tools & counting',
  heading: 'The stack I ship on.',
  categories: [
    { name: 'Languages', items: ['C', 'C++', 'QML', 'Python', 'JavaScript', 'Shell'] },
    { name: 'Qt ecosystem', items: ['Qt 5', 'Qt 6', 'Qt Quick', 'Qt Widgets', 'Qt for MCU (QUL)', 'Qt Design Studio', 'Qt Creator', 'Boot2Qt'] },
    { name: 'Embedded & IoT', items: ['Yocto Project', 'Buildroot', 'Embedded Linux', 'Zigbee 3.0', 'MQTT', 'UART / I2C', 'STM32', 'i.MX8M', 'Raspberry Pi'] },
    { name: 'Build & tooling', items: ['CMake', 'Git', 'GitLab', 'Bitbucket', 'Jira', 'GCC Toolchain'] },
    { name: 'Data & storage', items: ['SQLite3', 'MySQL', 'InfluxDB', 'Redis'] },
    { name: 'Platforms', items: ['Windows', 'Linux', 'macOS', 'Bare-metal ARM'] },
  ],
}

export const contact = {
  kicker: 'response time < 24h',
  headingA: 'Got a UI that',
  headingEm: 'drops frames?',
  headingB: "Let's fix it.",
  blurb:
    'Automotive clusters, embedded HMI, Qt for MCU, QWidget → QML migrations, performance rescues — or just a chat about your architecture. Drop a line.',
}
