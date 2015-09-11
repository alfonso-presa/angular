import {bootstrap, ApplicationRef} from '../application';
import {reflectRegistry} from 'angular2/src/core/util/decorators';
import {Configuration, Autoconfigured} from './decorators';
import {Promise, PromiseWrapper} from 'angular2/src/core/facade/async';
import {isPresent, Type} from 'angular2/src/core/facade/lang';
import {ListWrapper} from 'angular2/src/core/facade/collection';

import {ReflectionCapabilities} from 'angular2/src/core/reflection/reflection_capabilities';
import {getConfigurationBindings} from './auto_configuration';

export function autobootstrap(bindings?: any[]): Promise<ApplicationRef[]> {
  var reflector: ReflectionCapabilities = new ReflectionCapabilities();
  bindings = isPresent(bindings) ? bindings : [];
  var configList: any[] = reflectRegistry.getForAnnotation(Configuration);
  configList.forEach((type: Type) => { bindings.push(reflector.factory(type)().getBindings()); });

  bindings = ListWrapper.concat(bindings, getConfigurationBindings());

  var promises: Promise<ApplicationRef>[] = [];
  var initComponents = reflectRegistry.getForAnnotation(Autoconfigured);
  initComponents.forEach((Type) => { promises.push(bootstrap(Type, bindings)); });

  return PromiseWrapper.all(promises);
}
