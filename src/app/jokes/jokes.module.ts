import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JokeComponent } from './joke/joke.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JokeService } from './services/joke.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [JokeComponent],
  imports: [CommonModule, HttpClientModule, MatCardModule, MatButtonModule],
  providers: [
    JokeService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  exports: [JokeComponent],
})
export class JokesModule {}
