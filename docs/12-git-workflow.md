# Git Workflow

## Objetivo

Este documento define reglas de Git para SaleOps. La meta es mantener un historial claro, revisable y util para portafolio, mantenimiento y futuras adaptaciones comerciales.

## Estrategia de ramas

Usar ramas por fase o por funcionalidad:

- `docs/phase-0-foundation`
- `feat/showcase-home`
- `feat/product-catalog`
- `feat/checkout-flow`
- `fix/order-status-transition`
- `chore/backend-docker`

La rama debe describir el objetivo del trabajo y evitar mezclar tareas no relacionadas.

## Rama principal

La rama principal debe representar trabajo estable. Puede llamarse `main`. Las ramas de trabajo se integran mediante pull request o merge controlado.

## Conventional Commits

Usar Conventional Commits para que el historial sea facil de leer.

Formato:

```text
type: short description
```

Tipos recomendados:

- `docs`: documentacion.
- `feat`: funcionalidad nueva.
- `fix`: correccion.
- `refactor`: cambio interno sin alterar comportamiento.
- `test`: pruebas.
- `chore`: tareas de mantenimiento.
- `ci`: integracion continua.

## Ejemplos de commits validos

- `docs: add product brief`
- `docs: define MVP scope and user roles`
- `feat: implement product catalog`
- `fix: handle empty cart checkout`
- `refactor: simplify order status mapper`
- `test: add order service tests`
- `chore: configure eslint`
- `ci: add backend workflow`

## Cuando hacer commits

Hacer commits al cerrar un bloque coherente:

- un documento importante;
- un grupo de documentos relacionados;
- una funcionalidad completa pequena;
- una correccion con prueba;
- una configuracion verificable.

Evitar commits enormes que mezclen documentacion, UI, backend, estilos y configuracion sin relacion clara.

## Commits por funcionalidad o documento relevante

Cada commit debe contar una historia clara. Si se trabaja en checkout, el commit no deberia incluir cambios de reportes o colores del dashboard salvo que sean necesarios para el mismo objetivo.

## Evitar mezclar cambios no relacionados

Antes de commitear:

- revisar `git status`;
- revisar diff;
- agregar solo archivos relacionados;
- dejar fuera prompts, notas temporales o archivos locales si no pertenecen al repo;
- no eliminar archivos que no forman parte de la tarea.

## Pull requests

Aunque SaleOps sea un proyecto personal, se recomienda usar pull requests:

- documentan la intencion del cambio;
- facilitan revisar diffs;
- permiten adjuntar capturas o decisiones;
- ayudan a mostrar proceso profesional en portafolio.

Un PR por fase o por modulo relevante es suficiente al inicio.

## Mantener historial limpio

- Usar mensajes claros.
- Evitar commits como `changes`, `update` o `fix stuff`.
- No commitear secretos.
- No commitear archivos generados innecesarios.
- Mantener commits pequenos y significativos.

## Flujo recomendado por fase

1. Revisar estado del repositorio.
2. Crear rama de fase.
3. Trabajar en bloques pequenos.
4. Ejecutar validaciones disponibles.
5. Hacer commits relacionados.
6. Abrir pull request.
7. Revisar checklist de calidad.
8. Fusionar a `main` cuando este estable.

## Recommended Improvements

- Agregar plantilla de PR cuando existan repositorios reales.
- Agregar `CODEOWNERS` si el proyecto crece con colaboradores.
- Usar tags para hitos importantes de portafolio.
- Mantener notas de release por fase.

## Open Questions

- Se usara squash merge o merge commits en los repositorios reales?
- Se exigira PR incluso para cambios pequenos de documentacion?
