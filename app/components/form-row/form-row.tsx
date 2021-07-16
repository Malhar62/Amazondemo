import * as React from "react"
import { View, Button } from "react-native"
import { PRESETS } from "./form-row.presets"
import { FormRowProps } from "./form-row.props"
import { flatten } from "ramda"

/**
 * A horizontal container component used to hold a row of a form.
 */

export function FormRow(props: FormRowProps) {
  const viewStyle = flatten([PRESETS[props.preset], props.style])
  const { onLeft, onRight } = props;
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Button title='< prev' onPress={() => onLeft()} color='navy' />
      <Button title='next >' onPress={() => onRight()} color='gold' />
    </View>
  )
}
