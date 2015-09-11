import {
  Injectable,
  Configuration
} from 'angular2/angular2';

// A service available to the Injector, used by the HelloCmp component.
@Injectable()
class GreetingService {
  greeting: string = 'hello';
}
//This represents a configuration class to make the GreetingService globally available for
// those components that are autoconfigured.
@Configuration()
class HelloAppConfiguration {
  getBindings() { return [GreetingService]; }
}