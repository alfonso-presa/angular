import {bootstrap, ApplicationRef} from '../application';
import {reflectRegistry} from '../util/decorators';
import {ConfigurationMetadata, AutoconfiguredMetadata} from './metadata';
import {Promise, PromiseWrapper} from 'angular2/src/core/facade/async';
import {isPresent} from 'angular2/src/core/facade/lang';

export function autobootstrap(bindings): Promise<ApplicationRef[]> {
  bindings = isPresent(bindings) ? bindings : [];
  var configList = reflectRegistry.getForAnnotation(ConfigurationMetadata);
  configList.forEach((Type) => { bindings.push((new Type()).getBindings()); });

  var promises: Promise<ApplicationRef>[] = [];
  var initComponents = reflectRegistry.getForAnnotation(AutoconfiguredMetadata);
  initComponents.forEach((Type) => { promises.push(bootstrap(Type, bindings)); });

  return PromiseWrapper.all(promises);
}
