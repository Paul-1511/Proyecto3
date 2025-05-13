export const ALL_REPORTS = {
  donaciones_detalladas: {
    name: "Hacer una Consulta",
    endpoint: "/reportes/donaciones",
    filters: {
      fecha_inicio: { type: "date", label: "Fecha Inicio" },
      fecha_fin: { type: "date", label: "Fecha Fin" },
      monto_minimo: { type: "number", label: "Monto Mínimo" },
      monto_maximo: { type: "number", label: "Monto Máximo" },
      
    },
    columns: [
      { key: "id", label: "ID" },
      { key: "campana_nombre", label: "Campaña" },
      { key: "tipo", label: "Tipo" },
      { key: "monto", label: "Monto", format: "currency" },
      { key: "fecha", label: "Fecha", format: "date" }
    ]
  },

  donaciones_por_campana: {
    name: "Donaciones por Campaña",
    endpoint: "/reportes/donaciones-por-campana",
    filters: {
      fecha_inicio: { type: "date", label: "Fecha Inicio" },
      fecha_fin: { type: "date", label: "Fecha Fin" }
    },
    columns: [
      { key: "campana", label: "Campaña" },
      { key: "total_recaudado", label: "Total", format: "currency" }
    ]
  },

  voluntarios_por_campana: {
    name: "Voluntarios por Campaña",
    endpoint: "/reportes/voluntarios-por-campana",
    filters: {
      tipo_campana: {
        type: "select",
        label: "Tipo Campaña",
        options: ["Salud", "Educación", "Ambiental"]
      }
    },
    columns: [
      { key: "campana", label: "Campaña" },
      { key: "voluntarios", label: "Voluntarios" }
    ]
  },

  horas_voluntariado: {
    name: "Horas de Voluntariado",
    endpoint: "/reportes/horas-voluntariado",
    filters: {
      fecha_inicio: { type: "date", label: "Fecha Inicio" },
      fecha_fin: { type: "date", label: "Fecha Fin" }
    },
    columns: [
      { key: "nombre", label: "Voluntario" },
      { key: "total_horas", label: "Total de Horas" }
    ]
  },

  resumen_general: {
    name: "Resumen General",
    endpoint: "/reportes/resumen",
    filters: {},
    columns: [
      { key: "total_donaciones", label: "Total Donaciones", format: "currency" },
      { key: "total_voluntarios", label: "Total Voluntarios" },
      { key: "total_horas", label: "Total Horas Voluntariado" }
    ]
  },
  // eslint-disable-next-line no-dupe-keys
  voluntarios_por_campana: {
  name: "Voluntarios por Campaña",
  endpoint: "/reportes/voluntarios-por-campana",
  filters: {
    tipo_campana: {
      type: "select",
      label: "Tipo Campaña",
      options: ["donación", "voluntariado"] 
    }
  },
  columns: [
    { key: "campana", label: "Campaña" },
    { key: "voluntarios", label: "Voluntarios" }
  ]
},
};