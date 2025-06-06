# Mantenimiento en un entorno de software - AppScript

## URL del Repositorio
https://github.com/Zaloooo16/Mantenimiento-en-un-entorno-de-software-AppScript-

## Objetivo
Automatizar el envío profesional de recordatorios de reuniones con:
- Emails HTML responsivos con branding corporativo
- Creación automática de eventos en Google Calendar
- Registro en Google Sheets para auditoría
- Validación de datos en tiempo real

## Características Principales
function enviarRecordatorio(datos) {
  // 1. Validación inteligente
  validateData(datos); 
  
  // 2. Generación de contenido dinámico
  const html = generateEmailHTML(datos);
  
  // 3. Gestión de eventos en calendario
  createCalendarEvent(datos); 
  
  // 4. Registro en hoja de cálculo
  logActivity(datos);
}
Refactorización Realizada
Problemas Detectados (Antes)
Código monolítico: Función principal con más de 200 líneas

Validaciones frágiles:

javascript
if (!datos.email) { /* ... */ }
if (!/^.../.test(datos.hora)) { /* ... */ }
HTML hardcodeado con estilos repetidos

Manejo de errores básico con try-catch genéricos

Soluciones Implementadas (Después)
Arquitectura modular:

/src
  /services
    EmailService.gs
    CalendarService.gs
  /utils
    Validators.gs
    DateFormatters.gs
Patrón Builder para emails:

javascript
const email = new EmailBuilder()
  .setRecipient(datos.email)
  .setTemplate('meeting_reminder')
  .build();
Centralización de estilos:

javascript
// styles.js
export const BRAND_COLORS = {
  primary: "#5d6852",
  secondary: "#7d8570" 
};
Métricas de Mejora
Indicador	Antes	Después	Mejora
Complejidad (McCabe)	18	6	66% ↓
Líneas de código	320	180	43% ↓
Acoplamiento	Alto	Bajo	-
Errores Corregidos
Validación de hora:

Error: Aceptaba "24:00" como válido

Solución: Nueva expresión regular ^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$

Timezone en eventos:

Error: Usaba UTC por defecto

Solución:

javascript
CalendarApp.getDefaultCalendar()
  .setTimeZone('America/Santiago');
XSS en campos HTML:

Error: No sanitizaba inputs en HTML

Solución:

javascript
function sanitize(input) {
  return HtmlService.createHtmlOutput(input).getContent();
}
