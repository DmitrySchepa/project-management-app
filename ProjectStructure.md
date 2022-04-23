    app
    ├── core                
    │   ├── components
    |   |   ├── HeaderComponent
    |   |   ├── FooterComponent
    │   ├── pages
    |   |   ├── HomePageComponent
    │   ├── services
    │   ├── guards
    |   |   ├── AuthGuard
    |   ├── core.module.ts
    ├── shared
    │   ├── components (?)
    │   ├── directives (?)
    │   ├── models
    │   ├── pipes (?)
    |   ├── shared.module.ts (includes material modules)
    ├── redux
    │   ├── actions
    │   ├── reducers
    │   ├── effects
    │   ├── reducers
    │   ├── selectors
    │   ├── state.models.ts
    ├── boards (lazy)
    │   ├── components
    |   |   ├── BoardCardComponent
    |   |   ├── BoardColumnComponent
    |   |   ├── BoardTitleComponent
    |   |   ├── BoardTaskComponent
    |   |   ├── ModalCreateComponent
    |   |   ├── ModalEditComponent
    |   |   ├── ModalDeleteComponent
    |   |   ├── SearhComponent
    │   ├── directives
    │   ├── models
    |   |   ├── task.model.ts
    │   ├── pages
    |   |   ├── BoardsPageComponent
    |   |   ├── BoardPageComponent
    │   ├── pipes
    |   |   ├── filter.pipe.ts
    │   ├── services
    |   |   ├── boards.servise.ts
    |   ├── boards.module.ts
    |   ├── boards-routing.module.ts
    ├── auth
    │   ├── components
    |   |   ├── LogInComponent
    |   |   ├── SignUpComponent
    │   ├── models
    |   |   ├── user.model.ts
    │   ├── pages
    |   |   ├── SignUpPageComponent
    |   |   ├── LogInPageComponent
    │   ├── services
    |   |   ├── auth.servise.ts
    |   ├── auth.module.ts
    |   ├── auth-routing.module.ts
    ├── app.component.html
    ├── app.component.scss
    ├── app.component.ts
    ├── app.component.spec.ts
    ├── app.module.ts
    ├── app-routing.module.ts
    |   ├── /home
    |   ├── /signin
    |   ├── /boards
    |   ├── /boards/:board
    |   ├── /404
