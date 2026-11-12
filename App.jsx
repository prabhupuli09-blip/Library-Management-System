import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  LayoutDashboard,
  Calendar as CalendarIcon,
  Ticket,
  QrCode,
  Award,
  Users,
  Bell,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  GraduationCap,
  ChevronRight,
  ChevronLeft,
  Download,
  Edit3,
  Trash2,
  Star,
  MessageSquare,
  ArrowRight,
  Menu,
  X,
  UserCheck,
  Building2,
  Cpu,
  Music,
  Trophy,
  BookOpen,
  Check,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Eye,
  Printer,
  Share2,
  Layers
} from 'lucide-react';

// ============================================================================
// INITIAL SEED DATA (Rich Indian College Context)
// ============================================================================

const ROLES = [
  { id: 'Super Admin', label: 'Super Admin', desc: 'Complete system & approval control', badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
  { id: 'Principal', label: 'Principal', desc: 'College-wide analytics & oversight', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
  { id: 'Faculty Coordinator', label: 'Faculty Coordinator', desc: 'Create & manage department events', badge: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
  { id: 'Club Coordinator', label: 'Club Coordinator', desc: 'Manage club activities & rosters', badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' },
  { id: 'Student', label: 'Student', desc: 'Discover, register, attend & feedback', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' }
];

const INITIAL_USERS = {
  'Super Admin': { id: 'USR-001', name: 'Dr. Vikramaditya Rao', email: 'admin@campusconnect.edu.in', role: 'Super Admin', dept: 'Administration', avatar: 'VR' },
  'Principal': { id: 'USR-002', name: 'Prof. Meenakshi Sundaram', email: 'principal@campusconnect.edu.in', role: 'Principal', dept: 'Office of Principal', avatar: 'MS' },
  'Faculty Coordinator': { id: 'USR-003', name: 'Dr. Rajeshwari Kulkarni', email: 'rajeshwari.k@campusconnect.edu.in', role: 'Faculty Coordinator', dept: 'Computer Science & Engg.', avatar: 'RK' },
  'Club Coordinator': { id: 'USR-004', name: 'Aarav Sharma', email: 'aarav.s24@campusconnect.edu.in', role: 'Club Coordinator', dept: 'ECE / Robotics Club', avatar: 'AS' },
  'Student': { id: 'USR-005', name: 'Ananya Deshmukh', email: 'ananya.d25@campusconnect.edu.in', role: 'Student', dept: 'Computer Science (3rd Yr)', rollNo: '23CS1042', avatar: 'AD' }
};

const INITIAL_EVENTS = [
  {
    id: 'EVT-101',
    title: 'TechnoVanza 2026: National 36-Hour Hackathon',
    category: 'Technical',
    club: 'ACM Student Chapter',
    organizer: 'Dr. Rajeshwari Kulkarni',
    date: '2026-11-18',
    time: '09:00 AM',
    deadline: '2026-11-16',
    venue: 'Main Auditorium & Innovation Lab',
    capacity: 250,
    registeredCount: 218,
    status: 'Approved',
    featured: true,
    bannerGradient: 'from-blue-600 via-indigo-600 to-purple-700',
    description: 'Build next-gen AI, FinTech, and Sustainable Smart Campus solutions in a 36-hour intense coding marathon with ₹1,50,000 prize pool and industry mentors.',
    tags: ['AI/ML', 'Web3', 'Hackathon', 'Cash Prize']
  },
  {
    id: 'EVT-102',
    title: 'Rhythm & Raga: Annual Inter-College Cultural Fest',
    category: 'Cultural',
    club: 'Sargam Cultural Society',
    organizer: 'Aarav Sharma',
    date: '2026-11-22',
    time: '04:30 PM',
    deadline: '2026-11-20',
    venue: 'Open Air Amphitheatre',
    capacity: 600,
    registeredCount: 542,
    status: 'Approved',
    featured: true,
    bannerGradient: 'from-fuchsia-600 via-purple-600 to-indigo-800',
    description: 'An unforgettable evening celebrating classical fusion, contemporary dance battles, street theatre, and live indie band performances.',
    tags: ['Music', 'Dance', 'Battle of Bands']
  },
  {
    id: 'EVT-103',
    title: 'Autonomous Drones & ROS2 Robotics Workshop',
    category: 'Workshop',
    club: 'RoboTech Robotics Club',
    organizer: 'Aarav Sharma',
    date: '2026-11-25',
    time: '10:30 AM',
    deadline: '2026-11-23',
    venue: 'Mechatronics Center, Block C',
    capacity: 100,
    registeredCount: 84,
    status: 'Approved',
    featured: false,
    bannerGradient: 'from-cyan-600 via-blue-700 to-slate-900',
    description: 'Hands-on training on Robot Operating System (ROS2), LiDAR SLAM navigation, and autonomous quadcopter flight controller calibration.',
    tags: ['Robotics', 'ROS2', 'Hardware']
  },
  {
    id: 'EVT-104',
    title: 'Campus Premier League: Inter-Dept Cricket & Futsal',
    category: 'Sports',
    club: 'Department of Physical Education',
    organizer: 'Dr. Rajeshwari Kulkarni',
    date: '2026-11-29',
    time: '07:30 AM',
    deadline: '2026-11-26',
    venue: 'University Sports Complex',
    capacity: 320,
    registeredCount: 276,
    status: 'Approved',
    featured: false,
    bannerGradient: 'from-emerald-600 via-teal-700 to-blue-900',
    description: 'Annual floodlit T10 cricket and 5-a-side futsal championship across all 8 engineering and management departments.',
    tags: ['Cricket', 'Futsal', 'Championship']
  },
  {
    id: 'EVT-105',
    title: 'Quantum Computing & Post-Quantum Cryptography Summit',
    category: 'Seminar',
    club: 'IEEE Student Branch',
    organizer: 'Dr. Rajeshwari Kulkarni',
    date: '2026-12-03',
    time: '11:00 AM',
    deadline: '2026-12-01',
    venue: 'Sir C.V. Raman Seminar Hall',
    capacity: 180,
    registeredCount: 95,
    status: 'Pending',
    featured: false,
    bannerGradient: 'from-violet-600 via-purple-700 to-navy-900',
    description: 'Keynote talks by IISc and IIT researchers on Qiskit circuit design and quantum-safe enterprise encryption standards.',
    tags: ['Quantum', 'Research', 'IEEE']
  },
  {
    id: 'EVT-106',
    title: 'Startup PitchDeck & Angel Investor Conclave',
    category: 'Seminar',
    club: 'E-Cell Entrepreneurship Hub',
    organizer: 'Aarav Sharma',
    date: '2026-12-07',
    time: '02:00 PM',
    deadline: '2026-12-05',
    venue: 'Incubation Center Auditorium',
    capacity: 150,
    registeredCount: 62,
    status: 'Pending',
    featured: false,
    bannerGradient: 'from-amber-600 via-orange-600 to-purple-900',
    description: 'Pitch your campus startup directly to seed-stage VCs and alumni founders for equity-free grant funding up to ₹5 Lakhs.',
    tags: ['Startup', 'Funding', 'E-Cell']
  },
  {
    id: 'EVT-107',
    title: 'Cloud Native DevOps & Kubernetes Bootcamp',
    category: 'Workshop',
    club: 'ACM Student Chapter',
    organizer: 'Dr. Rajeshwari Kulkarni',
    date: '2026-10-28',
    time: '10:00 AM',
    deadline: '2026-10-25',
    venue: 'CS Lab 4',
    capacity: 120,
    registeredCount: 120,
    status: 'Completed',
    featured: false,
    bannerGradient: 'from-sky-600 via-blue-700 to-indigo-900',
    description: 'Completed 2-day intensive workshop covering Docker containerization, Kubernetes clusters, and CI/CD GitHub Actions.',
    tags: ['Cloud', 'Kubernetes', 'DevOps']
  }
];

const INITIAL_REGISTRATIONS = [
  {
    id: 'REG-8801',
    eventId: 'EVT-101',
    studentId: 'USR-005',
    studentName: 'Ananya Deshmukh',
    rollNo: '23CS1042',
    dept: 'Computer Science',
    status: 'Confirmed',
    attended: true,
    checkInTime: '2026-11-12 09:14 AM',
    qrToken: 'CC-EVT101-USR005-8801',
    registeredAt: '2026-11-05'
  },
  {
    id: 'REG-8802',
    eventId: 'EVT-102',
    studentId: 'USR-005',
    studentName: 'Ananya Deshmukh',
    rollNo: '23CS1042',
    dept: 'Computer Science',
    status: 'Confirmed',
    attended: false,
    checkInTime: null,
    qrToken: 'CC-EVT102-USR005-8802',
    registeredAt: '2026-11-08'
  },
  {
    id: 'REG-8803',
    eventId: 'EVT-107',
    studentId: 'USR-005',
    studentName: 'Ananya Deshmukh',
    rollNo: '23CS1042',
    dept: 'Computer Science',
    status: 'Confirmed',
    attended: true,
    checkInTime: '2026-10-28 09:52 AM',
    qrToken: 'CC-EVT107-USR005-8803',
    registeredAt: '2026-10-20'
  },
  {
    id: 'REG-8804',
    eventId: 'EVT-101',
    studentId: 'USR-102',
    studentName: 'Rohan Kulkarni',
    rollNo: '23EC1019',
    dept: 'Electronics & Comm.',
    status: 'Confirmed',
    attended: true,
    checkInTime: '2026-11-12 09:20 AM',
    qrToken: 'CC-EVT101-USR102-8804',
    registeredAt: '2026-11-06'
  },
  {
    id: 'REG-8805',
    eventId: 'EVT-103',
    studentId: 'USR-103',
    studentName: 'Siddharth Nair',
    rollNo: '24ME1088',
    dept: 'Mechanical Engg.',
    status: 'Confirmed',
    attended: false,
    checkInTime: null,
    qrToken: 'CC-EVT103-USR103-8805',
    registeredAt: '2026-11-10'
  }
];

const INITIAL_CERTIFICATES = [
  {
    certId: 'CERT-CC-2026-9421',
    studentName: 'Ananya Deshmukh',
    rollNo: '23CS1042',
    dept: 'Computer Science & Engineering',
    eventTitle: 'Cloud Native DevOps & Kubernetes Bootcamp',
    type: 'Winner - 1st Place',
    issueDate: '2026-10-30',
    signatory: 'Prof. Meenakshi Sundaram (Principal)'
  },
  {
    certId: 'CERT-CC-2026-9422',
    studentName: 'Ananya Deshmukh',
    rollNo: '23CS1042',
    dept: 'Computer Science & Engineering',
    eventTitle: 'TechnoVanza 2026: National 36-Hour Hackathon',
    type: 'Participation',
    issueDate: '2026-11-12',
    signatory: 'Dr. Rajeshwari Kulkarni (Faculty Coordinator)'
  },
  {
    certId: 'CERT-CC-2026-9423',
    studentName: 'Rohan Kulkarni',
    rollNo: '23EC1019',
    dept: 'Electronics & Communication',
    eventTitle: 'TechnoVanza 2026: National 36-Hour Hackathon',
    type: 'Runner Up - 2nd Place',
    issueDate: '2026-11-12',
    signatory: 'Prof. Meenakshi Sundaram (Principal)'
  }
];

const INITIAL_CLUBS = [
  {
    id: 'CLB-01',
    name: 'ACM Student Chapter',
    category: 'Technical',
    lead: 'Ananya Deshmukh',
    facultyAdvisor: 'Dr. Rajeshwari Kulkarni',
    membersCount: 148,
    upcomingEvents: 3,
    description: 'Premier computing society fostering algorithmic problem solving, open-source contributions, and national hackathons.',
    members: ['Ananya Deshmukh (President)', 'Karthik Iyer (Tech Lead)', 'Sneha Patil (Event Head)', 'Devansh Joshi (Treasurer)'],
    activities: ['Weekly LeetCode Contests', 'TechnoVanza Hackathon', 'Open Source Winter Sprint']
  },
  {
    id: 'CLB-02',
    name: 'Sargam Cultural Society',
    category: 'Cultural',
    lead: 'Meera Krishnan',
    facultyAdvisor: 'Prof. Arvind Deshpande',
    membersCount: 215,
    upcomingEvents: 2,
    description: 'The beating artistic heart of campus covering classical & western music, choreography, dramatics, and fine arts.',
    members: ['Meera Krishnan (Secretary)', ' Kabir Verma (Music Lead)', 'Riya Sen (Dance Lead)', 'Aditya Rao (Stage Ops)'],
    activities: ['Rhythm & Raga Annual Fest', 'Acoustic Jam Nights', 'Inter-University Theatre Cup']
  },
  {
    id: 'CLB-03',
    name: 'RoboTech Robotics Club',
    category: 'Technical',
    lead: 'Aarav Sharma',
    facultyAdvisor: 'Dr. S. K. Menon',
    membersCount: 96,
    upcomingEvents: 2,
    description: 'Designing autonomous rovers, combat bots, and aerial drones for national ABU Robocon and ISRO challenges.',
    members: ['Aarav Sharma (Captain)', 'Nikhil Verma (Embedded Lead)', 'Pooja Hegde (CAD Design)', 'Varun Nair (Controls)'],
    activities: ['ROS2 Autonomous Drone Workshop', 'RoboWars Arena Build', 'Line Follower Freshers League']
  },
  {
    id: 'CLB-04',
    name: 'E-Cell Entrepreneurship Hub',
    category: 'Leadership',
    lead: 'Tanmay Bhatia',
    facultyAdvisor: 'Dr. Neha Kapoor',
    membersCount: 130,
    upcomingEvents: 1,
    description: 'Empowering student founders with mentorship, startup incubation, design thinking sprints, and angel investor connects.',
    members: ['Tanmay Bhatia (CEO)', 'Ishita Malhotra (VC Relations)', 'Rohan Mehta (Incubation)', 'Sanya Gupta (Marketing)'],
    activities: ['Startup PitchDeck Conclave', 'Zero-to-One Product Bootcamp', 'Founder Fireside Chats']
  }
];

const INITIAL_NOTIFICATIONS = [
  {
    id: 'NTF-1',
    type: 'approval',
    title: 'New Event Proposal Awaiting Approval',
    message: 'IEEE Student Branch submitted "Quantum Computing & Post-Quantum Cryptography Summit" for review.',
    time: '12 mins ago',
    read: false
  },
  {
    id: 'NTF-2',
    type: 'registration',
    title: 'Registration Confirmed: TechnoVanza 2026',
    message: 'Your digital QR pass (REG-8801) has been generated for Main Auditorium check-in.',
    time: '2 hours ago',
    read: false
  },
  {
    id: 'NTF-3',
    type: 'certificate',
    title: 'Verified Certificate Issued',
    message: 'Certificate CERT-CC-2026-9421 for Cloud Native DevOps Bootcamp is ready for PDF download.',
    time: '1 day ago',
    read: true
  },
  {
    id: 'NTF-4',
    type: 'reminder',
    title: 'Capacity Alert: Rhythm & Raga Fest',
    message: '90% of amphitheatre passes have been claimed (542/600). Closing registrations soon.',
    time: '2 days ago',
    read: true
  }
];

const INITIAL_FEEDBACK = [
  {
    id: 'FDB-1',
    eventId: 'EVT-107',
    eventTitle: 'Cloud Native DevOps & Kubernetes Bootcamp',
    studentName: 'Ananya Deshmukh',
    rating: 5,
    comment: 'Exceptional hands-on labs! Deploying a real microservices cluster on Kubernetes gave me huge confidence for placements.',
    date: '2026-10-29'
  },
  {
    id: 'FDB-2',
    eventId: 'EVT-101',
    eventTitle: 'TechnoVanza 2026: National 36-Hour Hackathon',
    studentName: 'Rohan Kulkarni',
    rating: 5,
    comment: 'Seamless QR check-in, super fast campus Wi-Fi, and great mentorship from industry judges.',
    date: '2026-11-12'
  },
  {
    id: 'FDB-3',
    eventId: 'EVT-107',
    eventTitle: 'Cloud Native DevOps & Kubernetes Bootcamp',
    studentName: 'Siddharth Nair',
    rating: 4,
    comment: 'Very informative session. Would love an extra 1-hour session dedicated to Helm charts next semester.',
    date: '2026-10-30'
  }
];

// ============================================================================
// UTILITY COMPONENTS (Countdown, QR Code SVG, Charts)
// ============================================================================

const CountdownBadge = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const compute = () => {
      const target = new Date(`${targetDate}T09:00:00`).getTime();
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) {
        setTimeLeft('Live / Concluded');
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / 1000 / 60) % 60);
      setTimeLeft(`${days}d ${hours}h ${mins}m`);
    };
    compute();
    const timer = setInterval(compute, 60000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-200 border border-indigo-400/30">
      <Clock className="w-3.5 h-3.5 text-cyan-400" />
      {timeLeft}
    </span>
  );
};

// Deterministic SVG QR Matrix Generator for realistic scannable visual
const QRCodeMatrix = ({ value, size = 140 }) => {
  const cells = useMemo(() => {
    const grid = 21;
    const matrix = [];
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = (hash << 5) - hash + value.charCodeAt(i);
      hash |= 0;
    }
    for (let r = 0; r < grid; r++) {
      const row = [];
      for (let c = 0; c < grid; c++) {
        // Finder patterns in 3 corners
        const inTopLeft = r < 7 && c < 7;
        const inTopRight = r < 7 && c >= grid - 7;
        const inBottomLeft = r >= grid - 7 && c < 7;

        if (inTopLeft || inTopRight || inBottomLeft) {
          const lr = inBottomLeft ? r - (grid - 7) : r;
          const lc = inTopRight ? c - (grid - 7) : c;
          const isBorder = lr === 0 || lr === 6 || lc === 0 || lc === 6;
          const isCenter = lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4;
          row.push(isBorder || isCenter);
        } else {
          const seed = Math.abs(Math.sin(hash + r * 31 + c * 17));
          row.push(seed > 0.48);
        }
      }
      matrix.push(row);
    }
    return matrix;
  }, [value]);

  return (
    <div className="p-3 bg-white rounded-2xl shadow-lg inline-block">
      <svg width={size} height={size} viewBox="0 0 21 21" className="block">
        <rect width="21" height="21" fill="#ffffff" />
        {cells.map((row, r) =>
          row.map((filled, c) =>
            filled ? <rect key={`${r}-${c}`} x={c} y={r} width="1" height="1" fill="#090d24" /> : null
          )
        )}
      </svg>
    </div>
  );
};

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================

export default function App() {
  // Persistent State Helper
  const loadState = (key, fallback) => {
    try {
      const saved = localStorage.getItem(`campus_connect_${key}`);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  };

  // App Mode: 'landing' or 'portal'
  const [viewMode, setViewMode] = useState(() => loadState('viewMode', 'landing'));
  const [currentRole, setCurrentRole] = useState(() => loadState('currentRole', 'Super Admin'));
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Core Domain Entities
  const [events, setEvents] = useState(() => loadState('events', INITIAL_EVENTS));
  const [registrations, setRegistrations] = useState(() => loadState('registrations', INITIAL_REGISTRATIONS));
  const [certificates, setCertificates] = useState(() => loadState('certificates', INITIAL_CERTIFICATES));
  const [clubs, setClubs] = useState(() => loadState('clubs', INITIAL_CLUBS));
  const [notifications, setNotifications] = useState(() => loadState('notifications', INITIAL_NOTIFICATIONS));
  const [feedbacks, setFeedbacks] = useState(() => loadState('feedbacks', INITIAL_FEEDBACK));

  // Load shared application state from the MongoDB-backed API (localStorage remains fallback).
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    let active = true;
    fetch('/api/state')
      .then((res) => { if (!res.ok) throw new Error('API unavailable'); return res.json(); })
      .then((data) => {
        if (!active || !data?.state) return;
        const state = data.state;
        if (state.viewMode !== undefined) setViewMode(state.viewMode);
        if (state.currentRole !== undefined) setCurrentRole(state.currentRole);
        if (state.events !== undefined) setEvents(state.events);
        if (state.registrations !== undefined) setRegistrations(state.registrations);
        if (state.certificates !== undefined) setCertificates(state.certificates);
        if (state.clubs !== undefined) setClubs(state.clubs);
        if (state.notifications !== undefined) setNotifications(state.notifications);
        if (state.feedbacks !== undefined) setFeedbacks(state.feedbacks);
      })
      .catch(() => {})
      .finally(() => { if (active) setIsHydrated(true); });
    return () => { active = false; };
  }, []);

  // Toast Notification Queue
  const [toasts, setToasts] = useState([]);

  // Persist state locally and to the MongoDB-backed API after hydration.
  const persistState = (key, value) => {
    localStorage.setItem(`campus_connect_${key}`, JSON.stringify(value));
    fetch(`/api/state/${key}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value }) }).catch(() => {});
  };
  useEffect(() => { if (isHydrated) persistState('viewMode', viewMode); }, [viewMode, isHydrated]);
  useEffect(() => { if (isHydrated) persistState('currentRole', currentRole); }, [currentRole, isHydrated]);
  useEffect(() => { if (isHydrated) persistState('events', events); }, [events, isHydrated]);
  useEffect(() => { if (isHydrated) persistState('registrations', registrations); }, [registrations, isHydrated]);
  useEffect(() => { if (isHydrated) persistState('certificates', certificates); }, [certificates, isHydrated]);
  useEffect(() => { if (isHydrated) persistState('clubs', clubs); }, [clubs, isHydrated]);
  useEffect(() => { if (isHydrated) persistState('notifications', notifications); }, [notifications, isHydrated]);
  useEffect(() => { if (isHydrated) persistState('feedbacks', feedbacks); }, [feedbacks, isHydrated]);

  const currentUser = INITIAL_USERS[currentRole];

  const triggerToast = (title, message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4200);
  };

  const pushNotification = (type, title, message) => {
    const newNtf = {
      id: `NTF-${Date.now()}`,
      type,
      title,
      message,
      time: 'Just now',
      read: false
    };
    setNotifications((prev) => [newNtf, ...prev]);
  };

  // Role Permissions Matrix
  const permissions = useMemo(() => ({
    canCreateEvent: ['Super Admin', 'Faculty Coordinator', 'Club Coordinator'].includes(currentRole),
    canApproveEvent: ['Super Admin', 'Principal'].includes(currentRole),
    canDeleteEvent: ['Super Admin', 'Faculty Coordinator'].includes(currentRole),
    canManageAttendance: ['Super Admin', 'Faculty Coordinator', 'Club Coordinator'].includes(currentRole),
    canIssueCertificate: ['Super Admin', 'Principal', 'Faculty Coordinator'].includes(currentRole),
    canManageClubs: ['Super Admin', 'Faculty Coordinator', 'Club Coordinator'].includes(currentRole),
    isExecutive: ['Super Admin', 'Principal'].includes(currentRole)
  }), [currentRole]);

  // Computed Dashboard KPIs
  const stats = useMemo(() => {
    const totalEvents = events.length;
    const upcomingEvents = events.filter((e) => e.status === 'Approved').length;
    const completedEvents = events.filter((e) => e.status === 'Completed').length;
    const pendingApprovals = events.filter((e) => e.status === 'Pending').length;
    const totalParticipation = events.reduce((acc, e) => acc + e.registeredCount, 0);
    const registeredStudents = 1840 + registrations.length;
    return {
      totalEvents,
      upcomingEvents,
      completedEvents,
      pendingApprovals,
      totalParticipation,
      registeredStudents
    };
  }, [events, registrations]);

  // Enter Portal Handler
  const handleEnterPortal = (selectedRole = currentRole, targetTab = 'dashboard') => {
    setCurrentRole(selectedRole);
    setActiveTab(targetTab);
    setViewMode('portal');
    triggerToast(`Welcome, ${INITIAL_USERS[selectedRole].name}`, `Signed in with ${selectedRole} privileges.`);
  };

  // ==========================================================================
  // RENDER: LANDING PAGE VIEW
  // ==========================================================================
  if (viewMode === 'landing') {
    const featuredEvents = events.filter((e) => e.status === 'Approved').slice(0, 3);
    return (
      <div className="min-h-screen bg-[#050816] text-white font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">
        {/* Ambient Futuristic Glows */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[34rem] h-[34rem] bg-blue-600/20 rounded-full blur-[130px]" />
          <div className="absolute top-1/3 -right-40 w-[36rem] h-[36rem] bg-purple-600/20 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 left-1/3 w-[28rem] h-[28rem] bg-indigo-600/15 rounded-full blur-[120px]" />
        </div>

        {/* Navbar */}
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#050816]/75 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-100 to-purple-300 bg-clip-text text-transparent">
                  CAMPUS CONNECT
                </span>
                <p className="text-[11px] uppercase tracking-widest text-blue-300/80 font-medium">
                  Smart University OS
                </p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
              <a href="#showcase" className="hover:text-white transition">Events</a>
              <a href="#categories" className="hover:text-white transition">Categories</a>
              <a href="#roles" className="hover:text-white transition">Role Access</a>
              <a href="#about" className="hover:text-white transition">Platform</a>
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleEnterPortal('Student', 'events')}
                className="hidden sm:inline-flex px-4 py-2.5 rounded-xl text-sm font-semibold text-blue-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
              >
                Student Login
              </button>
              <button
                onClick={() => handleEnterPortal('Super Admin', 'dashboard')}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
              >
                Launch Portal <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-7">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-wide">
                <Sparkles className="w-4 h-4 text-purple-400" />
                NEXT-GENERATION CAMPUS EVENT & CLUB ECOSYSTEM
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.06]">
                One Campus.{' '}
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Endless Experiences.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
                Unify hackathons, cultural fests, club operations, executive approvals, QR-coded smart attendance, and verifiable digital certificates in one enterprise university command center.
              </p>

              {/* Quick Role Login Selector */}
              <div className="p-5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 space-y-3">
                <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Instant Demo Access — Select Stakeholder Persona:
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {ROLES.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => handleEnterPortal(r.id, 'dashboard')}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-gradient-to-r hover:from-blue-600/80 hover:to-purple-600/80 border border-white/10 hover:border-purple-400/50 text-slate-200 hover:text-white transition-all flex items-center gap-1.5"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metrics Strip */}
              <div className="grid grid-cols-3 gap-6 pt-2">
                <div>
                  <p className="text-3xl font-extrabold text-white">48+</p>
                  <p className="text-xs text-slate-400 mt-1">Annual Fests & Hackathons</p>
                </div>
                <div>
                  <p className="text-3xl font-extrabold text-blue-400">6,400+</p>
                  <p className="text-xs text-slate-400 mt-1">Active Student Innovators</p>
                </div>
                <div>
                  <p className="text-3xl font-extrabold text-purple-400">100%</p>
                  <p className="text-xs text-slate-400 mt-1">QR Verified Certificates</p>
                </div>
              </div>
            </div>

            {/* Hero Interactive Live Preview Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl p-6 bg-gradient-to-b from-white/10 to-white/[0.03] backdrop-blur-2xl border border-white/15 shadow-2xl shadow-purple-950/50 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Live Flagship Event
                  </span>
                  <CountdownBadge targetDate={featuredEvents[0]?.date || '2026-11-18'} />
                </div>

                <div className="rounded-2xl p-5 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 relative overflow-hidden">
                  <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-white/10 rounded-full blur-xl" />
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-black/30 text-white">
                    {featuredEvents[0]?.category} • {featuredEvents[0]?.club}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-3 leading-snug">
                    {featuredEvents[0]?.title}
                  </h3>
                  <p className="text-xs text-blue-100 mt-2 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" /> {featuredEvents[0]?.venue}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Live Seat Occupancy</span>
                    <span className="text-white font-semibold">
                      {featuredEvents[0]?.registeredCount} / {featuredEvents[0]?.capacity} Registered
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full"
                      style={{
                        width: `${Math.min(100, Math.round(((featuredEvents[0]?.registeredCount || 218) / (featuredEvents[0]?.capacity || 250)) * 100))}%`
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    onClick={() => handleEnterPortal('Student', 'events')}
                    className="py-3 px-4 rounded-xl bg-white text-slate-950 font-bold text-xs hover:bg-blue-50 transition flex items-center justify-center gap-1.5"
                  >
                    Register Now <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEnterPortal('Principal', 'analytics')}
                    className="py-3 px-4 rounded-xl bg-white/10 text-white font-semibold text-xs hover:bg-white/15 border border-white/10 transition flex items-center justify-center gap-1.5"
                  >
                    Executive View <BarChart3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Upcoming Events */}
        <section id="showcase" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Curated Experiences</span>
              <h2 className="text-3xl font-bold text-white mt-1">Trending Campus Events</h2>
            </div>
            <button
              onClick={() => handleEnterPortal('Student', 'events')}
              className="text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              Explore Full Event Directory <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredEvents.map((ev) => (
              <div
                key={ev.id}
                className="group rounded-2xl bg-white/[0.04] border border-white/10 hover:border-purple-400/40 overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div className={`h-36 p-5 bg-gradient-to-br ${ev.bannerGradient} flex flex-col justify-between relative`}>
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-black/35 backdrop-blur-md">
                      {ev.category}
                    </span>
                    <CountdownBadge targetDate={ev.date} />
                  </div>
                  <p className="text-xs font-medium text-white/90">{ev.club}</p>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition">{ev.title}</h3>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2">{ev.description}</p>
                  </div>
                  <div className="space-y-3 pt-2 border-t border-white/10">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="flex items-center gap-1"><CalendarIcon className="w-3.5 h-3.5 text-blue-400" /> {ev.date}</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-purple-400" /> {ev.registeredCount}/{ev.capacity}</span>
                    </div>
                    <button
                      onClick={() => handleEnterPortal('Student', 'events')}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600/80 to-purple-600/80 hover:from-blue-500 hover:to-purple-500 text-xs font-bold text-white transition"
                    >
                      View & Claim Pass
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories & Platform Architecture */}
        <section id="categories" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-white">10 Integrated Enterprise Modules</h2>
            <p className="text-sm text-slate-400 mt-2">
              Designed for Deans, Principals, Faculty Coordinators, Student Clubs, and 6,000+ Students.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Cpu, title: 'Technical & Hackathons', count: '18 Events', color: 'text-cyan-400' },
              { icon: Music, title: 'Cultural & Performing Arts', count: '14 Events', color: 'text-fuchsia-400' },
              { icon: QrCode, title: 'QR Smart Check-In', count: 'Sub-second Scan', color: 'text-emerald-400' },
              { icon: Award, title: 'Verifiable Certificates', count: 'Unique Hash ID', color: 'text-amber-400' }
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] transition">
                <item.icon className={`w-8 h-8 ${item.color} mb-4`} />
                <h3 className="font-bold text-white">{item.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{item.count}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer id="about" className="border-t border-white/10 py-10 px-4 text-center text-xs text-slate-400">
          <p className="font-semibold text-slate-300">CAMPUS CONNECT — Enterprise Smart College Event Management System</p>
          <p className="mt-1">Built for University Accreditation, NAAC/NBA Documentation & Seamless Student Engagement.</p>
        </footer>
      </div>
    );
  }

  // ==========================================================================
  // RENDER: AUTHENTICATED PORTAL VIEW
  // ==========================================================================
  const unreadCount = notifications.filter((n) => !n.read).length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'events', label: 'Events', icon: Sparkles },
    { id: 'registrations', label: 'Registrations', icon: Ticket },
    { id: 'approvals', label: 'Approvals', icon: ShieldCheck, badge: stats.pendingApprovals },
    { id: 'attendance', label: 'Attendance & QR', icon: QrCode },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'clubs', label: 'Clubs', icon: Users },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadCount },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#060919] text-slate-100 flex overflow-x-hidden">
      {/* Toast Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto p-4 rounded-2xl bg-[#0f1636]/95 backdrop-blur-xl border border-indigo-400/30 shadow-2xl flex items-start gap-3 animate-fade-in"
          >
            <div className={`p-1.5 rounded-lg ${t.type === 'error' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
              {t.type === 'error' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-white">{t.title}</p>
              <p className="text-xs text-slate-300 mt-0.5">{t.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-[#080d24]/95 backdrop-blur-2xl border-r border-white/10 flex flex-col transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-extrabold tracking-tight text-white">CAMPUS CONNECT</h1>
              <p className="text-[10px] text-blue-300 uppercase tracking-widest">Enterprise Portal</p>
            </div>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Active Role Switcher Pill */}
        <div className="px-4 py-4 border-b border-white/10">
          <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1.5 px-1">
            Active Role Context
          </label>
          <select
            value={currentRole}
            onChange={(e) => {
              const nextRole = e.target.value;
              setCurrentRole(nextRole);
              triggerToast('Role Switched', `Now viewing portal as ${nextRole}`);
            }}
            className="w-full px-3 py-2.5 rounded-xl bg-white/[0.06] border border-white/15 text-xs font-semibold text-white focus:outline-none focus:border-purple-400"
          >
            {ROLES.map((r) => (
              <option key={r.id} value={r.id} className="bg-[#0b102b] text-white">
                {r.label}
              </option>
            ))}
          </select>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-gradient-to-r from-blue-600/90 to-purple-600/90 text-white shadow-lg shadow-indigo-600/25'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400'}`} />
                  {item.label}
                </span>
                {item.badge > 0 && (
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      active ? 'bg-white text-indigo-900' : 'bg-purple-500/30 text-purple-200 border border-purple-400/30'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
              {currentUser.avatar}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
              <p className="text-[11px] text-slate-400 truncate">{currentUser.dept}</p>
            </div>
          </div>
          <button
            onClick={() => setViewMode('landing')}
            className="w-full py-2.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-300 text-xs font-semibold flex items-center justify-center gap-2 transition"
          >
            <LogOut className="w-4 h-4" /> Exit to Landing Page
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-20 px-4 sm:px-8 border-b border-white/10 bg-[#070b1e]/80 backdrop-blur-xl flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white capitalize">
                {navItems.find((n) => n.id === activeTab)?.label || 'Dashboard'}
              </h2>
              <p className="text-xs text-slate-400 hidden sm:block">
                Academic Year 2026–27 • Semester Odd • Campus Connect Cloud
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className={`hidden md:inline-flex px-3 py-1.5 rounded-full text-xs font-semibold border ${ROLES.find((r) => r.id === currentRole)?.badge}`}>
              {currentRole}
            </span>
            <button
              onClick={() => setActiveTab('notifications')}
              className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 transition"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-purple-500 text-[10px] font-bold flex items-center justify-center text-white">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Dynamic Module Content */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          {activeTab === 'dashboard' && (
            <DashboardModule
              stats={stats}
              events={events}
              registrations={registrations}
              notifications={notifications}
              currentUser={currentUser}
              currentRole={currentRole}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'events' && (
            <EventsModule
              events={events}
              setEvents={setEvents}
              registrations={registrations}
              setRegistrations={setRegistrations}
              currentUser={currentUser}
              permissions={permissions}
              triggerToast={triggerToast}
              pushNotification={pushNotification}
            />
          )}

          {activeTab === 'registrations' && (
            <RegistrationsModule
              events={events}
              setEvents={setEvents}
              registrations={registrations}
              setRegistrations={setRegistrations}
              currentUser={currentUser}
              currentRole={currentRole}
              triggerToast={triggerToast}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'approvals' && (
            <ApprovalsModule
              events={events}
              setEvents={setEvents}
              permissions={permissions}
              currentRole={currentRole}
              triggerToast={triggerToast}
              pushNotification={pushNotification}
            />
          )}

          {activeTab === 'attendance' && (
            <AttendanceModule
              events={events}
              registrations={registrations}
              setRegistrations={setRegistrations}
              currentUser={currentUser}
              permissions={permissions}
              triggerToast={triggerToast}
            />
          )}

          {activeTab === 'certificates' && (
            <CertificatesModule
              events={events}
              registrations={registrations}
              certificates={certificates}
              setCertificates={setCertificates}
              currentUser={currentUser}
              permissions={permissions}
              triggerToast={triggerToast}
              pushNotification={pushNotification}
            />
          )}

          {activeTab === 'clubs' && (
            <ClubsModule
              clubs={clubs}
              setClubs={setClubs}
              permissions={permissions}
              currentUser={currentUser}
              triggerToast={triggerToast}
            />
          )}

          {activeTab === 'calendar' && (
            <CalendarModule events={events} setActiveTab={setActiveTab} />
          )}

          {activeTab === 'notifications' && (
            <NotificationsModule
              notifications={notifications}
              setNotifications={setNotifications}
              triggerToast={triggerToast}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsModule
              events={events}
              registrations={registrations}
              certificates={certificates}
              triggerToast={triggerToast}
            />
          )}

          {activeTab === 'feedback' && (
            <FeedbackModule
              events={events}
              feedbacks={feedbacks}
              setFeedbacks={setFeedbacks}
              currentUser={currentUser}
              currentRole={currentRole}
              triggerToast={triggerToast}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsModule
              currentUser={currentUser}
              currentRole={currentRole}
              setCurrentRole={setCurrentRole}
              triggerToast={triggerToast}
            />
          )}
        </main>
      </div>
    </div>
  );
}

// ============================================================================
// MODULE 1: MAIN DASHBOARD & CLICKABLE APPLICATION CARDS
// ============================================================================

function DashboardModule({ stats, events, registrations, notifications, currentUser, currentRole, setActiveTab }) {
  const kpiCards = [
    { label: 'Total Events', value: stats.totalEvents, sub: '+3 this month', icon: Layers, gradient: 'from-blue-500/20 to-indigo-500/10', accent: 'text-blue-400', target: 'events' },
    { label: 'Upcoming Events', value: stats.upcomingEvents, sub: 'Approved & Live', icon: CalendarIcon, gradient: 'from-cyan-500/20 to-blue-500/10', accent: 'text-cyan-400', target: 'calendar' },
    { label: 'Registered Students', value: stats.registeredStudents.toLocaleString(), sub: 'Active Profiles', icon: Users, gradient: 'from-purple-500/20 to-pink-500/10', accent: 'text-purple-400', target: 'registrations' },
    { label: 'Total Participation', value: stats.totalParticipation.toLocaleString(), sub: 'Across 8 Depts', icon: TrendingUp, gradient: 'from-emerald-500/20 to-teal-500/10', accent: 'text-emerald-400', target: 'analytics' },
    { label: 'Pending Approvals', value: stats.pendingApprovals, sub: 'Requires Review', icon: ShieldCheck, gradient: 'from-amber-500/20 to-orange-500/10', accent: 'text-amber-400', target: 'approvals' },
    { label: 'Completed Events', value: stats.completedEvents, sub: '100% Archived', icon: CheckCircle2, gradient: 'from-indigo-500/20 to-violet-500/10', accent: 'text-indigo-400', target: 'certificates' }
  ];

  const appModules = [
    { id: 'events', title: 'Event Management', desc: 'Create, edit, filter & manage college events', icon: Sparkles, color: 'from-blue-600 to-indigo-600' },
    { id: 'registrations', title: 'Student Registration', desc: 'Browse events, claim passes & track status', icon: Ticket, color: 'from-cyan-600 to-blue-600' },
    { id: 'approvals', title: 'Admin Approval System', desc: 'Review & approve faculty/club event proposals', icon: ShieldCheck, color: 'from-amber-500 to-orange-600' },
    { id: 'attendance', title: 'Attendance & QR Check-In', desc: 'Scan QR passes, mark presence & export CSV', icon: QrCode, color: 'from-emerald-600 to-teal-600' },
    { id: 'certificates', title: 'Certificates Management', desc: 'Issue PDF certificates & verify unique IDs', icon: Award, color: 'from-purple-600 to-pink-600' },
    { id: 'calendar', title: 'Interactive Event Calendar', desc: 'Monthly & weekly campus schedule explorer', icon: CalendarIcon, color: 'from-indigo-600 to-violet-600' },
    { id: 'clubs', title: 'Club Management', desc: 'Technical & cultural clubs, rosters & activities', icon: Users, color: 'from-fuchsia-600 to-purple-600' },
    { id: 'notifications', title: 'Notifications Center', desc: 'Real-time alerts, reminders & announcements', icon: Bell, color: 'from-sky-600 to-indigo-600' },
    { id: 'analytics', title: 'Reports & Analytics', desc: 'Participation charts, department metrics & exports', icon: BarChart3, color: 'from-violet-600 to-blue-600' },
    { id: 'feedback', title: 'Feedback & Ratings', desc: 'Student event reviews & quality insights', icon: MessageSquare, color: 'from-rose-600 to-orange-600' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Hero Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900/50 via-indigo-900/50 to-purple-900/50 border border-white/15 backdrop-blur-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-cyan-300 border border-white/10">
            {currentRole} Command Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome back, {currentUser.name}
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl">
            Real-time telemetry across {stats.totalEvents} campus events, {stats.pendingApprovals} pending executive approvals, and live student participation.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setActiveTab('events')}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" /> Explore / Create Event
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-bold flex items-center gap-2 transition"
          >
            <QrCode className="w-4 h-4 text-cyan-400" /> Launch QR Scanner
          </button>
        </div>
      </div>

      {/* 6 Dynamic KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {kpiCards.map((k, i) => {
          const Icon = k.icon;
          return (
            <button
              key={i}
              onClick={() => setActiveTab(k.target)}
              className={`text-left p-4 rounded-2xl bg-gradient-to-br ${k.gradient} border border-white/10 hover:border-white/25 transition-all hover:-translate-y-0.5`}
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className={`w-5 h-5 ${k.accent}`} />
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </div>
              <p className="text-2xl font-black text-white">{k.value}</p>
              <p className="text-xs font-semibold text-slate-200 mt-1">{k.label}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{k.sub}</p>
            </button>
          );
        })}
      </div>

      {/* Interactive Application Modules Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white">Enterprise Application Suite</h3>
            <p className="text-xs text-slate-400">Click any module card below to open its full interactive workspace</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {appModules.map((mod) => {
            const Icon = mod.icon;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveTab(mod.id)}
                className="group text-left p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-purple-400/40 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center shadow-lg mb-4 group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition">{mod.title}</h4>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{mod.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center text-[11px] font-semibold text-blue-400 group-hover:text-purple-300">
                  Open Module <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Split: Popularity Chart & Recent Activity */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Event Popularity & Seat Fill Rate</h3>
              <p className="text-xs text-slate-400">Live registration velocity across active college events</p>
            </div>
            <button onClick={() => setActiveTab('analytics')} className="text-xs text-blue-400 hover:underline">
              Full Analytics
            </button>
          </div>
          <div className="space-y-4">
            {events.slice(0, 5).map((ev) => {
              const pct = Math.min(100, Math.round((ev.registeredCount / ev.capacity) * 100));
              return (
                <div key={ev.id} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-200 truncate pr-4">{ev.title}</span>
                    <span className="text-slate-400 shrink-0">
                      {ev.registeredCount}/{ev.capacity} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-5 p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Recent Campus Activity</h3>
            <button onClick={() => setActiveTab('notifications')} className="text-xs text-purple-400 hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {notifications.slice(0, 4).map((n) => (
              <div key={n.id} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-white truncate">{n.title}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{n.message}</p>
                  <p className="text-[10px] text-slate-500 mt-1">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MODULE 2: EVENT MANAGEMENT (CRUD, Search, Filter, Smart Recommendations)
// ============================================================================

function EventsModule({ events, setEvents, registrations, setRegistrations, currentUser, permissions, triggerToast, pushNotification }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Technical',
    club: 'ACM Student Chapter',
    date: '2026-12-10',
    time: '10:00 AM',
    deadline: '2026-12-08',
    venue: 'Main Auditorium',
    capacity: 150,
    description: ''
  });

  const categories = ['All', 'Technical', 'Cultural', 'Workshop', 'Sports', 'Seminar'];

  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const matchesCat = selectedCategory === 'All' || ev.category === selectedCategory;
      const matchesSearch =
        ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.club.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ev.venue.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [events, selectedCategory, searchQuery]);

  // Smart Recommendation Engine based on student department
  const recommendedEvents = useMemo(() => {
    return events.filter((e) => e.status === 'Approved' && (e.category === 'Technical' || e.category === 'Workshop')).slice(0, 2);
  }, [events]);

  const openCreateModal = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      category: 'Technical',
      club: 'ACM Student Chapter',
      date: '2026-12-12',
      time: '10:00 AM',
      deadline: '2026-12-10',
      venue: 'Main Auditorium',
      capacity: 150,
      description: ''
    });
    setShowModal(true);
  };

  const openEditModal = (ev) => {
    setEditingEvent(ev);
    setFormData({
      title: ev.title,
      category: ev.category,
      club: ev.club,
      date: ev.date,
      time: ev.time,
      deadline: ev.deadline,
      venue: ev.venue,
      capacity: ev.capacity,
      description: ev.description
    });
    setShowModal(true);
  };

  const handleSaveEvent = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      triggerToast('Validation Error', 'Please complete event title and description.', 'error');
      return;
    }

    if (editingEvent) {
      setEvents((prev) =>
        prev.map((ev) => (ev.id === editingEvent.id ? { ...ev, ...formData, capacity: Number(formData.capacity) } : ev))
      );
      triggerToast('Event Updated', `"${formData.title}" has been updated.`);
    } else {
      const newEvent = {
        id: `EVT-${Math.floor(108 + Math.random() * 890)}`,
        ...formData,
        capacity: Number(formData.capacity),
        organizer: currentUser.name,
        registeredCount: 1,
        status: permissions.canApproveEvent ? 'Approved' : 'Pending',
        featured: false,
        bannerGradient: 'from-blue-600 via-indigo-600 to-purple-700',
        tags: [formData.category, 'Campus 2026']
      };
      setEvents((prev) => [newEvent, ...prev]);
      pushNotification(
        'approval',
        `New Event Proposal: ${newEvent.title}`,
        `Submitted by ${currentUser.name} (${newEvent.status}).`
      );
      triggerToast(
        permissions.canApproveEvent ? 'Event Published' : 'Proposal Submitted',
        permissions.canApproveEvent
          ? `"${newEvent.title}" is now live!`
          : `"${newEvent.title}" sent to Principal/Admin for approval.`
      );
    }
    setShowModal(false);
  };

  const handleDeleteEvent = (id, title) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    triggerToast('Event Removed', `"${title}" has been deleted.`, 'error');
  };

  const handleRegisterStudent = (ev) => {
    const already = registrations.some((r) => r.eventId === ev.id && r.studentId === currentUser.id && r.status === 'Confirmed');
    if (already) {
      triggerToast('Already Registered', 'You already hold a confirmed pass for this event.', 'error');
      return;
    }
    if (ev.registeredCount >= ev.capacity) {
      triggerToast('Event Full', 'Maximum capacity has been reached.', 'error');
      return;
    }

    const regId = `REG-${Math.floor(8810 + Math.random() * 1100)}`;
    const newReg = {
      id: regId,
      eventId: ev.id,
      studentId: currentUser.id,
      studentName: currentUser.name,
      rollNo: currentUser.rollNo || '23CS1042',
      dept: currentUser.dept,
      status: 'Confirmed',
      attended: false,
      checkInTime: null,
      qrToken: `CC-${ev.id}-${currentUser.id}-${regId}`,
      registeredAt: new Date().toISOString().split('T')[0]
    };

    setRegistrations((prev) => [newReg, ...prev]);
    setEvents((prev) =>
      prev.map((item) => (item.id === ev.id ? { ...item, registeredCount: item.registeredCount + 1 } : item))
    );
    pushNotification('registration', `Pass Confirmed: ${ev.title}`, `Ticket ${regId} is ready in Registrations.`);
    triggerToast('Registration Successful!', `Digital QR Pass ${regId} generated.`);
  };

  return (
    <div className="space-y-6">
      {/* Smart Recommendation Strip */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-purple-950/60 to-blue-950/80 border border-purple-400/25 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-300 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">AI Smart Recommendations for {currentUser.dept}</h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Top picks matching your academic track:{' '}
              {recommendedEvents.map((r) => r.title).join(' • ')}
            </p>
          </div>
        </div>
        {permissions.canCreateEvent && (
          <button
            onClick={openCreateModal}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-xs font-bold text-white shadow-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Create New Event
          </button>
        )}
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events, clubs, venues..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-white/[0.04] text-slate-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Event Cards Grid */}
      {filteredEvents.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white/[0.03] border border-white/10 text-center space-y-2">
          <p className="text-base font-bold text-white">No matching events found</p>
          <p className="text-xs text-slate-400">Try clearing your search filter or create a new campus event.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((ev) => {
            const isRegistered = registrations.some(
              (r) => r.eventId === ev.id && r.studentId === currentUser.id && r.status === 'Confirmed'
            );
            const fillPct = Math.min(100, Math.round((ev.registeredCount / ev.capacity) * 100));

            return (
              <div
                key={ev.id}
                className="rounded-2xl bg-white/[0.04] border border-white/10 hover:border-indigo-400/40 overflow-hidden flex flex-col justify-between transition-all"
              >
                <div>
                  <div className={`h-32 p-4 bg-gradient-to-br ${ev.bannerGradient} flex flex-col justify-between`}>
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-black/40 text-white">
                        {ev.category}
                      </span>
                      <span
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                          ev.status === 'Approved'
                            ? 'bg-emerald-500/30 text-emerald-100 border border-emerald-300/30'
                            : ev.status === 'Pending'
                            ? 'bg-amber-500/30 text-amber-100 border border-amber-300/30'
                            : 'bg-slate-900/60 text-slate-200'
                        }`}
                      >
                        {ev.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white/90 truncate">{ev.club}</span>
                      <CountdownBadge targetDate={ev.date} />
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="text-base font-bold text-white leading-snug">{ev.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{ev.description}</p>

                    <div className="space-y-1.5 text-xs text-slate-300 pt-1">
                      <p className="flex items-center gap-2">
                        <CalendarIcon className="w-3.5 h-3.5 text-blue-400" /> {ev.date} at {ev.time}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-purple-400" /> {ev.venue}
                      </p>
                    </div>

                    <div className="pt-2">
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-slate-400">Live Registrations</span>
                        <span className="text-white font-semibold">{ev.registeredCount} / {ev.capacity}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-500" style={{ width: `${fillPct}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 flex items-center gap-2">
                  {ev.status === 'Approved' && (
                    <button
                      onClick={() => handleRegisterStudent(ev)}
                      disabled={isRegistered}
                      className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition ${
                        isRegistered
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white'
                      }`}
                    >
                      {isRegistered ? '✓ Pass Claimed' : 'Register Now'}
                    </button>
                  )}
                  {ev.status === 'Pending' && (
                    <div className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold text-center">
                      Awaiting Executive Approval
                    </div>
                  )}
                  {ev.status === 'Completed' && (
                    <div className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 text-slate-400 text-xs font-semibold text-center">
                      Event Concluded
                    </div>
                  )}

                  {permissions.canCreateEvent && (
                    <button
                      onClick={() => openEditModal(ev)}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300"
                      title="Edit Event"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  )}
                  {permissions.canDeleteEvent && (
                    <button
                      onClick={() => handleDeleteEvent(ev.id, ev.title)}
                      className="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400"
                      title="Delete Event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-3xl bg-[#0c122e] border border-white/15 p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">
                {editingEvent ? 'Edit Campus Event' : 'Propose / Create New Event'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. National CyberSecurity CTF 2026"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#11193d] border border-white/10 text-sm text-white"
                  >
                    {categories.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Organizing Club / Dept</label>
                  <input
                    type="text"
                    value={formData.club}
                    onChange={(e) => setFormData({ ...formData, club: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Event Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Start Time</label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Max Capacity</label>
                  <input
                    type="number"
                    min="10"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Venue / Auditorium</label>
                <input
                  type="text"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Event Description *</label>
                <textarea
                  rows="3"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe agenda, rules, speakers, and prizes..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 text-xs font-semibold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-xs font-bold text-white"
                >
                  {editingEvent ? 'Save Changes' : 'Submit Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// MODULE 3: STUDENT REGISTRATIONS & DIGITAL QR PASSES
// ============================================================================

function RegistrationsModule({ events, setEvents, registrations, setRegistrations, currentUser, currentRole, triggerToast, setActiveTab }) {
  const [selectedPass, setSelectedPass] = useState(null);

  const visibleRegistrations = useMemo(() => {
    if (currentRole === 'Student') {
      return registrations.filter((r) => r.studentId === currentUser.id);
    }
    return registrations;
  }, [registrations, currentRole, currentUser]);

  const handleCancelRegistration = (reg) => {
    setRegistrations((prev) =>
      prev.map((r) => (r.id === reg.id ? { ...r, status: 'Cancelled' } : r))
    );
    setEvents((prev) =>
      prev.map((e) => (e.id === reg.eventId ? { ...e, registeredCount: Math.max(0, e.registeredCount - 1) } : e))
    );
    triggerToast('Registration Cancelled', `Pass ${reg.id} has been cancelled.`, 'error');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white">
            {currentRole === 'Student' ? 'My Event Passes & Registrations' : 'All Campus Student Registrations'}
          </h3>
          <p className="text-xs text-slate-400">View digital QR entry passes, check-in status, or manage bookings</p>
        </div>
        <button
          onClick={() => setActiveTab('events')}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-xs font-bold text-white flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" /> Browse Events to Register
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {visibleRegistrations.map((reg) => {
          const ev = events.find((e) => e.id === reg.eventId);
          return (
            <div key={reg.id} className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-400">{reg.id}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      reg.status === 'Confirmed'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {reg.status}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">{ev?.title || reg.eventId}</h4>
                <p className="text-xs text-slate-300">
                  Participant: <span className="font-semibold text-white">{reg.studentName}</span> ({reg.rollNo})
                </p>
                <p className="text-xs text-slate-400">
                  Venue: {ev?.venue || 'Main Campus'} • {ev?.date}
                </p>
                <div className="pt-1">
                  {reg.attended ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Checked In ({reg.checkInTime})
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs text-amber-300">
                      <Clock className="w-3.5 h-3.5" /> Pending Gate QR Scan
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                <button
                  onClick={() => setSelectedPass({ reg, ev })}
                  className="flex-1 py-2 px-3 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-400/30 text-blue-200 text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <QrCode className="w-3.5 h-3.5" /> Show QR Pass
                </button>
                {reg.status === 'Confirmed' && !reg.attended && (
                  <button
                    onClick={() => handleCancelRegistration(reg)}
                    className="py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Digital QR Entry Pass Modal */}
      {selectedPass && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#11193e] to-[#080c22] border border-purple-400/30 p-6 text-center space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">CAMPUS CONNECT PASS</span>
              <button onClick={() => setSelectedPass(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-bold text-white">{selectedPass.ev?.title}</h4>
              <p className="text-xs text-slate-400">{selectedPass.ev?.venue} • {selectedPass.ev?.date}</p>
            </div>

            <div className="flex justify-center">
              <QRCodeMatrix value={selectedPass.reg.qrToken} size={160} />
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1">
              <p className="font-bold text-white">{selectedPass.reg.studentName} • {selectedPass.reg.rollNo}</p>
              <p className="font-mono text-[11px] text-purple-300">{selectedPass.reg.qrToken}</p>
            </div>

            <button
              onClick={() => setSelectedPass(null)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-xs font-bold text-white"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// MODULE 4: ADMIN & PRINCIPAL APPROVAL WORKFLOW
// ============================================================================

function ApprovalsModule({ events, setEvents, permissions, currentRole, triggerToast, pushNotification }) {
  const pendingEvents = events.filter((e) => e.status === 'Pending');
  const reviewedEvents = events.filter((e) => e.status !== 'Pending');

  const handleDecision = (ev, decision) => {
    if (!permissions.canApproveEvent) {
      triggerToast('Access Restricted', `Only Super Admin or Principal can approve proposals (Current: ${currentRole}).`, 'error');
      return;
    }
    setEvents((prev) => prev.map((item) => (item.id === ev.id ? { ...item, status: decision } : item)));
    pushNotification(
      'approval',
      `Proposal ${decision}: ${ev.title}`,
      `Reviewed by ${currentRole}. Status updated to ${decision}.`
    );
    triggerToast(`Proposal ${decision}`, `"${ev.title}" marked as ${decision}.`, decision === 'Approved' ? 'success' : 'error');
  };

  return (
    <div className="space-y-8">
      <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-400/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0" />
          <div>
            <h3 className="text-sm font-bold text-white">Executive Event Governance Queue</h3>
            <p className="text-xs text-slate-300">
              {permissions.canApproveEvent
                ? 'You have executive authority to approve or reject campus event proposals.'
                : `Viewing in read-only mode as ${currentRole}. Switch to Principal or Super Admin to action requests.`}
            </p>
          </div>
        </div>
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-200 text-xs font-bold self-start">
          {pendingEvents.length} Pending Review
        </span>
      </div>

      {/* Pending Proposals */}
      <div className="space-y-4">
        <h4 className="text-base font-bold text-white">Pending Event Proposals</h4>
        {pendingEvents.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 text-center text-xs text-slate-400">
            All event proposals have been reviewed. Zero pending items in queue.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {pendingEvents.map((ev) => (
              <div key={ev.id} className="p-6 rounded-2xl bg-white/[0.04] border border-amber-400/30 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-purple-500/20 text-purple-300">
                      {ev.category} • {ev.club}
                    </span>
                    <h5 className="text-base font-bold text-white mt-2">{ev.title}</h5>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{ev.id}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{ev.description}</p>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 bg-white/[0.03] p-3 rounded-xl">
                  <p>Organizer: <span className="text-white font-medium">{ev.organizer}</span></p>
                  <p>Capacity: <span className="text-white font-medium">{ev.capacity} Seats</span></p>
                  <p>Date: <span className="text-white font-medium">{ev.date}</span></p>
                  <p>Venue: <span className="text-white font-medium">{ev.venue}</span></p>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <button
                    onClick={() => handleDecision(ev, 'Approved')}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <Check className="w-4 h-4" /> Approve & Publish
                  </button>
                  <button
                    onClick={() => handleDecision(ev, 'Rejected')}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <X className="w-4 h-4" /> Reject Proposal
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reviewed History */}
      <div className="space-y-3">
        <h4 className="text-base font-bold text-white">Approved & Archived Events</h4>
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.05] text-slate-300 uppercase">
              <tr>
                <th className="p-3.5">Event</th>
                <th className="p-3.5">Club / Organizer</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {reviewedEvents.map((ev) => (
                <tr key={ev.id} className="hover:bg-white/[0.02]">
                  <td className="p-3.5 font-semibold text-white">{ev.title}</td>
                  <td className="p-3.5 text-slate-300">{ev.club} ({ev.organizer})</td>
                  <td className="p-3.5 text-slate-400">{ev.date}</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-1 rounded-full font-bold ${
                        ev.status === 'Approved'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : ev.status === 'Rejected'
                          ? 'bg-rose-500/20 text-rose-300'
                          : 'bg-blue-500/20 text-blue-300'
                      }`}
                    >
                      {ev.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MODULE 5: ATTENDANCE & QR CHECK-IN SIMULATOR + CSV EXPORT
// ============================================================================

function AttendanceModule({ events, registrations, setRegistrations, triggerToast }) {
  const [scanInput, setScanInput] = useState('CC-EVT102-USR005-8802');
  const [selectedEventFilter, setSelectedEventFilter] = useState('All');

  const handleSimulatedScan = (e) => {
    e.preventDefault();
    const target = registrations.find(
      (r) => r.qrToken.toLowerCase() === scanInput.trim().toLowerCase() || r.id.toLowerCase() === scanInput.trim().toLowerCase()
    );
    if (!target) {
      triggerToast('Invalid QR Token', 'No matching registration pass found in database.', 'error');
      return;
    }
    if (target.attended) {
      triggerToast('Already Checked In', `${target.studentName} was already verified at ${target.checkInTime}.`, 'error');
      return;
    }
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setRegistrations((prev) =>
      prev.map((r) => (r.id === target.id ? { ...r, attended: true, checkInTime: `Today ${nowTime}` } : r))
    );
    triggerToast('QR Check-In Verified!', `${target.studentName} (${target.rollNo}) marked Present.`);
  };

  const toggleManualAttendance = (reg) => {
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setRegistrations((prev) =>
      prev.map((r) =>
        r.id === reg.id
          ? { ...r, attended: !r.attended, checkInTime: !r.attended ? `Today ${nowTime}` : null }
          : r
      )
    );
    triggerToast('Attendance Updated', `${reg.studentName} marked ${!reg.attended ? 'Present' : 'Absent'}.`);
  };

  const handleExportCSV = () => {
    const headers = ['Registration ID', 'Student Name', 'Roll No', 'Department', 'Event ID', 'Status', 'Attended', 'Check-In Time'];
    const rows = registrations.map((r) => [
      r.id,
      r.studentName,
      r.rollNo,
      r.dept,
      r.eventId,
      r.status,
      r.attended ? 'Present' : 'Absent',
      r.checkInTime || 'N/A'
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'campus_connect_attendance_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('CSV Report Downloaded', 'Attendance log exported for NAAC/Department records.');
  };

  const filteredList = registrations.filter(
    (r) => selectedEventFilter === 'All' || r.eventId === selectedEventFilter
  );

  return (
    <div className="space-y-6">
      {/* QR Scanner Simulator Box */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 p-6 rounded-2xl bg-gradient-to-br from-blue-950/70 via-indigo-950/60 to-purple-950/70 border border-cyan-400/30 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-300">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Smart QR Gate Check-In Terminal</h3>
              <p className="text-xs text-slate-300">Scan student QR token or paste Registration ID for instant attendance logging</p>
            </div>
          </div>

          <form onSubmit={handleSimulatedScan} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={scanInput}
              onChange={(e) => setScanInput(e.target.value)}
              placeholder="Enter QR Token (e.g. CC-EVT102-USR005-8802)"
              className="flex-1 px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-xs font-bold text-slate-950 shadow-lg flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" /> Verify & Check-In
            </button>
          </form>

          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
            <span>Quick Test Tokens:</span>
            {registrations.slice(0, 3).map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setScanInput(r.qrToken)}
                className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 font-mono text-slate-200"
              >
                {r.qrToken}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 p-6 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col justify-between space-y-4">
          <div>
            <h4 className="text-sm font-bold text-white">Live Attendance Summary</h4>
            <p className="text-xs text-slate-400 mt-1">Real-time biometric & QR gate synchronization</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-2xl font-black text-emerald-400">
                {registrations.filter((r) => r.attended).length}
              </p>
              <p className="text-xs text-slate-300 mt-1">Verified Present</p>
            </div>
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <p className="text-2xl font-black text-amber-400">
                {registrations.filter((r) => !r.attended).length}
              </p>
              <p className="text-xs text-slate-300 mt-1">Awaiting Check-In</p>
            </div>
          </div>
          <button
            onClick={handleExportCSV}
            className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-white flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 text-cyan-400" /> Export Attendance CSV
          </button>
        </div>
      </div>

      {/* Attendance Roster Table */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h4 className="text-base font-bold text-white">Participant Check-In Log</h4>
          <select
            value={selectedEventFilter}
            onChange={(e) => setSelectedEventFilter(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-[#0e1533] border border-white/15 text-xs text-white"
          >
            <option value="All">All Events</option>
            {events.map((ev) => (
              <option key={ev.id} value={ev.id}>{ev.title}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.05] text-slate-300 uppercase">
              <tr>
                <th className="p-3.5">Pass ID</th>
                <th className="p-3.5">Student</th>
                <th className="p-3.5">Event</th>
                <th className="p-3.5">Check-In Time</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredList.map((reg) => {
                const ev = events.find((e) => e.id === reg.eventId);
                return (
                  <tr key={reg.id} className="hover:bg-white/[0.02]">
                    <td className="p-3.5 font-mono text-cyan-300">{reg.id}</td>
                    <td className="p-3.5">
                      <p className="font-bold text-white">{reg.studentName}</p>
                      <p className="text-[11px] text-slate-400">{reg.rollNo} • {reg.dept}</p>
                    </td>
                    <td className="p-3.5 text-slate-300 max-w-xs truncate">{ev?.title || reg.eventId}</td>
                    <td className="p-3.5 text-slate-400">{reg.checkInTime || '—'}</td>
                    <td className="p-3.5">
                      <span
                        className={`px-2.5 py-1 rounded-full font-bold ${
                          reg.attended ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700/50 text-slate-300'
                        }`}
                      >
                        {reg.attended ? 'Present' : 'Not Scanned'}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => toggleManualAttendance(reg)}
                        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold"
                      >
                        {reg.attended ? 'Undo' : 'Mark Present'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MODULE 6: DIGITAL CERTIFICATES & UNIQUE ID VERIFICATION
// ============================================================================

function CertificatesModule({ events, certificates, setCertificates, currentUser, permissions, triggerToast, pushNotification }) {
  const [verifyQuery, setVerifyQuery] = useState('CERT-CC-2026-9421');
  const [verifiedCert, setVerifiedCert] = useState(certificates[0]);
  const [previewCert, setPreviewCert] = useState(null);

  const [issueForm, setIssueForm] = useState({
    studentName: 'Ananya Deshmukh',
    rollNo: '23CS1042',
    dept: 'Computer Science & Engineering',
    eventTitle: events[0]?.title || 'TechnoVanza 2026: National 36-Hour Hackathon',
    type: 'Winner - 1st Place'
  });

  const handleVerify = (e) => {
    e.preventDefault();
    const found = certificates.find((c) => c.certId.toLowerCase() === verifyQuery.trim().toLowerCase());
    setVerifiedCert(found || 'NOT_FOUND');
    if (found) {
      triggerToast('Certificate Authentic', `Verified credential for ${found.studentName}.`);
    } else {
      triggerToast('Verification Failed', 'No matching certificate ID in university registry.', 'error');
    }
  };

  const handleIssueCertificate = (e) => {
    e.preventDefault();
    const newId = `CERT-CC-2026-${Math.floor(1000 + Math.random() * 8999)}`;
    const newCert = {
      certId: newId,
      ...issueForm,
      issueDate: new Date().toISOString().split('T')[0],
      signatory: `${currentUser.name} (${currentUser.role})`
    };
    setCertificates((prev) => [newCert, ...prev]);
    setPreviewCert(newCert);
    pushNotification('certificate', `New Certificate Issued: ${newId}`, `${issueForm.type} awarded to ${issueForm.studentName}.`);
    triggerToast('Certificate Generated', `Credential ${newId} signed and stored.`);
  };

  return (
    <div className="space-y-8">
      {/* Top Split: Certificate Verification Tool & Issue Form */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Verification Portal */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-gradient-to-br from-indigo-950/80 to-purple-950/60 border border-purple-400/30 space-y-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <div>
              <h3 className="text-base font-bold text-white">Instant Digital Credential Verification</h3>
              <p className="text-xs text-slate-300">Verify authenticity of any Campus Connect certificate using its unique ID</p>
            </div>
          </div>

          <form onSubmit={handleVerify} className="flex gap-2">
            <input
              type="text"
              value={verifyQuery}
              onChange={(e) => setVerifyQuery(e.target.value)}
              placeholder="e.g. CERT-CC-2026-9421"
              className="flex-1 px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs font-mono text-white"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white"
            >
              Verify ID
            </button>
          </form>

          {verifiedCert && verifiedCert !== 'NOT_FOUND' && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-400/30 space-y-1.5 text-xs">
              <p className="font-bold text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> VALID UNIVERSITY CREDENTIAL
              </p>
              <p className="text-white font-semibold">{verifiedCert.studentName} ({verifiedCert.rollNo})</p>
              <p className="text-slate-300">{verifiedCert.type} — {verifiedCert.eventTitle}</p>
              <p className="text-[11px] text-slate-400">Issued: {verifiedCert.issueDate} • Signed by {verifiedCert.signatory}</p>
            </div>
          )}

          {verifiedCert === 'NOT_FOUND' && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-400/30 text-xs text-rose-300 font-semibold">
              Invalid or Revoked Certificate ID. Please check the credential hash.
            </div>
          )}
        </div>

        {/* Issue New Certificate */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-4">
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-amber-400" />
            <div>
              <h3 className="text-base font-bold text-white">Generate Participation / Winner Certificate</h3>
              <p className="text-xs text-slate-400">Auto-assigns cryptographic verification ID & QR seal</p>
            </div>
          </div>

          <form onSubmit={handleIssueCertificate} className="space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                value={issueForm.studentName}
                onChange={(e) => setIssueForm({ ...issueForm, studentName: e.target.value })}
                placeholder="Student Full Name"
                className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
              />
              <input
                type="text"
                required
                value={issueForm.rollNo}
                onChange={(e) => setIssueForm({ ...issueForm, rollNo: e.target.value })}
                placeholder="Roll Number"
                className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <select
                value={issueForm.eventTitle}
                onChange={(e) => setIssueForm({ ...issueForm, eventTitle: e.target.value })}
                className="px-3.5 py-2 rounded-xl bg-[#0e1533] border border-white/10 text-xs text-white"
              >
                {events.map((ev) => (
                  <option key={ev.id} value={ev.title}>{ev.title}</option>
                ))}
              </select>
              <select
                value={issueForm.type}
                onChange={(e) => setIssueForm({ ...issueForm, type: e.target.value })}
                className="px-3.5 py-2 rounded-xl bg-[#0e1533] border border-white/10 text-xs text-white"
              >
                <option value="Participation">Participation Certificate</option>
                <option value="Winner - 1st Place">Winner - 1st Place</option>
                <option value="Runner Up - 2nd Place">Runner Up - 2nd Place</option>
                <option value="Best Innovation Award">Best Innovation Award</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-xs font-bold text-white"
            >
              Generate & Sign Digital Certificate
            </button>
          </form>
        </div>
      </div>

      {/* Issued Certificates Gallery */}
      <div className="space-y-3">
        <h4 className="text-base font-bold text-white">Issued Certificates Repository</h4>
        <div className="grid md:grid-cols-3 gap-5">
          {certificates.map((cert) => (
            <div key={cert.certId} className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-amber-300">{cert.certId}</span>
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-200 text-[10px] font-bold">
                  {cert.type}
                </span>
              </div>
              <div>
                <h5 className="text-sm font-bold text-white">{cert.studentName}</h5>
                <p className="text-xs text-slate-400 mt-0.5">{cert.eventTitle}</p>
              </div>
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => setPreviewCert(cert)}
                  className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" /> Preview & Print PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Printable Certificate Modal */}
      {previewCert && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white text-slate-900 p-8 sm:p-10 relative shadow-2xl border-8 border-double border-indigo-900 space-y-6">
            <button
              onClick={() => setPreviewCert(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2 border-b border-slate-200 pb-5">
              <p className="text-xs font-extrabold tracking-[0.25em] text-indigo-700 uppercase">
                CAMPUS CONNECT UNIVERSITY PORTAL
              </p>
              <h2 className="text-3xl font-serif font-black text-slate-900">Certificate of Achievement</h2>
              <p className="text-xs text-slate-500">Credential ID: {previewCert.certId}</p>
            </div>

            <div className="text-center space-y-3 py-2">
              <p className="text-sm text-slate-600">This is proudly presented to</p>
              <h3 className="text-3xl font-bold text-indigo-950 underline decoration-amber-400 decoration-2 underline-offset-8">
                {previewCert.studentName}
              </h3>
              <p className="text-xs text-slate-500">Roll No: {previewCert.rollNo} • {previewCert.dept}</p>
              <p className="text-sm text-slate-700 max-w-lg mx-auto pt-2 leading-relaxed">
                For securing <span className="font-bold text-indigo-800">{previewCert.type}</span> in{' '}
                <span className="font-bold text-slate-900">{previewCert.eventTitle}</span> held on {previewCert.issueDate}.
              </p>
            </div>

            <div className="flex items-end justify-between pt-4 border-t border-slate-200">
              <div className="text-left">
                <QRCodeMatrix value={previewCert.certId} size={74} />
                <p className="text-[10px] text-slate-400 mt-1">Scan to verify authenticity</p>
              </div>
              <div className="text-right space-y-1">
                <p className="font-serif italic text-lg text-indigo-950">{previewCert.signatory.split('(')[0]}</p>
                <div className="h-px w-48 bg-slate-400 ml-auto" />
                <p className="text-[11px] font-semibold text-slate-600">{previewCert.signatory}</p>
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <button
                onClick={() => {
                  window.print();
                  triggerToast('Print / Save PDF', 'Use your browser print dialog to save as PDF.');
                }}
                className="px-6 py-2.5 rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-bold flex items-center gap-2"
              >
                <Printer className="w-4 h-4" /> Print / Download PDF Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// MODULE 7: CLUB MANAGEMENT
// ============================================================================

function ClubsModule({ clubs, setClubs, permissions, currentUser, triggerToast }) {
  const [newMemberName, setNewMemberName] = useState('');
  const [activeClubId, setActiveClubId] = useState(clubs[0]?.id);

  const selectedClub = clubs.find((c) => c.id === activeClubId) || clubs[0];

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;
    setClubs((prev) =>
      prev.map((c) =>
        c.id === selectedClub.id
          ? {
              ...c,
              membersCount: c.membersCount + 1,
              members: [...c.members, `${newMemberName.trim()} (Member)`]
            }
          : c
      )
    );
    triggerToast('Member Added', `${newMemberName} joined ${selectedClub.name}.`);
    setNewMemberName('');
  };

  return (
    <div className="grid lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 space-y-4">
        <h3 className="text-base font-bold text-white">Registered Student Clubs & Societies</h3>
        {clubs.map((club) => (
          <button
            key={club.id}
            onClick={() => setActiveClubId(club.id)}
            className={`w-full text-left p-5 rounded-2xl border transition-all ${
              selectedClub.id === club.id
                ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-purple-400/50 shadow-lg'
                : 'bg-white/[0.04] border-white/10 hover:bg-white/[0.07]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-500/20 text-blue-300">
                {club.category}
              </span>
              <span className="text-xs text-slate-300 font-semibold">{club.membersCount} Members</span>
            </div>
            <h4 className="text-base font-bold text-white mt-2">{club.name}</h4>
            <p className="text-xs text-slate-400 mt-1">Lead: {club.lead} • Advisor: {club.facultyAdvisor}</p>
          </button>
        ))}
      </div>

      {selectedClub && (
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-bold text-purple-400 uppercase">{selectedClub.category} Society</span>
              <h3 className="text-2xl font-bold text-white mt-0.5">{selectedClub.name}</h3>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-cyan-400">{selectedClub.membersCount}</p>
              <p className="text-[11px] text-slate-400">Active Members</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{selectedClub.description}</p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300">Core Committee & Roster</h4>
              <ul className="space-y-1.5 text-xs text-slate-200">
                {selectedClub.members.map((m, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> {m}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300">Signature Club Activities</h4>
              <ul className="space-y-1.5 text-xs text-slate-200">
                {selectedClub.activities.map((act, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" /> {act}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Add Member Form */}
          <form onSubmit={handleAddMember} className="pt-2 flex gap-2">
            <input
              type="text"
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              placeholder="Add student member name (e.g. Pranav Joshi)..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-xs font-bold text-white"
            >
              + Add Member
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// MODULE 8: INTERACTIVE CAMPUS EVENT CALENDAR
// ============================================================================

function CalendarModule({ events, setActiveTab }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewType, setViewType] = useState('month');

  // November 2026 Calendar Days (Nov 1, 2026 is Sunday)
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  const getEventsForDay = (day) => {
    const dateStr = `2026-11-${String(day).padStart(2, '0')}`;
    return events.filter((e) => e.date === dateStr);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white">November 2026 — Master Campus Schedule</h3>
          <p className="text-xs text-slate-400">Click any highlighted event pill to inspect venue, organizer & timings</p>
        </div>
        <div className="flex gap-2">
          {['month', 'agenda'].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewType(mode)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize ${
                viewType === mode ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-300 border border-white/10'
              }`}
            >
              {mode} View
            </button>
          ))}
        </div>
      </div>

      {viewType === 'month' ? (
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden">
          <div className="grid grid-cols-7 bg-white/[0.05] text-center py-3 text-xs font-bold text-slate-300 border-b border-white/10">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 auto-rows-[105px] divide-x divide-y divide-white/10">
            {daysInMonth.map((day) => {
              const dayEvents = getEventsForDay(day);
              return (
                <div key={day} className="p-2 flex flex-col justify-between hover:bg-white/[0.02] transition">
                  <span className={`text-xs font-bold ${day === 12 ? 'px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 self-start' : 'text-slate-400'}`}>
                    {day}
                  </span>
                  <div className="space-y-1 overflow-y-auto">
                    {dayEvents.map((ev) => (
                      <button
                        key={ev.id}
                        onClick={() => setSelectedEvent(ev)}
                        className="w-full text-left px-2 py-1 rounded-md bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-[10px] font-bold text-white truncate hover:brightness-110"
                      >
                        {ev.title}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((ev) => (
            <div
              key={ev.id}
              onClick={() => setSelectedEvent(ev)}
              className="p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
            >
              <div>
                <span className="text-xs font-bold text-cyan-400">{ev.date} • {ev.time}</span>
                <h4 className="text-sm font-bold text-white mt-0.5">{ev.title}</h4>
                <p className="text-xs text-slate-400">{ev.venue} • {ev.club}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-200 self-start">
                {ev.category}
              </span>
            </div>
          ))}
        </div>
      )}

      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#0d1333] border border-white/15 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-500/20 text-blue-300">
                {selectedEvent.category}
              </span>
              <button onClick={() => setSelectedEvent(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <h4 className="text-lg font-bold text-white">{selectedEvent.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{selectedEvent.description}</p>
            <div className="p-3.5 rounded-xl bg-white/5 text-xs space-y-1.5 text-slate-200">
              <p><strong>Date & Time:</strong> {selectedEvent.date} at {selectedEvent.time}</p>
              <p><strong>Venue:</strong> {selectedEvent.venue}</p>
              <p><strong>Club:</strong> {selectedEvent.club}</p>
              <p><strong>Registrations:</strong> {selectedEvent.registeredCount} / {selectedEvent.capacity}</p>
            </div>
            <button
              onClick={() => {
                setSelectedEvent(null);
                setActiveTab('events');
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-xs font-bold text-white"
            >
              Go to Event Registration
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// MODULE 9: NOTIFICATIONS CENTER
// ============================================================================

function NotificationsModule({ notifications, setNotifications, triggerToast }) {
  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    triggerToast('Inbox Cleared', 'All notifications marked as read.');
  };

  return (
    <div className="max-w-3xl space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Real-Time Notifications & Announcements</h3>
          <p className="text-xs text-slate-400">Registration receipts, approval status alerts & event reminders</p>
        </div>
        <button
          onClick={markAllRead}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white"
        >
          Mark All Read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() =>
              setNotifications((prev) => prev.map((item) => (item.id === n.id ? { ...item, read: true } : item)))
            }
            className={`p-4 rounded-2xl border transition cursor-pointer flex items-start gap-4 ${
              n.read
                ? 'bg-white/[0.02] border-white/10 opacity-75'
                : 'bg-indigo-950/50 border-indigo-400/40 shadow-lg'
            }`}
          >
            <div className="p-2.5 rounded-xl bg-blue-500/20 text-cyan-300 shrink-0">
              <Bell className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-white">{n.title}</h4>
                <span className="text-[11px] text-slate-400">{n.time}</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">{n.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// MODULE 10: REPORTS & ANALYTICS DASHBOARD
// ============================================================================

function AnalyticsModule({ events, registrations, certificates, triggerToast }) {
  const deptStats = [
    { dept: 'Computer Science (CSE)', participants: 540, color: 'from-blue-500 to-cyan-400' },
    { dept: 'Electronics & Comm. (ECE)', participants: 410, color: 'from-purple-500 to-indigo-400' },
    { dept: 'Information Tech (IT)', participants: 365, color: 'from-fuchsia-500 to-pink-400' },
    { dept: 'Mechanical Engg. (ME)', participants: 280, color: 'from-emerald-500 to-teal-400' },
    { dept: 'Management (MBA)', participants: 220, color: 'from-amber-500 to-orange-400' }
  ];

  const categoryBreakdown = [
    { label: 'Technical & Hackathons', pct: 42, color: '#3b82f6' },
    { label: 'Cultural & Arts', pct: 28, color: '#a855f7' },
    { label: 'Workshops & Labs', pct: 18, color: '#06b6d4' },
    { label: 'Sports & Seminars', pct: 12, color: '#10b981' }
  ];

  const handleDownloadSummary = () => {
    const summary = [
      'CAMPUS CONNECT - EXECUTIVE ANALYTICS REPORT (2026-27)',
      `Total Events: ${events.length}`,
      `Total Registrations Logged: ${events.reduce((a, b) => a + b.registeredCount, 0)}`,
      `Verified Certificates Issued: ${certificates.length}`,
      '',
      'DEPARTMENT PARTICIPATION:',
      ...deptStats.map((d) => `- ${d.dept}: ${d.participants} Students`)
    ].join('\n');

    const blob = new Blob([summary], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Campus_Connect_Executive_Report_2026.txt';
    a.click();
    triggerToast('Executive Report Downloaded', 'NAAC/Principal summary report saved.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white">Institutional Event Intelligence & Reports</h3>
          <p className="text-xs text-slate-400">Department-wise engagement, category distribution & turnout metrics</p>
        </div>
        <button
          onClick={handleDownloadSummary}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-xs font-bold text-white flex items-center gap-2 self-start"
        >
          <Download className="w-4 h-4" /> Download Principal Report
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Department Bar Chart */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-5">
          <h4 className="text-sm font-bold text-white">Department-Wise Student Participation</h4>
          <div className="space-y-4">
            {deptStats.map((d) => (
              <div key={d.dept} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-200">{d.dept}</span>
                  <span className="font-bold text-cyan-300">{d.participants} Students</span>
                </div>
                <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${d.color}`}
                    style={{ width: `${Math.round((d.participants / 600) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Donut / Breakdown */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-5">
          <h4 className="text-sm font-bold text-white">Event Category Share</h4>
          <div className="flex items-center justify-center py-2">
            <svg width="160" height="160" viewBox="0 0 36 36" className="-rotate-90">
              <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#1e293b" strokeWidth="3.8" />
              <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#3b82f6" strokeWidth="3.8" strokeDasharray="42 58" strokeDashoffset="0" />
              <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#a855f7" strokeWidth="3.8" strokeDasharray="28 72" strokeDashoffset="-42" />
              <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#06b6d4" strokeWidth="3.8" strokeDasharray="18 82" strokeDashoffset="-70" />
              <circle cx="18" cy="18" r="15.9" fill="transparent" stroke="#10b981" strokeWidth="3.8" strokeDasharray="12 88" strokeDashoffset="-88" />
            </svg>
          </div>
          <div className="space-y-2">
            {categoryBreakdown.map((c) => (
              <div key={c.label} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                  {c.label}
                </span>
                <span className="font-bold text-white">{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MODULE 11: FEEDBACK & RATING SYSTEM
// ============================================================================

function FeedbackModule({ events, feedbacks, setFeedbacks, currentUser, triggerToast }) {
  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id || 'EVT-101');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      triggerToast('Empty Review', 'Please share a brief comment before submitting.', 'error');
      return;
    }
    const ev = events.find((item) => item.id === selectedEventId);
    const newEntry = {
      id: `FDB-${Date.now()}`,
      eventId: selectedEventId,
      eventTitle: ev?.title || 'Campus Event',
      studentName: currentUser.name,
      rating,
      comment: comment.trim(),
      date: new Date().toISOString().split('T')[0]
    };
    setFeedbacks((prev) => [newEntry, ...prev]);
    setComment('');
    triggerToast('Feedback Submitted', 'Thank you for helping improve campus events!');
  };

  return (
    <div className="grid lg:grid-cols-12 gap-6">
      <div className="lg:col-span-5 p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-4 self-start">
        <h3 className="text-base font-bold text-white">Submit Event Experience Feedback</h3>
        <form onSubmit={handleSubmitFeedback} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Select Event</label>
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e1533] border border-white/10 text-xs text-white"
            >
              {events.map((ev) => (
                <option key={ev.id} value={ev.id}>{ev.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Overall Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setRating(num)}
                  className={`p-2 rounded-xl border transition ${
                    rating >= num
                      ? 'bg-amber-500/20 border-amber-400/50 text-amber-300'
                      : 'bg-white/5 border-white/10 text-slate-500'
                  }`}
                >
                  <Star className="w-4 h-4 fill-current" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Your Review</label>
            <textarea
              rows="3"
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share feedback on speakers, organization, venue, or workshops..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-xs font-bold text-white"
          >
            Publish Review
          </button>
        </form>
      </div>

      <div className="lg:col-span-7 space-y-4">
        <h3 className="text-base font-bold text-white">Verified Student Reviews ({feedbacks.length})</h3>
        {feedbacks.map((fb) => (
          <div key={fb.id} className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-300">{fb.eventTitle}</span>
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: fb.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">"{fb.comment}"</p>
            <p className="text-[11px] text-slate-400">— {fb.studentName} • {fb.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// MODULE 12: SETTINGS & DEMO DATA RESET
// ============================================================================

function SettingsModule({ currentUser, currentRole, setCurrentRole, triggerToast }) {
  const handleResetDemo = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 space-y-4">
        <h3 className="text-base font-bold text-white">Account & Role-Based Access Profile</h3>
        <div className="grid sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-white/5">
            <p className="text-slate-400">Authenticated User</p>
            <p className="font-bold text-white mt-0.5">{currentUser.name}</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/5">
            <p className="text-slate-400">Institutional Email</p>
            <p className="font-bold text-white mt-0.5">{currentUser.email}</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/5">
            <p className="text-slate-400">Assigned RBAC Role</p>
            <p className="font-bold text-purple-300 mt-0.5">{currentRole}</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/5">
            <p className="text-slate-400">Department / Unit</p>
            <p className="font-bold text-white mt-0.5">{currentUser.dept}</p>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-3">
        <h4 className="text-sm font-bold text-rose-300">Reset Demonstration Sandbox</h4>
        <p className="text-xs text-slate-400">
          Restore all pre-seeded events, QR passes, certificates, approvals, and club rosters to their initial state.
        </p>
        <button
          onClick={handleResetDemo}
          className="px-4 py-2.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/30 text-xs font-bold text-rose-200 flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Reset All Demo Data
        </button>
      </div>
    </div>
  );
}
