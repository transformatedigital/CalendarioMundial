// Copa Mundial FIFA 2026 - USA · México · Canadá
// Fechas, sedes y horarios oficiales del calendario FIFA.
// Jornadas 1 y 2 (matches 1-48): horarios confirmados en hora CDMX.
// Jornada 3 (49-72) y eliminatorias (73-104): horarios preliminares - verificar.

// IANA timezone por sede
const VENUE_TZ = {
  'Ciudad de México':   'America/Mexico_City',  // UTC-6 (sin DST)
  'Guadalajara':        'America/Mexico_City',
  'Monterrey':          'America/Monterrey',    // UTC-6
  'Atlanta':            'America/New_York',     // UTC-4 jun/jul (EDT)
  'Boston':             'America/New_York',
  'Dallas':             'America/Chicago',      // UTC-5 jun/jul (CDT)
  'Houston':            'America/Chicago',
  'Kansas City':        'America/Chicago',
  'Los Ángeles':        'America/Los_Angeles',  // UTC-7 jun/jul (PDT)
  'Miami':              'America/New_York',
  'Nueva York/NJ':      'America/New_York',
  'Filadelfia':         'America/New_York',
  'San Francisco Bay':  'America/Los_Angeles',
  'Seattle':            'America/Los_Angeles',
  'Toronto':            'America/Toronto',      // UTC-4 jun/jul
  'Vancouver':          'America/Vancouver',    // UTC-7 jun/jul
};

// Grupos oficiales del Mundial 2026 (Sorteo FIFA - 5 dic 2025)
const GROUPS = {
  A: ['México',          'Sudáfrica',              'Corea del Sur',  'Chequia'],
  B: ['Canadá',          'Bosnia y Herzegovina',   'Catar',          'Suiza'],
  C: ['Brasil',          'Marruecos',              'Haití',          'Escocia'],
  D: ['Estados Unidos',  'Paraguay',               'Australia',      'Turquía'],
  E: ['Alemania',        'Curazao',                'Costa de Marfil','Ecuador'],
  F: ['Países Bajos',    'Japón',                  'Suecia',         'Túnez'],
  G: ['Bélgica',         'Egipto',                 'Irán',           'Nueva Zelanda'],
  H: ['España',          'Cabo Verde',             'Arabia Saudita', 'Uruguay'],
  I: ['Francia',         'Senegal',                'Irak',           'Noruega'],
  J: ['Argentina',       'Argelia',                'Austria',        'Jordania'],
  K: ['Portugal',        'RD Congo',               'Uzbekistán',     'Colombia'],
  L: ['Inglaterra',      'Croacia',                'Ghana',          'Panamá'],
};

// --- Helpers de tiempo ---
// CDMX → UTC: CDMX está siempre en UTC-6 (sin DST desde 2022).
function cdmxToUTC(dateStr, timeStr) {
  const [y, mo, d] = dateStr.split('-').map(Number);
  const [hh, mm]   = timeStr.split(':').map(Number);
  return new Date(Date.UTC(y, mo - 1, d, hh + 6, mm)).toISOString();
}
// Hora local de sede → UTC (usa el tz IANA real)
function localToUTC(dateStr, timeStr, venue) {
  const tz = VENUE_TZ[venue];
  const naive = new Date(`${dateStr}T${timeStr}:00`);
  const asUTC = new Date(naive.toLocaleString('en-US', { timeZone: 'UTC' }));
  const asVenue = new Date(naive.toLocaleString('en-US', { timeZone: tz }));
  return new Date(naive.getTime() + (asUTC - asVenue)).toISOString();
}

// Atajo para definir un partido con hora CDMX y equipos por nombre
const M = (n, date, cdmxTime, venue, stage, home, away) => ({
  n, date, time: cdmxTime, venue, stage, home, away,
  utc: cdmxToUTC(date, cdmxTime),
});

// Atajo para partidos con hora local de sede (jornada 3 + eliminatorias)
const ML = (n, date, time, venue, stage, home, away) => ({
  n, date, time, venue, stage, home, away,
  utc: localToUTC(date, time, venue),
});

