import {bootstrap, ApplicationRef} from '../application';
import {reflectRegistry} from 'angular2/src/core/util/decorators';
import {ConfigurationMetadata, AutoconfiguredMetadata} from './metadata';
import {Promise, PromiseWrapper} from 'angular2/src/core/facade/async';
import {isPresent, Type} from 'angular2/src/core/facade/lang';
import {ReflectionCapabilities} from 'angular2/src/core/reflection/reflection_capabilities';

export function autobootstrap(bindings: any[]): Promise<ApplicationRef[]> {
  var reflector: ReflectionCapabilities = new ReflectionCapabilities();
  bindings = isPresent(bindings) ? bindings : [];
  var configList: any[] = reflectRegistry.getForAnnotation(ConfigurationMetadata);
  configList.forEach((type: Type) => { bindings.push(reflector.factory(type)().getBindings()); });

  var promises: Promise<ApplicationRef>[] = [];
  var initComponents = reflectRegistry.getForAnnotation(AutoconfiguredMetadata);
  initComponents.forEach((Type) => { promises.push(bootstrap(Type, bindings)); });

  return PromiseWrapper.all(promises);
}
