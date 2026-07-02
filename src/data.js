// ── All site content lives here. Edit freely. ──────────────────────────────

export const profile = {
  name: 'Adesh Singh',
  firstName: 'Adesh',
  role: 'Qt QML Engineer',
  roles: [
    'Qt QML Engineer',
    'Embedded Software Developer',
    'Qt Desktop Developer',
    'Qt Software Developer',
  ],
  hireFor: [
    'Qt QML Development',
    'Qt Software Development',
    'Qt HMI Development',
    'Embedded Software Development',
    'C++ Software Development',
    'Qt for MCU Development',
    'QWidget → QML Migration',
  ],
  tagline: 'Crafting pixel-perfect interfaces for devices that live beyond the browser.',
  email: 'adeshworkmail@gmail.com',
  companyEmail: 'contact@techcoderhub.com',
  phone: '+91 99710 35504',
  location: 'Gurugram, India',
  resumeUrl: 'https://divyadesh.github.io/',
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
      slug: 'vehicle-infotainment',
      title: 'Professional Vehicle Infotainment UI',
      description:
        'Full-featured car infotainment system with dual light/dark themes, navigation, media, climate control, EV battery management, voice assistant and a theme studio for cabin personalization.',
      tags: ['Qt QML', 'C++', 'Automotive HMI'],
      url: 'https://techcoderhub.com/projects/smart-car-info',
      details: {
        role: 'Design & full implementation — TechCoderHub',
        stack: ['Qt 6', 'QML', 'C++17', 'Qt Quick Controls', 'CMake'],
        overview:
          'A production-grade in-vehicle infotainment interface covering every screen a modern EV cockpit needs. Built with a strict C++/QML separation: business logic, vehicle-data models and services in C++, with a fully declarative QML view layer running at 60 fps on embedded targets.',
        features: [
          'Dual light/dark cabin themes with a live theme studio for personalization',
          'Navigation, media playback and climate control surfaces',
          'EV battery management with charge planning views',
          'Voice assistant integration and driver profiles',
          'Vehicle status, tire pressure and safety settings screens',
        ],
      },
    },
    {
      num: '02',
      slug: 'icu-ventilator',
      title: 'ICU Smart Ventilator UI',
      description:
        'Clinical ventilator operator console for patient setup, live waveform monitoring, alarms, trends, therapy controls and service workflows.',
      tags: ['Qt QML', 'C++', 'Medical HMI'],
      url: 'https://techcoderhub.com/projects/smart-ventilator',
      details: {
        role: 'HMI architecture & implementation — TechCoderHub',
        stack: ['Qt 6', 'QML', 'C++', 'Qt Charts', 'Embedded Linux'],
        overview:
          'A clinical operator console where display correctness is a safety requirement. Real-time waveform rendering, deterministic alarm surfacing and workflows designed so critical actions are always reachable within two touches.',
        features: [
          'Live pressure/flow/volume waveform monitoring',
          'Patient setup and therapy control workflows',
          'Prioritized alarm system with escalation states',
          'Historical trends and event logging views',
          'Service and calibration workflows for technicians',
        ],
      },
    },
    {
      num: '03',
      slug: 'he1ma-home-automation',
      title: 'HE1MA Home Automation UI',
      description:
        'Smart home control interface for centralized device management — real-time status, scenes, and device control on embedded Linux touch panels.',
      tags: ['Qt QML', 'C++', 'Home Automation'],
      url: 'https://techcoderhub.com/projects/he1ma',
      details: {
        role: 'UI development — TechCoderHub',
        stack: ['Qt 6', 'QML', 'C++', 'MQTT', 'Embedded Linux', 'EGLFS'],
        overview:
          'A wall-panel smart home controller running on embedded Linux. Centralized control of lighting, climate, security and media devices with real-time state sync over MQTT and an interface tuned for at-a-glance readability.',
        features: [
          'Centralized device management with live status',
          'Scenes and automation scheduling',
          'Room-based navigation optimized for touch panels',
          'Real-time device state sync over MQTT',
          'Runs on embedded Linux with EGLFS — no window system needed',
        ],
      },
    },
    {
      num: '04',
      slug: 'reamon-console',
      title: 'Reamon Automotive Console UI',
      description:
        'Automotive infotainment and vehicle-control console for camera, navigation, climate, media, tire pressure, and power controls — 16 console screens.',
      tags: ['Qt QML', 'C++', 'Automotive HMI'],
      url: 'https://techcoderhub.com/projects/industrial-hmi-system',
      details: {
        role: 'Design & implementation — TechCoderHub',
        stack: ['Qt 6', 'QML', 'C++', 'Qt Quick', 'CMake'],
        overview:
          'A Reamon-branded vehicle console spanning 16 screens: reverse camera, tire warnings, navigation, climate, seat comfort, media, and power-mode controls — built as a reusable QML component system over a C++ vehicle-data layer.',
        features: [
          'Reverse camera and parking assist views',
          'Tire pressure monitoring with warning states',
          'Climate and seat comfort controls',
          'Media playback and power-mode management',
          'Consistent card-based screen architecture',
        ],
      },
    },
    {
      num: '05',
      slug: 'scooty-dashboard',
      title: 'Scooty EV Dashboard UI',
      description:
        'Two-wheeler digital dashboard for real-time riding data — speed, battery, warnings, and vehicle status on a compact embedded display.',
      tags: ['Qt QML', 'C++', 'Automotive / EV'],
      url: 'https://techcoderhub.com/projects/eagle-scooty',
      details: {
        role: 'Design & implementation — TechCoderHub',
        stack: ['Qt 6', 'QML', 'C++', 'Embedded Linux'],
        overview:
          'A compact digital cluster for electric two-wheelers with light and dark themes from Figma designs. Ride data, battery state, warnings, and status screens tuned for sunlight readability on small displays.',
        features: [
          'Real-time speed and ride telemetry',
          'Battery state of charge and range estimation',
          'Warning and indicator states',
          'Light & dark themes from Figma design system',
          'Optimized for compact embedded display targets',
        ],
      },
    },
    {
      num: '06',
      slug: 'tesla-dashboard',
      title: 'Tesla-style Dashboard UI',
      description:
        'Automotive-style infotainment and vehicle-control UI — vehicle state, media, navigation, and comfort controls with a next-gen visual hierarchy.',
      tags: ['Qt QML', 'C++', 'Automotive'],
      url: 'https://techcoderhub.com/projects/tesla',
      details: {
        role: 'Design & implementation — TechCoderHub',
        stack: ['Qt 6', 'QML', 'C++', 'Qt Quick'],
        overview:
          'A Tesla-inspired control interface for vehicle state, media, navigation, and comfort — one of my most popular open-source Qt/QML projects (the GitHub repo has 160+ stars). A second variant refines the visual hierarchy and screen-to-screen consistency.',
        features: [
          'Vehicle state visualization and controls',
          'Media, navigation, and comfort surfaces',
          'Next-gen variant with refined hierarchy',
          'Open source on GitHub (cppqtdev/Tesla)',
        ],
      },
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
