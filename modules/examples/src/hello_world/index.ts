import {autobootstrap} from 'angular2/angular2';
import {
  ElementRef,
  Component,
  Directive,
  View,
  Injectable,
  Renderer,
  Autoconfigured,
  Configuration
} from 'angular2/angular2';

// Cannot export directly because of dart...
export var main = autobootstrap;

// A service available to the Injector, used by the HelloCmp component.
@Injectable()
class GreetingService {
  greeting: string = 'hello';
}

// Directives are light-weight. They don't allow new
// expression contexts (use @Component for those needs).
@Directive({selector: '[red]'})
class RedDec {
  // ElementRef is always injectable and it wraps the element on which the
  // directive was found by the compiler.
  constructor(el: ElementRef, renderer: Renderer) { renderer.setElementStyle(el, 'color', 'red'); }
}

@Autoconfigured()

// Angular 2.0 supports 2 basic types of directives:
// - Component - the basic building blocks of Angular 2.0 apps. Backed by
//   ShadowDom.(http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/)
// - Directive - add behavior to existing elements.

// @Component is AtScript syntax to annotate the HelloCmp class as an Angular
// 2.0 component.
@Component({
  // The Selector prop tells Angular on which elements to instantiate this
  // class. The syntax supported is a basic subset of CSS selectors, for example
  // 'element', '[attr]', [attr=foo]', etc.
  selector: 'hello-app',
})
// The template for the component.
@View({
  // Expressions in the template (like {{greeting}}) are evaluated in the
  // context of the HelloCmp class below.
  template: `<div class="greeting">{{greeting}} <span red>world</span>!</div>
           <button class="changeButton" (click)="changeGreeting()">change greeting</button>`,
  // All directives used in the template need to be specified. This allows for
  // modularity (RedDec can only be used in this template)
  // and better tooling (the template can be invalidated if the attribute is
  // misspelled).
  directives: [RedDec]
})
export class HelloCmp {
  greeting: string;

  constructor(service: GreetingService) { this.greeting = service.greeting; }

  changeGreeting(): void { this.greeting = 'howdy'; }
}

@Configuration()
class HelloAppConfiguration {
  getBindings() { return [GreetingService]; }
}
