PROYECTO DE GESTIÓN DE SOLICITUDES (FRONT):


CONTENIDO:

- [Requisitos]
- [Instalación]
- [Ejecución]
- [Mejores Prácticas]
- [Seguridad]
- [Contacto]



## Requisitos

Requisitos del Sistema

Node.js:  versión 20.16.0 

npm versión 10.8.1

Herramientas Adicionales

Editor de Código:  Visual Studio Code.

Navegador Web
Navegador Compatible:  Google Chrome.



- Otras dependencias:

   "@reduxjs/toolkit": "^1.9.2",
    "axios": "^1.3.1",
    "bootstrap": "^5.2.3",
    "bootswatch": "^5.2.3",
    "react": "^18.2.0",
    "react-bootstrap": "^2.7.0",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.43.0",
    "react-redux": "^8.0.5",
    "react-router-dom": "^6.8.0"
    

    INSTALACIÓN Y EJECUCIÓN:

npm create vite@latest nombre-de-tu-aplicacion
Se instalan las dependencias con npm install
Se inicializa la aplicación con npm start


MEJORES PRÁCTICAS:


Componentes Reutilizables, para ayudar a reducir la duplicación de código y mejora la mantenibilidad.

Uso de Hooks, para manejar el estado y los efectos secundarios de manera más simple.

Estado Global, se utiliza para datos que necesitan ser compartidos entre varios componentes, para esto hice uso de redux.


¿Por qué elegí Redux?

Decidí utilizar Redux en esta aplicación por varias razones clave que se alinean con las necesidades de gestión del estado y la escalabilidad del proyecto:

Gestión Centralizada del Estado: Redux proporciona un único store global para la gestión del estado de la aplicación, lo que facilita el acceso y la modificación de datos desde cualquier componente. Esto es especialmente útil en aplicaciones grandes, donde múltiples componentes pueden depender de los mismos datos.

Flujo de Datos Predecible: Con Redux, el flujo de datos es unidireccional, lo que significa que el estado solo puede ser modificado a través de acciones específicas. Esto permite un mejor seguimiento de los cambios en el estado y facilita la depuración y el mantenimiento del código.

Desacoplamiento: Redux fomenta un diseño de componentes más desacoplado. Los componentes pueden conectarse al store de Redux sin depender directamente de la estructura de datos, lo que mejora la reutilización y la modularidad del código.

Herramientas de Desarrollo: La integración de Redux con herramientas como Redux DevTools proporciona funcionalidades avanzadas de depuración, como la capacidad de hacer un seguimiento de cada acción y ver cómo afecta al estado. Esto facilita la identificación y resolución de problemas en la aplicación.

Escalabilidad: A medida que la aplicación crece, Redux facilita la incorporación de nuevas funcionalidades sin complicar la gestión del estado. Su estructura clara y basada en patrones ayuda a mantener el código organizado.

Ecosistema: Redux tiene un ecosistema rico de middleware y librerías complementarias que permiten manejar efectos secundarios, como llamadas a APIs (por ejemplo, Redux Thunk o Redux Saga), lo que se adapta bien a las necesidades de aplicaciones más complejas.


Estructura de Carpetas clara y coherente. Agrupando componentes relacionados y utiliza nombres descriptivos para archivos y carpetas.

Manejo de Errores, se implementa manejo de errores.

Optimización del Rendimiento con LAZY LOADING para evitar renders innecesarios en componentes que no necesitan actualizarse. 


MANEJO DE ERRORES:

Se realiza el manejo de errores que asegura que la aplicación pueda responder adecuadamente a situaciones inesperadas y proporciona una mejor experiencia al usuario.

Se utilizan bloques que muestran errores, así como el uso de react library para testing.


PRUEBAS:

CAJA NEGRA

Enfoque en la Funcionalidad.
Las pruebas se diseñan a partir de los requisitos y especificaciones del software.
Pruebas Funcionales: Se verifican que cada funcionalidad del software opere de acuerdo con las especificaciones.

Pruebas de interfaz de usuario.
Pruebas de API.
Pruebas de sistema.
Pruebas de Regresión: Se hacen después de cambios en el código para asegurar que las funcionalidades existentes sigan funcionando como se espera.

Pruebas de Usabilidad: Se evalua la facilidad de uso y la experiencia del usuario en la aplicación.

Pruebas de Seguridad: Se Identifican vulnerabilidades y aseguran que el sistema esté protegido contra ataques.

Pruebas de Compatibilidad: Se buscó Asegurar que la aplicación funcione correctamente en diferentes dispositivos, sistemas operativos y navegadores.

Pruebas de Integración: Verificación en diferentes módulos o sistemas para ver que interactúan correctamente



SEGURIDAD:

Buen manejo del token para autenticación, componente de protección de rutas para solicitar los permisos correspondientes,
uso de react-router-dom para proteger cada página de ingresos no autorizados. 

AUTENTICACIÓN:

Se protegen las rutas con verificación de usuarios por medio de autenticación en cuanto al usuario que puede acceder a diferentes paginas, también se controla los permisos, privilegios que restringe la afectación a la integridad de los datos.




Desarrollado por:


Luis Enrique de los Ángeles Acevedo Velásquez

japay01@hotmail.com

https://github.com/LuisAcevedo777

