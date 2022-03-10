import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeroDetailsComponent } from './components/hero-details/hero-details.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateHeroComponent } from './components/create-hero/create-hero.component';
import { HeroSearchComponent } from './mini-components/hero-search/hero-search.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ComponentLogoComponent } from './mini-components/component-logo/component-logo.component';
import { CreateHeroInputComponent } from './mini-components/create-hero-input/create-hero-input.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GraphQLModule } from './graphql/graphql.module';
import { FooterComponent } from './components/footer/footer.component';
import { TopNavigationMenuComponent } from './components/top-navigation-menu/top-navigation-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    CapitalizePipe,
    HeroDetailsComponent,
    DashboardComponent,
    CreateHeroComponent,
    HeroSearchComponent,
    ComponentLogoComponent,
    CreateHeroInputComponent,
    FooterComponent,
    TopNavigationMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    HttpClientModule,
    MatToolbarModule,
    MatProgressBarModule,
    GraphQLModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
