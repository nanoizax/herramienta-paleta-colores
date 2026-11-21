# Extraer Paleta de Colores

Sube una imagen y obtén sus colores dominantes en hexadecimal. Gratis, sin cuenta y sin que el archivo salga de tu equipo.

Herramienta gratuita y de código abierto de [SonhoLab](https://sonholab.com). Corre **100 % en el navegador**: los archivos no se suben a ningún servidor.

> Licencia: **MIT** · Autor: Leandro Manuel Perez Montañana · Idiomas de la interfaz: español, inglés, francés, portugués (BR), alemán, hindi, indonesio y ruso.

## Qué hace

Elegir los colores de una marca, una habitación o un sitio web es más fácil cuando ya existe una imagen que te gusta: un logo, una foto de una pared pintada o una captura de pantalla. Esta herramienta analiza los píxeles de esa imagen y devuelve los seis colores que más se repiten, cada uno con su código hexadecimal listo para copiar. Todo ocurre dentro de tu navegador: la imagen nunca se sube a ningún servidor. Funciona igual de bien para armar la paleta de una marca desde su logo que para rescatar los colores exactos de una foto que simplemente te gustó.

**Cuándo te sirve:**

- Un diseñador recibe el logo de un cliente en PNG y necesita los hexadecimales exactos para armar la paleta del sitio web, en vez de adivinar los tonos a ojo comparando contra la pantalla.
- Alguien está decorando una habitación, encontró en internet la foto de un ambiente que le gusta y quiere llevar esos códigos a la ferretería para pedir la pintura exacta, sin quedarse corto ni pasarse de tono.
- Un desarrollador necesita los valores CSS que coinciden con una captura de pantalla de un diseño ya aprobado por el cliente, sin abrir Photoshop ni pedirle la guía de estilos a nadie.

## Cómo se usa

1. **Sube tu imagen.** Arrastra una foto, un logo o una captura de pantalla a la zona de carga, o selecciónala desde tu equipo. Se procesa al instante, sin esperas.
2. **Revisa los colores detectados.** La herramienta agrupa los píxeles por similitud y muestra los seis tonos que más aparecen en la imagen, cada uno como una muestra de color con su código hexadecimal.
3. **Copia el código que necesitas.** Haz clic sobre cualquier muestra y su código hexadecimal se copia al portapapeles, listo para pegar en tu editor de CSS, Figma o donde lo necesites.

## Qué necesita para funcionar

### Para instalarla y compilarla

- [Node.js](https://nodejs.org) 18 o superior (probado con Node 22) y npm.
- Conexión a internet **solo** durante `npm install`. Una vez compilada, la herramienta no pide nada a internet.

### Complementos específicos de esta herramienta

- **Ninguno.** No usa modelos, binarios ni servicios externos: todo está en el código y en dependencias normales de npm.

### En el navegador de quien la usa

- Cualquier navegador moderno (Chrome, Edge, Firefox, Safari). No necesita permisos especiales.

## Instalación

```bash
git clone https://github.com/nanoizax/herramienta-paleta-colores.git
cd herramienta-paleta-colores
npm install
npm run dev         # servidor de desarrollo en http://localhost:5173
```

Para publicarla:

```bash
npm run build       # genera la carpeta dist/
npm run preview     # probar la versión compilada
```

Esta herramienta **no tiene servidor propio**: todo ocurre en el navegador de quien la usa. Basta con publicar la carpeta `dist/` en cualquier hosting estático (GitHub Pages, Netlify, Cloudflare Pages, Nginx, Apache...).

## Cómo está organizado

```
src/pages/tools/   La página de la herramienta (interfaz y lógica de pantalla)
src/lib/tools/     La lógica de la herramienta, separada de la interfaz
src/components/    Piezas compartidas (zona de arrastre de archivos, botón)
src/locales/       Textos en 8 idiomas (esta herramienta solamente)
src/i18n.ts        Configuración de idiomas
```

## Cómo meterla en tu propia plataforma

1. **Como página aparte:** publica `dist/` en una ruta de tu sitio, por ejemplo `/herramientas/paleta-colores/`. Si la sirves en una subcarpeta, define `base` en `vite.config.ts`.
2. **Dentro de tu aplicación React:** copia `src/pages/tools/*Page.tsx`, `src/lib/tools/` y `src/components/` a tu proyecto, instala las mismas dependencias de `package.json` y renderiza la página donde quieras.
3. **Con tu diseño:** el marco de la página (título, ayuda, preguntas frecuentes) está en `src/components/tools/ToolPageLayout.tsx` y es intencionalmente simple. Cámbialo por tu cabecera, tu pie y tus estilos; solo necesita pintar `children`.
4. **Con tu analítica:** `src/lib/hitCounter.ts` no hace nada. Si quieres medir el uso, conéctalo ahí a tu propia herramienta.

## Privacidad

Todo el procesamiento ocurre en el navegador. Esta copia no incluye analítica, cookies, contadores ni llamadas a ningún servidor propio. Los archivos del usuario no salen de su equipo.

## Preguntas frecuentes

**¿Qué pasa con la imagen que subo?**  
No sube a ningún servidor. El análisis ocurre dentro de tu navegador, usando el procesador de tu propio equipo, así que la imagen nunca viaja a internet. Al cerrar la pestaña no queda ninguna copia guardada.

**¿Cuántos colores extrae y puedo obtener más?**  
Devuelve los seis colores más dominantes de la imagen. Es un número pensado para cubrir una paleta de marca típica (color principal, un par de secundarios y algún acento) sin saturar de opciones que después no vas a usar.

**¿Los colores que detecta son siempre los correctos para mi marca?**  
La herramienta ordena los colores por cuánto espacio ocupan en la imagen, no por cuál es más importante para el diseño. Eso significa que un fondo grande puede aparecer primero aunque el color más interesante sea el de un detalle pequeño, como un ícono o un borde. Conviene mirar la imagen original junto a la paleta antes de decidir.

**¿Funciona bien con fotos con degradados, como un atardecer?**  
Es un método por frecuencia de color, no un algoritmo de clustering avanzado, así que en imágenes con muchos matices parecidos, como un cielo con degradado, puede devolver varios tonos muy similares entre sí en lugar de colores bien diferenciados. Con logos, ilustraciones o fotos de colores sólidos funciona mejor.

**¿Es gratis? ¿Necesito crear una cuenta?**  
Es gratis y no pide cuenta ni correo. Puedes analizar una imagen o veinte el mismo día, sin límite, porque todo el procesamiento corre en tu equipo y no hay servidores que costear detrás.

## Licencia

Este proyecto se publica bajo la licencia **MIT**. El texto completo está en [LICENSE](LICENSE).

Las dependencias tienen sus propias licencias, listadas en [THIRD-PARTY.md](THIRD-PARTY.md).

## Más herramientas gratuitas

Esta es una de las herramientas gratuitas de SonhoLab. Encuentra el resto, cada una con su repositorio, en https://sonholab.com/es/herramientas.

---

Hecho por Leandro Manuel Perez Montañana.
