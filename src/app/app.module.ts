import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TimeGraphComponent } from './time-graph/time-graph.component';
import { TextViewerComponent } from './text-viewer/text-viewer.component';
import { HoverCardComponent } from './hover-card/hover-card.component';
import { MetadataBannerComponent } from './metadata-banner/metadata-banner.component';
import { AppMenuComponent } from './app-menu/app-menu.component';
import { DialogLoadFileComponent } from './dialog-load-file/dialog-load-file.component';

@NgModule({
  declarations: [
    AppComponent,
    TimeGraphComponent,
    TextViewerComponent,
    HoverCardComponent,
    MetadataBannerComponent,
    AppMenuComponent,
    DialogLoadFileComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
