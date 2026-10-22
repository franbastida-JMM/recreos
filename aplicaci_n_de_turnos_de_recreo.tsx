import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  Clock,
  User,
  Users,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Filter,
  Download,
  Upload,
  Search,
  ShieldCheck,
  FileText,
  Sparkles,
  Plus,
  Edit3,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Info,
  Menu,
  X,
  Award,
  BookOpen,
  MapPin,
  RefreshCw,
  Lock,
  MessageSquare,
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';

// ==========================================
// SEED DATA: CEIP JUAN MENDOZA MENDOZA
// ==========================================

// Docentes del centro
const INITIAL_TEACHERS = [
  { id: 'T01', name: 'Dña. María Carmen Moreno', department: 'Infantil 3 años', role: 'Tutor/a' },
  { id: 'T02', name: 'D. Alejandro Ruiz Delgado', department: 'Educación Física', role: 'Especialista' },
  { id: 'T03', name: 'Dña. Rocío Fernández Vega', department: 'Música', role: 'Especialista' },
  { id: 'T04', name: 'D. José Antonio Gómez', department: '1º Primaria', role: 'Tutor/a' },
  { id: 'T05', name: 'Dña. Lucía Morales Cano', department: 'Pedagogía Terapéutica', role: 'Atención a la Diversidad' },
  { id: 'T06', name: 'D. Manuel Castro Jiménez', department: 'Inglés', role: 'Especialista' },
  { id: 'T07', name: 'Dña. Elena Pastor Blanco', department: '2º Primaria', role: 'Tutor/a' },
  { id: 'T08', name: 'D. Francisco Javier Ortiz', department: '3º Primaria', role: 'Tutor/a' },
  { id: 'T09', name: 'Dña. Ana Belén Ramírez', department: 'Infantil 4 años', role: 'Tutor/a' },
  { id: 'T10', name: 'D. Carlos Eduardo Silva', department: '4º Primaria', role: 'Tutor/a' },
  { id: 'T11', name: 'Dña. Sofía Torres Gil', department: '5º Primaria', role: 'Tutor/a' },
  { id: 'T12', name: 'D. David Navarro Reyes', department: '6º Primaria', role: 'Tutor/a' },
  { id: 'T13', name: 'Dña. Laura Serrano Cruz', department: 'Infantil 5 años', role: 'Tutor/a' },
  { id: 'T14', name: 'D. Alberto Medina Ramos', department: 'Audición y Lenguaje', role: 'Atención a la Diversidad' },
  { id: 'T15', name: 'Dña. Carmen María Luque', department: 'Francés / Primaria', role: 'Especialista' },
  { id: 'T16', name: 'D. Joaquín Gallego Ruiz', department: 'Religión', role: 'Especialista' }
];

