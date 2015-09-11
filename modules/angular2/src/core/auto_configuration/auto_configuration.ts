export {
  Configuration,
  Autoconfigured,
  ConfigurationFactory,
  AutoconfiguredFactory
} from './decorators';
import {
  Configuration,
  Autoconfigured,
  ConfigurationFactory,
  AutoconfiguredFactory
} from './decorators';
export {ConfigurationMetadata, AutoconfiguredMetadata} from './metadata';
import {ConfigurationMetadata, AutoconfiguredMetadata} from './metadata';
import {
  Type,
  isPresent
} from 'angular2/src/core/facade/lang';

import {
  reflectRegistry
} from 'angular2/src/core/util/decorators';

import {
  reflector
} from 'angular2/src/core/reflection/reflection';

export function getAutoconfiguredBindings(appComponentType: Type): Array<Type | Binding | any[]> {
  var autoconfigured = getConfigurationAnnotation(appComponentType);
  var bindings;

  if (isPresent(autoconfigured)) {
    bindings = getConfigurationBindings();
  }

  return bindings;
}

export function getConfigurationAnnotation(appComponentType: Type): AutoconfiguredMetada {
  var annotations: any[] = reflector.annotations(appComponentType);

  for (var i = 0; i < annotations.length; i++) {
    var annotation = annotations[i];

    if (annotation instanceof AutoconfiguredMetadata) {
      return annotation;
    }
  }
}

export function getConfigurationBindings(): Array<Type | Binding | any[]> {
  var bindings:Array<Type | Binding | any[]> = [];
  var configList: any[] = reflectRegistry.getForAnnotation(Configuration);
  configList.forEach((type: Type) => { bindings.push(reflector.factory(type)().getBindings()); });

  return bindings;
}
