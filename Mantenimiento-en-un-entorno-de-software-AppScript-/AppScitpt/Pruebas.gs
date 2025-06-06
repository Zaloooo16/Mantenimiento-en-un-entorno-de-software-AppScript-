// ValidadorCampos.gs
function ejecutarPruebasValidacion() {
  try {
    // Casos de prueba adaptados a tu sistema
    const casosPrueba = [
      // Casos válidos
      {
        nombre: "María González",
        email: "maria@correo.com",
        fechaNacimiento: "1985-05-15",
        fecha: "2023-12-15",
        hora: "15:00",
        asunto: "Reunión de planificación",
        esperado: "✅ Válido"
      },
      {
        nombre: "Juan Pérez López",
        email: "juan.perez@empresa.cl",
        fechaNacimiento: "1990-08-20",
        fecha: "2023-11-20",
        hora: "10:30",
        asunto: "",
        esperado: "✅ Válido"
      },
      
      // Casos inválidos
      {
        nombre: "Ana",
        email: "ana@correo.com",
        fechaNacimiento: "2005-01-10",
        fecha: "2023-10-25",
        hora: "09:00",
        asunto: "Presentación",
        esperado: "❌ Nombre muy corto"
      },
      {
        nombre: "Carlos Méndez",
        email: "carlos@correo",
        fechaNacimiento: "1988-03-15",
        fecha: "2023-11-10",
        hora: "14:00",
        asunto: "Revisión proyecto",
        esperado: "❌ Email inválido"
      },
      {
        nombre: "Luisa Fernández",
        email: "luisa@correo.com",
        fechaNacimiento: "2010-07-22",
        fecha: "2023-10-30",
        hora: "11:00",
        asunto: "Seguimiento",
        esperado: "❌ Edad menor a 18"
      },
      {
        nombre: "Roberto Sánchez",
        email: "roberto@correo.com",
        fechaNacimiento: "1950-09-05",
        fecha: "2023-12-05",
        hora: "16:00",
        asunto: "Retrospectiva",
        esperado: "❌ Edad mayor a 65"
      },
      {
        nombre: "Marta Jiménez",
        email: "marta@correo.com",
        fechaNacimiento: "1995-04-18",
        fecha: "2020-01-01",
        hora: "13:00",
        asunto: "Reunión pasada",
        esperado: "❌ Fecha de reunión pasada"
      },
      {
        nombre: "Pedro Gómez",
        email: "pedro@correo.com",
        fechaNacimiento: "1982-11-30",
        fecha: "2023-11-15",
        hora: "07:30",
        asunto: "Reunión temprano",
        esperado: "❌ Hora fuera de rango"
      }
    ];
    
    let resultados = [];
    
    // Procesar cada caso de prueba
    casosPrueba.forEach((caso, index) => {
      const datosReunion = {
        nombre: caso.nombre,
        email: caso.email,
        fechaNacimiento: caso.fechaNacimiento,
        fecha: caso.fecha,
        hora: caso.hora,
        asunto: caso.asunto
      };
      
      const resultado = validarDatosReunion(datosReunion);
      const estado = resultado.success ? "✅ Válido" : `❌ ${resultado.message}`;
      const coincide = estado === caso.esperado ? "✔️" : "✖️";
      
      resultados.push([
        `Caso ${index + 1}`,
        caso.nombre,
        caso.email,
        caso.fechaNacimiento,
        caso.fecha,
        caso.hora,
        caso.asunto || "(vacío)",
        estado,
        caso.esperado,
        coincide
      ]);
    });
    
    // Mostrar resultados en Logger
    console.log("RESULTADOS DE VALIDACIÓN:\n" + 
      resultados.map(r => r.join(" | ")).join("\n"));
    
    // Crear hoja de resultados
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const hoja = ss.getSheetByName("Pruebas Validación") || ss.insertSheet("Pruebas Validación");
    hoja.clear();
    
    // Encabezados
    hoja.getRange(1, 1, 1, 10).setValues([
      ["Caso", "Nombre", "Email", "Fecha Nac.", "Fecha Reunión", "Hora", "Asunto", "Resultado", "Esperado", "Coincide"]
    ]);
    
    // Datos
    resultados.forEach((fila, i) => {
      hoja.getRange(i + 2, 1, 1, fila.length).setValues([fila]);
    });
    
    // Formato
    hoja.autoResizeColumns(1, 10);
    hoja.getDataRange().setHorizontalAlignment("left");
    SpreadsheetApp.flush();
    
    return "Pruebas completadas. Ver resultados en la hoja 'Pruebas Validación'";
    
  } catch (error) {
    console.error("Error en ejecutarPruebasValidacion:", error);
    return "Error al ejecutar pruebas: " + error.message;
  }
}

// Función de validación adaptada a tu sistema
function validarDatosReunion(datosReunion) {
  try {
    // Validación de campos requeridos
    if (!datosReunion.nombre || !datosReunion.email || !datosReunion.fechaNacimiento || 
        !datosReunion.fecha || !datosReunion.hora) {
      return { success: false, message: "Faltan datos requeridos" };
    }
    
    // Validar nombre (mínimo 3 caracteres, máximo 100)
    const nombre = datosReunion.nombre.trim();
    if (nombre.length < 3) {
      return { success: false, message: "Nombre muy corto (mínimo 3 caracteres)" };
    }
    if (nombre.length > 100) {
      return { success: false, message: "Nombre muy largo (máximo 100 caracteres)" };
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(datosReunion.email)) {
      return { success: false, message: "Email inválido" };
    }
    
    // Validar fecha de nacimiento
    const fechaNac = new Date(datosReunion.fechaNacimiento);
    if (isNaN(fechaNac.getTime())) {
      return { success: false, message: "Fecha de nacimiento inválida" };
    }
    
    // Validar edad (18-65 años)
    const edad = calcularEdad(fechaNac);
    if (edad < 18) {
      return { success: false, message: "Debes tener al menos 18 años" };
    }
    if (edad > 65) {
      return { success: false, message: "La edad máxima permitida es 65 años" };
    }
    
    // Validar fecha de reunión
    const fechaReunion = new Date(datosReunion.fecha);
    if (isNaN(fechaReunion.getTime())) {
      return { success: false, message: "Fecha de reunión inválida" };
    }
    
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    if (fechaReunion < hoy) {
      return { success: false, message: "La fecha de reunión debe ser hoy o en el futuro" };
    }
    
    // Validar hora (formato HH:MM y rango 8:00-20:00)
    if (!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(datosReunion.hora)) {
      return { success: false, message: "Formato de hora no válido (use HH:MM)" };
    }
    
    const [horas] = datosReunion.hora.split(':').map(Number);
    if (horas < 8 || horas >= 20) {
      return { success: false, message: "La hora debe estar entre 08:00 y 20:00" };
    }
    
    return { success: true, message: "Datos válidos" };
    
  } catch (error) {
    return { success: false, message: "Error de validación: " + error.message };
  }
}

// Función para calcular edad (ya existente en tu código)
function calcularEdad(fechaNacimiento) {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  
  return edad;
}