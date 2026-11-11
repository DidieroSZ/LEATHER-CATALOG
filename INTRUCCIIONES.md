# Instrucciones de desarrollo

- **Tecnología:** desarrolla toda la interfaz utilizando LitElement y JavaScript. Respeta el stack y la configuración existentes.
- **Animaciones:** utiliza GSAP para animaciones, transiciones e interacciones. Prioriza movimientos fluidos y evita animaciones innecesarias.
- **Iconografía:** utiliza Lucide para todos los iconos. Aprovecha la implementación existente en el proyecto.
- **Dependencias:** no instales nuevas dependencias. Antes de implementar una funcionalidad, verifica si puede resolverse con las herramientas y librerías ya disponibles.
- **Estructura del proyecto:**
  - `components/`: componentes UI pequeños y reutilizables.
  - `views/`: secciones grandes de la interfaz.
  - `pages/`: pantallas completas asociadas a rutas.
  - `router/`: navegación y renderizado de páginas.
  - `services/`: lógica de negocio y acceso a datos.
  - `utils/`: funciones auxiliares reutilizables.
  - `styles/`: estilos CSS globales y variables de diseño.
- **Organización de archivos:** cada componente, vista, página o sección debe tener su propio archivo JavaScript y su archivo CSS correspondiente, ubicados dentro de su misma carpeta y con el mismo nombre base. Ejemplo: `components/product-card/product-card.js` y `components/product-card/product-card.css`.
- **Arquitectura:** utiliza componentes reutilizables, responsabilidades bien definidas e importaciones explícitas. No concentres toda la aplicación en un único archivo.
- **Calidad:** garantiza diseño responsive, accesibilidad, rendimiento y funcionamiento real de las interacciones.
- **Validación:** ejecuta las pruebas y la compilación disponibles después de los cambios. Corrige los errores detectados y no declares verificaciones que no hayas realizado.

**Regla principal:** reutiliza las dependencias instaladas y mantén el código modular, consistente y fácil de mantener.