#Документация

Документация и рекомендации по проекту **CTHub**

## Стили

### SCSS

Для стилизации мы используем SCSS с некоторым количеством собственных миксинов. Все стили лежат [здесь](./styles/styles.scss)

Идейно логика следующая:

1. Мы не пишем стили на уровне компонента
2. Все стили пишутся в отдельной [корневой](./styles/) директории, которая автоматически компилируется в один общий файл и подключается к проекту. Это позволяет разделить логику и верстку
3. Стили пишутся по БЭМ с использованием миксинов

**При создании нового компонента**

Создается папка с таким же названием в [components](./styles/components) и файлом внутри **component_name.scss**

Каждый компонент начинается с блока:

```scss
@include block(compnent_name) {
}
```

Что в итоге будет скопилировано в `.hh--component-name {}`

Это позволяет избежать перемешивания стилей

Чтобы добавить дочерний элемент компонента:

```scss
@include block(component_name) {
	@include element(child_name) {
	}
}
```

Что в итоге будет скомпилировано в `.hh--component-name__child_name`

Модификатор:

```scss
@include block(component_name) {
	@include modifier(modifier_name) {
	}
}
```

Что в итоге будет скомпилировано в `.hh--component-name--modifier_name`

#### Пример

Пример стилизации верстки

```html
<div class="hh--component hh--component--active">
	<div class="hh--component__child hh--component__child--disabled">
		<p>Hello world!</p>
	</div>
</div>
```

```scss
@include block(component) {
	width: 50px;
	background: blue;

	@include modifier(active) {
		background: red;
	}

	@include element(child) {
		margin: 10px;

		@include modifier(disabled) {
			background: gray;
		}
	}
}
```

В скомпилированном виде:

```css
.hh--component {
	width: 50px;
	background: blue;
}

.hh--component--active {
	background: red;
}

.hh--component__child {
	margin: 10px;
}

.hh--component__child--disabled {
	background: gray;
}
```

Как можно видеть, все стили, относящиеся к компоненту `component` начинаются с `.hh--component...`, что не позволит им перемешаться с другими или поввлиять на кого-то еще

### Размеры

Все размеры должны использовать переменные:

```scss
 {
	width: $spacing-05;
}
```

Размеры можно посмотреть [здесь](./styles/utils/_sizing.scss)

Если нужного нет, то размер указываются в `rem` или `px`

### Сетка

Для верстки используются колонки. Вся логика с колонками лежим в [GridModule](./libs/grid/src/lib/grid.module.ts)

Сама сетка представляет собой 6 колонок равной ширины с отступами по краям.

**Правила пользования колонками:**

Колонки нельзя вкладывать друг в друга

```angular2html
<hh-grid>
    ...
    <!--Так делать нельзя!-->
    <hh-grid></hh-grid>
</hh-grid>
```

Колонки могут быть друг под другом в разных конфигурациях

```angular2html
<hh-grid>
    <hh-column cols="3"></hh-column>
    <hh-column cols="3"></hh-column>
</hh-grid>
<hh-grid>
    <hh-column cols="4"></hh-column>
    <hh-column cols="2"></hh-column>
</hh-grid>
```

Колонок в сумме должно быть ровно 6

```angular2html
<hh-grid>
    ...
    <!--Колонок в сумме больше 6-->
    <hh-column cols="4"></hh-column>
    <hh-column cols="4"></hh-column>
</hh-grid>
```

# NX

## Автогенераторы

В NX есть механизмы для генерации бойлерплейта. Ниже приведен основной список:

**Создать библиотеку**

```shell script
nx g lib lib_name
```

**Удалить библиотеку**

```shell script
nx g rm lib_name
```

# core

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Smart, Extensible Build Framework**

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/angular/getting-started/what-is-nx)

[Interactive Tutorial](https://nx.dev/angular/tutorial/01-create-application)

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

-   [Angular](https://angular.io)
    -   `ng add @nrwl/angular`
-   [React](https://reactjs.org)
    -   `ng add @nrwl/react`
-   Web (no framework frontends)
    -   `ng add @nrwl/web`
-   [Nest](https://nestjs.com)
    -   `ng add @nrwl/nest`
-   [Express](https://expressjs.com)
    -   `ng add @nrwl/express`
-   [Node](https://nodejs.org)
    -   `ng add @nrwl/node`

There are also many [community plugins](https://nx.dev/nx-community) you could add.

## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@core/mylib`.

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.

## ☁ Nx Cloud

### Distributed Computation Caching & Distributed Task Execution

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.
