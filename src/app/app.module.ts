import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule, MatButtonModule, MatCheckboxModule, MatTooltipModule, MatCardModule, MatSnackBarModule,
  MatInputModule, MatTableModule, MatPaginatorModule, MatIconModule, MatProgressBarModule,
  MatSidenavModule, MatSlideToggleModule, MatDividerModule, MatChipsModule,
  MatSliderModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgForageModule } from 'ngforage';

import { AppComponent } from './app.component';
import { HeaderComponent } from './app-shell/header/header.component';
import { LogoComponent } from './app-shell/logo/logo.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DebounceObsInputComponent } from './components/debounceObsInput/debounceObsInput.component';
import { UiStateStore } from './store/uiState/uiState.store';
import { MoviesStore } from './store/movies/movies.store';
import { MoviesService } from './services/movies/movies.service';
import { MoviesComponent } from './components/movies/movies.component';
import { MoviePanelComponent } from './components/movie-panel/movie-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogoComponent,
    DashboardComponent,
    DebounceObsInputComponent,
    MoviesComponent,
    MoviePanelComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatChipsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSliderModule,
    FlexLayoutModule,
    NgForageModule,
    RouterModule.forRoot([
      // routes
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/dashboard'
      },
      {
        path: 'dashboard',
        pathMatch: 'full',
        component: DashboardComponent,
        data: { animation: 'dashboard', title: 'Movies', icon: 'movie' }
      }
    ], { useHash: false }),
  ],
  providers: [
    BrowserAnimationsModule,
    UiStateStore,
    MoviesStore,
    MoviesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
