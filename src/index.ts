import {
  FromKeyParam,
  map,
  mapSimultaneous,
  rule,
  toKey,
  ToKeyParam,
  writeToProfile,
} from 'karabiner.ts'

// ! Change '--dry-run' to your Karabiner-Elements Profile name.
// (--dry-run print the config json into console)
// + Create a new profile if needed.
writeToProfile('Default', [
  // rule('numbers').manipulators(mapNumbers()),
  rule('basic').manipulators([
    map('caps_lock').to('left_control'),
    mapSimultaneous(['j', 'k']).to('escape'),
  ]),

  rule('shift').manipulators([
    map('spacebar')
      .parameters({
        'basic.to_if_held_down_threshold_milliseconds': 250,
      })
      .toIfAlone('spacebar', {}, { halt: true })
      .toDelayedAction([], toKey('spacebar'))
      .toIfHeldDown('left_shift', {}, { halt: true, repeat: true }),
  ]),
])

function mapNumber(number: FromKeyParam) {
  return map(number)
    .parameters({
      'basic.to_if_held_down_threshold_milliseconds': 250,
    })
    .toIfAlone(number as ToKeyParam, 'left_shift', { halt: true })
    .toDelayedAction([], toKey(number as ToKeyParam, 'left_shift'))
    .toIfHeldDown(number as ToKeyParam, {}, { halt: true, repeat: false })
}

function mapNumbers(): ReturnType<typeof map>[] {
  return [
    mapNumber('1'),
    mapNumber('2'),
    mapNumber('3'),
    mapNumber('4'),
    mapNumber('5'),
    mapNumber('6'),
    mapNumber('7'),
    mapNumber('8'),
    mapNumber('9'),
  ]
}
