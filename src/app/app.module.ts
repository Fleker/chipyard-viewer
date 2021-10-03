import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TimeGraphComponent } from './time-graph/time-graph.component';
import { TextViewerComponent } from './text-viewer/text-viewer.component';
import { HoverCardComponent } from './hover-card/hover-card.component';
import { MetadataBannerComponent } from './metadata-banner/metadata-banner.component';

@NgModule({
  declarations: [
    AppComponent,
    TimeGraphComponent,
    TextViewerComponent,
    HoverCardComponent,
    MetadataBannerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
