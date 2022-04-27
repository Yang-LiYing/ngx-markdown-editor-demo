import { APP_INITIALIZER, NgModule, Provider } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LMarkdownEditorModule } from 'ngx-markdown-editor/dist';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

function loadExternalScript(url: string): Promise<void> {
  return new Promise<void>((res,rej) => {
    const node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    node.async = false;
    document.getElementsByTagName('head')[0].appendChild(node);
    node.onload = () => {
      res();
    }
    node.onerror = () => {
      rej();
    }
  });
}

const ACE_JS_LOADER: Provider = {
  provide: APP_INITIALIZER,
  multi: true,
  useFactory: () => {
    return () => {
      return loadExternalScript('/assets/ace-builds/ace.js');
    }
  },
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // make sure FormsModule is imported to make ngModel work
    LMarkdownEditorModule
  ],
  providers: [
    ACE_JS_LOADER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
