function enviarRecordatorioManual(datosReunion) {
  try {
    // Validación de datos de entrada
    if (!datosReunion.email || !datosReunion.nombre) {
      throw new Error("Faltan datos requeridos (nombre o email)");
    }
    
    var nombre = datosReunion.nombre;
    var email = datosReunion.email;
    var fechaReunion = new Date(datosReunion.fecha);
    
    // Validar que la fecha es correcta
    if (isNaN(fechaReunion.getTime())) {
      throw new Error("Fecha de reunión no válida");
    }
    
    var horaReunion = datosReunion.hora;
    var asunto = datosReunion.asunto || "Recordatorio de reunión";
    
    // Validar formato de hora
    if (!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(horaReunion)) {
      throw new Error("Formato de hora no válido (use HH:MM)");
    }
    
    // Formatear la fecha y hora
    var opcionesFecha = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      timeZone: 'America/Santiago' // Ajusta según tu zona horaria
    };
    
    var fechaFormateada = fechaReunion.toLocaleDateString('es-ES', opcionesFecha);
    // Convertir primera letra a mayúscula
    fechaFormateada = fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
    
    // Formatear la hora para mostrarla más amigable
    var [horas, minutos] = horaReunion.split(':');
    var horaFormateada = `${horas}:${minutos}`;
    var amPm = parseInt(horas) >= 12 ? "PM" : "AM";
    var hora12 = parseInt(horas) > 12 ? parseInt(horas) - 12 : parseInt(horas);
    hora12 = hora12 === 0 ? 12 : hora12; // Corrige la medianoche
    var horaFormateada12 = `${hora12}:${minutos} ${amPm}`;

    // URL del logo (usando una imagen accesible públicamente)
    var logoUrl = "https://i.postimg.cc/qBDhkQ0y/logogonzalo.png";
    
    // Colores de branding consistentes con la interfaz
    var colorDarkGreen = "#5d6852";
    var colorOlive = "#7d8570";
    var colorLight = "#f9f7f2";
    var colorAccent = "#a3c1ad";
    
    // Crear un mensaje HTML con formato profesional y branding
    var htmlMensaje = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${asunto}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333333;
          background-color: #f9f7f2;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 3px 10px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, ${colorDarkGreen}, ${colorOlive});
          padding: 20px;
          text-align: center;
        }
        .logo {
          max-width: 180px;
          height: auto;
          margin-bottom: 10px;
        }
        .content {
          padding: 30px;
          background-color: #ffffff;
        }
        .meeting-details {
          background-color: ${colorLight};
          border-left: 4px solid ${colorDarkGreen};
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .detail-row {
          margin-bottom: 8px;
        }
        .detail-label {
          font-weight: bold;
          color: ${colorDarkGreen};
          min-width: 80px;
          display: inline-block;
        }
        .button {
          display: inline-block;
          background-color: ${colorDarkGreen};
          color: #ffffff !important;
          text-decoration: none;
          padding: 12px 30px;
          border-radius: 6px;
          margin: 20px 0;
          text-align: center;
          font-weight: bold;
        }
        .footer {
          background-color: #f5f5f5;
          padding: 15px 30px;
          text-align: center;
          font-size: 12px;
          color: #666666;
        }
        .social {
          margin-top: 15px;
        }
        .social img {
          width: 24px;
          height: 24px;
          margin: 0 5px;
        }
        .highlight {
          color: ${colorDarkGreen};
          font-weight: bold;
        }
        h2 {
          color: ${colorDarkGreen};
          margin-top: 0;
        }
        @media only screen and (max-width: 620px) {
          .container {
            width: 100% !important;
            border-radius: 0;
          }
          .content, .header, .footer {
            padding: 15px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="${logoUrl}" alt="Logo" class="logo">
          <h2 style="color: #ffffff; margin: 0;">Recordatorio de Reunión</h2>
        </div>
        
        <div class="content">
          <p>Hola <span class="highlight">${nombre}</span>,</p>
          
          <p>Te recordamos tu próxima reunión programada. Por favor marca en tu calendario los siguientes detalles:</p>
          
          <div class="meeting-details">
            <div class="detail-row">
              <span class="detail-label">Fecha:</span> ${fechaFormateada}
            </div>
            <div class="detail-row">
              <span class="detail-label">Hora:</span> ${horaFormateada} (${horaFormateada12})
            </div>
            <div class="detail-row">
              <span class="detail-label">Asunto:</span> ${asunto}
            </div>
          </div>
          
          <p>Por favor confirma tu asistencia respondiendo a este correo electrónico. Si necesitas reagendar o tienes alguna pregunta, háznos saber con anticipación.</p>
          
          <a href="mailto:${Session.getActiveUser().getEmail()}?subject=Confirmación: ${asunto}&body=Confirmo mi asistencia a la reunión del ${fechaFormateada} a las ${horaFormateada}." class="button">Confirmar Asistencia</a>
          
          <p>¡Te esperamos!</p>
          
          <p>Saludos cordiales,<br>
          <span class="highlight">Equipo de organización</span></p>
        </div>
        
        <div class="footer">
          <p>Este es un mensaje automático, por favor no responder a esta dirección de correo.<br>
          Para cualquier consulta, contáctanos a: ${Session.getActiveUser().getEmail()}</p>
          
          <div class="social">
            <a href="#"><img src="https://i.postimg.cc/RZJN3tFD/facebook.png" alt="Facebook"></a>
            <a href="#"><img src="https://i.postimg.cc/CLtW3h6V/twitter.png" alt="Twitter"></a>
            <a href="#"><img src="https://i.postimg.cc/4N8C0MKs/instagram.png" alt="Instagram"></a>
          </div>
          
          <p>&copy; ${new Date().getFullYear()} Sistema de Recordatorios. Todos los derechos reservados.</p>
        </div>
      </div>
    </body>
    </html>
    `;
    
    // Mantener el mensaje de texto plano como respaldo
    var mensajePlano = `Hola ${nombre},\n\n`;
    mensajePlano += `Este es un recordatorio de tu reunión programada para:\n`;
    mensajePlano += `Fecha: ${fechaFormateada}\n`;
    mensajePlano += `Hora: ${horaReunion}\n`;
    mensajePlano += `Asunto: ${asunto}\n\n`;
    mensajePlano += `Por favor, confirma tu asistencia respondiendo a este correo.\n\n`;
    mensajePlano += `¡Te esperamos!\n\n`;
    mensajePlano += `Saludos cordiales,\nEquipo de organización`;
    
    // NUEVO: Crear evento en Google Calendar y enviar invitación
    var eventoCalendario = crearEventoCalendario(asunto, datosReunion.fecha, horaReunion, email, nombre);
    
    // Añadir cabeceras para evitar spam y configurar correo HTML
    var options = {
      name: "Sistema de Recordatorios",
      replyTo: Session.getActiveUser().getEmail(), // Usa el email del remitente autorizado
      htmlBody: htmlMensaje
    };
    
    // Registrar antes de enviar (para depuración)
    console.log(`Intentando enviar a: ${email}`);
    console.log(`Asunto: ${asunto}`);
    
    // Enviar correo
    MailApp.sendEmail(email, asunto, mensajePlano, options);
    
    // Registrar en hoja de cálculo (con más detalles)
    try {
      var spreadsheet = SpreadsheetApp.openById("1D-y6xPybZIibKy8RhmU8_WyXLpa8_uOekM3hMY7M1v8");
      var hoja = spreadsheet.getSheetByName("registro");
      
      // Añadir marca de tiempo y estado
      var timestamp = new Date();
      hoja.appendRow([
        nombre, 
        email, 
        fechaReunion, 
        horaReunion, 
        asunto, 
        timestamp, 
        "Enviado",
        `Enviado por: ${Session.getActiveUser().getEmail()}`,
        eventoCalendario ? eventoCalendario.getId() : "No creado" // ID del evento creado
      ]);
      
      // Asegurar que los datos se guarden
      SpreadsheetApp.flush();
    } catch (e) {
      console.error("Error al registrar en hoja:", e);
      // No fallar si hay error en la hoja, solo registrar
    }
    
    return {
      success: true, 
      message: `Recordatorio enviado con éxito a ${email}. Revisa tu bandeja de entrada y spam. Se ha añadido el evento a tu calendario.`
    };
  } catch (e) {
    console.error("Error en enviarRecordatorioManual:", e);
    return {
      success: false, 
      message: `Error al enviar el recordatorio: ${e.message}`
    };
  }
}

/**
 * Crea un evento en Google Calendar y envía invitaciones
 * @param {string} titulo - Título del evento
 * @param {string} fecha - Fecha en formato YYYY-MM-DD
 * @param {string} hora - Hora en formato HH:MM
 * @param {string} invitadoEmail - Email del invitado
 * @param {string} invitadoNombre - Nombre del invitado
 * @return {CalendarEvent} El evento creado o null si hay error
 */
function crearEventoCalendario(titulo, fecha, hora, invitadoEmail, invitadoNombre) {
  try {
    // Obtener calendario predeterminado
    var calendario = CalendarApp.getDefaultCalendar();
    
    // Parsear la fecha y hora
    var [horas, minutos] = hora.split(':').map(Number);
    var fechaHoraInicio = new Date(fecha);
    fechaHoraInicio.setHours(horas, minutos, 0, 0);
    
    // Crear fecha de fin (1 hora después por defecto)
    var fechaHoraFin = new Date(fechaHoraInicio.getTime());
    fechaHoraFin.setHours(fechaHoraInicio.getHours() + 1);
    
    // Descripción del evento
    var descripcion = `Reunión con ${invitadoNombre}.\n\n`;
    descripcion += `Este evento fue creado automáticamente por el Sistema de Recordatorios.`;
    
    // Ubicación (opcional)
    var ubicacion = "Por confirmar";
    
    // Crear el evento
    var evento = calendario.createEvent(
      titulo,
      fechaHoraInicio,
      fechaHoraFin,
      {
        description: descripcion,
        location: ubicacion,
        guests: invitadoEmail,
        sendInvites: true // Esto envía automáticamente las invitaciones por correo
      }
    );
    
    console.log(`Evento creado: ${evento.getId()}`);
    return evento;
  } catch (e) {
    console.error("Error al crear evento en calendario:", e);
    return null;
  }
}

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Sistema de Recordatorios')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL); // Permite iframe embebido
}

// Función para verificar permisos
function verificarPermisos() {
  try {
    // Intentar acceder a la hoja de cálculo
    var spreadsheet = SpreadsheetApp.openById("1D-y6xPybZIibKy8RhmU8_WyXLpa8_uOekM3hMY7M1v8");
    var hoja = spreadsheet.getSheetByName("registro");
    
    // Verificar también acceso al calendario
    var calendario = CalendarApp.getDefaultCalendar();
    
    return {
      hasSpreadsheetAccess: true,
      hasCalendarAccess: true
    };
  } catch (e) {
    console.error("Error al verificar permisos:", e);
    return {
      hasSpreadsheetAccess: e.message.indexOf("Spreadsheet") === -1,
      hasCalendarAccess: e.message.indexOf("Calendar") === -1,
      error: e.message
    };
  }
}