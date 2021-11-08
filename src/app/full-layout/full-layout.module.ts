import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';

import { FullLayoutComponent } from './full-layout.component';

import { FooterModule } from '../../@vex/layout/footer/footer.module';
import { SidebarModule } from '../../@vex/components/sidebar/sidebar.module';
import { ConfigPanelModule } from '../../@vex/components/config-panel/config-panel.module';
import { ProgressBarModule } from '../../@vex/components/progress-bar/progress-bar.module';

@NgModule({
  declarations: [FullLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    FooterModule,
    SidebarModule,
    ConfigPanelModule,
    ProgressBarModule
  ]
})
export class FullLayoutModule { }