// Zonas de vigilancia del centro
const ZONES = [
  { id: 'Z1', name: 'Patio Infantil A (Juegos)', color: 'bg-pink-100 text-pink-800 border-pink-300' },
  { id: 'Z2', name: 'Patio Infantil B (Porche)', color: 'bg-purple-100 text-purple-800 border-purple-300' },
  { id: 'Z3', name: 'Primaria - Pista Principal (Deportes)', color: 'bg-blue-100 text-blue-800 border-blue-300' },
  { id: 'Z4', name: 'Primaria - Porche y Sombras', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  { id: 'Z5', name: 'Primaria - Zona Lateral / Aulas', color: 'bg-amber-100 text-amber-800 border-amber-300' },
  { id: 'Z6', name: 'Servicios e Interiores', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' }
];

// Turnos de recreo
const SHIFTS = [
  { id: 'S1', name: 'Turno 1 (11:30 - 12:00)', short: 'T1: 11:30-12:00' },
  { id: 'S2', name: 'Turno 2 (12:00 - 12:30)', short: 'T2: 12:00-12:30' }
];

// Días lectivos de la semana (1 = Lunes, ..., 5 = Viernes)
const WEEKDAYS = [
  { dayNum: 1, name: 'Lunes' },
  { dayNum: 2, name: 'Martes' },
  { dayNum: 3, name: 'Miércoles' },
  { dayNum: 4, name: 'Jueves' },
  { dayNum: 5, name: 'Viernes' }
];

// Cuadrante Base Semanal (Patrón recurrente por día de la semana)
const INITIAL_BASE_SCHEDULE = [
  // Lunes
  { dayNum: 1, shiftId: 'S1', zoneId: 'Z1', teacherName: 'Dña. María Carmen Moreno' },
  { dayNum: 1, shiftId: 'S1', zoneId: 'Z2', teacherName: 'Dña. Ana Belén Ramírez' },
  { dayNum: 1, shiftId: 'S1', zoneId: 'Z3', teacherName: 'D. Alejandro Ruiz Delgado' },
  { dayNum: 1, shiftId: 'S1', zoneId: 'Z4', teacherName: 'D. José Antonio Gómez' },
  { dayNum: 1, shiftId: 'S1', zoneId: 'Z5', teacherName: 'Dña. Elena Pastor Blanco' },
  { dayNum: 1, shiftId: 'S1', zoneId: 'Z6', teacherName: 'D. Manuel Castro Jiménez' },

  { dayNum: 1, shiftId: 'S2', zoneId: 'Z1', teacherName: 'Dña. Laura Serrano Cruz' },
  { dayNum: 1, shiftId: 'S2', zoneId: 'Z2', teacherName: 'Dña. Rocío Fernández Vega' },
  { dayNum: 1, shiftId: 'S2', zoneId: 'Z3', teacherName: 'D. Francisco Javier Ortiz' },
  { dayNum: 1, shiftId: 'S2', zoneId: 'Z4', teacherName: 'D. Carlos Eduardo Silva' },
  { dayNum: 1, shiftId: 'S2', zoneId: 'Z5', teacherName: 'Dña. Sofía Torres Gil' },
  { dayNum: 1, shiftId: 'S2', zoneId: 'Z6', teacherName: 'D. David Navarro Reyes' },

  // Martes
  { dayNum: 2, shiftId: 'S1', zoneId: 'Z1', teacherName: 'Dña. Laura Serrano Cruz' },
  { dayNum: 2, shiftId: 'S1', zoneId: 'Z2', teacherName: 'Dña. María Carmen Moreno' },
  { dayNum: 2, shiftId: 'S1', zoneId: 'Z3', teacherName: 'D. Francisco Javier Ortiz' },
  { dayNum: 2, shiftId: 'S1', zoneId: 'Z4', teacherName: 'Dña. Sofía Torres Gil' },
  { dayNum: 2, shiftId: 'S1', zoneId: 'Z5', teacherName: 'D. Carlos Eduardo Silva' },
  { dayNum: 2, shiftId: 'S1', zoneId: 'Z6', teacherName: 'Dña. Carmen María Luque' },

  { dayNum: 2, shiftId: 'S2', zoneId: 'Z1', teacherName: 'Dña. Ana Belén Ramírez' },
  { dayNum: 2, shiftId: 'S2', zoneId: 'Z2', teacherName: 'D. Alejandro Ruiz Delgado' },
  { dayNum: 2, shiftId: 'S2', zoneId: 'Z3', teacherName: 'D. José Antonio Gómez' },
  { dayNum: 2, shiftId: 'S2', zoneId: 'Z4', teacherName: 'Dña. Elena Pastor Blanco' },
  { dayNum: 2, shiftId: 'S2', zoneId: 'Z5', teacherName: 'D. Manuel Castro Jiménez' },
  { dayNum: 2, shiftId: 'S2', zoneId: 'Z6', teacherName: 'D. Joaquín Gallego Ruiz' },

  // Miércoles
  { dayNum: 3, shiftId: 'S1', zoneId: 'Z1', teacherName: 'Dña. María Carmen Moreno' },
  { dayNum: 3, shiftId: 'S1', zoneId: 'Z2', teacherName: 'Dña. Lucía Morales Cano' },
  { dayNum: 3, shiftId: 'S1', zoneId: 'Z3', teacherName: 'D. Alejandro Ruiz Delgado' },
  { dayNum: 3, shiftId: 'S1', zoneId: 'Z4', teacherName: 'D. David Navarro Reyes' },
  { dayNum: 3, shiftId: 'S1', zoneId: 'Z5', teacherName: 'D. Alberto Medina Ramos' },
  { dayNum: 3, shiftId: 'S1', zoneId: 'Z6', teacherName: 'Dña. Rocío Fernández Vega' },

  { dayNum: 3, shiftId: 'S2', zoneId: 'Z1', teacherName: 'Dña. Ana Belén Ramírez' },
  { dayNum: 3, shiftId: 'S2', zoneId: 'Z2', teacherName: 'Dña. Laura Serrano Cruz' },
  { dayNum: 3, shiftId: 'S2', zoneId: 'Z3', teacherName: 'D. José Antonio Gómez' },
  { dayNum: 3, shiftId: 'S2', zoneId: 'Z4', teacherName: 'D. Francisco Javier Ortiz' },
  { dayNum: 3, shiftId: 'S2', zoneId: 'Z5', teacherName: 'Dña. Sofía Torres Gil' },
  { dayNum: 3, shiftId: 'S2', zoneId: 'Z6', teacherName: 'Dña. Elena Pastor Blanco' },

  // Jueves
  { dayNum: 4, shiftId: 'S1', zoneId: 'Z1', teacherName: 'Dña. Ana Belén Ramírez' },
  { dayNum: 4, shiftId: 'S1', zoneId: 'Z2', teacherName: 'Dña. Laura Serrano Cruz' },
  { dayNum: 4, shiftId: 'S1', zoneId: 'Z3', teacherName: 'D. Carlos Eduardo Silva' },
  { dayNum: 4, shiftId: 'S1', zoneId: 'Z4', teacherName: 'D. Manuel Castro Jiménez' },
  { dayNum: 4, shiftId: 'S1', zoneId: 'Z5', teacherName: 'Dña. Carmen María Luque' },
  { dayNum: 4, shiftId: 'S1', zoneId: 'Z6', teacherName: 'D. Alberto Medina Ramos' },

  { dayNum: 4, shiftId: 'S2', zoneId: 'Z1', teacherName: 'Dña. María Carmen Moreno' },
  { dayNum: 4, shiftId: 'S2', zoneId: 'Z2', teacherName: 'Dña. Lucía Morales Cano' },
  { dayNum: 4, shiftId: 'S2', zoneId: 'Z3', teacherName: 'D. Alejandro Ruiz Delgado' },
  { dayNum: 4, shiftId: 'S2', zoneId: 'Z4', teacherName: 'D. José Antonio Gómez' },
  { dayNum: 4, shiftId: 'S2', zoneId: 'Z5', teacherName: 'D. Francisco Javier Ortiz' },
  { dayNum: 4, shiftId: 'S2', zoneId: 'Z6', teacherName: 'D. David Navarro Reyes' },

  // Viernes
  { dayNum: 5, shiftId: 'S1', zoneId: 'Z1', teacherName: 'Dña. María Carmen Moreno' },
  { dayNum: 5, shiftId: 'S1', zoneId: 'Z2', teacherName: 'Dña. Laura Serrano Cruz' },
  { dayNum: 5, shiftId: 'S1', zoneId: 'Z3', teacherName: 'D. Alejandro Ruiz Delgado' },
  { dayNum: 5, shiftId: 'S1', zoneId: 'Z4', teacherName: 'D. Francisco Javier Ortiz' },
  { dayNum: 5, shiftId: 'S1', zoneId: 'Z5', teacherName: 'D. Carlos Eduardo Silva' },
  { dayNum: 5, shiftId: 'S1', zoneId: 'Z6', teacherName: 'Dña. Sofía Torres Gil' },

  { dayNum: 5, shiftId: 'S2', zoneId: 'Z1', teacherName: 'Dña. Ana Belén Ramírez' },
  { dayNum: 5, shiftId: 'S2', zoneId: 'Z2', teacherName: 'Dña. Rocío Fernández Vega' },
  { dayNum: 5, shiftId: 'S2', zoneId: 'Z3', teacherName: 'D. José Antonio Gómez' },
  { dayNum: 5, shiftId: 'S2', zoneId: 'Z4', teacherName: 'Dña. Elena Pastor Blanco' },
  { dayNum: 5, shiftId: 'S2', zoneId: 'Z5', teacherName: 'D. Manuel Castro Jiménez' },
  { dayNum: 5, shiftId: 'S2', zoneId: 'Z6', teacherName: 'D. Joaquín Gallego Ruiz' }
];

// Incidencias/Sustituciones Semilla
const INITIAL_INCIDENCES = [
  {
    id: 'INC-2026-001',
    date: '2026-11-10',
    shiftId: 'S1',
    zoneId: 'Z3',
    originalTeacher: 'D. Alejandro Ruiz Delgado',
    substituteTeacher: 'Dña. Rocío Fernández Vega',
    reasonType: 'Reunión de coordinación',
    status: 'Confirmada',
    notes: 'Reunión de la ETCP comunicada a Jefatura de Estudios.',
    updatedAt: '2026-11-08 09:30'
  },
  {
    id: 'INC-2026-002',
    date: '2026-11-12',
    shiftId: 'S2',
    zoneId: 'Z5',
    originalTeacher: 'D. Francisco Javier Ortiz',
    substituteTeacher: 'D. Alberto Medina Ramos',
    reasonType: 'Baja médica / Permiso',
    status: 'Confirmada',
    notes: 'Sustitución comunicada por guardia de centro.',
    updatedAt: '2026-11-11 14:15'
  },
  {
    id: 'INC-2026-003',
    date: '2026-11-13',
    shiftId: 'S1',
    zoneId: 'Z1',
    originalTeacher: 'Dña. María Carmen Moreno',
    substituteTeacher: 'Dña. Lucía Morales Cano',
    reasonType: 'Salida escolar / Actividad',
    status: 'Confirmada',
    notes: 'Excursión de Infantil al entorno educativo local.',
    updatedAt: '2026-11-12 11:00'
  }
];

// Helper: Formato de Fecha en español
const formatDateES = (dateStr) => {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  const formatted = date.toLocaleDateString('es-ES', options);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

// Helper: Obtener lunes de una semana dada
const getMondayOf = (d) => {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
};

// Helper: Formatear YYYY-MM-DD
const toISODate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export default function App() {
  // Navegación principal
  const [activeTab, setActiveTab] = useState('today'); // today, weekly, incidences, my_schedule, admin, normative, ai_assistant
  
  // Estado de Datos
  const [teachers, setTeachers] = useState(INITIAL_TEACHERS);
  const [baseSchedule, setBaseSchedule] = useState(INITIAL_BASE_SCHEDULE);
  const [incidences, setIncidences] = useState(INITIAL_INCIDENCES);
  
  // Selector de fecha para Vista Hoy / Consulta
  const [selectedDateStr, setSelectedDateStr] = useState(() => {
    // Para asegurar datos de demo visuales, elegimos el 10 de Noviembre de 2026 si la fecha de hoy no cae en el calendario lectivo de prueba
    const todayISO = toISODate(new Date());
    return todayISO.startsWith('2026') || todayISO.startsWith('2027') ? todayISO : '2026-11-10';
  });

  // Selector para Mi Horario
  const [selectedTeacherName, setSelectedTeacherName] = useState('D. Alejandro Ruiz Delgado');

  // Control para navegación por semana
  const [currentWeekMonday, setCurrentWeekMonday] = useState(() => getMondayOf(new Date('2026-11-10')));

  // Estado de Administración
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  // Modales
  const [isIncidenceModalOpen, setIsIncidenceModalOpen] = useState(false);
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [editingIncidence, setEditingIncidence] = useState(null);

  // Formulario de Nueva/Editar Incidencia
  const [formData, setFormData] = useState({
    date: '2026-11-10',
    shiftId: 'S1',
    zoneId: 'Z1',
    originalTeacher: '',
    substituteTeacher: '',
    reasonType: 'Reunión de coordinación',
    status: 'Confirmada',
    notes: ''
  });

  // Filtros de la pestaña Cambios
  const [filterText, setFilterText] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterType, setFilterType] = useState('ALL');

  // Asistente IA Gemini
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  // Cargar datos persistentes de localStorage si existen
  useEffect(() => {
    const savedIncidences = localStorage.getItem('ceip_recreos_incidences');
    if (savedIncidences) {
      try {
        setIncidences(JSON.parse(savedIncidences));
      } catch (e) {
        console.error('Error cargando incidencias de localStorage', e);
      }
    }
  }, []);

  // Guardar incidencias en localStorage
  const saveIncidencesToStorage = (updatedList) => {
    setIncidences(updatedList);
    localStorage.setItem('ceip_recreos_incidences', JSON.stringify(updatedList));
  };

  // Cómputo del día seleccionado (o de hoy)
  const selectedDateObj = useMemo(() => {
    const [y, m, d] = selectedDateStr.split('-').map(Number);
    return new Date(y, m - 1, d);
  }, [selectedDateStr]);

  const dayOfWeekNum = selectedDateObj.getDay(); // 0 = Dom, 1 = Lun, ..., 6 = Sáb
  const isSchoolDay = dayOfWeekNum >= 1 && dayOfWeekNum <= 5;

  // Asignaciones base del día seleccionado
  const dayBaseShifts = useMemo(() => {
    if (!isSchoolDay) return [];
    return baseSchedule.filter((item) => item.dayNum === dayOfWeekNum);
  }, [baseSchedule, dayOfWeekNum, isSchoolDay]);

  // Incidencias del día seleccionado
  const dayIncidences = useMemo(() => {
    return incidences.filter((inc) => inc.date === selectedDateStr && inc.status !== 'Cancelada');
  }, [incidences, selectedDateStr]);

  // Asignaciones EFECTIVAS del día seleccionado
  const effectiveDayShifts = useMemo(() => {
    return dayBaseShifts.map((base) => {
      const activeIncidence = dayIncidences.find(
        (inc) => inc.shiftId === base.shiftId && inc.zoneId === base.zoneId
      );

      if (activeIncidence) {
        return {
          ...base,
          effectiveTeacher: activeIncidence.substituteTeacher || 'SIN COBERTURA',
          isModified: true,
          incidence: activeIncidence
        };
      }

      return {
        ...base,
        effectiveTeacher: base.teacherName,
        isModified: false,
        incidence: null
      };
    });
  }, [dayBaseShifts, dayIncidences]);

  // Días de la semana actual
  const currentWeekDays = useMemo(() => {
    const days = [];
    for (let i = 0; i < 5; i++) {
      const d = new Date(currentWeekMonday);
      d.setDate(d.getDate() + i);
      days.push({
        dayNum: i + 1,
        dateStr: toISODate(d),
        dateObj: d,
        name: WEEKDAYS[i].name,
        formattedShort: `${WEEKDAYS[i].name} ${d.getDate()}/${d.getMonth() + 1}`
      });
    }
    return days;
  }, [currentWeekMonday]);

  // Manejo de Login de Administración
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput === 'CEIP2026') {
      setIsAdminLoggedIn(true);
      setPinError('');
      setPinInput('');
    } else {
      setPinError('PIN incorrecto. Pruebe con 1234 o CEIP2026.');
    }
  };

  // Abrir Modal de Incidencias para crear/editar
  const handleOpenIncidenceModal = (inc = null, defaultShift = null, defaultZone = null) => {
    if (inc) {
      setEditingIncidence(inc);
      setFormData({
        date: inc.date,
        shiftId: inc.shiftId,
        zoneId: inc.zoneId,
        originalTeacher: inc.originalTeacher,
        substituteTeacher: inc.substituteTeacher,
        reasonType: inc.reasonType,
        status: inc.status,
        notes: inc.notes || ''
      });
    } else {
      setEditingIncidence(null);
      const matchedBase = defaultShift && defaultZone
        ? dayBaseShifts.find((b) => b.shiftId === defaultShift && b.zoneId === defaultZone)
        : null;

      setFormData({
        date: selectedDateStr,
        shiftId: defaultShift || 'S1',
        zoneId: defaultZone || 'Z1',
        originalTeacher: matchedBase ? matchedBase.teacherName : teachers[0].name,
        substituteTeacher: teachers[1].name,
        reasonType: 'Reunión de coordinación',
        status: 'Confirmada',
        notes: ''
      });
    }
    setIsIncidenceModalOpen(true);
  };

  // Guardar Incidencia
  const handleSaveIncidence = (e) => {
    e.preventDefault();
    const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 16);

    if (editingIncidence) {
      const updated = incidences.map((inc) =>
        inc.id === editingIncidence.id
          ? {
              ...inc,
              ...formData,
              updatedAt: nowStr
            }
          : inc
      );
      saveIncidencesToStorage(updated);
    } else {
      const newInc = {
        id: `INC-${Date.now().toString().slice(-6)}`,
        ...formData,
        updatedAt: nowStr
      };
      saveIncidencesToStorage([newInc, ...incidences]);
    }

    setIsIncidenceModalOpen(false);
  };

  // Cancelar/Eliminar Incidencia
  const handleCancelIncidence = (id) => {
    const updated = incidences.map((inc) =>
      inc.id === id ? { ...inc, status: 'Cancelada', updatedAt: new Date().toISOString().replace('T', ' ').slice(0, 16) } : inc
    );
    saveIncidencesToStorage(updated);
  };

  // Cómputo de horas de compensación por docente conforme a la Orden de 31 de agosto de 2026 (BOJA n.º 168 C3)
  const teacherStats = useMemo(() => {
    const stats = {};
    teachers.forEach((t) => {
      stats[t.name] = {
        totalShifts: 0,
        originalShiftsCount: 0,
        substitutionsDone: 0,
        absencesReplaced: 0,
        excessHours: 0, // horas de reducción no lectiva (0.5 por cada turno por encima del estándar semanal)
      };
    });

    // Recorremos todas las asignaciones base
    baseSchedule.forEach((b) => {
      if (stats[b.teacherName]) {
        stats[b.teacherName].originalShiftsCount += 1;
        stats[b.teacherName].totalShifts += 1;
      }
    });

    // Ajuste por incidencias activas
    incidences.forEach((inc) => {
      if (inc.status === 'Confirmada' || inc.status === 'Resuelta') {
        if (stats[inc.originalTeacher]) {
          stats[inc.originalTeacher].totalShifts -= 1;
          stats[inc.originalTeacher].absencesReplaced += 1;
        }
        if (stats[inc.substituteTeacher]) {
          stats[inc.substituteTeacher].totalShifts += 1;
          stats[inc.substituteTeacher].substitutionsDone += 1;
        }
      }
    });

    // Calcular compensación: estándar lectivo ordinario es 2 turnos/semana (1 hora lectiva)
    // Cada turno por encima de 2 turnos en la semana equivale a 0.5 horas de reducción no lectiva
    Object.keys(stats).forEach((tName) => {
      const total = stats[tName].totalShifts;
      if (total > 2) {
        stats[tName].excessHours = (total - 2) * 0.5;
      } else {
        stats[tName].excessHours = 0;
      }
    });

    return stats;
  }, [teachers, baseSchedule, incidences]);

  // Consulta IA Gemini sobre Normativa y Coberturas
  const handleGeminiConsult = async () => {
    if (!aiQuery.trim()) return;
    setAiLoading(true);
    setAiResponse('');

    const systemPrompt = `
Eres un asistente experto en la gestión del cuadrante de recreos del CEIP Juan Mendoza Mendoza de Almensilla (Sevilla).
Respondes con precisión técnica basada en la Orden de 31 de agosto de 2026 (BOJA n.º 168 C3) que regula:
1. El horario lectivo para vigilancia de recreo es de 1 hora lectiva/semana (2 turnos de 30 min).
2. Cada turno extra sobre la ratio básica reduce 0,5 horas de la permanencia no lectiva regular en el centro.
3. Lista de docentes del centro: ${teachers.map((t) => t.name).join(', ')}.
4. Zonas: Patio Infantil A/B, Primaria Pista, Porche, Aulas/Pasillos, Servicios.
Ofrece respuestas claras, amables y directamente aplicables al equipo directivo y docente.
`;

    try {
      const apiKey = ''; // Inyectado automáticamente en entorno de ejecución
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: aiQuery }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] }
        })
      });

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No se pudo obtener respuesta del asistente.';
      setAiResponse(text);
    } catch (err) {
      setAiResponse('Ocurrió un error al consultar el servicio de Inteligencia Artificial. Verifique la conexión.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-teal-500 selection:text-white">
      {/* HEADER PRINCIPAL */}
      <header className="bg-slate-900 text-white shadow-xl border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-teal-500 to-emerald-400 p-2.5 rounded-2xl shadow-lg shadow-teal-500/20">
              <ShieldCheck className="w-7 h-7 text-slate-950" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                CEIP Juan Mendoza Mendoza
                <span className="text-xs bg-teal-500/20 text-teal-300 font-medium px-2 py-0.5 rounded-full border border-teal-500/30">
                  Almensilla (Sevilla)
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Gestión y Consulta de Vigilancias de Recreo • Curso 2026/2027
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
              <Award className="w-4 h-4 text-amber-400" />
              Orden 31/08/2026 (BOJA n.º 168 C3)
            </span>

            {/* Acceso Rápido / Admin Indicator */}
            {isAdminLoggedIn ? (
              <div className="flex items-center gap-2">
                <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Admin Activo
                </span>
                <button
                  onClick={() => setIsAdminLoggedIn(false)}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg transition"
                >
                  Salir
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveTab('admin')}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1.5 transition"
              >
                <Lock className="w-3.5 h-3.5 text-teal-400" />
                Acceso Dirección
              </button>
            )}
          </div>
        </div>

        {/* NAVEGACIÓN SECUNDARIA / PESTAÑAS */}
        <nav className="bg-slate-950/60 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto flex space-x-1 sm:space-x-2 py-2 text-xs sm:text-sm font-medium">
            <button
              onClick={() => setActiveTab('today')}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition whitespace-nowrap ${
                activeTab === 'today'
                  ? 'bg-teal-500 text-slate-950 font-semibold shadow-md shadow-teal-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Recreo de Hoy
              {dayIncidences.length > 0 && (
                <span className="bg-amber-400 text-slate-950 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {dayIncidences.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('weekly')}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition whitespace-nowrap ${
                activeTab === 'weekly'
                  ? 'bg-teal-500 text-slate-950 font-semibold shadow-md shadow-teal-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              Cuadrante Semanal
            </button>

            <button
              onClick={() => setActiveTab('incidences')}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition whitespace-nowrap ${
                activeTab === 'incidences'
                  ? 'bg-teal-500 text-slate-950 font-semibold shadow-md shadow-teal-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              Cambios y Sustituciones
              <span className="bg-slate-800 text-slate-300 text-[10px] px-1.5 py-0.5 rounded-full border border-slate-700">
                {incidences.filter((i) => i.status !== 'Cancelada').length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('my_schedule')}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition whitespace-nowrap ${
                activeTab === 'my_schedule'
                  ? 'bg-teal-500 text-slate-950 font-semibold shadow-md shadow-teal-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <User className="w-4 h-4" />
              Mi Horario
            </button>

            <button
              onClick={() => setActiveTab('normative')}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition whitespace-nowrap ${
                activeTab === 'normative'
                  ? 'bg-teal-500 text-slate-950 font-semibold shadow-md shadow-teal-500/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Normativa y Resumen
            </button>

            <button
              onClick={() => setActiveTab('ai_assistant')}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition whitespace-nowrap ${
                activeTab === 'ai_assistant'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-md shadow-purple-500/20'
                  : 'text-purple-300 hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4 text-purple-300" />
              Asistente IA Séneca
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-2 transition whitespace-nowrap ${
                activeTab === 'admin'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20'
                  : 'text-amber-300 hover:bg-slate-800'
              }`}
            >
              <Lock className="w-4 h-4" />
              Administración
            </button>
          </div>
        </nav>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* PESTAÑA 1: INICIO / RECREO DE HOY */}
        {activeTab === 'today' && (
          <div className="space-y-6">
            {/* Barra superior de control de fecha */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-teal-600 uppercase tracking-wider mb-0.5">
                  Jornada de Vigilancia
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                  {formatDateES(selectedDateStr)}
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-xs text-slate-500 font-medium hidden sm:inline">Seleccionar Fecha:</label>
                <input
                  type="date"
                  value={selectedDateStr}
                  onChange={(e) => setSelectedDateStr(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-teal-500 outline-none"
                />
                <button
                  onClick={() => setSelectedDateStr('2026-11-10')}
                  className="text-xs bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 px-3 py-2 rounded-xl font-medium transition"
                  title="Restablecer a fecha lectiva con datos"
                >
                  Ver Fecha Demo
                </button>
              </div>
            </div>

            {/* Aviso de Día No Lectivo si aplica */}
            {!isSchoolDay ? (
              <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 text-center text-amber-800 space-y-2">
                <AlertTriangle className="w-10 h-10 mx-auto text-amber-500" />
                <h3 className="text-lg font-bold">Día No Lectivo o Fin de Semana</h3>
                <p className="text-sm text-amber-700 max-w-md mx-auto">
                  No hay turnos ni servicios de recreo programados para esta fecha en el calendario escolar.
                </p>
              </div>
            ) : (
              <>
                {/* BANNER DESTACADO DE CAMBIOS / INCIDENCIAS DE HOY */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-5 h-5 text-teal-400" />
                      <h3 className="font-bold text-sm sm:text-base">
                        Modificaciones y Sustituciones para la Jornada
                      </h3>
                    </div>
                    <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700 font-medium">
                      {dayIncidences.length} registradas
                    </span>
                  </div>

                  <div className="p-4 sm:p-5">
                    {dayIncidences.length === 0 ? (
                      <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-sm">No hay cambios registrados para hoy</p>
                          <p className="text-xs text-emerald-700">
                            Se mantiene íntegramente la asignación del cuadrante original del centro.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {dayIncidences.map((inc) => {
                          const shift = SHIFTS.find((s) => s.id === inc.shiftId);
                          const zone = ZONES.find((z) => z.id === inc.zoneId);

                          return (
                            <div
                              key={inc.id}
                              className="bg-amber-50/80 border-2 border-amber-200/90 rounded-xl p-4 space-y-2 shadow-xs relative"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-bold uppercase text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-md">
                                  {inc.reasonType}
                                </span>
                                <span className="text-[11px] font-medium text-slate-500">
                                  {shift?.short}
                                </span>
                              </div>

                              <div className="text-xs font-semibold text-slate-700">
                                <span className="text-slate-500">Zona:</span> {zone?.name}
                              </div>

                              <div className="bg-white p-2.5 rounded-lg border border-amber-200/60 text-xs space-y-1">
                                <div className="text-slate-500 line-through text-[11px]">
                                  Original: {inc.originalTeacher}
                                </div>
                                <div className="text-emerald-700 font-bold flex items-center gap-1 text-sm">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                  {inc.substituteTeacher || 'Pendiente de asignar'}
                                </div>
                              </div>

                              {inc.notes && (
                                <p className="text-[11px] text-slate-600 italic bg-amber-100/50 p-1.5 rounded-md">
                                  "{inc.notes}"
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* TABLA PRINCIPAL DE TURNOS DE HOY POR ZONAS Y TURNOS */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-teal-600" />
                      Distribución por Zonas y Turnos de Recreo
                    </h3>
                    <span className="text-xs text-slate-500">
                      Docentes asignados: {effectiveDayShifts.length}
                    </span>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {SHIFTS.map((shift) => {
                      const shiftsInThisTime = effectiveDayShifts.filter((s) => s.shiftId === shift.id);

                      return (
                        <div key={shift.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                          <div className="bg-slate-800 text-white px-4 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-teal-400" />
                              <span className="font-bold text-sm">{shift.name}</span>
                            </div>
                            <span className="text-xs bg-slate-700 text-slate-200 px-2 py-0.5 rounded-md">
                              {shiftsInThisTime.length} Puestos
                            </span>
                          </div>

                          <div className="p-3 sm:p-4 divide-y divide-slate-100">
                            {ZONES.map((zone) => {
                              const item = shiftsInThisTime.find((s) => s.zoneId === zone.id);
                              if (!item) return null;

                              return (
                                <div key={zone.id} className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                  <div className="space-y-1">
                                    <span className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${zone.color}`}>
                                      {zone.name}
                                    </span>
                                    <div className="flex items-center gap-2">
                                      <User className="w-4 h-4 text-slate-400" />
                                      <span className={`text-sm ${item.isModified ? 'font-bold text-emerald-700' : 'font-medium text-slate-800'}`}>
                                        {item.effectiveTeacher}
                                      </span>
                                      {item.isModified && (
                                        <span className="text-[10px] bg-amber-100 text-amber-800 border border-amber-300 font-bold px-1.5 py-0.5 rounded">
                                          Sustitución
                                        </span>
                                      )}
                                    </div>
                                    {item.isModified && (
                                      <div className="text-[11px] text-slate-400 line-through">
                                        Asignación original: {item.teacherName}
                                      </div>
                                    )}
                                  </div>

                                  {isAdminLoggedIn && (
                                    <button
                                      onClick={() => handleOpenIncidenceModal(item.incidence, shift.id, zone.id)}
                                      className="self-start sm:self-center text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-300 transition flex items-center gap-1"
                                    >
                                      <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                                      {item.isModified ? 'Editar Cambio' : 'Registrar Cambio'}
                                    </button>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* PESTAÑA 2: CUADRANTE SEMANAL */}
        {activeTab === 'weekly' && (
          <div className="space-y-6">
            {/* Controles de semana */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-teal-600 uppercase tracking-wider">
                  Navegación del Cuadrante
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  Semana del {currentWeekDays[0]?.formattedShort} al {currentWeekDays[4]?.formattedShort}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const prev = new Date(currentWeekMonday);
                    prev.setDate(prev.getDate() - 7);
                    setCurrentWeekMonday(prev);
                  }}
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-300 transition"
                  title="Semana anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setCurrentWeekMonday(getMondayOf(new Date('2026-11-10')))}
                  className="px-3 py-2 bg-teal-50 text-teal-700 font-semibold text-xs hover:bg-teal-100 border border-teal-200 rounded-xl transition"
                >
                  Semana Actual (Demo)
                </button>

                <button
                  onClick={() => {
                    const next = new Date(currentWeekMonday);
                    next.setDate(next.getDate() + 7);
                    setCurrentWeekMonday(next);
                  }}
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-300 transition"
                  title="Semana siguiente"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* VISTA ESCRITORIO: TABLA MATRIZ */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white text-xs">
                      <th className="p-3.5 border-b border-slate-800 font-bold w-48">Zona / Turno</th>
                      {currentWeekDays.map((day) => (
                        <th key={day.dayNum} className="p-3.5 border-b border-slate-800 text-center font-bold">
                          <div>{day.name}</div>
                          <div className="text-[11px] font-normal text-slate-400">{day.dateStr}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs">
                    {SHIFTS.map((shift) => (
                      <React.Fragment key={shift.id}>
                        <tr className="bg-slate-100/80">
                          <td colSpan={6} className="p-2.5 font-bold text-slate-700 bg-slate-200/70 text-center">
                            {shift.name}
                          </td>
                        </tr>
                        {ZONES.map((zone) => (
                          <tr key={`${shift.id}-${zone.id}`} className="hover:bg-slate-50 transition">
                            <td className="p-3 font-semibold border-r border-slate-200">
                              <span className={`inline-block px-2 py-0.5 rounded border text-[11px] ${zone.color}`}>
                                {zone.name}
                              </span>
                            </td>

                            {currentWeekDays.map((day) => {
                              // Buscar asignación base
                              const base = baseSchedule.find(
                                (b) => b.dayNum === day.dayNum && b.shiftId === shift.id && b.zoneId === zone.id
                              );

                              // Buscar incidencia activa para este día y turno/zona
                              const inc = incidences.find(
                                (i) => i.date === day.dateStr && i.shiftId === shift.id && i.zoneId === zone.id && i.status !== 'Cancelada'
                              );

                              const assignedTeacher = inc
                                ? inc.substituteTeacher || 'SIN ASIGNAR'
                                : base
                                ? base.teacherName
                                : '-';

                              return (
                                <td key={day.dayNum} className={`p-2.5 text-center border-r border-slate-200 ${inc ? 'bg-amber-50/70' : ''}`}>
                                  {assignedTeacher !== '-' ? (
                                    <div className="space-y-1">
                                      <div className={`font-semibold ${inc ? 'text-emerald-800 font-bold' : 'text-slate-800'}`}>
                                        {assignedTeacher}
                                      </div>
                                      {inc && (
                                        <div className="text-[10px] bg-amber-200 text-amber-900 font-bold px-1.5 py-0.5 rounded inline-block">
                                          Sustitución
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <span className="text-slate-300">-</span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* VISTA MÓVIL: TARJETAS DESPLEGABLES POR DÍA */}
            <div className="md:hidden space-y-4">
              {currentWeekDays.map((day) => {
                const dayIncs = incidences.filter((i) => i.date === day.dateStr && i.status !== 'Cancelada');

                return (
                  <div key={day.dayNum} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-slate-800 text-white p-4 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-base">{day.name}</h4>
                        <p className="text-xs text-slate-400">{day.dateStr}</p>
                      </div>
                      {dayIncs.length > 0 && (
                        <span className="bg-amber-400 text-slate-950 font-bold text-xs px-2.5 py-1 rounded-full">
                          {dayIncs.length} cambios
                        </span>
                      )}
                    </div>

                    <div className="p-4 space-y-4">
                      {SHIFTS.map((shift) => (
                        <div key={shift.id} className="space-y-2">
                          <h5 className="text-xs font-bold text-teal-700 uppercase tracking-wider border-b border-teal-100 pb-1">
                            {shift.name}
                          </h5>
                          <div className="grid gap-2">
                            {ZONES.map((zone) => {
                              const base = baseSchedule.find(
                                (b) => b.dayNum === day.dayNum && b.shiftId === shift.id && b.zoneId === zone.id
                              );
                              const inc = dayIncs.find((i) => i.shiftId === shift.id && i.zoneId === zone.id);

                              const effective = inc ? inc.substituteTeacher : base?.teacherName;

                              return (
                                <div key={zone.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs flex justify-between items-center">
                                  <span className="font-medium text-slate-600 truncate max-w-[140px]">
                                    {zone.name}
                                  </span>
                                  <span className={`font-bold ${inc ? 'text-emerald-700' : 'text-slate-900'}`}>
                                    {effective || '-'}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PESTAÑA 3: CAMBIOS Y SUSTITUCIONES */}
        {activeTab === 'incidences' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <RefreshCw className="w-6 h-6 text-teal-600" />
                    Registro de Cambios e Incidencias
                  </h2>
                  <p className="text-xs text-slate-500">
                    Historial de permutas, bajas médicas, salidas escolares y cambios organizativos
                  </p>
                </div>

                {isAdminLoggedIn && (
                  <button
                    onClick={() => handleOpenIncidenceModal()}
                    className="bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Registrar Nuevo Cambio
                  </button>
                )}
              </div>

              {/* Filtros de Búsqueda */}
              <div className="grid gap-3 sm:grid-cols-3 pt-2 border-t border-slate-100">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Buscar por docente, notas..."
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="ALL">Todos los Estados</option>
                    <option value="Confirmada">Confirmada</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Resuelta">Resuelta</option>
                    <option value="Cancelada">Cancelada</option>
                  </select>
                </div>

                <div>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="ALL">Todos los Motivos</option>
                    <option value="Reunión de coordinación">Reunión de coordinación</option>
                    <option value="Baja médica / Permiso">Baja médica / Permiso</option>
                    <option value="Salida escolar / Actividad">Salida escolar / Actividad</option>
                    <option value="Permuta acordada">Permuta acordada</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Lista filtrada de incidencias */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              {incidences.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                  No hay cambios registrados en el sistema.
                </div>
              ) : (
                <div className="divide-y divide-slate-200">
                  {incidences
                    .filter((inc) => {
                      const matchText =
                        inc.originalTeacher.toLowerCase().includes(filterText.toLowerCase()) ||
                        inc.substituteTeacher.toLowerCase().includes(filterText.toLowerCase()) ||
                        (inc.notes && inc.notes.toLowerCase().includes(filterText.toLowerCase()));
                      const matchStatus = filterStatus === 'ALL' || inc.status === filterStatus;
                      const matchType = filterType === 'ALL' || inc.reasonType === filterType;
                      return matchText && matchStatus && matchType;
                    })
                    .map((inc) => {
                      const shift = SHIFTS.find((s) => s.id === inc.shiftId);
                      const zone = ZONES.find((z) => z.id === inc.zoneId);

                      return (
                        <div key={inc.id} className="p-4 sm:p-5 hover:bg-slate-50/80 transition space-y-3">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold bg-slate-900 text-white px-2.5 py-1 rounded-md">
                                {formatDateES(inc.date)}
                              </span>
                              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                                {shift?.short}
                              </span>
                              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${zone?.color}`}>
                                {zone?.name}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span
                                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                                  inc.status === 'Confirmada'
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                    : inc.status === 'Pendiente'
                                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                    : 'bg-rose-100 text-rose-800 border border-rose-300'
                                }`}
                              >
                                {inc.status}
                              </span>

                              {isAdminLoggedIn && inc.status !== 'Cancelada' && (
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => handleOpenIncidenceModal(inc)}
                                    className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-600 transition"
                                    title="Editar"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleCancelIncidence(inc.id)}
                                    className="p-1.5 hover:bg-rose-100 rounded-lg text-rose-600 transition"
                                    title="Cancelar Cambio"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-xs">
                            <div>
                              <span className="text-slate-400 block font-medium mb-0.5">Asignación Original:</span>
                              <span className="font-semibold text-slate-700 line-through">{inc.originalTeacher}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block font-medium mb-0.5">Sustituto / Cobertura:</span>
                              <span className="font-bold text-emerald-700 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                {inc.substituteTeacher}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-1">
                            <div>
                              <span className="font-semibold text-slate-700">Motivo:</span> {inc.reasonType}
                              {inc.notes && <span className="ml-2 italic text-slate-600">— "{inc.notes}"</span>}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              Actualizado: {inc.updatedAt}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* PESTAÑA 4: MI HORARIO */}
        {activeTab === 'my_schedule' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <User className="w-6 h-6 text-teal-600" />
                  Portal Docente Personal
                </h2>
                <p className="text-xs text-slate-500">
                  Consulte sus vigilancias, asignaciones directas y saldo de compensaciones
                </p>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-xs text-slate-600 font-semibold">Seleccionar Profesor/a:</label>
                <select
                  value={selectedTeacherName}
                  onChange={(e) => setSelectedTeacherName(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {teachers.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name} ({t.department})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tarjetas de Resumen del Profesor */}
            {(() => {
              const stats = teacherStats[selectedTeacherName] || {
                totalShifts: 0,
                originalShiftsCount: 0,
                substitutionsDone: 0,
                absencesReplaced: 0,
                excessHours: 0
              };

              return (
                <div className="grid gap-4 sm:grid-cols-4">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                    <span className="text-xs text-slate-500 font-medium">Turnos Asignados/Semana</span>
                    <div className="text-2xl font-black text-slate-900">{stats.totalShifts} turnos</div>
                    <span className="text-[11px] text-slate-400">
                      Estándar: 2 turnos (1h lectiva)
                    </span>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                    <span className="text-xs text-slate-500 font-medium">Sustituciones Realizadas</span>
                    <div className="text-2xl font-black text-emerald-600">{stats.substitutionsDone} acaecidas</div>
                    <span className="text-[11px] text-emerald-700">Apoyos al centro</span>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                    <span className="text-xs text-slate-500 font-medium">Ausencias Cubiertas por Otros</span>
                    <div className="text-2xl font-black text-amber-600">{stats.absencesReplaced} libradas</div>
                    <span className="text-[11px] text-amber-700">Por reunión/permiso</span>
                  </div>

                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4 rounded-2xl shadow-md space-y-1">
                    <span className="text-xs text-teal-400 font-medium">Compensación No Lectiva</span>
                    <div className="text-2xl font-black text-teal-300">-{stats.excessHours} h/semana</div>
                    <span className="text-[10px] text-slate-300 block">
                      BOJA n.º 168 C3 (0.5h por turno extra)
                    </span>
                  </div>
                </div>
              );
            })()}

            {/* Listado de Turnos Personales */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-900 text-white p-4 font-bold text-sm flex items-center justify-between">
                <span>Vigilancias Programadas para {selectedTeacherName}</span>
                <span className="text-xs font-normal text-slate-400">
                  Cuadrante semanal activo
                </span>
              </div>

              <div className="divide-y divide-slate-100 p-4 space-y-3">
                {WEEKDAYS.map((day) => {
                  // Turnos originales
                  const myOriginalShifts = baseSchedule.filter(
                    (b) => b.dayNum === day.dayNum && b.teacherName === selectedTeacherName
                  );

                  // Turnos asignados como sustituto este día
                  const mySubstitutedShifts = incidences.filter(
                    (inc) =>
                      inc.substituteTeacher === selectedTeacherName &&
                      inc.status !== 'Cancelada'
                  );

                  return (
                    <div key={day.dayNum} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                      <div className="font-bold text-slate-800 text-sm">{day.name}</div>

                      {myOriginalShifts.length === 0 && mySubstitutedShifts.length === 0 ? (
                        <p className="text-slate-400 italic">Sin turnos asignados este día.</p>
                      ) : (
                        <div className="space-y-1.5">
                          {myOriginalShifts.map((b, idx) => {
                            const shift = SHIFTS.find((s) => s.id === b.shiftId);
                            const zone = ZONES.find((z) => z.id === b.zoneId);

                            return (
                              <div key={idx} className="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-200">
                                <div>
                                  <span className="font-bold text-slate-700 mr-2">{shift?.short}</span>
                                  <span className={`px-2 py-0.5 rounded text-[11px] ${zone?.color}`}>
                                    {zone?.name}
                                  </span>
                                </div>
                                <span className="text-[11px] text-slate-500 font-medium">Asignación Base</span>
                              </div>
                            );
                          })}

                          {mySubstitutedShifts.map((inc, idx) => {
                            const shift = SHIFTS.find((s) => s.id === inc.shiftId);
                            const zone = ZONES.find((z) => z.id === inc.zoneId);

                            return (
                              <div key={idx} className="flex items-center justify-between bg-emerald-50 p-2 rounded-lg border border-emerald-200 text-emerald-900">
                                <div>
                                  <span className="font-bold mr-2">{shift?.short}</span>
                                  <span className={`px-2 py-0.5 rounded text-[11px] ${zone?.color}`}>
                                    {zone?.name}
                                  </span>
                                </div>
                                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-200/60 px-2 py-0.5 rounded">
                                  Sustitución en lugar de {inc.originalTeacher}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA 5: NORMATIVA Y RESUMEN */}
        {activeTab === 'normative' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-amber-100 text-amber-800 p-3 rounded-xl border border-amber-300">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Marco Normativo y Cómputo de Compensación Horaria
                  </h2>
                  <p className="text-xs text-slate-500">
                    Orden de 31 de agosto de 2026 (BOJA n.º 168 C3) • Consejería de Desarrollo Educativo y FP
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 pt-2">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                  <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    Horario Lectivo Estándar de Vigilancia
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    El horario lectivo destinado a la vigilancia de recreos en Educación Infantil y Primaria se fija ordinariamente en <strong>1 hora lectiva a la semana</strong> (distribuida en 2 turnos de 30 minutos).
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                  <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-600" />
                    Compensación Horaria No Lectiva Obligatoria
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Todo exceso de horas de vigilancia que supere el horario lectivo ordinario <strong>será reducido</strong> del número de horas correspondientes al horario no lectivo de obligada presencia regular en el centro. Cada recreo adicional equivale a <strong>0,5 horas de reducción</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* TABLA DE RESUMEN POR DOCENTE */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-900 text-white p-4 font-bold text-sm flex items-center justify-between">
                <span>Resumen de Cómputo y Compensaciones del Claustro</span>
                <span className="text-xs font-normal text-slate-400">CEIP Juan Mendoza Mendoza</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 border-b border-slate-200 font-bold text-slate-700">
                    <tr>
                      <th className="p-3">Docente</th>
                      <th className="p-3">Departamento / Función</th>
                      <th className="p-3 text-center">Turnos Base</th>
                      <th className="p-3 text-center">Sustituciones</th>
                      <th className="p-3 text-center">Turnos Efectivos</th>
                      <th className="p-3 text-center">Reducción No Lectiva</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {teachers.map((t) => {
                      const st = teacherStats[t.name] || {
                        totalShifts: 0,
                        originalShiftsCount: 0,
                        substitutionsDone: 0,
                        excessHours: 0
                      };

                      return (
                        <tr key={t.id} className="hover:bg-slate-50">
                          <td className="p-3 font-semibold text-slate-900">{t.name}</td>
                          <td className="p-3 text-slate-500">{t.department}</td>
                          <td className="p-3 text-center font-medium">{st.originalShiftsCount}</td>
                          <td className="p-3 text-center text-emerald-700 font-bold">+{st.substitutionsDone}</td>
                          <td className="p-3 text-center font-bold text-slate-800">{st.totalShifts}</td>
                          <td className="p-3 text-center">
                            {st.excessHours > 0 ? (
                              <span className="bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded-full">
                                -{st.excessHours} h/sem
                              </span>
                            ) : (
                              <span className="text-slate-400">0 h</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA 6: ASISTENTE IA SÉNECA (GEMINI API) */}
        {activeTab === 'ai_assistant' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white p-6 rounded-2xl shadow-xl border border-purple-900/50 space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-purple-500/20 p-3 rounded-2xl border border-purple-400/30 text-purple-300">
                  <Sparkles className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    Asistente Inteligente Séneca-Recreos
                  </h2>
                  <p className="text-xs text-purple-200">
                    Optimización de coberturas, recomendación de sustitutos y consultas normativas en tiempo real
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <textarea
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  placeholder="Ej: ¿Qué docente de educación física está libre el martes a las 11:30 para cubrir una baja? O consulta cómo calcular la reducción horaria..."
                  className="w-full bg-slate-950/80 border border-purple-500/30 rounded-xl p-3.5 text-xs text-purple-100 placeholder-purple-400/60 focus:ring-2 focus:ring-purple-400 outline-none h-24"
                />

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <button
                      onClick={() => setAiQuery('¿Cómo se compensan los turnos extra de recreo según la Orden de 31 de agosto de 2026?')}
                      className="bg-purple-900/50 hover:bg-purple-800/60 border border-purple-700/50 px-2.5 py-1 rounded-lg text-purple-200 transition"
                    >
                      Duda Compensación
                    </button>
                    <button
                      onClick={() => setAiQuery('Recomiéndame sustitutos disponibles para cubrir a un tutor de 1º Primaria en el primer turno.')}
                      className="bg-purple-900/50 hover:bg-purple-800/60 border border-purple-700/50 px-2.5 py-1 rounded-lg text-purple-200 transition"
                    >
                      Sugerir Cobertura
                    </button>
                  </div>

                  <button
                    onClick={handleGeminiConsult}
                    disabled={aiLoading}
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg transition flex items-center gap-2 disabled:opacity-50"
                  >
                    {aiLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" /> Consultando...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" /> Consultar con IA
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Respuesta del Asistente IA */}
            {aiResponse && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-purple-600" />
                  Respuesta del Asistente Séneca:
                </h3>
                <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {aiResponse}
                </div>
              </div>
            )}
          </div>
        )}

        {/* PESTAÑA 7: ADMINISTRACIÓN */}
        {activeTab === 'admin' && (
          <div className="space-y-6">
            {!isAdminLoggedIn ? (
              <div className="max-w-md mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-slate-200 space-y-4 text-center">
                <div className="bg-amber-100 text-amber-800 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto border border-amber-300">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Acceso a Dirección y Jefatura</h2>
                  <p className="text-xs text-slate-500">
                    Introduzca el PIN de autorización para gestionar la importación de datos y sustituciones
                  </p>
                </div>

                <form onSubmit={handleAdminLogin} className="space-y-3">
                  <input
                    type="password"
                    placeholder="Ingrese PIN (1234 o CEIP2026)"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="w-full text-center bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-bold tracking-widest text-slate-800 outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  {pinError && <p className="text-xs text-rose-600 font-semibold">{pinError}</p>}
                  <button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-xl shadow transition"
                  >
                    Acceder
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Panel de Control de Administración */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <ShieldCheck className="w-6 h-6 text-emerald-600" />
                        Panel de Gestión Administrativa
                      </h2>
                      <p className="text-xs text-slate-500">
                        Gestión de importación de cuadrantes desde Excel/CSV y control de capas de asignación
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setIsCsvModalOpen(true)}
                        className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-1.5"
                      >
                        <Upload className="w-4 h-4 text-teal-400" />
                        Importar CSV / Excel
                      </button>

                      <button
                        onClick={() => handleOpenIncidenceModal()}
                        className="bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs px-3.5 py-2 rounded-xl shadow transition flex items-center gap-1.5"
                      >
                        <Plus className="w-4 h-4" />
                        Nueva Sustitución
                      </button>
                    </div>
                  </div>

                  {/* Explicación de las 3 capas de datos */}
                  <div className="grid gap-3 sm:grid-cols-3 pt-2 text-xs">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                      <div className="font-bold text-slate-800 flex items-center gap-1">
                        <FileSpreadsheet className="w-4 h-4 text-slate-500" />
                        1. Cuadrante Base
                      </div>
                      <p className="text-slate-500 text-[11px]">
                        Importado desde Excel/Séneca. Mantiene los turnos originales del curso.
                      </p>
                    </div>

                    <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 space-y-1">
                      <div className="font-bold text-amber-900 flex items-center gap-1">
                        <RefreshCw className="w-4 h-4 text-amber-600" />
                        2. Capa de Incidencias
                      </div>
                      <p className="text-amber-800 text-[11px]">
                        Bajas, permisos y permutas registradas manualmente. Protegidas contra reimportación.
                      </p>
                    </div>

                    <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 space-y-1">
                      <div className="font-bold text-emerald-900 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        3. Asignación Efectiva
                      </div>
                      <p className="text-emerald-800 text-[11px]">
                        Resultado combinado publicado en tiempo real para la consulta del profesorado.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Historial de Auditoría */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="bg-slate-900 text-white p-4 font-bold text-sm">
                    Registro de Modificaciones Recientes
                  </div>
                  <div className="p-4 divide-y divide-slate-100 text-xs">
                    {incidences.map((inc) => (
                      <div key={inc.id} className="py-2.5 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-800">{inc.date}</span>: {inc.originalTeacher} fue sustituido por{' '}
                          <span className="font-bold text-emerald-700">{inc.substituteTeacher}</span>
                          <span className="text-slate-400 text-[11px] block">{inc.notes}</span>
                        </div>
                        <span className="text-slate-400 text-[11px]">{inc.updatedAt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* MODAL PARA CREAR / EDITAR INCIDENCIA */}
      {isIncidenceModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full overflow-hidden space-y-4">
            <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
              <h3 className="font-bold text-sm">
                {editingIncidence ? 'Editar Registro de Cambio' : 'Registrar Nueva Sustitución / Permuta'}
              </h3>
              <button
                onClick={() => setIsIncidenceModalOpen(false)}
                className="text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveIncidence} className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Fecha Afectada:</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Turno:</label>
                  <select
                    value={formData.shiftId}
                    onChange={(e) => setFormData({ ...formData, shiftId: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {SHIFTS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Zona Afectada:</label>
                <select
                  value={formData.zoneId}
                  onChange={(e) => setFormData({ ...formData, zoneId: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {ZONES.map((z) => (
                    <option key={z.id} value={z.id}>
                      {z.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Docente Original:</label>
                  <select
                    value={formData.originalTeacher}
                    onChange={(e) => setFormData({ ...formData, originalTeacher: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {teachers.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Docente Sustituto:</label>
                  <select
                    value={formData.substituteTeacher}
                    onChange={(e) => setFormData({ ...formData, substituteTeacher: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {teachers.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Motivo Organizativo:</label>
                  <select
                    value={formData.reasonType}
                    onChange={(e) => setFormData({ ...formData, reasonType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="Reunión de coordinación">Reunión de coordinación</option>
                    <option value="Baja médica / Permiso">Baja médica / Permiso</option>
                    <option value="Salida escolar / Actividad">Salida escolar / Actividad</option>
                    <option value="Permuta acordada">Permuta acordada</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Estado:</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="Confirmada">Confirmada</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Resuelta">Resuelta</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Observaciones / Notas:</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Detalles sobre la sustitución, guardia o comunicación previa..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-teal-500 h-20"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsIncidenceModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold transition shadow-md"
                >
                  Guardar y Publicar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL IMPORTAR CSV / EXCEL */}
      {isCsvModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full overflow-hidden space-y-4">
            <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
              <h3 className="font-bold text-sm">Importar Cuadrante desde Archivo</h3>
              <button onClick={() => setIsCsvModalOpen(false)} className="text-slate-400 hover:text-white transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center space-y-2 bg-slate-50">
                <Upload className="w-8 h-8 text-teal-600 mx-auto" />
                <p className="font-bold text-slate-800">Seleccionar archivo CSV o Excel de Séneca</p>
                <p className="text-[11px] text-slate-500">
                  Arrastre el archivo o seleccione desde su dispositivo.
                </p>
                <input type="file" accept=".csv, .xlsx" className="hidden" id="csv-upload" />
                <label
                  htmlFor="csv-upload"
                  className="inline-block bg-slate-900 text-white font-semibold px-4 py-2 rounded-xl cursor-pointer hover:bg-slate-800 transition"
                >
                  Explorar Archivos
                </label>
              </div>

              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900 space-y-1">
                <div className="font-bold flex items-center gap-1 text-[11px]">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  Protección de Cambios Manuales
                </div>
                <p className="text-[11px] leading-relaxed">
                  Al importar un nuevo archivo, la aplicación actualizará el cuadrante base sin borrar las sustituciones y bajas registradas manualmente.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => setIsCsvModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium transition"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-6 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-slate-300">
              CEIP Juan Mendoza Mendoza • Almensilla (Sevilla)
            </p>
            <p className="text-[11px] text-slate-500">
              Sistema Interno de Gestión de Vigilancias de Recreo • Orden de 31 de agosto de 2026 (BOJA n.º 168 C3)
            </p>
          </div>
          <div className="text-[11px] text-slate-500">
            Versión 13.2 • Datos protegidos conforme a la LOPDGDD en centros educativos
          </div>
        </div>
      </footer>
    </div>
  );
}