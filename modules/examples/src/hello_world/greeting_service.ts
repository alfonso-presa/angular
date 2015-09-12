import {Injectable, Configuration} from 'angular2/angular2';

// A service available to the Injector, used by the HelloCmp component.
@Injectable()
export class GreetingService {
  greeting: string = 'hello';
}

export const GREETINGS_BINDINGS: any[] = [GreetingService];

// This represents a configuration class to make the GreetingService globally available for
// those components that are autoconfigured.
@Configuration()
class GreetingServiceConfiguration {
  getBindings() { return [GreetingService]; }
}
