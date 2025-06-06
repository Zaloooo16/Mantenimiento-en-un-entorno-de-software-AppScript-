# Mantenimiento-en-un-entorno-de-software-AppScript-
Actividad 17
# 🛠 Sistema de Recordatorios Automatizados (Google Apps Script)

[![GitHub last commit](https://img.shields.io/github/last-commit/Zaloooo16/Mantenimiento-en-un-entorno-de-software-AppScript-)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 🔗 URL del Repositorio
https://github.com/Zaloooo16/Mantenimiento-en-un-entorno-de-software-AppScript-

##  Objetivo
Automatizar el envío profesional de recordatorios de reuniones con:
- ✉️ Emails HTML responsivos con branding corporativo
- 📅 Creación automática de eventos en Google Calendar
- 📊 Registro en Google Sheets para auditoría
- ✅ Validación de datos en tiempo real

##  Características Principales
```javascript
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

## Refactorización Realizada
Problemas Detectados (Before)
Código monolítico: Función principal con 200+ líneas

Validaciones frágiles:
// Problema: Validación dispersa
if (!datos.email) { /* ... */ }
if (!/^.../.test(datos.hora)) { /* ... */ }
