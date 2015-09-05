library angular2.auto_configuration.decorators;

import 'metadata.dart';
export 'metadata.dart';

/**
 * {@link ConfigurationMetadata}.
 */
class Configuration extends ConfigurationMetadata {
  const Configuration(dynamic priority) : super(priority);
}

/**
 * {@link AutoconfiguredMetadata}.
 */
class Autoconfigured extends AutoconfiguredMetadata {
  const Autoconfigured() : super();
}
