export const TOPICS = {
  historia: { label: 'Historia', heading: 'Historia de los menonitas' },
  costumbres: { label: 'Costumbres', heading: 'Costumbres y vida cotidiana' },
  cultura: { label: 'Cultura y relatos', heading: 'Cultura y relatos de viajeros' },
} as const;

export type Topic = keyof typeof TOPICS;

// Orden de lectura sugerido dentro de cada tema (por slug); lo que no esté va al final
export const ORDER = [
  'historia-de-los-menonitas',
  'antecedentes-historicos-menonitas',
  'menonitas-del-imperio-ruso-a-la-pampa',
  'exodo-de-los-menonitas',
  'historia-colonia-nueva-esperanza',
  'colonia-menonita-guatrache',
  'costumbres-menonitas',
  'vestimenta-menonita',
  'casas-menonitas',
  'comida-menonita',
  'educacion-menonita',
  'agricultura-menonita',
  'rito-de-fallecimiento-menonita',
  'cultura-menonita',
  'menonitas-un-pueblo-detenido-en-el-tiempo',
  'menonitas-un-estilo-de-vida',
  'relato-de-un-viajero-en-la-colonia',
  'colonia-menonita-experiencia-increible',
];

export const byOrder = <T extends { id: string }>(a: T, b: T) => {
  const ia = ORDER.indexOf(a.id), ib = ORDER.indexOf(b.id);
  return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
};
