import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TimeGraphComponent } from './time-graph/time-graph.component';
import { TextViewerComponent } from './text-viewer/text-viewer.component';
import { HoverCardComponent } from './hover-card/hover-card.component';

@NgModule({
  declarations: [
    AppComponent,
    TimeGraphComponent,
    TextViewerComponent,
    HoverCardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
