// ===================================================================
//            CÓDIGO COMPLETO PARA EL ARCHIVO script.js
// ===================================================================

// Mensaje para saber que este archivo se cargó correctamente.
console.log("Lógica de la aplicación cargada.");

// -------------------------------------------------------------------
// FASE 1: OBTENER REFERENCIAS A LOS ELEMENTOS DEL HTML
// -------------------------------------------------------------------
const loginGoogleButton = document.getElementById('login-google-button');
const logoutButton = document.getElementById('logout-button');
const userDashboardDiv = document.getElementById('user-dashboard');
const userEmailDisplay = document.getElementById('user-email-display');


// -------------------------------------------------------------------
// FASE 2: DEFINIR LAS FUNCIONES (LAS ACCIONES PRINCIPALES)
// -------------------------------------------------------------------

// Función para iniciar sesión con Google
function iniciarSesionConGoogle() {
  console.log("Intentando iniciar sesión con Google...");
  const provider = new firebase.auth.GoogleAuthProvider();
  
  auth.signInWithPopup(provider)
    .then((result) => {
      console.log("¡Éxito! El usuario ha iniciado sesión:", result.user.email);
    })
    .catch((error) => {
      console.error("Error durante el inicio de sesión con Google:", error);
    });
}

// Función para cerrar la sesión
function cerrarSesion() {
  console.log("Cerrando sesión...");
  auth.signOut()
    .then(() => {
      console.log("La sesión se ha cerrado exitosamente.");
    })
    .catch((error) => {
      console.error("Error al cerrar la sesión:", error);
    });
}


// -------------------------------------------------------------------
// FASE 3: CONECTAR LOS BOTONES A LAS FUNCIONES (EVENT LISTENERS)
// -------------------------------------------------------------------
loginGoogleButton.addEventListener('click', iniciarSesionConGoogle);
logoutButton.addEventListener('click', cerrarSesion);


// -------------------------------------------------------------------
// FASE 4: EL "CEREBRO" - CONTROLA QUÉ SE VE Y QUÉ NO
// -------------------------------------------------------------------
auth.onAuthStateChanged((user) => {
  if (user) {
    // SI HAY UN USUARIO CON SESIÓN ACTIVA:
    console.log("Estado: Sesión activa.", user.email);
    loginGoogleButton.style.display = 'none';
    userDashboardDiv.style.display = 'block';
    userEmailDisplay.textContent = user.displayName || user.email;

  } else {
    // SI NO HAY NINGÚN USUARIO CON SESIÓN ACTIVA:
    console.log("Estado: Sin sesión.");
    loginGoogleButton.style.display = 'block';
    userDashboardDiv.style.display = 'none';
    userEmailDisplay.textContent = '';
  }
});