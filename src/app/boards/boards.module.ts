import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardsRoutingModule } from './boards-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BoardCardComponent } from './components/board-card/board-card.component';
import { BoardColumnComponent } from './components/board-column/board-column.component';
import { BoardTaskComponent } from './components/board-task/board-task.component';
import { BoardTitleComponent } from './components/board-title/board-title.component';
import { BoardSearchComponent } from './components/board-search/board-search.component';
import { RdSeapageComponent } from './зÑpages/rd-seapage/rd-seapage.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    BoardCardComponent,
    BoardColumnComponent,
    BoardTaskComponent,
    BoardTitleComponent,
    BoardSearchComponent,
    RdSeapageComponent,
    BoardPageComponent,
    BoardsPageComponent,
    FilterPipe,
  ],
  imports: [CommonModule, BoardsRoutingModule, SharedModule],
})
export class BoardsModule {}