const MATCHES = [
  // ============ JORNADA 1 (horas CDMX confirmadas) ============
  // Jueves 11 junio
  M(  1, '2026-06-11', '13:00', 'Ciudad de México', 'A', 'México',          'Sudáfrica'),
  M(  2, '2026-06-11', '20:00', 'Guadalajara',      'A', 'Corea del Sur',   'Chequia'),
  // Viernes 12 junio
  M(  3, '2026-06-12', '14:00', 'Toronto',          'B', 'Canadá',          'Bosnia y Herzegovina'),
  M(  4, '2026-06-12', '20:00', 'Los Ángeles',      'D', 'Estados Unidos',  'Paraguay'),
  // Sábado 13 junio
  M(  5, '2026-06-13', '14:00', 'San Francisco Bay','B', 'Catar',           'Suiza'),
  M(  6, '2026-06-13', '17:00', 'Nueva York/NJ',    'C', 'Brasil',          'Marruecos'),
  M(  7, '2026-06-13', '20:00', 'Boston',           'C', 'Haití',           'Escocia'),
  M(  8, '2026-06-13', '20:00', 'Vancouver',        'D', 'Australia',       'Turquía'),
  // Domingo 14 junio
  M(  9, '2026-06-14', '11:00', 'Houston',          'E', 'Alemania',        'Curazao'),
  M( 10, '2026-06-14', '14:00', 'Dallas',           'F', 'Países Bajos',    'Japón'),
  M( 11, '2026-06-14', '17:00', 'Filadelfia',       'E', 'Costa de Marfil', 'Ecuador'),
  M( 12, '2026-06-14', '20:00', 'Monterrey',        'F', 'Suecia',          'Túnez'),
  // Lunes 15 junio
  M( 13, '2026-06-15', '11:00', 'Atlanta',          'H', 'España',          'Cabo Verde'),
  M( 14, '2026-06-15', '14:00', 'Seattle',          'G', 'Bélgica',         'Egipto'),
  M( 15, '2026-06-15', '17:00', 'Miami',            'H', 'Arabia Saudita',  'Uruguay'),
  M( 16, '2026-06-15', '20:00', 'Los Ángeles',      'G', 'Irán',            'Nueva Zelanda'),
  // Martes 16 junio
  M( 17, '2026-06-16', '14:00', 'Nueva York/NJ',    'I', 'Francia',         'Senegal'),
  M( 18, '2026-06-16', '17:00', 'Boston',           'I', 'Irak',            'Noruega'),
  M( 19, '2026-06-16', '20:00', 'Kansas City',      'J', 'Argentina',       'Argelia'),
  M( 20, '2026-06-16', '20:00', 'San Francisco Bay','J', 'Austria',         'Jordania'),
  // Miércoles 17 junio
  M( 21, '2026-06-17', '12:00', 'Houston',          'K', 'Portugal',        'RD Congo'),
  M( 22, '2026-06-17', '15:00', 'Dallas',           'L', 'Inglaterra',      'Croacia'),
  M( 23, '2026-06-17', '18:00', 'Toronto',          'L', 'Ghana',           'Panamá'),
  M( 24, '2026-06-17', '20:00', 'Ciudad de México', 'K', 'Uzbekistán',      'Colombia'),

  // ============ JORNADA 2 (horas CDMX confirmadas) ============
  // Jueves 18 junio
  M( 25, '2026-06-18', '11:00', 'Atlanta',          'A', 'Chequia',         'Sudáfrica'),
  M( 26, '2026-06-18', '14:00', 'Los Ángeles',      'B', 'Suiza',           'Bosnia y Herzegovina'),
  M( 27, '2026-06-18', '17:00', 'Vancouver',        'B', 'Canadá',          'Catar'),
  M( 28, '2026-06-18', '20:00', 'Guadalajara',      'A', 'México',          'Corea del Sur'),
  // Viernes 19 junio
  M( 29, '2026-06-19', '17:00', 'Boston',           'C', 'Escocia',         'Marruecos'),
  M( 30, '2026-06-19', '19:00', 'Seattle',          'D', 'Estados Unidos',  'Australia'),
  M( 31, '2026-06-19', '20:00', 'Filadelfia',       'C', 'Brasil',          'Haití'),
  M( 32, '2026-06-19', '20:00', 'San Francisco Bay','D', 'Turquía',         'Paraguay'),
  // Sábado 20 junio
  M( 33, '2026-06-20', '12:00', 'Houston',          'F', 'Países Bajos',    'Suecia'),
  M( 34, '2026-06-20', '15:00', 'Toronto',          'E', 'Alemania',        'Costa de Marfil'),
  M( 35, '2026-06-20', '19:00', 'Kansas City',      'E', 'Ecuador',         'Curazao'),
  M( 36, '2026-06-20', '21:00', 'Monterrey',        'F', 'Túnez',           'Japón'),
  // Domingo 21 junio
  M( 37, '2026-06-21', '11:00', 'Atlanta',          'H', 'España',          'Arabia Saudita'),
  M( 38, '2026-06-21', '14:00', 'Los Ángeles',      'G', 'Bélgica',         'Irán'),
  M( 39, '2026-06-21', '17:00', 'Miami',            'H', 'Uruguay',         'Cabo Verde'),
  M( 40, '2026-06-21', '20:00', 'Vancouver',        'G', 'Nueva Zelanda',   'Egipto'),
  // Lunes 22 junio
  M( 41, '2026-06-22', '12:00', 'Dallas',           'J', 'Argentina',       'Austria'),
  M( 42, '2026-06-22', '16:00', 'Filadelfia',       'I', 'Francia',         'Irak'),
  M( 43, '2026-06-22', '19:00', 'Nueva York/NJ',    'I', 'Noruega',         'Senegal'),
  M( 44, '2026-06-22', '20:00', 'San Francisco Bay','J', 'Jordania',        'Argelia'),
  // Martes 23 junio
  M( 45, '2026-06-23', '12:00', 'Houston',          'K', 'Portugal',        'Uzbekistán'),
  M( 46, '2026-06-23', '15:00', 'Boston',           'L', 'Inglaterra',      'Ghana'),
  M( 47, '2026-06-23', '18:00', 'Toronto',          'L', 'Panamá',          'Croacia'),
  M( 48, '2026-06-23', '20:00', 'Guadalajara',      'K', 'Colombia',        'RD Congo'),

  // ============ JORNADA 3 (horarios preliminares - simultáneos por grupo) ============
  // Miércoles 24 junio - Grupos A y B
  ML( 49, '2026-06-24', '14:00', 'Guadalajara',       'A', 'Sudáfrica',     'Corea del Sur'),
  ML( 50, '2026-06-24', '14:00', 'Ciudad de México', 'A', 'Chequia',       'México'),
  ML( 51, '2026-06-24', '18:00', 'Toronto',          'B', 'Bosnia y Herzegovina', 'Catar'),
  ML( 52, '2026-06-24', '18:00', 'Vancouver',        'B', 'Suiza',         'Canadá'),
  // Jueves 25 junio - Grupos C, D, E, F
  ML( 53, '2026-06-25', '12:00', 'Seattle',          'C', 'Marruecos',     'Haití'),
  ML( 54, '2026-06-25', '12:00', 'Los Ángeles',      'C', 'Escocia',       'Brasil'),
  ML( 55, '2026-06-25', '15:00', 'Nueva York/NJ',    'D', 'Paraguay',      'Australia'),
  ML( 56, '2026-06-25', '15:00', 'Filadelfia',       'D', 'Turquía',       'Estados Unidos'),
  ML( 57, '2026-06-25', '18:00', 'Boston',           'E', 'Curazao',       'Costa de Marfil'),
  ML( 58, '2026-06-25', '18:00', 'Atlanta',          'E', 'Ecuador',       'Alemania'),
  ML( 59, '2026-06-25', '21:00', 'Houston',          'F', 'Japón',         'Suecia'),
  ML( 60, '2026-06-25', '21:00', 'Dallas',           'F', 'Túnez',         'Países Bajos'),
  // Viernes 26 junio - Grupos G, H, I, J
  ML( 61, '2026-06-26', '12:00', 'Kansas City',      'G', 'Egipto',        'Irán'),
  ML( 62, '2026-06-26', '12:00', 'Monterrey',        'G', 'Nueva Zelanda', 'Bélgica'),
  ML( 63, '2026-06-26', '15:00', 'San Francisco Bay','H', 'Cabo Verde',    'Arabia Saudita'),
  ML( 64, '2026-06-26', '15:00', 'Miami',            'H', 'Uruguay',       'España'),
  ML( 65, '2026-06-26', '18:00', 'Toronto',          'I', 'Senegal',       'Irak'),
  ML( 66, '2026-06-26', '18:00', 'Vancouver',        'I', 'Noruega',       'Francia'),
  ML( 67, '2026-06-26', '21:00', 'Los Ángeles',      'J', 'Argelia',       'Austria'),
  ML( 68, '2026-06-26', '21:00', 'Seattle',          'J', 'Jordania',      'Argentina'),
  // Sábado 27 junio - Grupos K y L
  ML( 69, '2026-06-27', '12:00', 'Boston',           'K', 'RD Congo',      'Uzbekistán'),
  ML( 70, '2026-06-27', '12:00', 'Atlanta',          'K', 'Colombia',      'Portugal'),
  ML( 71, '2026-06-27', '15:00', 'Nueva York/NJ',    'L', 'Croacia',       'Ghana'),
  ML( 72, '2026-06-27', '15:00', 'Filadelfia',       'L', 'Panamá',        'Inglaterra'),

  // ============ DIECISEISAVOS (Ronda de 32) ============
  ML( 73, '2026-06-28', '12:00', 'Filadelfia',        'R32', '1A',  '3C/D/E/F'),
  ML( 74, '2026-06-28', '15:00', 'Dallas',            'R32', '1C',  '3D/E/F/I'),
  ML( 75, '2026-06-28', '18:00', 'Atlanta',           'R32', '1B',  '3A/E/F'),
  ML( 76, '2026-06-28', '21:00', 'Monterrey',         'R32', '2A',  '2C'),
  ML( 77, '2026-06-29', '12:00', 'Toronto',           'R32', '1F',  '3A/B/C/D'),
  ML( 78, '2026-06-29', '15:00', 'Los Ángeles',       'R32', '1D',  '3B/E/F/I'),
  ML( 79, '2026-06-29', '18:00', 'Seattle',           'R32', '1E',  '3A/B/C/H'),
  ML( 80, '2026-06-29', '21:00', 'San Francisco Bay', 'R32', '2B',  '2F'),
  ML( 81, '2026-06-30', '12:00', 'Boston',            'R32', '1G',  '3C/E/H/I'),
  ML( 82, '2026-06-30', '15:00', 'Kansas City',       'R32', '1I',  '3A/B/F/H'),
  ML( 83, '2026-06-30', '18:00', 'Houston',           'R32', '1H',  '3D/G/J/L'),
  ML( 84, '2026-06-30', '21:00', 'Miami',             'R32', '2H',  '2L'),
  ML( 85, '2026-07-01', '12:00', 'Nueva York/NJ',     'R32', '1L',  '3E/H/I/J'),
  ML( 86, '2026-07-01', '15:00', 'Vancouver',         'R32', '1K',  '3G/H/I/J'),
  ML( 87, '2026-07-01', '18:00', 'Ciudad de México',  'R32', '1J',  '3D/G/H/L'),
  ML( 88, '2026-07-01', '21:00', 'Guadalajara',       'R32', '2K',  '2I'),

  // ============ OCTAVOS (Ronda de 16) ============
  ML( 89, '2026-07-04', '12:00', 'Atlanta',           'R16', 'W73', 'W74'),
  ML( 90, '2026-07-04', '16:00', 'Boston',            'R16', 'W77', 'W78'),
  ML( 91, '2026-07-04', '20:00', 'Los Ángeles',       'R16', 'W75', 'W76'),
  ML( 92, '2026-07-05', '13:00', 'Dallas',            'R16', 'W79', 'W80'),
  ML( 93, '2026-07-05', '17:00', 'Filadelfia',        'R16', 'W83', 'W84'),
  ML( 94, '2026-07-06', '16:00', 'Miami',             'R16', 'W81', 'W82'),
  ML( 95, '2026-07-06', '20:00', 'Kansas City',       'R16', 'W87', 'W88'),
  ML( 96, '2026-07-07', '16:00', 'San Francisco Bay', 'R16', 'W85', 'W86'),

  // ============ CUARTOS DE FINAL ============
  ML( 97, '2026-07-09', '16:00', 'Los Ángeles',       'QF', 'W89', 'W90'),
  ML( 98, '2026-07-09', '20:00', 'Boston',            'QF', 'W91', 'W92'),
  ML( 99, '2026-07-10', '16:00', 'Miami',             'QF', 'W93', 'W94'),
  ML(100, '2026-07-11', '15:00', 'Kansas City',       'QF', 'W95', 'W96'),

  // ============ SEMIFINALES ============
  ML(101, '2026-07-14', '15:00', 'Dallas',            'SF', 'W97', 'W98'),
  ML(102, '2026-07-15', '15:00', 'Atlanta',           'SF', 'W99', 'W100'),

  // ============ TERCER LUGAR ============
  ML(103, '2026-07-18', '15:00', 'Miami',             '3P', 'L101', 'L102'),

  // ============ FINAL ============
  ML(104, '2026-07-19', '15:00', 'Nueva York/NJ',     'F',  'W101', 'W102'),
];

// Resuelve nombre de equipo si es un slot (A1, A2..) usando GROUPS
function resolveTeam(slot) {
  if (!slot) return '—';
  const m = slot.match(/^([A-L])([1-4])$/);
  if (!m) return slot;
  const [, letter, pos] = m;
  const team = GROUPS[letter] && GROUPS[letter][parseInt(pos, 10) - 1];
  return team && team !== 'Por confirmar' ? team : slot;
}

// Subir esta versión cuando se actualicen GROUPS o MATCHES;
// el cliente borrará los overrides de grupos en localStorage la primera vez que cargue.
const DATA_VERSION = '2025-12-05-official';

window.MUNDIAL_DATA = { GROUPS, MATCHES, VENUE_TZ, resolveTeam, DATA_VERSION };
