import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Event, NavigationEnd, Router, Scroll } from '@angular/router';
import { LayoutService } from '../../@vex/services/layout.service';
import { ConfigService } from '../../@vex/services/config.service';
import { filter, map, startWith } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { checkRouterChildsData } from '../../@vex/utils/check-router-childs-data';
import { SidebarComponent } from '../../@vex/components/sidebar/sidebar.component';

@UntilDestroy()
@Component({
  selector: 'vex-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FullLayoutComponent implements OnInit {

  isBoxed$ = this.configService.config$.pipe(map(config => config.boxed));
  isLayoutVertical$ = this.configService.config$.pipe(map(config => config.layout === 'vertical'));
  isDesktop$ = this.layoutService.isDesktop$;
  // sidenavCollapsed$ = this.layoutService.sidenavCollapsed$;
  sidenavCollapsed$ = true;
  // isFooterVisible$ = this.configService.config$.pipe(map(config => config.footer.visible));
  isFooterVisible$ = true;
  // isFooterFixed$ = this.configService.config$.pipe(map(config => config.footer.fixed));
  isFooterFixed$ = false;
  toolbarShadowEnabled$ = false;

  scrollDisabled$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    startWith(null),
    map(() => checkRouterChildsData(this.router.routerState.root.snapshot, data => data.scrollDisabled))
  );
  containerEnabled$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    startWith(null),
    map(() => checkRouterChildsData(this.router.routerState.root.snapshot, data => data.containerEnabled))
  );
  @ViewChild('configpanel', { static: true }) configpanel: SidebarComponent;

  constructor(
    private layoutService: LayoutService,
    private configService: ConfigService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

}
